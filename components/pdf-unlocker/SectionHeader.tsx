import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import { textSpacing } from '@/constants/theme';

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
      <View style={styles.titleGroup}>
        <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
        {description ? (
          <Text style={[styles.description, { color: theme.mutedForeground }]}>{description}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: textSpacing.block,
    gap: textSpacing.labelToTitle,
  },
  titleGroup: {
    gap: textSpacing.titleToBody,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
});
