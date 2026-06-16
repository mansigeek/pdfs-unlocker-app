import * as Clipboard from 'expo-clipboard';
import { Check, Link, TwitterLogo } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { useToast } from '@/contexts/toast-context';
import { useAppTheme } from '@/contexts/theme-context';
import { SITE_URL } from '@/constants/config';
import { radius, spacing } from '@/constants/theme';

const TWEET_TEMPLATE =
  'Unlock any PDF for free — no signup, no upload, runs entirely in your browser:';

export function ShareSection() {
  const { theme } = useAppTheme();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(`${SITE_URL}/`);
      setCopied(true);
      showToast('Link copied to clipboard', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy link. Please copy it manually.', 'error');
    }
  };

  const handleTweet = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${TWEET_TEMPLATE} ${SITE_URL}/`,
    )}`;
    Linking.openURL(tweetUrl);
  };

  return (
    <View
      testID="share-section"
      style={[styles.section, { borderBottomColor: theme.border, backgroundColor: `${theme.muted}80` }]}
    >
      <Text style={[styles.title, { color: theme.foreground }]}>Found this useful? Share it.</Text>
      <View style={styles.actions}>
        <Pressable
          testID="share-copy-link"
          onPress={handleCopy}
          style={[styles.outlineBtn, { borderColor: theme.border, backgroundColor: theme.background }]}
        >
          {copied ? (
            <>
              <Check size={16} color={theme.success} weight="bold" />
              <Text style={[styles.btnText, { color: theme.foreground }]}>Copied!</Text>
            </>
          ) : (
            <>
              <Link size={16} color={theme.foreground} weight="bold" />
              <Text style={[styles.btnText, { color: theme.foreground }]}>Copy link</Text>
            </>
          )}
        </Pressable>
        <Pressable
          testID="share-twitter"
          onPress={handleTweet}
          style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
        >
          <TwitterLogo size={16} color={theme.primaryForeground} weight="bold" />
          <Text style={[styles.btnText, { color: theme.primaryForeground }]}>Share on X</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    alignItems: 'center',
    gap: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm + 4,
  },
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: 40,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: 40,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
