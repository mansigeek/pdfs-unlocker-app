import React, { useCallback, useRef } from 'react';
import { LayoutChangeEvent, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { About } from '@/components/pdf-unlocker/About';
import { Faq } from '@/components/pdf-unlocker/Faq';
import { Features } from '@/components/pdf-unlocker/Features';
import { Footer } from '@/components/pdf-unlocker/Footer';
import { Hero } from '@/components/pdf-unlocker/Hero';
import { HowItWorks } from '@/components/pdf-unlocker/HowItWorks';
import { Instructions } from '@/components/pdf-unlocker/Instructions';
import { Navbar, NavLinks } from '@/components/pdf-unlocker/Navbar';
import { ShareSection } from '@/components/pdf-unlocker/ShareSection';
import { ToolSection } from '@/components/pdf-unlocker/ToolSection';
import { useAppTheme } from '@/contexts/theme-context';

type SectionKey = 'top' | 'tool' | 'how' | 'features' | 'faq';

export default function HomeScreen() {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const offsets = useRef<Partial<Record<SectionKey, number>>>({});

  const onSectionLayout = useCallback(
    (key: SectionKey) => (e: LayoutChangeEvent) => {
      offsets.current[key] = e.nativeEvent.layout.y;
    },
    [],
  );

  const scrollTo = useCallback((section: string) => {
    const key = section as SectionKey;
    const y = offsets.current[key] ?? 0;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - 8), animated: true });
  }, []);

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: theme.background }]}
      edges={['top', 'left', 'right']}
    >
      <Navbar onScrollTo={scrollTo} />
      <NavLinks onScrollTo={scrollTo} />

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View onLayout={onSectionLayout('top')}>
          <Hero onScrollToTool={() => scrollTo('tool')} />
        </View>

        <View onLayout={onSectionLayout('tool')}>
          <ToolSection />
        </View>

        <View onLayout={onSectionLayout('how')}>
          <HowItWorks />
        </View>

        <View onLayout={onSectionLayout('features')}>
          <Features />
        </View>

        <About />
        <Instructions />

        <View onLayout={onSectionLayout('faq')}>
          <Faq />
        </View>

        <ShareSection />
        <Footer onScrollTo={scrollTo} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
});
