import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NumericKeypad } from '../components/NumericKeypad';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export const VerificationScreen: React.FC<Props> = ({ onBack, onNext }) => {
  const [code, setCode] = useState('');

  const handleKey = (digit: string) => {
    if (code.length < 4) setCode((c) => `${c}${digit}`);
  };

  const handleBackspace = () => {
    setCode((c) => c.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onBack} style={styles.back}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Enter your 4-digit code</Text>
        <Text style={styles.label}>Code</Text>
        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{code ? code.split('').join('   ') : '- - - -'}</Text>
        </View>

        <View style={styles.bottomActions}>
          <TouchableOpacity onPress={() => setCode('')}>
            <Text style={styles.resend}>Resend Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fab} onPress={onNext}>
            <Text style={styles.fabText}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      <NumericKeypad onKeyPress={handleKey} onBackspace={handleBackspace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCFCFC', justifyContent: 'space-between' },
  content: { paddingHorizontal: 24, paddingTop: 16, flex: 1 },
  back: { width: 36, height: 36, justifyContent: 'center' },
  backIcon: { fontSize: 30, color: '#181725' },
  title: { fontSize: 25, fontWeight: '600', color: '#181725', marginTop: 18 },
  label: { fontSize: 15, color: '#7C7C7C', marginTop: 28, fontWeight: '500' },
  codeBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 12,
    marginTop: 8,
  },
  codeText: { fontSize: 18, letterSpacing: 3, color: '#181725' },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingBottom: 24,
  },
  resend: { color: '#53B175', fontSize: 16, fontWeight: '500' },
  fab: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#53B175',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: { color: '#FFFFFF', fontSize: 30, lineHeight: 32 },
});