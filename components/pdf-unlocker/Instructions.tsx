import { CheckCircle, Warning } from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import { SectionHeader } from '@/components/pdf-unlocker/SectionHeader';
import { radius, screen, spacing, textSpacing } from '@/constants/theme';

const steps = [
  'Tap Upload PDF or select a PDF from the picker.',
  'If the PDF is protected, enter the correct owner/user password.',
  'Press Unlock PDF and wait a moment. Most files finish in under 2 seconds.',
  'Tap Download unlocked PDF to save the file locally.',
  'Hit Unlock another file to repeat. There are no limits.',
];

const tips = [
  'The password must match the one used when the PDF was originally protected.',
  'Supported format: .pdf only. Max file size: 5 MB.',
  'Some PDFs restrict printing/copying with the same password. Both restrictions are removed when you unlock PDF.',
  'If the unlock fails, double-check your password and try again.',
];

export function Instructions() {
  const { theme } = useAppTheme();

  return (
    <View
      testID="instructions-section"
      style={[styles.section, { borderBottomColor: theme.border, backgroundColor: `${theme.muted}80` }]}
    >
      <SectionHeader eyebrow="Instructions" title="Step-by-step guide" />

      <View style={styles.steps}>
        {steps.map((s, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={[styles.stepNum, { borderColor: theme.border, backgroundColor: theme.background }]}>
              <Text style={[styles.stepNumText, { color: theme.foreground }]}>{i + 1}</Text>
            </View>
            <Text style={[styles.stepText, { color: theme.foreground }]}>{s}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tipsHeader}>
        <SectionHeader eyebrow="Good to know" title="Tips & limitations" />
      </View>

      <View style={styles.tips}>
        {tips.map((t, i) => (
          <View
            key={i}
            style={[styles.tipCard, { borderColor: theme.border, backgroundColor: theme.card }]}
          >
            {i === tips.length - 1 ? (
              <Warning size={20} color={theme.primary} weight="duotone" />
            ) : (
              <CheckCircle size={20} color={theme.primary} weight="duotone" />
            )}
            <Text style={[styles.tipText, { color: theme.foreground }]}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingBottom: screen.paddingBottom,
  },
  steps: {
    gap: textSpacing.block,
    marginBottom: textSpacing.section,
  },
  stepRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  stepNum: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    fontSize: 14,
    fontWeight: '800',
  },
  stepText: {
    flex: 1,
    paddingTop: 4,
    fontSize: 14,
    lineHeight: 22,
  },
  tipsHeader: {
    marginTop: textSpacing.section,
  },
  tips: {
    gap: textSpacing.block,
  },
  tipCard: {
    flexDirection: 'row',
    gap: spacing.sm + 4,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
});
