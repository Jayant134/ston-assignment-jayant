const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const drives = require('./data/drives.json');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const SECRET = 'mock-secret';
const student = { id: 's1', name: 'Rahul Sharma', rollNo: '21CS001', branch: 'CSE', cgpa: 7.4 };
const applications = [
  { driveId: 'd1', status: 'Attended' },
  { driveId: 'd2', status: 'Shortlisted' },
  { driveId: 'd3', status: 'Selected' },
];

const ok = (res, data, message) => res.json({ success: true, data, message });
const fail = (res, status, code, message) =>
  res.status(status).json({ success: false, error: { code, message } });

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return fail(res, 401, 'UNAUTHORIZED', 'Missing token');
  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    fail(res, 401, 'INVALID_TOKEN', 'Invalid token');
  }
};

const check = (d) => {
  if (student.cgpa < d.minCGPA)
    return { eligible: false, code: 'INELIGIBLE_CGPA', message: 'Your CGPA does not meet the minimum requirement for this drive' };
  if (!d.eligibleBranches.includes(student.branch))
    return { eligible: false, code: 'INELIGIBLE_BRANCH', message: 'Your branch is not eligible for this drive' };
  return { eligible: true };
};

app.post('/api/auth/login', (req, res) => {
  const { rollNo, password } = req.body || {};
  if (rollNo !== '21CS001' || password !== 'student123')
    return fail(res, 401, 'INVALID_CREDENTIALS', 'Wrong roll number or password');
  ok(res, { token: jwt.sign({ id: student.id }, SECRET, { expiresIn: '1h' }) }, 'Login successful');
});

app.get('/api/drives', authMiddleware, (req, res) => ok(res, drives, 'Drives fetched successfully'));

app.get('/api/drives/:id', authMiddleware, (req, res) => {
  const d = drives.find((x) => x.id === req.params.id);
  return d ? ok(res, d, 'Drive fetched successfully') : fail(res, 404, 'DRIVE_NOT_FOUND', 'Drive not found');
});

app.get('/api/drives/:id/eligibility', authMiddleware, (req, res) => {
  const d = drives.find((x) => x.id === req.params.id);
  if (!d) return fail(res, 404, 'DRIVE_NOT_FOUND', 'Drive not found');
  return ok(res, check(d), 'Eligibility checked');
});

app.post('/api/drives/:id/apply', authMiddleware, (req, res) => {
  const d = drives.find((x) => x.id === req.params.id);
  if (!d) return fail(res, 404, 'DRIVE_NOT_FOUND', 'Drive not found');
  const r = check(d);
  if (!r.eligible) return fail(res, 403, r.code, r.message);
  if (applications.some((a) => a.driveId === d.id)) return fail(res, 409, 'ALREADY_APPLIED', 'Already applied');
  applications.push({ driveId: d.id, status: 'Applied' });
  return ok(res, { driveId: d.id, status: 'Applied' }, 'Application submitted');
});

app.get('/api/students/me/applications', authMiddleware, (req, res) =>
  ok(res, applications, 'Applications fetched')
);

app.get('/api/health', (req, res) => ok(res, { up: true }, 'OK'));

app.listen(3000, () => console.log('Mock server running on :3000'));
