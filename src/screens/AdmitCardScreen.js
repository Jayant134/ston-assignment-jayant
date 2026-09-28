import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { useApp } from '../context/AppContext';
import { drives } from '../data/mockDrives';

export default function AdmitCardScreen({ route }) {
  const { student } = useApp();
  const drive = drives.find((d) => d.id === route.params.driveId);
  return (
    <View style={s.container}>
      <View style={s.card}>
        <Text style={s.title}>Admit Card</Text>
        <Text style={s.row}>Student: {student.name}</Text>
        <Text style={s.row}>Drive: {drive.role}</Text>
        <Text style={s.row}>Company: {drive.company}</Text>
        <Text style={s.row}>Date: {drive.driveDate}</Text>
        <View style={{ marginTop: 20 }}>
          <QRCode value={`${student.rollNo}|${drive.id}`} size={180} />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', padding: 24, borderRadius: 12, alignItems: 'center', elevation: 3 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  row: { fontSize: 16, marginTop: 4 },
});
