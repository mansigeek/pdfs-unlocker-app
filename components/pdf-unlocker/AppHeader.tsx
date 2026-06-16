import { Moon, Sun } from 'phosphor-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { screen, textSpacing } from '@/constants/theme';
import { useAppTheme } from '@/contexts/theme-context';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
};

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  const { theme, resolvedTheme, toggleTheme } = useAppTheme();

  return (
    <View style={[styles.container, { borderBottomColor: theme.border, backgroundColor: theme.background }]}>
      <View style={styles.textWrap}>
        <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
        {subtitle ? <Text style={[styles.subtitle, { color: theme.mutedForeground }]}>{subtitle}</Text> : null}
      </View>
      <Pressable
        testID="app-header-theme-toggle"
        onPress={toggleTheme}
        style={[styles.iconBtn, { borderColor: theme.border, backgroundColor: theme.card }]}
        accessibilityLabel="Toggle theme"
      >
        {resolvedTheme === 'dark' ? (
          <Sun size={16} color={theme.mutedForeground} weight="bold" />
        ) : (
          <Moon size={16} color={theme.mutedForeground} weight="bold" />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: screen.paddingX,
    paddingVertical: screen.paddingTop,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: screen.gap,
  },
  textWrap: {
    flex: 1,
    gap: textSpacing.titleToBody,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
