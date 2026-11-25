import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';

export const OnboardingScreen: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900',
      }}
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <Text style={styles.carrot}>🥕</Text>
        <Text style={styles.title}>Welcome{'\n'}to our store</Text>
        <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>
        <PrimaryButton title="Get Started" onPress={onGetStarted} style={styles.btn} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 20, 0.45)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingBottom: 44,
  },
  carrot: { fontSize: 40, marginBottom: 12 },
  title: {
    fontSize: 40,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 46,
  },
  subtitle: { fontSize: 15, color: '#E5E7EB', marginTop: 10, marginBottom: 28, textAlign: 'center' },
  btn: { marginBottom: 8 },
});