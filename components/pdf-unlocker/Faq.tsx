import {
  CloudSlash,
  DeviceMobile,
  EnvelopeSimple,
  Gift,
  IconProps,
  LockKey,
  ShieldCheck,
  UserCircle,
} from "phosphor-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AccordionItem } from "@/components/ui/Accordion";
import { SUPPORT_EMAIL } from "@/constants/config";
import { radius, screen, spacing, textSpacing } from "@/constants/theme";
import { useAppTheme } from "@/contexts/theme-context";

const HIGHLIGHTS = [
  { icon: Gift, label: "Free forever" },
  { icon: ShieldCheck, label: "On-device only" },
  { icon: UserCircle, label: "No account" },
] as const;

const faqs: {
  q: string;
  a: string;
  icon: React.ComponentType<IconProps>;
}[] = [
  {
    icon: Gift,
    q: "Is this tool really free with no limits?",
    a: "Yes. PDF Unlocker is completely free to use with no daily limits, no file caps, and no premium tier. You can unlock PDF free as many times as you want without creating an account or paying anything.",
  },
  {
    icon: ShieldCheck,
    q: "Is it safe to upload sensitive documents like bank statements?",
    a: "Absolutely. Your file never leaves your device. No data is transmitted to any external server. Your password and document stay in memory and are cleared once the process is done.",
  },
  {
    icon: LockKey,
    q: "Can this unlock a PDF if I do not know the password?",
    a: "No. PDF Unlocker is a PDF password remover, not a password cracker. You must know the current password to remove it. This is by design to respect document security and intellectual property.",
  },
  {
    icon: CloudSlash,
    q: "What restrictions can be removed?",
    a: "Our PDF unlocker can remove open passwords (user passwords) and owner passwords that restrict printing, copying, and editing. Once you remove password from PDF, you get a clean file with full access.",
  },
  {
    icon: DeviceMobile,
    q: "Does this work on mobile and iPhone?",
    a: "Yes. PDF Unlocker is built for mobile first and works on iPhones, Android phones, tablets, and desktops. Open the app and unlock your file from wherever you are.",
  },
  {
    icon: UserCircle,
    q: "Why is there no signup or account required?",
    a: "Because we believe a PDF unlocker should just work. No email harvesting, no tracking, no friction. Open the page, remove PDF password online, download your file, and move on.",
  },
];

export function Faq() {
  const { theme } = useAppTheme();

  return (
    <View testID="faq-section" style={styles.section}>
      <View style={styles.hero}>
        <View style={[styles.badge, { backgroundColor: `${theme.primary}14` }]}>
          <Text style={[styles.badgeText, { color: theme.primary }]}>
            Help center
          </Text>
        </View>

        <Text style={[styles.headline, { color: theme.foreground }]}>
          Questions, answered.
        </Text>
        <Text style={[styles.intro, { color: theme.mutedForeground }]}>
          Everything you need to know about unlocking PDFs safely, privately,
          and for free.
        </Text>
      </View>

      <View
        style={[
          styles.panel,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.panelEyebrow, { color: theme.primary }]}>FAQ</Text>
        <Text style={[styles.panelTitle, { color: theme.foreground }]}>
          Common questions
        </Text>

        <View style={styles.accordionList}>
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              title={f.q}
              icon={f.icon}
              contained
              isLast={i === faqs.length - 1}
              testID={`faq-item-${i}`}
            >
              {f.a}
            </AccordionItem>
          ))}
        </View>
      </View>

      <View
        style={[
          styles.supportCard,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
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
            Still have questions?
          </Text>
          <Text style={[styles.supportDesc, { color: theme.mutedForeground }]}>
            Reach out and we will get back to you as soon as we can.
          </Text>
          <Text style={[styles.supportEmail, { color: theme.primary }]}>
            {SUPPORT_EMAIL}
          </Text>
        </View>
      </View>
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
  highlightRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  highlightChip: {
    flex: 1,
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: screen.cardRadius,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.xs,
  },
  highlightIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  highlightLabel: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: -0.1,
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
  accordionList: {
    marginTop: spacing.xs,
  },
  supportCard: {
    flexDirection: "row",
    alignItems: "flex-start",
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
});
