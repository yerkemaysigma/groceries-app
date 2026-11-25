import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenName } from './src/types';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { SignInScreen } from './src/screens/SignInScreen';
import { NumberScreen } from './src/screens/NumberScreen';
import { VerificationScreen } from './src/screens/VerificationScreen';
import { SelectLocationScreen } from './src/screens/SelectLocationScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { ProductCard } from './src/components/ProductCard';

const SCREENS: { key: ScreenName; label: string }[] = [
  { key: 'splash', label: 'Splash' },
  { key: 'onboarding', label: 'Onboard' },
  { key: 'signin', label: 'Sign In' },
  { key: 'number', label: 'Number' },
  { key: 'verification', label: 'Verify' },
  { key: 'location', label: 'Location' },
  { key: 'login', label: 'Log In' },
  { key: 'signup', label: 'Sign Up' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('splash');
  const [phone, setPhone] = useState('+880');
  const [showCardDemo, setShowCardDemo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen((prev) => (prev === 'splash' ? 'onboarding' : prev));
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onNext={() => setCurrentScreen('onboarding')} />;
      case 'onboarding':
        return <OnboardingScreen onGetStarted={() => setCurrentScreen('signin')} />;
      case 'signin':
        return (
          <SignInScreen
            phone={phone}
            onPressPhone={() => setCurrentScreen('number')}
            onSocialSuccess={() => setCurrentScreen('location')}
            onGoLogin={() => setCurrentScreen('login')}
          />
        );
      case 'number':
        return (
          <NumberScreen
            phone={phone}
            onChangePhone={setPhone}
            onBack={() => setCurrentScreen('signin')}
            onNext={() => setCurrentScreen('verification')}
          />
        );
      case 'verification':
        return (
          <VerificationScreen
            onBack={() => setCurrentScreen('number')}
            onNext={() => setCurrentScreen('location')}
          />
        );
      case 'location':
        return (
          <SelectLocationScreen
            onBack={() => setCurrentScreen('verification')}
            onSubmit={() => setCurrentScreen('login')}
          />
        );
      case 'login':
        return (
          <LoginScreen
            onGoSignUp={() => setCurrentScreen('signup')}
            onSuccess={() => setShowCardDemo(true)}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onGoLogin={() => setCurrentScreen('login')}
            onSuccess={() => setShowCardDemo(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Экрандар арасында жылдам ауысу панелі (әзірлеу кезінде ыңғайлы) */}
      <View style={styles.devBar}>
        {SCREENS.map((item) => {
          const active = currentScreen === item.key && !showCardDemo;
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.devPill, active && styles.devPillActive]}
              onPress={() => {
                setShowCardDemo(false);
                setCurrentScreen(item.key);
              }}
            >
              <Text style={[styles.devPillText, active && styles.devPillTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={[styles.devPill, showCardDemo && styles.devPillActive]}
          onPress={() => setShowCardDemo((v) => !v)}
        >
          <Text style={[styles.devPillText, showCardDemo && styles.devPillTextActive]}>Card</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.screenWrapper}>
        {showCardDemo ? (
          <View style={styles.cardDemoContainer}>
            <Text style={styles.cardDemoTitle}>Product Card үлгісі</Text>
            <ProductCard
              title="Organic Bananas"
              subtitle="7pcs, Priceg"
              price="$4.99"
              imageUri="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400"
            />
            <TouchableOpacity style={styles.backBtn} onPress={() => setShowCardDemo(false)}>
              <Text style={styles.backBtnText}>Экрандарға оралу</Text>
            </TouchableOpacity>
          </View>
        ) : (
          renderScreen()
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  devBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  devPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  devPillActive: { backgroundColor: '#53B175' },
  devPillText: { fontSize: 11, color: '#374151', fontWeight: '500' },
  devPillTextActive: { color: '#FFFFFF' },
  screenWrapper: { flex: 1 },
  cardDemoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    gap: 20,
  },
  cardDemoTitle: { fontSize: 18, fontWeight: '700', color: '#181725' },
  backBtn: {
    backgroundColor: '#53B175',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
  backBtnText: { color: '#FFF', fontWeight: '600' },
});