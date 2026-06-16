import { useRouter } from 'expo-router';
import { ArrowRight, CheckCircle } from 'phosphor-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/pdf-unlocker/AppHeader';
import { ScreenScroll } from '@/components/pdf-unlocker/ScreenScroll';
import { radius, screen, spacing, textSpacing } from '@/constants/theme';
import { useAppTheme } from '@/contexts/theme-context';

export default function HomeTabScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      <AppHeader title="PDF Unlocker" subtitle="Unlock files in seconds" />
      <ScreenScroll>
        <View style={[styles.heroCard, { borderColor: theme.border, backgroundColor: theme.card }]}>
          <View style={styles.heroTextGroup}>
            <Text style={[styles.heroTitle, { color: theme.foreground }]}>Unlock password-protected PDFs</Text>
            <Text style={[styles.heroDesc, { color: theme.mutedForeground }]}>
              Files stay on your device. No signup. No waiting.
            </Text>
          </View>
          <Pressable
            style={[styles.primaryAction, { backgroundColor: theme.primary }]}
            onPress={() => router.push('/(tabs)/unlock')}
            testID="home-go-unlock"
          >
            <Text style={[styles.primaryActionText, { color: theme.primaryForeground }]}>Start Unlocking</Text>
            <ArrowRight size={16} color={theme.primaryForeground} weight="bold" />
          </Pressable>
        </View>

        <View style={[styles.benefitCard, { borderColor: theme.border, backgroundColor: theme.card }]}>
          <CheckCircle size={16} color={theme.success} weight="fill" />
          <Text style={[styles.benefitText, { color: theme.foreground }]}>Direct download to mobile</Text>
        </View>
        <View style={[styles.benefitCard, { borderColor: theme.border, backgroundColor: theme.card }]}>
          <CheckCircle size={16} color={theme.success} weight="fill" />
          <Text style={[styles.benefitText, { color: theme.foreground }]}>No file storage on servers</Text>
        </View>
        <Pressable
          style={[styles.quickAction, { borderColor: theme.border, backgroundColor: theme.card }]}
          onPress={() => router.push('/(tabs)/learn')}
        >
          <View style={styles.quickTextGroup}>
            <Text style={[styles.quickTitle, { color: theme.foreground }]}>How it works</Text>
            <Text style={[styles.quickDesc, { color: theme.mutedForeground }]}>See the process and features</Text>
          </View>
        </Pressable>
      </ScreenScroll>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: screen.cardRadius,
    padding: screen.cardPadding,
    gap: textSpacing.section,
  },
  heroTextGroup: {
    gap: textSpacing.titleToBody,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  heroDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  primaryAction: {
    minHeight: 46,
    borderRadius: radius.md,
    paddingHorizontal: screen.cardPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  primaryActionText: {
    fontSize: 15,
    fontWeight: '700',
  },
  benefitCard: {
    borderWidth: 1,
    borderRadius: screen.cardRadius,
    minHeight: 42,
    padding: screen.cardPadding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  benefitText: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickAction: {
    borderWidth: 1,
    borderRadius: screen.cardRadius,
    padding: screen.cardPadding,
  },
  quickTextGroup: {
    gap: textSpacing.titleToBody,
  },
  quickTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  quickDesc: {
    fontSize: 14,
  },
});
