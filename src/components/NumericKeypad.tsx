import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
}

const ROWS = [
  [
    { num: '1', sub: '' },
    { num: '2', sub: 'ABC' },
    { num: '3', sub: 'DEF' },
  ],
  [
    { num: '4', sub: 'GHI' },
    { num: '5', sub: 'JKL' },
    { num: '6', sub: 'MNO' },
  ],
  [
    { num: '7', sub: 'PQRS' },
    { num: '8', sub: 'TUV' },
    { num: '9', sub: 'WXYZ' },
  ],
];

export const NumericKeypad: React.FC<Props> = ({ onKeyPress, onBackspace }) => {
  return (
    <View style={styles.pad}>
      {ROWS.map((row, idx) => (
        <View key={idx} style={styles.row}>
          {row.map((item) => (
            <TouchableOpacity
              key={item.num}
              style={styles.key}
              onPress={() => onKeyPress(item.num)}
            >
              <Text style={styles.num}>{item.num}</Text>
              {!!item.sub && <Text style={styles.sub}>{item.sub}</Text>}
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <View style={styles.row}>
        <View style={styles.emptyKey} />
        <TouchableOpacity style={styles.key} onPress={() => onKeyPress('0')}>
          <Text style={styles.num}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.key} onPress={onBackspace}>
          <Text style={styles.backspace}>⌫</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pad: {
    backgroundColor: '#D1D5DB',
    paddingTop: 8,
    paddingBottom: 14,
    paddingHorizontal: 8,
    gap: 8,
  },
  row: { flexDirection: 'row', gap: 8 },
  key: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyKey: { flex: 1, height: 48 },
  num: { fontSize: 21, fontWeight: '500', color: '#111827' },
  sub: { fontSize: 9, fontWeight: '700', color: '#374151', letterSpacing: 1 },
  backspace: { fontSize: 18, color: '#111827' },
});