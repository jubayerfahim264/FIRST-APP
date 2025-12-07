import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
// import Animated, { FadeIn, SlideInRight, ZoomIn } from 'react-native-reanimated'; // Disabled for build testing

import { AdMobBanner, AdMobInterstitial } from '@/components/admob';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Todo = {
  id: string;
  title: string;
  notes?: string;
  completed?: boolean;
  createdAt: string;
};

const STORAGE_KEY = '@todos_v1';

export default function TodosScreen() {
  const colorScheme = useColorScheme();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setTodos(JSON.parse(raw));
      } catch (e) {
        console.warn('Failed to load todos', e);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos)).catch((e) =>
      console.warn('Failed to save todos', e),
    );
  }, [todos]);

  const addOrUpdate = () => {
    if (!title.trim()) return Alert.alert('Title required');

    if (editingId) {
      setTodos((s) => s.map((t) => (t.id === editingId ? { ...t, title, notes } : t)));
      setEditingId(null);
    } else {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: title.trim(),
        notes: notes.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTodos((s) => [newTodo, ...s]);
    }

    setTitle('');
    setNotes('');
    setShowForm(false);
  };

  const remove = (id: string) => {
    // Immediately remove the task without confirmation
    setTodos((s) => s.filter((t) => t.id !== id));
    // Show interstitial ad after deletion
    AdMobInterstitial.showInterstitial();
  };

  const toggleComplete = (id: string) => {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setTitle(todo.title);
    setNotes(todo.notes ?? '');
    setShowForm(true);
  };

  const renderItem = ({ item, index }: { item: Todo; index: number }) => {
    return (
      <View>
        <Pressable
          onPress={() => toggleComplete(item.id)}
          onLongPress={() => startEdit(item)}
          style={({ pressed }) => [
            styles.todoItem,
            item.completed && styles.todoItemCompleted,
            pressed && { transform: [{ scale: 0.98 }] },
          ]}
          accessibilityLabel={`Todo ${item.title}`}>
          <View style={styles.checkboxContainer}>
            <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
              {item.completed && <ThemedText style={styles.checkmark}>✓</ThemedText>}
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText
                type="defaultSemiBold"
                style={[styles.todoTitle, item.completed && styles.completedText]}>
                {item.title}
              </ThemedText>
              {item.notes ? (
                <ThemedText style={styles.todoNotes}>{item.notes}</ThemedText>
              ) : null}
            </View>
          </View>
          <Pressable
            onPress={() => remove(item.id)}
            style={({ pressed }) => [styles.deleteBtn, pressed && { opacity: 0.7 }]}>
            <ThemedText style={styles.deleteIcon}>✕</ThemedText>
          </Pressable>
        </Pressable>
      </View>
    );
  };

  const completedCount = useMemo(() => todos.filter((t) => t.completed).length, [todos]);
  const progressPercent = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <ThemedView style={styles.container}>
      <View>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            ✓ My Tasks
          </ThemedText>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
          </View>
          <ThemedText style={styles.progressText}>
            {completedCount} of {todos.length} completed
          </ThemedText>
        </View>

        {/* Form Section */}
        {showForm ? (
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Task title"
              placeholderTextColor={colorScheme === 'dark' ? '#999' : '#888'}
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              autoFocus
            />
            <TextInput
              placeholder="Add notes..."
              placeholderTextColor={colorScheme === 'dark' ? '#999' : '#888'}
              value={notes}
              onChangeText={setNotes}
              style={[styles.input, styles.notesInput]}
              multiline
            />
            <View style={styles.formButtons}>
              <Pressable
                style={({ pressed }) => [styles.btnCancel, pressed && { opacity: 0.7 }]}
                onPress={() => {
                  setShowForm(false);
                  setTitle('');
                  setNotes('');
                  setEditingId(null);
                }}>
                <ThemedText style={styles.btnCancelText}>Cancel</ThemedText>
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.btnSave, pressed && { opacity: 0.8 }]}
                onPress={addOrUpdate}>
                <ThemedText style={styles.btnSaveText}>
                  {editingId ? 'Update' : 'Add Task'}
                </ThemedText>
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable
            style={({ pressed }) => [styles.addButton, pressed && { transform: [{ scale: 0.95 }] }]}
            onPress={() => setShowForm(true)}>
            <ThemedText style={styles.addButtonText}>+ Add New Task</ThemedText>
          </Pressable>
        )}

        {/* List Section */}
        {todos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>No tasks yet!</ThemedText>
            <ThemedText style={styles.emptySubText}>Tap &quot;Add New Task&quot; to get started</ThemedText>
          </View>
        ) : (
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={true}
            style={styles.listContainer}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
      {/* AdMob Banner Ad */}
      <AdMobBanner />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 48 : 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#6366F1',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#6366F1',
    marginBottom: 12,
  },
  progressContainer: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E7FF',
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  addButton: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#6366F1',
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  formContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6366F1',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  btnCancel: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    alignItems: 'center',
  },
  btnCancelText: {
    color: '#374151',
    fontWeight: '600',
  },
  btnSave: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#6366F1',
    borderRadius: 8,
    alignItems: 'center',
  },
  btnSaveText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
  },
  todoItemCompleted: {
    backgroundColor: '#F3F4F6',
    borderLeftColor: '#10B981',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  todoNotes: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  deleteBtn: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#FEE2E2',
  },
  deleteIcon: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6366F1',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

