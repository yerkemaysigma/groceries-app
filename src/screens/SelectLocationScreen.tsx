import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';

interface Props {
  onBack: () => void;
  onSubmit: () => void;
}

export const SelectLocationScreen: React.FC<Props> = ({ onBack, onSubmit }) => {
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.back}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <View style={styles.mapBadge}>
        <Text style={styles.mapIcon}>🗺️</Text>
      </View>

      <Text style={styles.title}>Select Your Location</Text>
      <Text style={styles.subtitle}>
        Switch on your location to stay in tune with what’s happening in your area
      </Text>

      <Text style={styles.label}>Your Zone</Text>
      <TextInput
        value={zone}
        onChangeText={setZone}
        placeholder="Types of your zone"
        style={styles.input}
      />

      <Text style={styles.label}>Your Area</Text>
      <TextInput
        value={area}
        onChangeText={setArea}
        placeholder="Types of your area"
        placeholderTextColor="#B1B1B1"
        style={styles.input}
      />

      <PrimaryButton title="Submit" onPress={onSubmit} style={styles.submitBtn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCFCFC', paddingHorizontal: 24, paddingTop: 16 },
  back: { width: 36, height: 36, justifyContent: 'center' },
  backIcon: { fontSize: 30, color: '#181725' },
  mapBadge: { alignItems: 'center', marginTop: 12 },
  mapIcon: { fontSize: 84 },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: '#181725',
    textAlign: 'center',
    marginTop: 22,
  },
  subtitle: {
    fontSize: 14,
    color: '#7C7C7C',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 32,
  },
  label: { fontSize: 15, color: '#7C7C7C', fontWeight: '500', marginTop: 14 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 10,
    fontSize: 16,
    color: '#181725',
  },
  submitBtn: { marginTop: 36 },
});