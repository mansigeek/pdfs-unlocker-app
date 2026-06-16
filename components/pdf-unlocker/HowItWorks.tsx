import {
  DownloadSimple,
  LockKey,
  UploadSimple,
} from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import { radius, screen, spacing, textSpacing } from '@/constants/theme';

const STEP_MARKER = 32;
const STEP_GAP = spacing.sm + 4;

const STEPS = [
  {
    icon: UploadSimple,
    title: 'Upload your PDF',
    desc: 'Select a password-protected file from your device. Only .pdf files up to 5 MB are supported.',
  },
  {
    icon: LockKey,
    title: 'Enter the password',
    desc: 'Type the password used to protect the document. It is used once in memory and never stored.',
  },
  {
    icon: DownloadSimple,
    title: 'Download the result',
    desc: 'Receive a clean, unlocked copy saved directly to your phone. Nothing is kept on our servers.',
  },
] as const;

export function HowItWorks() {
  const { theme } = useAppTheme();

  return (
    <View testID="how-it-works-section" style={styles.section}>
      <View style={[styles.badge, { backgroundColor: `${theme.primary}14` }]}>
        <Text style={[styles.badgeText, { color: theme.primary }]}>How it works</Text>
      </View>

      <Text style={[styles.headline, { color: theme.foreground }]}>
        Unlock any PDF in three steps
      </Text>
      <Text style={[styles.intro, { color: theme.mutedForeground }]}>
        A fast, private workflow designed to keep your documents on your device from start to finish.
      </Text>

      <View style={[styles.panel, { backgroundColor: theme.card, borderColor: theme.border }]}>
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === STEPS.length - 1;

          return (
            <View
              key={step.title}
              style={[
                styles.stepBlock,
                !isLast && { borderBottomWidth: 1, borderBottomColor: theme.border, paddingBottom: spacing.md, marginBottom: spacing.md },
              ]}
            >
              <View style={styles.stepHeader}>
                <View style={styles.timelineCol}>
                  <View style={[styles.stepDot, { backgroundColor: theme.primary }]}>
                    <Text
                      style={[styles.stepNum, { color: theme.primaryForeground }]}
                      includeFontPadding={false}
                    >
                      {index + 1}
                    </Text>
                  </View>
                </View>

                <View style={[styles.iconWrap, { backgroundColor: `${theme.primary}12` }]}>
                  <Icon size={20} color={theme.primary} weight="duotone" />
                </View>

                <Text style={[styles.stepTitle, { color: theme.foreground }]} includeFontPadding={false}>
                  {step.title}
                </Text>
              </View>

              <Text style={[styles.stepDesc, { color: theme.mutedForeground }]}>{step.desc}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: textSpacing.section,
  },
  badge: {
    alignSelf: 'flex-start',
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
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.6,
    lineHeight: 32,
  },
  intro: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: -spacing.sm,
  },
  panel: {
    borderWidth: 1,
    borderRadius: screen.cardRadius,
    padding: screen.cardPadding,
    marginTop: spacing.xs,
  },
  stepBlock: {
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: STEP_GAP,
  },
  timelineCol: {
    width: STEP_MARKER,
    alignItems: 'center',
  },
  stepDot: {
    width: STEP_MARKER,
    height: STEP_MARKER,
    borderRadius: STEP_MARKER / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 16,
    textAlign: 'center',
  },
  iconWrap: {
    width: STEP_MARKER,
    height: STEP_MARKER,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    lineHeight: 20,
  },
  stepDesc: {
    marginTop: spacing.sm,
    marginLeft: STEP_MARKER * 2 + STEP_GAP * 2,
    fontSize: 13,
    lineHeight: 19,
  },
});
