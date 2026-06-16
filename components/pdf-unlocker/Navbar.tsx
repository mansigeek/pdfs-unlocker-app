import { LockKey, Moon, Sun } from 'phosphor-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/Button';
import { spacing } from '@/constants/theme';

type NavbarProps = {
  onScrollTo: (section: string) => void;
};

const NAV_LINKS: [string, string][] = [
  ['tool', 'Tool'],
  ['how', 'How it works'],
  ['features', 'Features'],
  ['faq', 'FAQ'],
];

export function Navbar({ onScrollTo }: NavbarProps) {
  const { theme, resolvedTheme, toggleTheme } = useAppTheme();

  return (
    <View style={[styles.header, { borderBottomColor: theme.border, backgroundColor: `${theme.background}CC` }]}>
      <Pressable onPress={() => onScrollTo('top')} style={styles.logo} testID="nav-logo">
        <View style={[styles.logoIcon, { backgroundColor: theme.primary }]}>
          <LockKey size={18} color={theme.primaryForeground} weight="bold" />
        </View>
        <Text style={[styles.logoText, { color: theme.foreground }]}>PDF Unlocker</Text>
      </Pressable>

      <View style={styles.actions}>
        <Pressable
          testID="theme-toggle"
          onPress={toggleTheme}
          style={[styles.iconBtn, { borderColor: theme.border, backgroundColor: theme.background }]}
          accessibilityLabel="Toggle theme"
        >
          {resolvedTheme === 'dark' ? (
            <Sun size={16} color={theme.mutedForeground} weight="bold" />
          ) : (
            <Moon size={16} color={theme.mutedForeground} weight="bold" />
          )}
        </Pressable>
        <Button onPress={() => onScrollTo('tool')} style={styles.cta} testID="nav-cta-upload">
          Upload PDF
        </Button>
      </View>
    </View>
  );
}

export function NavLinks({ onScrollTo }: NavbarProps) {
  const { theme } = useAppTheme();
  return (
    <View style={styles.links}>
      {NAV_LINKS.map(([id, label]) => (
        <Pressable key={id} onPress={() => onScrollTo(id)} testID={`nav-link-${id}`}>
          <Text style={[styles.link, { color: theme.mutedForeground }]}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderBottomWidth: 1,
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
    letterSpacing: -0.5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cta: {
    minHeight: 36,
    paddingHorizontal: spacing.md,
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
  },
});
