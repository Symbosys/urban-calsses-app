import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/theme';
import { useCourses } from '../../api/hooks/course.hooks';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const EnrolledCourseCard = ({ course, theme }: any) => {
  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.surface }]}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: course.thumbnail?.secure_url || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&auto=format&fit=crop&q=60' }} 
          style={styles.courseImage} 
        />
        <View style={styles.progressBadge}>
          <Text style={styles.progressBadgeText}>75% Done</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.courseTitle, { color: theme.text }]} numberOfLines={2}>
          {course.title}
        </Text>
        <Text style={[styles.instructor, { color: theme.textSecondary }]}>
          by {course.instructors?.[0]?.instructor?.name || 'Urban Expert'}
        </Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Icon name="play-circle-outline" size={16} color={theme.primary} />
            <Text style={[styles.statText, { color: theme.textSecondary }]}>24 Lectures</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="file-document-outline" size={16} color={theme.primary} />
            <Text style={[styles.statText, { color: theme.textSecondary }]}>12 PDF Notes</Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressBarBg, { backgroundColor: theme.border }]}>
            <View style={[styles.progressBarFill, { backgroundColor: theme.primary, width: '75%' }]} />
          </View>
          <TouchableOpacity style={[styles.resumeBtn, { backgroundColor: theme.primary }]}>
            <Text style={styles.resumeBtnText}>Resume</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const EnrolledCoursesScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { data, isLoading } = useCourses({ limit: 10 }); 

  const courses = data?.courses || [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.background === '#ffffff' ? 'dark-content' : 'light-content'} />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Enrolled Courses</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="magnify" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Fetching your courses...</Text>
        </View>
      ) : (
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.infoBox}>
            <Icon name="information-outline" size={20} color={theme.primary} />
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              You have {courses.length} active courses in your portfolio. Keep learning!
            </Text>
          </View>

          {courses.map((course: any) => (
            <EnrolledCourseCard key={course.id || Math.random().toString()} course={course} theme={theme} />
          ))}

          {courses.length === 0 && (
            <View style={styles.emptyState}>
              <Icon name="book-outline" size={80} color={theme.border} />
              <Text style={[styles.emptyTitle, { color: theme.text }]}>No Courses Enrolled</Text>
              <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
                Browse our store to find the perfect batch for your goals.
              </Text>
              <TouchableOpacity 
                style={[styles.browseBtn, { backgroundColor: theme.primary }]}
                onPress={() => navigation.navigate('Main', { screen: 'Store' })}
              >
                <Text style={styles.browseBtnText}>Explore Store</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 5,
  },
  scrollContent: {
    padding: 20,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(77, 150, 255, 0.05)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 13,
    marginLeft: 10,
    fontWeight: '500',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '500',
  },
  card: {
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  imageWrapper: {
    position: 'relative',
  },
  courseImage: {
    width: '100%',
    height: 180,
  },
  progressBadge: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  progressBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6,
    lineHeight: 24,
  },
  instructor: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 15,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  resumeBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  resumeBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  browseBtn: {
    marginTop: 25,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 16,
  },
  browseBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EnrolledCoursesScreen;
