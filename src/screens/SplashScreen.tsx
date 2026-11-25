import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const SplashScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.95} onPress={onNext}>
      <View style={styles.row}>
        <Text style={styles.carrot}>🥕</Text>
        <View>
          <Text style={styles.brand}>nectar</Text>
          <Text style={styles.tagline}>online groceries</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53B175',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  carrot: { fontSize: 46, transform: [{ rotate: '-20deg' }] },
  brand: { fontSize: 42, fontWeight: '700', color: '#FFFFFF', letterSpacing: 1 },
  tagline: { fontSize: 12, color: '#E8F8EE', letterSpacing: 3, textTransform: 'lowercase' },
});