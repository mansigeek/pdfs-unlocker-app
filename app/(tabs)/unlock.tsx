import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/pdf-unlocker/AppHeader';
import { ScreenScroll } from '@/components/pdf-unlocker/ScreenScroll';
import { ToolSection } from '@/components/pdf-unlocker/ToolSection';
import { useAppTheme } from '@/contexts/theme-context';

export default function UnlockTabScreen() {
  const { theme } = useAppTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      <AppHeader />
      <ScreenScroll style={{ backgroundColor: theme.background }} keyboardShouldPersistTaps="handled">
        <ToolSection />
      </ScreenScroll>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
});
