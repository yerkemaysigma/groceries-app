import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const PrimaryButton: React.FC<Props> = ({
  title,
  onPress,
  backgroundColor = '#53B175',
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.btn, { backgroundColor }, style]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 60,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: '#FFF9FF',
    fontSize: 17,
    fontWeight: '600',
  },
});