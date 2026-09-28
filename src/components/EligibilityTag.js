import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function EligibilityTag({ eligible, applied }) {
  const label = applied ? '✔ Applied' : eligible ? '✔ Eligible' : '✖ Not Eligible';
  const bg = applied ? '#e3f2fd' : eligible ? '#e8f5e9' : '#ffebee';
  return <Text style={[s.tag, { backgroundColor: bg }]}>{label}</Text>;
}

const s = StyleSheet.create({
  tag: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, fontWeight: '600', overflow: 'hidden' },
});
