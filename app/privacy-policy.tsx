import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'phosphor-react-native';

import { AppHeader } from '@/components/pdf-unlocker/AppHeader';
import { SUPPORT_EMAIL } from '@/constants/config';
import { screen, spacing } from '@/constants/theme';
import { useAppTheme } from '@/contexts/theme-context';

export default function PrivacyPolicyScreen() {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ headerShown: false }} />
      <AppHeader />
      <Pressable onPress={() => router.back()} style={[styles.back, { paddingHorizontal: screen.paddingX }]}>
        <ArrowLeft size={18} color={theme.primary} weight="bold" />
        <Text style={[styles.backText, { color: theme.primary }]}>Back</Text>
      </Pressable>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + screen.paddingBottom,
          paddingHorizontal: screen.paddingX,
          paddingTop: screen.paddingTop,
        }}
      >
        <Text style={[styles.title, { color: theme.foreground }]}>Privacy Policy</Text>

        <Text style={[styles.body, { color: theme.mutedForeground }]}>
          At PDF Unlocker, we take your privacy seriously. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our app.
        </Text>

        <Text style={[styles.heading, { color: theme.foreground }]}>1. Information We Collect</Text>
        <Text style={[styles.body, { color: theme.mutedForeground }]}>
          When you use our service, your PDF files are processed entirely on your device. We do not
          upload, store, or transmit your PDF files or passwords to our servers. All processing is done
          locally on your device to ensure maximum privacy and security.
        </Text>

        <Text style={[styles.heading, { color: theme.foreground }]}>2. Local Storage</Text>
        <Text style={[styles.body, { color: theme.mutedForeground }]}>
          We may use your device’s local storage to save your theme preferences (e.g., light or dark mode).
          This data never leaves your device and is not shared with any third parties.
        </Text>

        <Text style={[styles.heading, { color: theme.foreground }]}>3. Third-Party Services</Text>
        <Text style={[styles.body, { color: theme.mutedForeground }]}>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside
          parties. Our service is designed to function independently without relying on external APIs for
          core functionality.
        </Text>

        <Text style={[styles.heading, { color: theme.foreground }]}>4. Changes to This Privacy Policy</Text>
        <Text style={[styles.body, { color: theme.mutedForeground }]}>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting
          the new Privacy Policy on this page.
        </Text>

        <Text style={[styles.heading, { color: theme.foreground }]}>5. Contact Us</Text>
        <Text style={[styles.body, { color: theme.mutedForeground }]}>
          If you have any questions about this Privacy Policy, please contact us at {SUPPORT_EMAIL}.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: spacing.sm,
  },
  backText: { fontSize: 14, fontWeight: '600' },
  title: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: spacing.lg,
    letterSpacing: -0.8,
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
});
