import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AccordionItem } from '@/components/ui/Accordion';
import { SectionHeader } from '@/components/pdf-unlocker/SectionHeader';
import { useAppTheme } from '@/contexts/theme-context';
import { screen } from '@/constants/theme';

const faqs = [
  {
    q: 'Is this tool really free with no limits?',
    a: 'Yes. PDF Unlocker is completely free to use with no daily limits, no file caps, and no premium tier. You can unlock PDF free as many times as you want without creating an account or paying anything.',
  },
  {
    q: 'Is it safe to upload sensitive documents like bank statements?',
    a: 'Absolutely. Your file never leaves your device. No data is transmitted to any external server. Your password and document stay in memory and are cleared once the process is done.',
  },
  {
    q: 'Can this unlock a PDF if I do not know the password?',
    a: 'No. PDF Unlocker is a PDF password remover, not a password cracker. You must know the current password to remove it. This is by design to respect document security and intellectual property.',
  },
  {
    q: 'What restrictions can be removed?',
    a: 'Our PDF unlocker can remove open passwords (user passwords) and owner passwords that restrict printing, copying, and editing. Once you remove password from PDF, you get a clean file with full access.',
  },
  {
    q: 'Does this work on mobile and iPhone?',
    a: 'Yes. PDF Unlocker is built for mobile first and works on iPhones, Android phones, tablets, and desktops. Open the app and unlock your file from wherever you are.',
  },
  {
    q: 'Why is there no signup or account required?',
    a: 'Because we believe a PDF unlocker should just work. No email harvesting, no tracking, no friction. Open the page, remove PDF password online, download your file, and move on.',
  },
];

export function Faq() {
  const { theme } = useAppTheme();

  return (
    <View
      testID="faq-section"
      style={[styles.section, { borderBottomColor: theme.border, backgroundColor: theme.background }]}
    >
      <SectionHeader
        eyebrow="FAQ"
        title="Questions, answered."
        description="Everything you need to know about unlocking PDFs with PDF Unlocker."
      />

      <View>
        {faqs.map((f, i) => (
          <AccordionItem key={i} title={f.q} testID={`faq-item-${i}`}>
            {f.a}
          </AccordionItem>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingBottom: screen.paddingBottom,
  },
});
