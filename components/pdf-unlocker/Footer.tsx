import { EnvelopeSimple, LockKey } from 'phosphor-react-native';
import { Link } from 'expo-router';
import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import { SUPPORT_EMAIL } from '@/constants/config';
import { spacing } from '@/constants/theme';

type FooterProps = {
  onScrollTo?: (section: string) => void;
};

export function Footer({ onScrollTo }: FooterProps) {
  const { theme } = useAppTheme();

  return (
    <View testID="site-footer" style={[styles.footer, { backgroundColor: theme.background }]}>
      <View style={styles.grid}>
        <View style={styles.brandCol}>
          <View style={styles.logo}>
            <View style={[styles.logoIcon, { backgroundColor: theme.primary }]}>
              <LockKey size={18} color={theme.primaryForeground} weight="bold" />
            </View>
            <Text style={[styles.logoText, { color: theme.foreground }]}>PDF Unlocker</Text>
          </View>
          <Text style={[styles.brandDesc, { color: theme.mutedForeground }]}>
            A fast, private PDF unlock tool. Remove password protection from your PDFs in seconds —
            no signup, no storage, no catch.
          </Text>
        </View>

        <View style={styles.col}>
          <Text style={[styles.colTitle, { color: theme.mutedForeground }]}>Legal</Text>
          <Link href="/privacy-policy" asChild>
            <Pressable testID="footer-privacy">
              <Text style={[styles.link, { color: theme.foreground }]}>Privacy Policy</Text>
            </Pressable>
          </Link>
          <Link href="/terms-of-use" asChild>
            <Pressable testID="footer-terms">
              <Text style={[styles.link, { color: theme.foreground }]}>Terms of Use</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.col}>
          <Text style={[styles.colTitle, { color: theme.mutedForeground }]}>Product</Text>
          <Pressable onPress={() => onScrollTo?.('tool')}>
            <Text style={[styles.link, { color: theme.foreground }]}>Unlock tool</Text>
          </Pressable>
          <Pressable onPress={() => onScrollTo?.('features')}>
            <Text style={[styles.link, { color: theme.foreground }]}>Features</Text>
          </Pressable>
          <Pressable onPress={() => onScrollTo?.('faq')}>
            <Text style={[styles.link, { color: theme.foreground }]}>FAQ</Text>
          </Pressable>
        </View>

        <View style={styles.col}>
          <Text style={[styles.colTitle, { color: theme.mutedForeground }]}>Contact</Text>
          <Pressable
            testID="footer-contact"
            onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)}
          >
            <View style={styles.contactRow}>
              <EnvelopeSimple size={16} color={theme.foreground} weight="bold" />
              <Text style={[styles.link, { color: theme.foreground }]}>{SUPPORT_EMAIL}</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={[styles.bottom, { borderTopColor: theme.border }]}>
        <Text style={[styles.bottomText, { color: theme.mutedForeground }]}>
          © {new Date().getFullYear()} PDF Unlocker. All rights reserved.
        </Text>
        <Text style={[styles.bottomText, { color: theme.mutedForeground }]}>
          Made with care · PDFs are processed in memory only.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  grid: {
    gap: spacing.xl,
  },
  brandCol: {
    gap: spacing.md,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '900',
  },
  brandDesc: {
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 320,
  },
  col: {
    gap: spacing.sm,
  },
  colTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  link: {
    fontSize: 14,
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  bottom: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    gap: spacing.sm,
  },
  bottomText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
