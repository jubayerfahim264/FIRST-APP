import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';

export default function DeveloperScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerRow}>
        <IconSymbol name="person.crop.circle.fill" size={48} color="#0a7ea4" />
        <ThemedText type="title" style={styles.title}>
          Developer
        </ThemedText>
      </View>

      <ThemedText style={styles.item}>Name: Jane Doe</ThemedText>
      <ThemedText style={styles.item}>Role: Lead Developer</ThemedText>
      <ThemedText style={styles.item}>Email: jane.doe@example.com</ThemedText>

      <ThemedText style={[styles.item, { marginTop: 12 }]}>Links</ThemedText>
      <ThemedText
        type="link"
        onPress={() => Linking.openURL('https://github.com/your-username')}
        style={styles.link}>
        GitHub: github.com/your-username
      </ThemedText>
      <ThemedText
        type="link"
        onPress={() => Linking.openURL('https://linkedin.com/in/your-username')}
        style={styles.link}>
        LinkedIn: linkedin.com/in/your-username
      </ThemedText>

      <ThemedText style={[styles.item, { marginTop: 12 }]}>Notes</ThemedText>
      <ThemedText>
        This tab contains developer contact information and useful links. Update `app/(tabs)/developer.tsx` to
        personalize the content.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    marginLeft: 8,
  },
  item: {
    marginTop: 8,
  },
  link: {
    marginTop: 6,
  },
});
