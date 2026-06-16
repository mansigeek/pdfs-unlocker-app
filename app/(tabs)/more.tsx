import { useRouter } from 'expo-router';
import { CaretRight } from 'phosphor-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/pdf-unlocker/AppHeader';
import { ScreenScroll } from '@/components/pdf-unlocker/ScreenScroll';
import { SUPPORT_EMAIL } from '@/constants/config';
import { screen, textSpacing } from '@/constants/theme';
import { useAppTheme } from '@/contexts/theme-context';

export default function MoreTabScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      <AppHeader title="More" subtitle="Settings and legal" />
      <ScreenScroll>
        <Text style={[styles.sectionTitle, { color: theme.foreground }]}>App settings</Text>
        <Pressable
          onPress={() => router.push('/privacy-policy')}
          style={[styles.rowButton, { borderColor: theme.border, backgroundColor: theme.card }]}
        >
          <Text style={[styles.rowText, { color: theme.foreground }]}>Privacy Policy</Text>
          <CaretRight size={16} color={theme.mutedForeground} />
        </Pressable>
        <Pressable
          onPress={() => router.push('/terms-of-use')}
          style={[styles.rowButton, { borderColor: theme.border, backgroundColor: theme.card }]}
        >
          <Text style={[styles.rowText, { color: theme.foreground }]}>Terms of Use</Text>
          <CaretRight size={16} color={theme.mutedForeground} />
        </Pressable>
        <View style={[styles.supportCard, { borderColor: theme.border, backgroundColor: theme.card }]}>
          <Text style={[styles.supportTitle, { color: theme.foreground }]}>Support</Text>
          <Text style={[styles.supportText, { color: theme.mutedForeground }]}>{SUPPORT_EMAIL}</Text>
        </View>
      </ScreenScroll>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  rowButton: {
    borderWidth: 1,
    borderRadius: screen.cardRadius,
    minHeight: 48,
    paddingHorizontal: screen.cardPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: {
    fontSize: 15,
    fontWeight: '600',
  },
  supportCard: {
    borderWidth: 1,
    borderRadius: screen.cardRadius,
    padding: screen.cardPadding,
    gap: textSpacing.titleToBody,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  supportText: {
    fontSize: 14,
  },
});
