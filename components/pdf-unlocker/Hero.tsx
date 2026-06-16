import { FilePdf, LockKeyOpen, ShieldCheck } from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/Button';
import { radius, spacing } from '@/constants/theme';

type HeroProps = {
  onScrollToTool: () => void;
};

export function Hero({ onScrollToTool }: HeroProps) {
  const { theme } = useAppTheme();

  const stats: [string, string][] = [
    ['100%', 'Secure'],
    ['0', 'Stored'],
    ['∞', 'Uses'],
  ];

  return (
    <View
      testID="hero-section"
      style={[styles.section, { borderBottomColor: theme.border, backgroundColor: theme.background }]}
    >
      <View style={[styles.grid, { borderColor: `${theme.border}99` }]} />

      <View style={styles.badge}>
        <ShieldCheck size={14} color={theme.primary} weight="fill" />
        <Text style={[styles.badgeText, { color: theme.primary }]}>Private • In-memory</Text>
      </View>

      <Text style={[styles.heading, { color: theme.foreground }]}>
        Unlock Any PDF <Text style={{ color: theme.primary }}>Instantly</Text>.
      </Text>

      <Text style={[styles.subtitle, { color: theme.mutedForeground }]}>
        Remove passwords and restrictions from PDF files right on your device. Your file never touches
        a server. Free forever, no account needed.
      </Text>

      <View style={styles.ctaRow}>
        <Button onPress={onScrollToTool} testID="hero-upload-cta" style={styles.ctaBtn}>
          Upload PDF ↓
        </Button>
        <Text style={[styles.ctaNote, { color: theme.mutedForeground }]}>
          Free · Unlimited · No signup
        </Text>
      </View>

      <View style={[styles.stats, { borderTopColor: theme.border }]}>
        {stats.map(([k, v]) => (
          <View key={v} style={styles.stat}>
            <Text style={[styles.statValue, { color: theme.foreground }]}>{k}</Text>
            <Text style={[styles.statLabel, { color: theme.mutedForeground }]}>{v}</Text>
          </View>
        ))}
      </View>

      <View style={styles.illustration}>
        <View style={[styles.pdfCard, { borderColor: theme.border, backgroundColor: theme.card }]}>
          <FilePdf size={36} color={theme.primary} weight="duotone" />
          <View style={styles.lines}>
            <View style={[styles.line, { backgroundColor: theme.muted }]} />
            <View style={[styles.lineShort, { backgroundColor: theme.muted }]} />
            <View style={[styles.lineShorter, { backgroundColor: theme.muted }]} />
          </View>
          <Text style={[styles.pdfName, { color: theme.mutedForeground }]}>document.pdf</Text>
        </View>
        <View style={[styles.lockCircle, { borderColor: theme.border, backgroundColor: theme.background }]}>
          <LockKeyOpen size={40} color={theme.primary} weight="duotone" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.25,
    borderWidth: 0,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0,85,255,0.06)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  heading: {
    marginTop: spacing.lg,
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1.2,
    lineHeight: 38,
  },
  subtitle: {
    marginTop: spacing.md,
    fontSize: 16,
    lineHeight: 24,
  },
  ctaRow: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  ctaBtn: {
    alignSelf: 'flex-start',
    minHeight: 48,
    paddingHorizontal: spacing.lg,
  },
  ctaNote: {
    fontSize: 14,
  },
  stats: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  illustration: {
    marginTop: spacing.xl,
    alignItems: 'center',
    minHeight: 200,
    justifyContent: 'center',
  },
  pdfCard: {
    width: 160,
    height: 200,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    transform: [{ rotate: '-6deg' }],
  },
  lines: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  line: { height: 6, borderRadius: 3, width: '100%' },
  lineShort: { height: 6, borderRadius: 3, width: '75%' },
  lineShorter: { height: 6, borderRadius: 3, width: '50%' },
  pdfName: {
    marginTop: 'auto',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  lockCircle: {
    position: 'absolute',
    right: 24,
    top: 8,
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
