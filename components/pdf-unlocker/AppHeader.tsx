import { LockKey, Moon, Sun } from "phosphor-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { radius, screen, spacing } from "@/constants/theme";
import { useAppTheme } from "@/contexts/theme-context";

export function AppHeader() {
  const { theme, resolvedTheme, toggleTheme } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: theme.border, backgroundColor: theme.background },
      ]}
    >
      <View style={styles.brand}>
        <View style={[styles.logoIcon, { backgroundColor: theme.primary }]}>
          <LockKey size={18} color={theme.primaryForeground} weight="bold" />
        </View>
        <Text style={[styles.logoText, { color: theme.foreground }]}>
          PDF Unlocker
        </Text>
      </View>
      <Pressable
        testID="app-header-theme-toggle"
        onPress={toggleTheme}
        style={[
          styles.iconBtn,
          { borderColor: theme.border, backgroundColor: theme.card },
        ]}
        accessibilityLabel="Toggle theme"
      >
        {resolvedTheme === "dark" ? (
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: screen.gap,
  },
  brand: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
