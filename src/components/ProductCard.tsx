import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  title: string;
  subtitle: string;
  price: string;
  imageUri: string;
}

export const ProductCard: React.FC<Props> = ({ title, subtitle, price, imageUri }) => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.price}>{price}</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setCount((c) => c + 1)}
          activeOpacity={0.85}
        >
          <Text style={styles.addText}>{count > 0 ? `${count}` : '+'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 173,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    backgroundColor: '#FFFFFF',
    padding: 14,
  },
  image: { width: '100%', height: 90, marginBottom: 12 },
  title: { fontSize: 15, fontWeight: '700', color: '#181725' },
  subtitle: { fontSize: 12, color: '#7C7C7C', marginTop: 3, marginBottom: 16 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 17, fontWeight: '700', color: '#181725' },
  addBtn: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: '#53B175',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: { color: '#FFFFFF', fontSize: 22, fontWeight: '500', lineHeight: 24 },
});