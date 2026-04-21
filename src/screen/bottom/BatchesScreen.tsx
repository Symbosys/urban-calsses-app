import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/theme';
import { useCourses } from '../../api/hooks/course.hooks';
import { useAuthStore } from '../../store/auth.store';

const FilterChip = ({ label, isActive, onPress, theme }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.filterChip,
      { backgroundColor: isActive ? theme.primary : theme.surface, borderColor: theme.border },
    ]}
  >
    <Text style={[styles.filterChipText, { color: isActive ? '#fff' : theme.textSecondary }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const BatchCard = ({ batch, theme }: any) => {
  // Map backend course data to the UI format
  const title = batch.title;
  const instructor = batch.instructors?.[0]?.instructor?.name || 'Urban Instructor';
  const students = batch._count?.enrollments || 0;
  const status = batch.status;
  const color = batch.status === 'Upcoming' ? '#4ECDC4' : batch.status === 'Ongoing' ? '#4D96FF' : '#FF6B6B';
  const icon = 'school'; // Default icon for courses
  
  // These might need to be added to the backend model later if specific days/times are needed
  const days = 'Mon - Sat'; 
  const time = 'Live Classes';

  return (
    <TouchableOpacity style={[styles.batchCard, { backgroundColor: theme.surface, shadowColor: theme.black }]}>
      <View style={[styles.batchIconContainer, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={30} color={color} />
      </View>
      <View style={styles.batchInfo}>
        <View style={styles.batchHeader}>
          <Text style={[styles.batchStatus, { color: status === 'Upcoming' ? '#FF9F43' : theme.primary }]}>
            {status}
          </Text>
          <Text style={[styles.studentCount, { color: theme.textSecondary }]}>
            <Icon name="account-group" size={14} /> {students}
          </Text>
        </View>
        <Text style={[styles.batchTitle, { color: theme.text }]} numberOfLines={1}>{title}</Text>
        <Text style={[styles.instructorName, { color: theme.textSecondary }]}>by {instructor}</Text>
        
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        
        <View style={styles.batchFooter}>
          <View style={styles.footerItem}>
            <Icon name="calendar-clock" size={16} color={theme.primary} />
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>{days}</Text>
          </View>
          <View style={styles.footerItem}>
            <Icon name="clock-outline" size={16} color={theme.primary} />
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>{time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BatchesScreen = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const selectedGoal = useAuthStore((state) => state.selectedGoal);

  const filters = ['All', 'Ongoing', 'Upcoming', 'My Batches'];

  const { data, isLoading, isError, refetch } = useCourses({
    search: search,
    status: activeFilter !== 'All' && activeFilter !== 'My Batches' ? activeFilter : undefined,
    subCategoryId: selectedGoal || undefined,
  });

  const courses = data?.courses || [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.background === '#ffffff' ? 'dark-content' : 'light-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.textSecondary }]}>Find your</Text>
          <Text style={[styles.title, { color: theme.primary }]}>Learning Batch</Text>
        </View>
        <TouchableOpacity style={[styles.notificationBtn, { backgroundColor: theme.surface }]}>
          <Icon name="bell-outline" size={24} color={theme.text} />
          <View style={styles.dot} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Icon name="magnify" size={22} color={theme.textSecondary} />
        <TextInput
          placeholder="Search for batch or instructor"
          placeholderTextColor={theme.placeholder}
          style={[styles.searchInput, { color: theme.text }]}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.filterBtn}>
          <Icon name="tune-variant" size={20} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filterList}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {filters.map((filter) => (
            <FilterChip
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onPress={() => setActiveFilter(filter)}
              theme={theme}
            />
          ))}
        </ScrollView>
      </View>

      {/* Batches List */}
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.statusText, { color: theme.textSecondary }]}>Loading batches...</Text>
        </View>
      ) : isError ? (
        <View style={styles.centerContainer}>
          <Icon name="alert-circle-outline" size={50} color={theme.textSecondary} />
          <Text style={[styles.statusText, { color: theme.textSecondary }]}>Failed to load batches</Text>
          <TouchableOpacity onPress={() => refetch()} style={[styles.retryBtn, { backgroundColor: theme.primary }]}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BatchCard batch={item} theme={theme} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Icon name="book-search-outline" size={60} color={theme.textSecondary} />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No batches found</Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {search ? 'Search Results' : 'Recommended Batches'}
              </Text>
              <TouchableOpacity>
                <Text style={{ color: theme.primary, fontWeight: '600' }}>View All</Text>
              </TouchableOpacity>
            </View>
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  notificationBtn: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  filterBtn: {
    padding: 5,
  },
  filterList: {
    marginBottom: 15,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  batchCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  batchIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  batchInfo: {
    flex: 1,
  },
  batchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  batchStatus: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  studentCount: {
    fontSize: 12,
  },
  batchTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  instructorName: {
    fontSize: 13,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: 10,
  },
  batchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    marginLeft: 5,
    fontWeight: '500',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  retryBtn: {
    marginTop: 15,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BatchesScreen;
