import { CaretDown } from 'phosphor-react-native';
import React, { useState } from 'react';
import { LayoutAnimation, Platform, Pressable, StyleSheet, Text, UIManager, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import { spacing } from '@/constants/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  testID?: string;
};

export function AccordionItem({ title, children, testID }: AccordionItemProps) {
  const { theme } = useAppTheme();
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((v) => !v);
  };

  return (
    <View style={[styles.item, { borderBottomColor: theme.border }]} testID={testID}>
      <Pressable onPress={toggle} style={styles.trigger}>
        <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
        <CaretDown
          size={18}
          color={theme.mutedForeground}
          style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}
        />
      </Pressable>
      {open ? (
        <Text style={[styles.content, { color: theme.mutedForeground }]}>{children}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    paddingVertical: spacing.md,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  content: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 22,
  },
});
