import {
  DownloadSimple,
  LockKey,
  UploadSimple,
} from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import { SectionHeader } from '@/components/pdf-unlocker/SectionHeader';
import { radius, screen, textSpacing } from '@/constants/theme';

const steps = [
  {
    icon: UploadSimple,
    title: 'Upload your locked PDF',
    desc: 'Select your password-protected PDF from your device. Our online PDF unlocker tool accepts any encrypted PDF instantly.',
  },
  {
    icon: LockKey,
    title: 'Enter password',
    desc: 'Provide the current password for the PDF. Your password is used once and immediately discarded. We never store or log it.',
  },
  {
    icon: DownloadSimple,
    title: 'Download unlocked PDF',
    desc: 'We decrypt on your device and save a clean, unlocked PDF. No storage, no trace. Just a ready-to-use file.',
  },
];

export function HowItWorks() {
  const { theme } = useAppTheme();

  return (
    <View
      testID="how-it-works-section"
      style={[styles.section, { borderBottomColor: theme.border, backgroundColor: theme.background }]}
    >
      <SectionHeader
        eyebrow="How it works"
        title="Three steps. Under ten seconds."
      />

      <View style={styles.grid}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <View key={step.title} style={styles.step}>
              <View style={[styles.iconWrap, { backgroundColor: `${theme.primary}1A` }]}>
                <Icon size={24} color={theme.primary} weight="duotone" />
              </View>
              <Text style={[styles.stepNum, { color: theme.primary }]}>Step {idx + 1}</Text>
              <Text style={[styles.stepTitle, { color: theme.foreground }]}>{step.title}</Text>
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
    paddingBottom: screen.paddingBottom,
    borderBottomWidth: 1,
  },
  grid: {
    gap: textSpacing.section,
    marginTop: textSpacing.block,
  },
  step: {
    gap: textSpacing.block,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  stepDesc: {
    fontSize: 14,
    lineHeight: 22,
  },
});
