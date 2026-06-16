import { CheckCircle, Info, Warning } from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import { radius, screen, spacing, textSpacing } from '@/constants/theme';

const GUIDE_MARKER = 24;
const ROW_GAP = spacing.sm + 4;

const GUIDE_STEPS = [
  'Open the Unlock tab and tap Choose PDF File.',
  'If the file is protected, enter the correct password.',
  'Tap Unlock PDF and wait a moment for processing.',
  'Download the unlocked file to your device.',
  'Use Unlock another file to process more documents.',
] as const;

const TIPS = [
  {
    icon: CheckCircle,
    title: 'Correct password required',
    desc: 'The password must match the one used when the PDF was originally protected.',
  },
  {
    icon: Info,
    title: 'File requirements',
    desc: 'Supported format: .pdf only. Maximum file size is 5 MB.',
  },
  {
    icon: CheckCircle,
    title: 'Restrictions removed',
    desc: 'Printing and copying limits are lifted along with the password when you unlock.',
  },
  {
    icon: Warning,
    title: 'Troubleshooting',
    desc: 'If unlocking fails, double-check your password and try again with a smaller file.',
  },
] as const;

export function Instructions() {
  const { theme } = useAppTheme();

  return (
    <View testID="instructions-section" style={styles.section}>
      <View style={[styles.panel, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.panelEyebrow, { color: theme.primary }]}>Guide</Text>
        <Text style={[styles.panelTitle, { color: theme.foreground }]}>Quick start</Text>

        <View style={styles.guideList}>
          {GUIDE_STEPS.map((step, index) => (
            <View
              key={step}
              style={[
                styles.guideRow,
                index < GUIDE_STEPS.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: theme.border,
                },
              ]}
            >
              <View style={[styles.guideNum, { backgroundColor: `${theme.primary}12` }]}>
                <Text style={[styles.guideNumText, { color: theme.primary }]} includeFontPadding={false}>
                  {index + 1}
                </Text>
              </View>
              <Text style={[styles.guideText, { color: theme.foreground }]} includeFontPadding={false}>
                {step}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.panel, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.panelEyebrow, { color: theme.primary }]}>Good to know</Text>
        <Text style={[styles.panelTitle, { color: theme.foreground }]}>Tips & limitations</Text>

        <View style={styles.tipList}>
          {TIPS.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <View
                key={tip.title}
                style={[
                  styles.tipRow,
                  index < TIPS.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                  },
                ]}
              >
                <View style={[styles.tipIcon, { backgroundColor: `${theme.primary}12` }]}>
                  <Icon size={18} color={theme.primary} weight="duotone" />
                </View>
                <View style={styles.tipCopy}>
                  <Text style={[styles.tipTitle, { color: theme.foreground }]}>{tip.title}</Text>
                  <Text style={[styles.tipDesc, { color: theme.mutedForeground }]}>{tip.desc}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.lg,
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
  guideList: {
    marginTop: spacing.xs,
  },
  guideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ROW_GAP,
    paddingVertical: spacing.sm + 4,
  },
  guideNum: {
    width: GUIDE_MARKER,
    height: GUIDE_MARKER,
    borderRadius: GUIDE_MARKER / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideNumText: {
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 16,
    textAlign: 'center',
  },
  guideText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  tipList: {
    marginTop: spacing.xs,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: ROW_GAP,
    paddingVertical: spacing.sm + 4,
  },
  tipIcon: {
    width: GUIDE_MARKER + 8,
    height: GUIDE_MARKER + 8,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  tipCopy: {
    flex: 1,
    gap: 2,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  tipDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
});
