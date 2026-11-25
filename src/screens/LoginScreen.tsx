import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';

interface Props {
  onGoSignUp: () => void;
  onSuccess: () => void;
}

export const LoginScreen: React.FC<Props> = ({ onGoSignUp, onSuccess }) => {
  const [email, setEmail] = useState('imshuvo97@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.carrot}>🥕</Text>
      <Text style={styles.title}>Loging</Text>
      <Text style={styles.subtitle}>Enter your emails and password</Text>

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

      <TouchableOpacity style={styles.forgotBox}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <PrimaryButton title="Log In" onPress={onSuccess} style={styles.btn} />

      <TouchableOpacity onPress={onGoSignUp} style={styles.footerLink}>
        <Text style={styles.footerText}>
          Don’t have an account? <Text style={styles.green}>Singup</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCFCFC', paddingHorizontal: 24, paddingTop: 28 },
  carrot: { fontSize: 44, textAlign: 'center', marginBottom: 32 },
  title: { fontSize: 25, fontWeight: '600', color: '#181725' },
  subtitle: { fontSize: 15, color: '#7C7C7C', marginTop: 8, marginBottom: 28 },
  label: { fontSize: 15, color: '#7C7C7C', fontWeight: '500', marginTop: 14 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 10,
    fontSize: 16,
    color: '#181725',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  passwordInput: { flex: 1, paddingVertical: 10, fontSize: 16, color: '#181725' },
  eye: { fontSize: 18, paddingHorizontal: 6 },
  forgotBox: { alignSelf: 'flex-end', marginTop: 14, marginBottom: 26 },
  forgotText: { color: '#181725', fontSize: 13 },
  btn: { marginTop: 4 },
  footerLink: { marginTop: 20, alignItems: 'center' },
  footerText: { fontSize: 14, color: '#181725', fontWeight: '500' },
  green: { color: '#53B175', fontWeight: '600' },
});