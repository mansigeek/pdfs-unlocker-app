/** Trust Blue palette — matches Unlock-PDF-main globals.css */

import { Platform } from 'react-native';

function hsl(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export type AppTheme = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  primaryHover: string;
  secondary: string;
  muted: string;
  mutedForeground: string;
  border: string;
  destructive: string;
  success: string;
  input: string;
};

export const lightTheme: AppTheme = {
  background: hsl(0, 0, 99),
  foreground: hsl(240, 10, 4),
  card: hsl(0, 0, 100),
  cardForeground: hsl(240, 10, 4),
  primary: hsl(224, 100, 50),
  primaryForeground: '#ffffff',
  primaryHover: hsl(224, 100, 40),
  secondary: hsl(240, 5, 96),
  muted: hsl(240, 5, 96),
  mutedForeground: hsl(240, 4, 46),
  border: hsl(240, 6, 90),
  destructive: hsl(0, 84, 60),
  success: hsl(160, 84, 39),
  input: hsl(240, 6, 90),
};

export const darkTheme: AppTheme = {
  background: hsl(240, 6, 2),
  foreground: hsl(0, 0, 98),
  card: hsl(240, 6, 6),
  cardForeground: hsl(0, 0, 98),
  primary: hsl(217, 91, 60),
  primaryForeground: '#ffffff',
  primaryHover: hsl(217, 91, 50),
  secondary: hsl(240, 4, 10),
  muted: hsl(240, 4, 10),
  mutedForeground: hsl(240, 5, 64),
  border: hsl(240, 4, 14),
  destructive: hsl(0, 72, 51),
  success: hsl(160, 84, 39),
  input: hsl(240, 4, 14),
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
};

/** Consistent screen/content spacing for all tab pages */
export const screen = {
  paddingX: spacing.md,
  paddingTop: spacing.md,
  paddingBottom: spacing.lg,
  gap: spacing.md,
  cardRadius: radius.lg,
  cardPadding: spacing.md,
};

/** Consistent vertical spacing between text elements */
export const textSpacing = {
  /** Title → subtitle / description (e.g. "Select PDF File" → helper text) */
  titleToBody: spacing.xs,
  /** Eyebrow / label → heading */
  labelToTitle: spacing.sm,
  /** Between stacked text blocks in a card */
  block: spacing.sm,
  /** Between major UI blocks (icon, card section, button) */
  section: spacing.md,
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
    heading: 'System',
    body: 'System',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
    heading: 'sans-serif',
    body: 'sans-serif',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    heading: "'Cabinet Grotesk', system-ui, sans-serif",
    body: "'Satoshi', system-ui, sans-serif",
  },
});

/** @deprecated Use useAppTheme() instead */
export const Colors = {
  light: {
    text: lightTheme.foreground,
    background: lightTheme.background,
    tint: lightTheme.primary,
    icon: lightTheme.mutedForeground,
    tabIconDefault: lightTheme.mutedForeground,
    tabIconSelected: lightTheme.primary,
  },
  dark: {
    text: darkTheme.foreground,
    background: darkTheme.background,
    tint: darkTheme.primary,
    icon: darkTheme.mutedForeground,
    tabIconDefault: darkTheme.mutedForeground,
    tabIconSelected: darkTheme.primary,
  },
};
