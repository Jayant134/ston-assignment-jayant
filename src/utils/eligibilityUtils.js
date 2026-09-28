export function checkEligibility(student, drive) {
  if (student.cgpa < drive.minCGPA) {
    return { eligible: false, reason: `CGPA below ${drive.minCGPA}` };
  }
  if (!drive.eligibleBranches.includes(student.branch)) {
    return { eligible: false, reason: 'Branch not eligible' };
  }
  return { eligible: true, reason: null };
}
