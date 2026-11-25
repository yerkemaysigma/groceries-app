import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';

interface Props {
  onGoLogin: () => void;
  onSuccess: () => void;
}

export const SignUpScreen: React.FC<Props> = ({ onGoLogin, onSuccess }) => {
  const [username, setUsername] = useState('Afsar Hossen');
  const [email, setEmail] = useState('imshuvo97@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.carrot}>🥕</Text>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Enter your credentials to continue</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput value={username} onChangeText={setUsername} style={styles.input} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordRow}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secure}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setSecure((s) => !s)}>
          <Text style={styles.eye}>{secure ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.terms}>
        By continuing you agree to our <Text style={styles.green}>Terms of Service</Text> and{' '}
        <Text style={styles.green}>Privacy Policy.</Text>
      </Text>

      <PrimaryButton title="Sing Up" onPress={onSuccess} style={styles.btn} />

      <TouchableOpacity onPress={onGoLogin} style={styles.footerLink}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.green}>Singup</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCFCFC', paddingHorizontal: 24, paddingTop: 22 },
  carrot: { fontSize: 44, textAlign: 'center', marginBottom: 24 },
  title: { fontSize: 25, fontWeight: '600', color: '#181725' },
  subtitle: { fontSize: 15, color: '#7C7C7C', marginTop: 8, marginBottom: 20 },
  label: { fontSize: 15, color: '#7C7C7C', fontWeight: '500', marginTop: 12 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 9,
    fontSize: 16,
    color: '#181725',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  passwordInput: { flex: 1, paddingVertical: 9, fontSize: 16, color: '#181725' },
  eye: { fontSize: 18, paddingHorizontal: 6 },
  terms: { fontSize: 12, color: '#7C7C7C', lineHeight: 18, marginTop: 16, marginBottom: 22 },
  btn: { marginTop: 2 },
  footerLink: { marginTop: 18, alignItems: 'center' },
  footerText: { fontSize: 14, color: '#181725', fontWeight: '500' },
  green: { color: '#53B175', fontWeight: '600' },
});