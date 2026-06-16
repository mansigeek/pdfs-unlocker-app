import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import { radius, spacing } from '@/constants/theme';

type InputProps = TextInputProps & {
  error?: boolean;
};

export function Input({ style, error, ...props }: InputProps) {
  const { theme } = useAppTheme();

  return (
    <TextInput
      placeholderTextColor={theme.mutedForeground}
      style={[
        styles.input,
        {
          backgroundColor: theme.background,
          borderColor: error ? theme.destructive : theme.input,
          color: theme.foreground,
        },
        style,
      ]}
      {...props}
    />
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  const { theme } = useAppTheme();
  return <Text style={[styles.label, { color: theme.foreground }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
});
