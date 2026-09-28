import { checkEligibility } from '../src/utils/eligibilityUtils';

const student = { cgpa: 7.4, branch: 'CSE' };

test('eligible when CGPA and branch match', () => {
  expect(checkEligibility(student, { minCGPA: 6.5, eligibleBranches: ['CSE'] }).eligible).toBe(true);
});
test('ineligible for low CGPA', () => {
  expect(checkEligibility(student, { minCGPA: 8, eligibleBranches: ['CSE'] }).reason).toBe('CGPA below 8');
});
test('ineligible for wrong branch', () => {
  expect(checkEligibility(student, { minCGPA: 6, eligibleBranches: ['MECH'] }).reason).toBe('Branch not eligible');
});
