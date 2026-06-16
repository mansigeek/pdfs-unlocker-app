import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import { spacing } from '@/constants/theme';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.eyebrow, { color: theme.primary }]}>{eyebrow}</Text>
      <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
      {description ? (
        <Text style={[styles.description, { color: theme.mutedForeground }]}>{description}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.lg,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: spacing.sm + 4,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  description: {
    marginTop: spacing.sm + 4,
    fontSize: 14,
    lineHeight: 22,
  },
});
