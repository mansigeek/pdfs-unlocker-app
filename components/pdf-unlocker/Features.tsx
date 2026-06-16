import {
  Devices,
  Lightning,
  LockKeyOpen,
  ShieldCheck,
  Trash,
} from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SectionHeader } from '@/components/pdf-unlocker/SectionHeader';
import { radius, spacing } from '@/constants/theme';
import { useAppTheme } from '@/contexts/theme-context';

const features = [
  {
    icon: ShieldCheck,
    title: '100% Private Processing',
    desc: 'Your files are decrypted entirely on your device. Our PDF unlocker never uploads anything to any server. Your document stays with you at all times.',
  },
  {
    icon: Trash,
    title: 'Zero File Storage',
    desc: 'Nothing is written to disk. Your PDF and password are never persisted or logged anywhere. Once you unlock PDF and close the app, every trace is gone.',
  },
  {
    icon: Lightning,
    title: 'Lightning Fast',
    desc: 'Our optimized pipeline lets you remove password from PDF files in under two seconds. No waiting, no queues, no processing delays.',
  },
  {
    icon: 'infinity' as const,
    title: 'Unlimited Usage',
    desc: 'No quotas, no sign-up, no watermarks. Use this free PDF unlocker as many times as you need. There are absolutely no limits.',
  },
  {
    icon: Devices,
    title: 'Works on Every Device',
    desc: 'Built to work on phones, tablets, and desktop. Unlock PDFs from anywhere with a clean experience designed for every screen size.',
  },
  {
    icon: LockKeyOpen,
    title: 'Strong Encryption Support',
    desc: 'Compatible with PDFs protected by RC4 and AES-128 / AES-256 encryption. Our PDF password remover handles even strongly secured documents with ease.',
  },
];

export function Features() {
  const { theme } = useAppTheme();

  return (
    <View
      testID="features-section"
      style={[styles.section, { borderBottomColor: theme.border, backgroundColor: `${theme.muted}80` }]}
    >
      <SectionHeader
        eyebrow="Why Choose Our PDF Unlocker"
        title="Built with Privacy, Speed, and Simplicity in Mind."
        description="A no-nonsense PDF password remover that puts you in full control. No accounts, no servers hoarding your documents."
      />

      <View style={styles.grid}>
        {features.map((f) => {
          const Icon = f.icon === 'infinity' ? null : f.icon;
          return (
            <View
              key={f.title}
              testID={`feature-${f.title.toLowerCase().split(' ')[0]}`}
              style={[styles.card, { borderColor: theme.border, backgroundColor: theme.card }]}
            >
              <View style={[styles.iconWrap, { backgroundColor: `${theme.primary}1A` }]}>
                {f.icon === 'infinity' ? (
                  <Text style={[styles.infinityIcon, { color: theme.primary }]}>∞</Text>
                ) : Icon ? (
                  <Icon size={22} color={theme.primary} weight="duotone" />
                ) : null}
              </View>
              <Text style={[styles.cardTitle, { color: theme.foreground }]}>{f.title}</Text>
              <Text style={[styles.cardDesc, { color: theme.mutedForeground }]}>{f.desc}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xxl,
    borderBottomWidth: 1,
  },
  grid: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  card: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infinityIcon: {
    fontSize: 24,
    fontWeight: '900',
  },
  cardTitle: {
    marginTop: spacing.md,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  cardDesc: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 22,
  },
});
