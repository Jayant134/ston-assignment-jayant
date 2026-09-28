import React from 'react';
import { Text } from 'react-native';

const ICONS = { Applied: '📝', Attended: '🎤', Shortlisted: '⭐', Selected: '🏆' };

export default function StatusBadge({ status }) {
  return (
    <Text style={{ fontWeight: '600', marginTop: 4 }}>
      {ICONS[status]} {status}
    </Text>
  );
}
