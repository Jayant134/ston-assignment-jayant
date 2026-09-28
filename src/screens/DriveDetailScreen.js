import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { useApp } from '../context/AppContext';
import { drives } from '../data/mockDrives';
import { checkEligibility } from '../utils/eligibilityUtils';

export default function DriveDetailScreen({ route }) {
  const drive = drives.find((d) => d.id === route.params.driveId);
  const { student, applications, apply } = useApp();
  const { eligible, reason } = checkEligibility(student, drive);
  const applied = applications.some((a) => a.driveId === drive.id);
  const disabled = !eligible || applied;

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.title}>{drive.company}</Text>
      <Text style={s.row}>Role: {drive.role}</Text>
      <Text style={s.row}>CTC: {drive.ctc}</Text>
      <Text style={s.row}>Date: {drive.driveDate}</Text>
      <Text style={s.row}>Venue: {drive.venue}</Text>
      <Text style={s.row}>Min CGPA: {drive.minCGPA}</Text>
      <Text style={s.row}>Branches: {drive.eligibleBranches.join(', ')}</Text>
      <Text style={s.row}>{drive.description}</Text>
      {!eligible && <Text style={s.error}>✖ {reason}</Text>}
      <TouchableOpacity style={[s.button, disabled && s.disabled]} disabled={disabled} onPress={() => apply(drive.id)}>
        <Text style={s.btnText}>{applied ? 'Applied' : 'Apply'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { padding: 20, gap: 8 },
  title: { fontSize: 24, fontWeight: 'bold' },
  row: { fontSize: 16 },
  error: { color: '#c62828', fontWeight: '600', marginTop: 8 },
  button: { backgroundColor: '#1a73e8', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  disabled: { backgroundColor: '#9e9e9e' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
