import { useRouter } from "expo-router";
import { ArrowLeft, EnvelopeSimple, IconProps } from "phosphor-react-native";
import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { SUPPORT_EMAIL } from "@/constants/config";
import { radius, screen, spacing, textSpacing } from "@/constants/theme";
import { useAppTheme } from "@/contexts/theme-context";

type LegalSection = {
  heading: string;
  body: string;
  icon: React.ComponentType<IconProps>;
};

type LegalScreenProps = {
  badge: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalScreen({
  badge,
  title,
  intro,
  sections,
}: LegalScreenProps) {
  const { theme } = useAppTheme();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [styles.back, pressed && styles.pressed]}
        testID="legal-back"
      >
        <ArrowLeft size={16} color={theme.primary} weight="bold" />
        <Text style={[styles.backText, { color: theme.primary }]}>Back</Text>
      </Pressable>

      <View style={styles.hero}>
        <View style={[styles.badge, { backgroundColor: `${theme.primary}14` }]}>
          <Text style={[styles.badgeText, { color: theme.primary }]}>
            {badge}
          </Text>
        </View>
        <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
        <Text style={[styles.intro, { color: theme.mutedForeground }]}>
          {intro}
        </Text>
      </View>

      <View
        style={[
          styles.panel,
          { borderColor: theme.border, backgroundColor: theme.card },
        ]}
      >
        <Text style={[styles.panelEyebrow, { color: theme.primary }]}>
          Details
        </Text>
        <Text style={[styles.panelTitle, { color: theme.foreground }]}>
          What this means for you
        </Text>

        <View style={styles.sectionList}>
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isLast = index === sections.length - 1;

            return (
              <View
                key={section.heading}
                style={[
                  styles.sectionRow,
                  !isLast && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.iconWrap,
                    { backgroundColor: `${theme.primary}12` },
                  ]}
                >
                  <Icon size={18} color={theme.primary} weight="duotone" />
                </View>
                <View style={styles.sectionCopy}>
                  <Text
                    style={[styles.sectionHeading, { color: theme.foreground }]}
                  >
                    {section.heading}
                  </Text>
                  <Text
                    style={[
                      styles.sectionBody,
                      { color: theme.mutedForeground },
                    ]}
                  >
                    {section.body}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
    paddingBottom: screen.paddingBottom,
  },
  back: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    marginTop: -spacing.sm,
  },
  pressed: {
    opacity: 0.75,
  },
  backText: {
    fontSize: 13,
    fontWeight: "700",
  },
  hero: {
    gap: textSpacing.section,
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
  title: {
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -0.8,
    lineHeight: 36,
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
  sectionList: {
    marginTop: spacing.xs,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm + 4,
    paddingVertical: spacing.sm + 4,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionCopy: {
    flex: 1,
    gap: 4,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 21,
  },
  supportCard: {
    borderWidth: 1,
    borderRadius: screen.cardRadius,
    padding: screen.cardPadding,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
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
  supportBody: {
    fontSize: 13,
    lineHeight: 19,
  },
  supportEmail: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
});
