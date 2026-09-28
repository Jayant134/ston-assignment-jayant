import React, { useState, useLayoutEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

import DriveCard from '../components/DriveCard';
import { useApp } from '../context/AppContext';
import { drives } from '../data/mockDrives';
import { checkEligibility } from '../utils/eligibilityUtils';

const TABS = [
  ['all', 'All Drives'],
  ['eligible', 'Eligible Only'],
];

export default function DriveListScreen({ navigation }) {
  const { student, applications } = useApp();
  const [tab, setTab] = useState('all');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Placement Drives',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('MyApplications')}>
          <Text style={{ color: '#1a73e8', fontWeight: '600' }}>My Applications</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const data = drives.filter((d) => tab === 'all' || checkEligibility(student, d).eligible);
  const isApplied = (id) => applications.some((a) => a.driveId === id);

  return (
    <View style={s.container}>
      <View style={s.tabs}>
        {TABS.map(([key, label]) => (
          <TouchableOpacity key={key} onPress={() => setTab(key)} style={[s.tab, tab === key && s.tabActive]}>
            <Text style={tab === key && { color: '#fff' }}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={data}
        keyExtractor={(d) => d.id}
        renderItem={({ item }) => (
          <DriveCard
            drive={item}
            eligible={checkEligibility(student, item).eligible}
            applied={isApplied(item.id)}
            onPress={() => navigation.navigate('DriveDetail', { driveId: item.id })}
          />
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  tabs: { flexDirection: 'row', marginBottom: 12, gap: 8 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#e0e0e0' },
  tabActive: { backgroundColor: '#1a73e8' },
});
