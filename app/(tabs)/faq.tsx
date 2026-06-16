import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/pdf-unlocker/AppHeader';
import { Faq } from '@/components/pdf-unlocker/Faq';
import { ScreenScroll } from '@/components/pdf-unlocker/ScreenScroll';
import { spacing } from '@/constants/theme';
import { useAppTheme } from '@/contexts/theme-context';

export default function FaqTabScreen() {
  const { theme } = useAppTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      <AppHeader />
      <ScreenScroll contentContainerStyle={styles.scrollContent}>
        <Faq />
      </ScreenScroll>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scrollContent: {
    gap: spacing.lg,
  },
});
