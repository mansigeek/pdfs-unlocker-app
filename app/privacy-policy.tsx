import { Stack } from 'expo-router';
import {
  Database,
  Files,
  Info,
  LockKey,
  ShieldCheck,
} from 'phosphor-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/pdf-unlocker/AppHeader';
import { LegalScreen } from '@/components/pdf-unlocker/LegalScreen';
import { ScreenScroll } from '@/components/pdf-unlocker/ScreenScroll';
import { spacing } from '@/constants/theme';
import { useAppTheme } from '@/contexts/theme-context';

export default function PrivacyPolicyScreen() {
  const { theme } = useAppTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ headerShown: false }} />
      <AppHeader />
      <ScreenScroll contentContainerStyle={styles.scrollContent}>
        <LegalScreen
          badge="Legal"
          title="Privacy Policy"
          intro="Your files are processed locally on your device. This policy explains what information we use and how we protect it."
          sections={[
            {
              icon: Files,
              heading: '1. Information We Collect',
              body: 'Your PDF files and passwords are processed on-device. We do not upload, store, or transmit your files to external servers.',
            },
            {
              icon: Database,
              heading: '2. Local Storage',
              body: 'We may store basic app preferences like theme mode on your device. This data stays local and is never shared.',
            },
            {
              icon: ShieldCheck,
              heading: '3. Third-Party Services',
              body: 'We do not sell or transfer personally identifiable information. Core unlocking functionality runs without third-party processing APIs.',
            },
            {
              icon: Info,
              heading: '4. Policy Updates',
              body: 'We may update this policy over time. Any revision will be reflected on this page as the latest version.',
            },
            {
              icon: LockKey,
              heading: '5. Contact',
              body: 'If you have privacy-related questions, contact our support team using the email below.',
            },
          ]}
        />
      </ScreenScroll>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scrollContent: { gap: spacing.lg },
});
