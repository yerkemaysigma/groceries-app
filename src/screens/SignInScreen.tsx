import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';

interface Props {
  phone: string;
  onPressPhone: () => void;
  onSocialSuccess: () => void;
  onGoLogin: () => void;
}

export const SignInScreen: React.FC<Props> = ({
  phone,
  onPressPhone,
  onSocialSuccess,
  onGoLogin,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900',
        }}
        style={styles.topImage}
      />
      <View style={styles.body}>
        <Text style={styles.heading}>Get your groceries{'\n'}with nectar</Text>

        <TouchableOpacity style={styles.phoneRow} onPress={onPressPhone}>
          <Text style={styles.flag}>🇧🇩</Text>
          <Text style={styles.phoneText}>{phone}</Text>
        </TouchableOpacity>

        <Text style={styles.socialHint}>Or connect with social media</Text>

        <PrimaryButton
          title="G   Continue with Google"
          backgroundColor="#5383EC"
          onPress={onSocialSuccess}
          style={styles.socialBtn}
        />
        <PrimaryButton
          title="f   Continue with Facebook"
          backgroundColor="#4A66AC"
          onPress={onSocialSuccess}
        />

        <TouchableOpacity onPress={onGoLogin} style={styles.loginLink}>
          <Text style={styles.loginLinkText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCFCFC' },
  topImage: { width: '100%', height: 210 },
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 22 },
  heading: { fontSize: 25, fontWeight: '600', color: '#181725', lineHeight: 33 },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 14,
    marginTop: 14,
  },
  flag: { fontSize: 20 },
  phoneText: { fontSize: 17, color: '#181725', fontWeight: '500' },
  socialHint: {
    textAlign: 'center',
    color: '#828282',
    fontSize: 13,
    marginTop: 26,
    marginBottom: 18,
  },
  socialBtn: { marginBottom: 16 },
  loginLink: { marginTop: 18, alignItems: 'center' },
  loginLinkText: { color: '#53B175', fontWeight: '600', fontSize: 14 },
});