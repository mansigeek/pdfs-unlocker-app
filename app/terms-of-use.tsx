import { Stack, useRouter } from 'expo-router';
import { ArrowLeft } from 'phosphor-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Footer } from '@/components/pdf-unlocker/Footer';
import { Navbar } from '@/components/pdf-unlocker/Navbar';
import { spacing } from '@/constants/theme';
import { useAppTheme } from '@/contexts/theme-context';

export default function TermsOfUseScreen() {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ headerShown: false }} />
      <Navbar onScrollTo={() => router.push('/')} />
      <Pressable onPress={() => router.back()} style={styles.back}>
        <ArrowLeft size={18} color={theme.primary} weight="bold" />
        <Text style={[styles.backText, { color: theme.primary }]}>Back</Text>
      </Pressable>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24, paddingHorizontal: spacing.md }}>
        <Text style={[styles.title, { color: theme.foreground }]}>Terms of Use</Text>

        <Text style={[styles.body, { color: theme.mutedForeground }]}>
          Welcome to PDF Unlocker. By accessing or using our app, you agree to be bound by these Terms of
          Use and all applicable laws and regulations.
        </Text>

        <Text style={[styles.heading, { color: theme.foreground }]}>1. Use License</Text>
        <Text style={[styles.body, { color: theme.mutedForeground }]}>
          Permission is granted to temporarily use the materials and services on PDF Unlocker for personal,
          non-commercial transitory viewing only. You may not modify or copy the materials, use them for
          commercial purpose, attempt to reverse engineer any software, or remove proprietary notations.
        </Text>

        <Text style={[styles.heading, { color: theme.foreground }]}>2. Disclaimer</Text>
        <Text style={[styles.body, { color: theme.mutedForeground }]}>
          The materials on PDF Unlocker are provided on an 'as is' basis. We make no warranties, expressed
          or implied, including merchantability, fitness for a particular purpose, or non-infringement.
        </Text>

        <Text style={[styles.heading, { color: theme.foreground }]}>3. Legal Responsibility</Text>
        <Text style={[styles.body, { color: theme.mutedForeground }]}>
          You agree to use PDF Unlocker only for lawful purposes. You must have the legal right to unlock
          the PDF documents you process using our tool.
        </Text>

        <Text style={[styles.heading, { color: theme.foreground }]}>4. Limitations</Text>
        <Text style={[styles.body, { color: theme.mutedForeground }]}>
          In no event shall PDF Unlocker or its suppliers be liable for any damages arising out of the use
          or inability to use the materials on PDF Unlocker.
        </Text>

        <Text style={[styles.heading, { color: theme.foreground }]}>5. Revisions</Text>
        <Text style={[styles.body, { color: theme.mutedForeground }]}>
          We may revise these terms of use at any time without notice. By using this app, you agree to be
          bound by the then current version of these Terms of Use.
        </Text>

        <Footer />
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
    paddingHorizontal: spacing.md,
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
