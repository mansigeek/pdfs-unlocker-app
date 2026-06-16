import { CaretDown, IconProps } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import { radius, spacing } from '@/constants/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  testID?: string;
  icon?: React.ComponentType<IconProps>;
  isLast?: boolean;
  contained?: boolean;
};

export function AccordionItem({
  title,
  children,
  testID,
  icon: Icon,
  isLast = false,
  contained = false,
}: AccordionItemProps) {
  const { theme } = useAppTheme();
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((v) => !v);
  };

  return (
    <View
      style={[
        styles.item,
        contained && styles.itemContained,
        !isLast && { borderBottomWidth: 1, borderBottomColor: theme.border },
        open && contained && { backgroundColor: `${theme.primary}08` },
      ]}
      testID={testID}
    >
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [styles.trigger, pressed && styles.triggerPressed]}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
      >
        {Icon ? (
          <View style={[styles.iconWrap, { backgroundColor: `${theme.primary}12` }]}>
            <Icon size={18} color={theme.primary} weight="duotone" />
          </View>
        ) : null}
        <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
        <View style={[styles.caretWrap, open && { backgroundColor: `${theme.primary}18` }]}>
          <CaretDown
            size={16}
            color={open ? theme.primary : theme.mutedForeground}
            weight="bold"
            style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}
          />
        </View>
      </Pressable>
      {open ? (
        <Text style={[styles.content, Icon && styles.contentIndented, { color: theme.mutedForeground }]}>
          {children}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: spacing.md,
  },
  itemContained: {
    marginHorizontal: -spacing.xs,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 4,
  },
  triggerPressed: {
    opacity: 0.75,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
    lineHeight: 20,
  },
  caretWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 22,
  },
  contentIndented: {
    marginLeft: 36 + spacing.sm + 4,
  },
});
