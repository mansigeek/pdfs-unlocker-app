import { Tabs } from 'expo-router';
import { House, Info, Lifebuoy, LockKey, List } from 'phosphor-react-native';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useAppTheme } from '@/contexts/theme-context';

export default function TabsLayout() {
  const { theme } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: (props) => <HapticTab {...props} />,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.mutedForeground,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <House color={color} size={size} weight="duotone" />,
        }}
      />
      <Tabs.Screen
        name="unlock"
        options={{
          title: 'Unlock',
          tabBarIcon: ({ color, size }) => <LockKey color={color} size={size} weight="duotone" />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, size }) => <List color={color} size={size} weight="duotone" />,
        }}
      />
      <Tabs.Screen
        name="faq"
        options={{
          title: 'FAQ',
          tabBarIcon: ({ color, size }) => <Lifebuoy color={color} size={size} weight="duotone" />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => <Info color={color} size={size} weight="duotone" />,
        }}
      />
    </Tabs>
  );
}
