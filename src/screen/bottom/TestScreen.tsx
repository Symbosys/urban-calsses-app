import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/theme';
import { useTests } from '../../api/hooks/test.hooks';
import { useAuthStore } from '../../store/auth.store';

const TEST_CATEGORIES = [
  { id: '1', name: 'All Tests', icon: 'file-document-multiple', color: '#4D96FF' },
  { id: '2', name: 'Practice', icon: 'pencil-box-outline', color: '#6BCB77' },
  { id: '3', name: 'Mock Tests', icon: 'clipboard-check-outline', color: '#FF9F43' },
  { id: '4', name: 'PYQs', icon: 'history', color: '#FF6B6B' },
];

const UPCOMING_TESTS = [
  {
    id: '1',
    title: 'JEE Main Full Mock Test - 05',
    subject: 'Physics, Chemistry, Maths',
    duration: '180 mins',
    questions: 75,
    date: 'Tomorrow, 09:00 AM',
    status: 'Upcoming',
    color: '#4D96FF',
  },
  {
    id: '2',
    title: 'Weekly Physics Quiz: Mechanics',
    subject: 'Physics',
    duration: '60 mins',
    questions: 30,
    date: '25 Feb, 04:00 PM',
    status: 'Upcoming',
    color: '#FF9F43',
  },
];

const COMPLETED_TESTS = [
  {
    id: '3',
    title: 'Mathematics: Calculus Part 1',
    score: '84/100',
    percentile: '98.5',
    date: '22 Feb 2024',
    status: 'Passed',
    color: '#6BCB77',
  },
];

const TestScreen = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('Upcoming');
  const user = useAuthStore(state => state.user);

  const { data: tests, isLoading, isError, refetch } = useTests({
    status: activeTab.toUpperCase(),
  });

  const renderCategory = ({ item }: any) => (
    <TouchableOpacity style={styles.categoryCard}>
      <View style={[styles.categoryIcon, { backgroundColor: item.color + '15' }]}>
        <Icon name={item.icon} size={28} color={item.color} />
      </View>
      <Text style={[styles.categoryName, { color: theme.textSecondary }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderUpcomingTest = ({ item }: any) => (
    <View style={[styles.testCard, { backgroundColor: theme.surface, borderLeftColor: item.color || theme.primary, borderLeftWidth: 4 }]}>
      <View style={styles.testHeader}>
        <Text style={[styles.testTag, { color: item.color || theme.primary, backgroundColor: (item.color || theme.primary) + '15' }]}>
          {item.status}
        </Text>
        <Text style={[styles.testDate, { color: theme.textSecondary }]}>
          {item.date ? new Date(item.date).toLocaleDateString([], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Date TBD'}
        </Text>
      </View>
      <Text style={[styles.testTitle, { color: theme.text }]}>{item.title}</Text>
      <Text style={[styles.testSubject, { color: theme.textSecondary }]}>{item.subject || 'All Subjects'}</Text>
      
      <View style={styles.testFooter}>
        <View style={styles.footerItem}>
          <Icon name="clock-outline" size={16} color={theme.textSecondary} />
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>{item.duration} mins</Text>
        </View>
        <View style={styles.footerItem}>
          <Icon name="help-circle-outline" size={16} color={theme.textSecondary} />
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>{item.totalQuestions} Qs</Text>
        </View>
      </View>
      <TouchableOpacity style={[styles.detailsBtn, { borderColor: theme.border }]}>
        <Text style={[styles.detailsBtnText, { color: theme.primary }]}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.background === '#ffffff' ? 'dark-content' : 'light-content'} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Tests & Quizzes</Text>
          <TouchableOpacity style={[styles.historyBtn, { backgroundColor: theme.surface }]}>
            <Icon name="history" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Stats Summary */}
        <View style={[styles.statsRow, { backgroundColor: theme.primary }]}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Tests Taken</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>94.2</Text>
            <Text style={styles.statLabel}>Avg Percentile</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>450</Text>
            <Text style={styles.statLabel}>Total Marks</Text>
          </View>
        </View>

        {/* Categories */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Explore</Text>
        <FlatList
          data={TEST_CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {['Upcoming', 'Live', 'Completed'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                activeTab === tab && { borderBottomColor: theme.primary, borderBottomWidth: 3 },
              ]}
            >
              <Text style={[
                styles.tabText,
                { color: activeTab === tab ? theme.primary : theme.textSecondary }
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content based on Active Tab */}
        <View style={styles.listContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 40 }} />
          ) : isError ? (
            <View style={styles.emptyContainer}>
              <Icon name="alert-circle-outline" size={60} color={theme.textSecondary} />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Failed to load tests</Text>
              <TouchableOpacity onPress={() => refetch()} style={[styles.retryBtn, { backgroundColor: theme.primary }]}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (tests && tests.length > 0) ? (
            <FlatList
              data={tests}
              renderItem={renderUpcomingTest}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Icon name="clipboard-text-outline" size={60} color={theme.textSecondary} />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No {activeTab.toLowerCase()} tests found</Text>
            </View>
          )}
        </View>
      </ScrollView>
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
    paddingTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  historyBtn: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    marginTop: 4,
  },
  verticalDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  categoryList: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 25,
  },
  categoryIcon: {
    width: 65,
    height: 65,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 25,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  testCard: {
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  testTag: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    textTransform: 'uppercase',
  },
  testDate: {
    fontSize: 12,
    fontWeight: '500',
  },
  testTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  testSubject: {
    fontSize: 14,
    marginBottom: 15,
  },
  testFooter: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  footerText: {
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
  },
  detailsBtn: {
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  detailsBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 15,
    fontSize: 14,
  },
  retryBtn: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
});

export default TestScreen;
