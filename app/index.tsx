import { AdMobBanner } from '@/components/admob';
import React from 'react';
import { View } from 'react-native';
import TodosScreen from './(tabs)/todos';

export default function RootScreen() {
  return (
    <View style={{ flex: 1 }}>
      <TodosScreen />
      <AdMobBanner />
    </View>
  );
}
