import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NumericKeypad } from '../components/NumericKeypad';

interface Props {
  phone: string;
  onChangePhone: (val: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export const NumberScreen: React.FC<Props> = ({ phone, onChangePhone, onBack, onNext }) => {
  const handleKey = (digit: string) => {
    if (phone.length < 15) onChangePhone(`${phone}${digit}`);
  };

  const handleBackspace = () => {
    if (phone.length > 1) onChangePhone(phone.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onBack} style={styles.back}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Enter your mobile number</Text>
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.inputRow}>
          <Text style={styles.flag}>🇧🇩</Text>
          <Text style={styles.value}>{phone}</Text>
        </View>

        <TouchableOpacity style={styles.fab} onPress={onNext}>
          <Text style={styles.fabText}>›</Text>
        </TouchableOpacity>
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 12,
    marginTop: 8,
  },
  flag: { fontSize: 20 },
  value: { fontSize: 17, color: '#181725', fontWeight: '500' },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#53B175',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: { color: '#FFFFFF', fontSize: 30, lineHeight: 32 },
});