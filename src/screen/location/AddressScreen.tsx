import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/theme';
import { useTodos } from '../../api/todo.hooks';
import { Todo } from '../../types/api.types';

const AddressScreen = () => {
  const theme = useTheme();
  const { data: todos, isLoading, isError, refetch } = useTodos();

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={[styles.todoItem, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={[styles.statusIcon, { backgroundColor: item.completed ? '#4CAF5020' : '#FF980020' }]}>
        <Icon 
          name={item.completed ? 'check-circle' : 'clock-outline'} 
          size={24} 
          color={item.completed ? '#4CAF50' : '#FF9800'} 
        />
      </View>
      <View style={styles.todoContent}>
        <Text style={[styles.todoTitle, { color: theme.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.todoStatus, { color: theme.textSecondary }]}>
          {item.completed ? 'Completed' : 'Pending'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.background === '#ffffff' ? 'dark-content' : 'light-content'} />
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Task Overview</Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Fetched from JSONPlaceholder API
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Loading tasks...</Text>
        </View>
      ) : isError ? (
        <View style={styles.center}>
          <Icon name="alert-circle-outline" size={60} color="#FF5252" />
          <Text style={[styles.errorText, { color: theme.text }]}>Failed to load tasks</Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: theme.primary }]} 
            onPress={() => refetch()}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTodoItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 4,
  },
  todoStatus: {
    fontSize: 13,
    fontWeight: '500',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddressScreen;
