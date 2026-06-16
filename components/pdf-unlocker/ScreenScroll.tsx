import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { screen } from '@/constants/theme';

type ScreenScrollProps = ScrollViewProps & {
  children: React.ReactNode;
};

export function ScreenScroll({ children, contentContainerStyle, style, ...props }: ScreenScrollProps) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={style}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + screen.paddingBottom },
        contentContainerStyle,
      ]}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: screen.paddingX,
    paddingTop: screen.paddingTop,
    gap: screen.gap,
  },
});
