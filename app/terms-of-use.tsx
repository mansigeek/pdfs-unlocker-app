import { Stack } from 'expo-router';
import {
  FileText,
  Gauge,
  Gavel,
  Info,
  LockKey,
} from 'phosphor-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/pdf-unlocker/AppHeader';
import { LegalScreen } from '@/components/pdf-unlocker/LegalScreen';
import { ScreenScroll } from '@/components/pdf-unlocker/ScreenScroll';
import { spacing } from '@/constants/theme';
import { useAppTheme } from '@/contexts/theme-context';

export default function TermsOfUseScreen() {
  const { theme } = useAppTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ headerShown: false }} />
      <AppHeader />
      <ScreenScroll contentContainerStyle={styles.scrollContent}>
        <LegalScreen
          badge="Legal"
          title="Terms of Use"
          intro="By using PDF Unlocker, you agree to these terms. They define acceptable use and key legal limitations."
          sections={[
            {
              icon: FileText,
              heading: '1. Use License',
              body: 'You may use PDF Unlocker for personal, non-commercial use. Modifying materials, reverse engineering, or unauthorized distribution is not permitted.',
            },
            {
              icon: Info,
              heading: '2. Disclaimer',
              body: 'The app is provided "as is" without implied warranties, including merchantability, fitness for a specific purpose, or non-infringement.',
            },
            {
              icon: Gavel,
              heading: '3. Legal Responsibility',
              body: 'You are responsible for lawful use and must have the legal right to unlock and process the files you submit.',
            },
            {
              icon: Gauge,
              heading: '4. Limitations',
              body: 'PDF Unlocker is not liable for damages arising from use or inability to use the service.',
            },
            {
              icon: LockKey,
              heading: '5. Revisions',
              body: 'These terms may be updated from time to time. Continued use means you accept the current version.',
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
