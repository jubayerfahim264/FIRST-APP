import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: true,
          headerRight: () => (
            <Pressable
              onPress={() => router.push('/todos')}
              accessibilityLabel="Open todos"
              style={({ pressed }) => [styles.headerButton, pressed && { opacity: 0.6 }]}>
              <IconSymbol size={22} name="checkmark.circle.fill" color={Colors[colorScheme ?? 'light'].tint} />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="developer"
        options={{
          title: 'Developer',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 12,
  },
});
