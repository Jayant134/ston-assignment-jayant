import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import EligibilityTag from './EligibilityTag';

export default function DriveCard({ drive, eligible, applied, onPress }) {
  return (
    <TouchableOpacity style={s.card} onPress={onPress}>
      <Text style={s.company}>{drive.company}</Text>
      <Text>{drive.role}</Text>
      <Text>
        CTC: {drive.ctc} | Date: {drive.driveDate}
      </Text>
      <EligibilityTag eligible={eligible} applied={applied} />
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 2, gap: 4 },
  company: { fontSize: 18, fontWeight: 'bold' },
});
