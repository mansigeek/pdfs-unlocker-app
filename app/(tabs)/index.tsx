import { useRouter } from 'expo-router';
import {
  ArrowRight,
  CloudSlash,
  DeviceMobile,
  FilePdf,
  LockKeyOpen,
  ShieldCheck,
} from 'phosphor-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/pdf-unlocker/AppHeader';
import { ScreenScroll } from '@/components/pdf-unlocker/ScreenScroll';
import { radius, screen, spacing, textSpacing } from '@/constants/theme';
import { useAppTheme } from '@/contexts/theme-context';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Private by design',
    desc: 'Your PDF is processed in memory on this device only.',
  },
  {
    icon: DeviceMobile,
    title: 'Direct download',
    desc: 'Save the unlocked file straight to your phone.',
  },
  {
    icon: CloudSlash,
    title: 'No cloud storage',
    desc: 'We never upload or keep copies of your documents.',
  },
] as const;

const STEPS = [
  { label: 'Upload', desc: 'Select your PDF' },
  { label: 'Unlock', desc: 'Enter the password' },
  { label: 'Download', desc: 'Save the file' },
] as const;

export default function HomeTabScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      <AppHeader />
      <ScreenScroll contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <View style={[styles.badge, { backgroundColor: `${theme.primary}14` }]}>
            <ShieldCheck size={13} color={theme.primary} weight="fill" />
            <Text style={[styles.badgeText, { color: theme.primary }]}>On-device processing</Text>
          </View>

          <Text style={[styles.headline, { color: theme.foreground }]}>
            Remove PDF passwords{' '}
            <Text style={{ color: theme.primary }}>securely</Text>
          </Text>

          <Text style={[styles.heroDesc, { color: theme.mutedForeground }]}>
            Unlock protected documents without sending them to a server. Free to use, no signup required.
          </Text>

          <View style={styles.visualRow}>
            <View style={[styles.visualCard, { borderColor: theme.border, backgroundColor: theme.card }]}>
              <FilePdf size={28} color={theme.primary} weight="duotone" />
              <Text style={[styles.visualLabel, { color: theme.mutedForeground }]}>Locked</Text>
            </View>
            <View style={[styles.visualLine, { backgroundColor: theme.border }]} />
            <View style={[styles.visualCard, { borderColor: theme.border, backgroundColor: theme.card }]}>
              <LockKeyOpen size={28} color={theme.primary} weight="duotone" />
              <Text style={[styles.visualLabel, { color: theme.mutedForeground }]}>Unlocked</Text>
            </View>
          </View>

          <Pressable
            style={[styles.primaryAction, { backgroundColor: theme.primary }]}
            onPress={() => router.push('/(tabs)/unlock')}
            testID="home-go-unlock"
          >
            <Text style={[styles.primaryActionText, { color: theme.primaryForeground }]}>Unlock Your PDF</Text>
            <ArrowRight size={16} color={theme.primaryForeground} weight="bold" />
          </Pressable>
        </View>

        <View style={[styles.panel, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.panelEyebrow, { color: theme.primary }]}>Benefits</Text>
          <Text style={[styles.panelTitle, { color: theme.foreground }]}>Built for privacy</Text>
          <View style={styles.featureList}>
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <View
                  key={feature.title}
                  style={[
                    styles.featureRow,
                    index < FEATURES.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: theme.border,
                    },
                  ]}
                >
                  <View style={[styles.featureIcon, { backgroundColor: `${theme.primary}12` }]}>
                    <Icon size={18} color={theme.primary} weight="duotone" />
                  </View>
                  <View style={styles.featureCopy}>
                    <Text style={[styles.featureTitle, { color: theme.foreground }]}>{feature.title}</Text>
                    <Text style={[styles.featureDesc, { color: theme.mutedForeground }]}>{feature.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <Pressable
          style={[styles.panel, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => router.push('/(tabs)/learn')}
        >
          <View style={styles.howHeader}>
            <View style={styles.howTextGroup}>
              <Text style={[styles.panelEyebrow, { color: theme.primary }]}>Process</Text>
              <Text style={[styles.panelTitle, { color: theme.foreground }]}>How it works</Text>
            </View>
            <ArrowRight size={18} color={theme.mutedForeground} weight="bold" />
          </View>

          <View style={styles.stepsRow}>
            {STEPS.map((step, index) => (
              <React.Fragment key={step.label}>
                <View style={styles.step}>
                  <View style={[styles.stepDot, { backgroundColor: theme.primary }]}>
                    <Text style={[styles.stepNum, { color: theme.primaryForeground }]}>{index + 1}</Text>
                  </View>
                  <Text style={[styles.stepLabel, { color: theme.foreground }]}>{step.label}</Text>
                  <Text style={[styles.stepDesc, { color: theme.mutedForeground }]}>{step.desc}</Text>
                </View>
                {index < STEPS.length - 1 ? (
                  <View style={styles.stepArrow}>
                    <ArrowRight size={14} color={theme.mutedForeground} weight="bold" />
                  </View>
                ) : null}
              </React.Fragment>
            ))}
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
  scrollContent: {
    gap: spacing.lg,
  },
  hero: {
    gap: textSpacing.section,
    paddingTop: spacing.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  heroDesc: {
    fontSize: 15,
    lineHeight: 22,
  },
  visualRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  visualCard: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  visualLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  visualLine: {
    width: 24,
    height: 2,
    borderRadius: 1,
  },
  primaryAction: {
    minHeight: 48,
    borderRadius: radius.md,
    paddingHorizontal: screen.cardPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  primaryActionText: {
    fontSize: 15,
    fontWeight: '700',
  },
  panel: {
    borderWidth: 1,
    borderRadius: screen.cardRadius,
    padding: screen.cardPadding,
    gap: textSpacing.block,
  },
  panelEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  featureList: {
    marginTop: spacing.xs,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm + 4,
    paddingVertical: spacing.sm + 4,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureCopy: {
    flex: 1,
    gap: 2,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  featureDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  howHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  howTextGroup: {
    gap: textSpacing.titleToBody,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing.sm,
  },
  step: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  stepArrow: {
    marginTop: 5,
    paddingHorizontal: 2,
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    fontSize: 12,
    fontWeight: '800',
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  stepDesc: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 15,
  },
});
