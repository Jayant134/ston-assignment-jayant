import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import StatusBadge from '../components/StatusBadge';
import { useApp } from '../context/AppContext';
import { drives } from '../data/mockDrives';

export default function MyApplicationsScreen({ navigation }) {
  const { applications } = useApp();
  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={applications}
      keyExtractor={(a) => a.driveId}
      ListEmptyComponent={<Text>No applications yet.</Text>}
      renderItem={({ item }) => {
        const drive = drives.find((d) => d.id === item.driveId);
        return (
          <View style={s.card}>
            <Text style={s.company}>{drive.company}</Text>
            <Text>{drive.role}</Text>
            <StatusBadge status={item.status} />
            <TouchableOpacity onPress={() => navigation.navigate('AdmitCard', { driveId: drive.id })}>
              <Text style={s.link}>View Admit Card (QR)</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 2 },
  company: { fontSize: 18, fontWeight: 'bold' },
  link: { color: '#1a73e8', marginTop: 8, fontWeight: '600' },
});
