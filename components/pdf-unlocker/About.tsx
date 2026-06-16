import { ShieldCheck } from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import { SectionHeader } from '@/components/pdf-unlocker/SectionHeader';
import { radius, spacing } from '@/constants/theme';

export function About() {
  const { theme } = useAppTheme();

  return (
    <View
      testID="about-section"
      style={[styles.section, { borderBottomColor: theme.border, backgroundColor: theme.background }]}
    >
      <SectionHeader
        eyebrow="About"
        title="A simple tool built for a real problem."
      />

      <Text style={[styles.body, { color: theme.mutedForeground }]}>
        <Text style={{ fontWeight: '600', color: theme.foreground }}>PDF Unlocker</Text> is a free,
        browser-first utility that removes password protection from PDF files you already have permission
        to access. We made it because existing tools bury the core feature behind signups, quotas, or
        intrusive ads.
      </Text>
      <Text style={[styles.body, { color: theme.mutedForeground }]}>
        Every unlock happens right in your browser. Your document is never sent to a server, never saved
        to disk, never logged, and is cleared from memory the moment the process is done.
      </Text>

      <View style={[styles.callout, { borderColor: theme.border, backgroundColor: `${theme.muted}80` }]}>
        <ShieldCheck size={22} color={theme.primary} weight="duotone" />
        <Text style={[styles.calloutText, { color: theme.foreground }]}>
          <Text style={{ fontWeight: '700' }}>Only use PDF Unlocker on PDFs you own</Text> or have
          explicit permission to modify. We respect copyright and intellectual property.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xxl,
    borderBottomWidth: 1,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  callout: {
    marginTop: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm + 4,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'flex-start',
  },
  calloutText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
});
