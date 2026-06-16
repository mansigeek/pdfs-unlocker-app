import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import { radius, spacing } from '@/constants/theme';

type ButtonProps = {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'primary' | 'outline';
  testID?: string;
};

export function Button({
  onPress,
  disabled,
  loading,
  children,
  style,
  variant = 'primary',
  testID,
}: ButtonProps) {
  const { theme } = useAppTheme();
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: isPrimary ? theme.primary : theme.background,
          borderColor: theme.border,
          borderWidth: isPrimary ? 0 : 1,
          opacity: disabled || loading ? 0.5 : pressed ? 0.92 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? theme.primaryForeground : theme.foreground} />
      ) : typeof children === 'string' ? (
        <Text
          style={[
            styles.label,
            { color: isPrimary ? theme.primaryForeground : theme.foreground },
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
});
