import { useRouter } from "expo-router";
import {
  CaretRight,
  EnvelopeSimple,
  FileText,
  IconProps,
  Question,
  ShieldCheck,
} from "phosphor-react-native";
import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { SUPPORT_EMAIL } from "@/constants/config";
import { radius, screen, spacing, textSpacing } from "@/constants/theme";
import { useAppTheme } from "@/contexts/theme-context";

const LEGAL_LINKS = [
  {
    icon: ShieldCheck,
    title: "Privacy Policy",
    desc: "How we handle your data",
    href: "/privacy-policy" as const,
  },
  {
    icon: FileText,
    title: "Terms of Use",
    desc: "Terms and conditions of use",
    href: "/terms-of-use" as const,
  },
] as const;

const HELP_LINKS = [
  {
    icon: Question,
    title: "FAQ",
    desc: "Answers to common questions",
    href: "/(tabs)/faq" as const,
  },
] as const;

type SettingsRowProps = {
  icon: React.ComponentType<IconProps>;
  title: string;
  desc: string;
  onPress: () => void;
  isLast?: boolean;
  testID?: string;
};

function SettingsRow({
  icon: Icon,
  title,
  desc,
  onPress,
  isLast = false,
  testID,
}: SettingsRowProps) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        styles.row,
        !isLast && { borderBottomWidth: 1, borderBottomColor: theme.border },
        pressed && styles.rowPressed,
      ]}
    >
      <View style={[styles.rowIcon, { backgroundColor: `${theme.primary}12` }]}>
        <Icon size={18} color={theme.primary} weight="duotone" />
      </View>
      <View style={styles.rowCopy}>
        <Text style={[styles.rowTitle, { color: theme.foreground }]}>
          {title}
        </Text>
        <Text style={[styles.rowDesc, { color: theme.mutedForeground }]}>
          {desc}
        </Text>
      </View>
      <CaretRight size={16} color={theme.mutedForeground} weight="bold" />
    </Pressable>
  );
}

export function MoreSettings() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const openSupport = () => {
    void Linking.openURL(`mailto:${SUPPORT_EMAIL}`);
  };

  return (
    <View testID="more-settings-section" style={styles.section}>
      <View style={styles.hero}>
        <View style={[styles.badge, { backgroundColor: `${theme.primary}14` }]}>
          <Text style={[styles.badgeText, { color: theme.primary }]}>More</Text>
        </View>

        <Text style={[styles.headline, { color: theme.foreground }]}>
          App settings
        </Text>
        <Text style={[styles.intro, { color: theme.mutedForeground }]}>
          Legal information, help resources, and ways to reach our support team.
        </Text>
      </View>

      <View
        style={[
          styles.panel,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.panelEyebrow, { color: theme.primary }]}>
          Legal
        </Text>
        <Text style={[styles.panelTitle, { color: theme.foreground }]}>
          Policies
        </Text>

        <View style={styles.rowList}>
          {LEGAL_LINKS.map((link, index) => (
            <SettingsRow
              key={link.href}
              icon={link.icon}
              title={link.title}
              desc={link.desc}
              isLast={index === LEGAL_LINKS.length - 1}
              onPress={() => router.push(link.href)}
              testID={`more-link-${link.href}`}
            />
          ))}
        </View>
      </View>

      <Pressable
        onPress={openSupport}
        style={({ pressed }) => [
          styles.supportCard,
          { backgroundColor: theme.card, borderColor: theme.border },
          pressed && styles.rowPressed,
        ]}
        testID="more-support"
      >
        <View
          style={[
            styles.supportIcon,
            { backgroundColor: `${theme.primary}12` },
          ]}
        >
          <EnvelopeSimple size={20} color={theme.primary} weight="duotone" />
        </View>
        <View style={styles.supportCopy}>
          <Text style={[styles.supportTitle, { color: theme.foreground }]}>
            Support
          </Text>
          <Text style={[styles.supportDesc, { color: theme.mutedForeground }]}>
            Questions, feedback, or issues? We are here to help.
          </Text>
          <Text style={[styles.supportEmail, { color: theme.primary }]}>
            {SUPPORT_EMAIL}
          </Text>
        </View>
        <CaretRight size={16} color={theme.mutedForeground} weight="bold" />
      </Pressable>

      <Text style={[styles.footer, { color: theme.mutedForeground }]}>
        PDF Unlocker · v1.0.0
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.lg,
    paddingBottom: screen.paddingBottom,
  },
  hero: {
    gap: textSpacing.section,
    paddingTop: spacing.xs,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  headline: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.6,
    lineHeight: 32,
  },
  intro: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: -spacing.sm,
  },
  panel: {
    borderWidth: 1,
    borderRadius: screen.cardRadius,
    padding: screen.cardPadding,
    gap: textSpacing.block,
  },
  panelEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  rowList: {
    marginTop: spacing.xs,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 4,
    paddingVertical: spacing.sm + 4,
  },
  rowPressed: {
    opacity: 0.75,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  rowCopy: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  rowDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  supportCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderWidth: 1,
    borderRadius: screen.cardRadius,
    padding: screen.cardPadding,
  },
  supportIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  supportCopy: {
    flex: 1,
    gap: textSpacing.titleToBody,
  },
  supportTitle: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  supportDesc: {
    fontSize: 13,
    lineHeight: 19,
  },
  supportEmail: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    letterSpacing: 0.2,
  },
});
