import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/pdf-unlocker/AppHeader';
import { HowItWorks } from '@/components/pdf-unlocker/HowItWorks';
import { Instructions } from '@/components/pdf-unlocker/Instructions';
import { ScreenScroll } from '@/components/pdf-unlocker/ScreenScroll';
import { useAppTheme } from '@/contexts/theme-context';

export default function LearnTabScreen() {
  const { theme } = useAppTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      <AppHeader title="Learn" subtitle="How unlocking works" />
      <ScreenScroll>
        <HowItWorks />
        <Instructions />
      </ScreenScroll>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
});
