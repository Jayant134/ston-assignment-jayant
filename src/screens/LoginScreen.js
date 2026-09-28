import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [roll, setRoll] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = () => {
    const e = {};
    if (!roll.trim()) e.roll = 'Roll number is required';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (roll.trim().toUpperCase() === '21CS001' && password === 'student123') {
        navigation.replace('Drives');
      } else {
        setErrors({ form: 'Invalid roll number or password' });
      }
    }, 1500);
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>STON Placements</Text>
      <TextInput style={s.input} placeholder="College Roll Number" autoCapitalize="characters" value={roll} onChangeText={setRoll} />
      {errors.roll && <Text style={s.error}>{errors.roll}</Text>}
      <TextInput style={s.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      {errors.password && <Text style={s.error}>{errors.password}</Text>}
      {errors.form && <Text style={s.error}>{errors.form}</Text>}
      <TouchableOpacity style={s.button} onPress={submit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Login</Text>}
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginTop: 12 },
  error: { color: '#c62828', marginTop: 4 },
  button: { backgroundColor: '#1a73e8', padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
