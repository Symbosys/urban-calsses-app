import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/theme';
import { useAuthStore } from '../../store/auth.store';
import { useCategories, useBanners } from '../../api/hooks/category.hooks';
import { useDashboard } from '../../api/hooks/user.hooks';

const { width } = Dimensions.get('window');

const getCategoryStyles = (name: string) => {
  const lowercaseName = name.toLowerCase();
  if (lowercaseName.includes('physic')) return { icon: 'atom', color: '#FF9F43' };
  if (lowercaseName.includes('math')) return { icon: 'calculator', color: '#4D96FF' };
  if (lowercaseName.includes('chem')) return { icon: 'flask-outline', color: '#6BCB77' };
  if (lowercaseName.includes('english')) return { icon: 'book-open-page-variant', color: '#FF6B6B' };
  if (lowercaseName.includes('biol')) return { icon: 'dna', color: '#9B51E0' };
  return { icon: 'folder-open', color: '#A0A0A0' };
};

const SectionHeader = ({ title, actionLabel, onAction, theme }: any) => (
  <View style={styles.sectionHeader}>
    <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
    {actionLabel && (
      <TouchableOpacity onPress={onAction}>
        <Text style={[styles.actionText, { color: theme.primary }]}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const StudyScreen = () => {
  const theme = useTheme();
  const user = useAuthStore((state) => state.user);
  const { data: categoryData, isLoading: categoriesLoading } = useCategories();
  const { data: bannerData, isLoading: bannersLoading } = useBanners();
  const { data: dashboardData, isLoading: dashboardLoading } = useDashboard();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const renderSubject = ({ item }: any) => {
    const { icon, color } = getCategoryStyles(item.name);
    return (
      <TouchableOpacity style={[styles.subjectItem, { backgroundColor: theme.surface }]} activeOpacity={0.8}>
        <View style={[styles.subjectIcon, { backgroundColor: color + '15' }]}>
          <Icon name={icon} size={30} color={color} />
        </View>
        <Text style={[styles.subjectName, { color: theme.text }]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderLecture = ({ item }: any) => (
    <TouchableOpacity 
      style={[styles.lectureCard, { backgroundColor: theme.surface }]} 
      activeOpacity={0.9}
    >
      <View style={styles.lectureImageWrapper}>
        <Image 
          source={{ uri: item.thumbnail?.secure_url || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&auto=format&fit=crop&q=60' }} 
          style={styles.lectureImage} 
        />
        <View style={styles.playOverlay}>
          <Icon name="play" size={24} color="#fff" />
        </View>
      </View>
      
        <View style={styles.lectureInfo}>
        <View style={styles.lectureStatusRow}>
          <View style={[styles.statusBadge, { backgroundColor: theme.primary + '15' }]}>
            <Text style={[styles.statusText, { color: theme.primary }]}>
              {item.level || 'All Levels'}
            </Text>
          </View>
          <Text style={[styles.durationText, { color: theme.textSecondary }]}>
            {item.progress || 0}% complete
          </Text>
        </View>
        
        <Text style={[styles.lectureTitle, { color: theme.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.lectureInstructor, { color: theme.textSecondary }]}>
          {item.instructors?.[0]?.instructor?.name || 'Academic Expert'}
        </Text>
        
        <View style={styles.progressSection}>
          <View style={[styles.progressBarBg, { backgroundColor: theme.border }]}>
            <View style={[styles.progressBarFill, { backgroundColor: theme.primary, width: `${item.progress || 0}%` }]} />
          </View>
          <Text style={[styles.progressPercentage, { color: theme.primary }]}>{item.progress || 0}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.background === '#ffffff' ? 'dark-content' : 'light-content'} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Dynamic Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.textSecondary }]}>{getGreeting()},</Text>
            <Text style={[styles.userName, { color: theme.text }]}>
              {user?.name || 'Academic Hero'} 👋
            </Text>
          </View>
          <TouchableOpacity style={styles.profileCircle}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60' }} 
              style={styles.profileImg} 
            />
            <View style={[styles.onlineDot, { borderColor: theme.background }]} />
          </TouchableOpacity>
        </View>

        {/* Dynamic Banners / Live Section */}
        {bannersLoading ? (
          <ActivityIndicator size="large" color={theme.primary} style={{ marginBottom: 30 }} />
        ) : (
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bannerContainer}
          >
            {(bannerData && bannerData.length > 0) ? bannerData.map((banner: any) => (
              <TouchableOpacity 
                key={banner.id}
                style={[styles.liveBanner, { backgroundColor: theme.primary, width: width - 40 }]} 
                activeOpacity={0.9}
              >
                <Image 
                  source={{ uri: banner.image?.secure_url }} 
                  style={StyleSheet.absoluteFillObject} 
                  blurRadius={2}
                />
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />
                <View style={styles.liveContent}>
                  <View style={styles.liveBadge}>
                    <View style={styles.pulseDot} />
                    <Text style={styles.liveText}>NEW UPDATE</Text>
                  </View>
                  <Text style={[styles.liveTitle, { fontSize: 18 }]}>{banner.title}</Text>
                  <View style={styles.liveFooter}>
                    <Text style={styles.liveText}>Check details</Text>
                    <Icon name="arrow-right-circle" size={28} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>
            )) : (
              <TouchableOpacity 
                style={[styles.liveBanner, { backgroundColor: theme.primary, width: width - 40 }]} 
                activeOpacity={0.9}
              >
                <View style={styles.livePattern1} />
                <View style={styles.livePattern2} />
                <View style={styles.liveContent}>
                  <View style={styles.liveBadge}>
                    <View style={styles.pulseDot} />
                    <Text style={styles.liveText}>TRENDING LIVE</Text>
                  </View>
                  <Text style={styles.liveTitle}>Organic Chemistry: Named Reactions</Text>
                  <View style={styles.liveFooter}>
                    <View style={styles.participantAvatars}>
                      <Image source={{ uri: 'https://i.pravatar.cc/150?u=1' }} style={styles.tinyAvatar} />
                      <Image source={{ uri: 'https://i.pravatar.cc/150?u=2' }} style={[styles.tinyAvatar, { marginLeft: -10 }]} />
                      <Image source={{ uri: 'https://i.pravatar.cc/150?u=3' }} style={[styles.tinyAvatar, { marginLeft: -10 }]} />
                      <Text style={styles.liveParticipantCount}>+12k live</Text>
                    </View>
                    <Icon name="arrow-right-circle" size={28} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>
        )}

        {/* Improved Subjects */}
        <SectionHeader title="Explore Subjects" theme={theme} />
        <View style={styles.subjectsContainer}>
          {categoriesLoading ? (
            <ActivityIndicator size="large" color={theme.primary} style={{ marginVertical: 20 }} />
          ) : (
            <FlatList
              data={categoryData?.categories || []}
              renderItem={renderSubject}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.subjectList}
            />
          )}
        </View>

        {/* Professional Continue Watching */}
        <SectionHeader 
          title="Continue Learning" 
          actionLabel="Watch History" 
          onAction={() => {}} 
          theme={theme} 
        />
        <View style={styles.lecturesContainer}>
          {dashboardLoading ? (
            <ActivityIndicator size="large" color={theme.primary} style={{ marginVertical: 20 }} />
          ) : (dashboardData?.courses && dashboardData.courses.length > 0) ? (
            <FlatList
              data={dashboardData.courses}
              renderItem={renderLecture}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.lectureList}
            />
          ) : (
            <View style={[styles.emptyState, { backgroundColor: theme.surface }]}>
              <Icon name="book-open-variant" size={40} color={theme.textSecondary} />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No courses in progress</Text>
              <TouchableOpacity style={[styles.browseBtn, { backgroundColor: theme.primary }]}>
                <Text style={styles.browseBtnText}>Browse Courses</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Premium Quiz Card */}
        <TouchableOpacity 
          style={[styles.quizCard, { backgroundColor: theme.surface }]}
          activeOpacity={0.8}
        >
          <View style={[styles.quizIconBg, { backgroundColor: '#6BCB7715' }]}>
            <Icon name="rocket-launch" size={30} color="#6BCB77" />
          </View>
          <View style={styles.quizInfo}>
            <Text style={[styles.quizTitle, { color: theme.text }]}>Daily Brain Boost</Text>
            <Text style={[styles.quizSubtitle, { color: theme.textSecondary }]}>5 min quiz based on your goals</Text>
          </View>
          <View style={[styles.startBtn, { backgroundColor: theme.primary }]}>
            <Icon name="chevron-right" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  bannerContainer: {
    paddingLeft: 0,
    marginBottom: 10,
  },
  emptyState: {
    marginHorizontal: 20,
    padding: 30,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 15,
  },
  browseBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  browseBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 20,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 24,
    fontWeight: '900',
    marginTop: 2,
  },
  profileCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    position: 'relative',
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#eee',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#6BCB77',
    borderWidth: 2,
  },
  subjectsContainer: {
    marginBottom: 10,
  },
  lecturesContainer: {
    marginBottom: 10,
  },
  liveBanner: {
    marginHorizontal: 20,
    borderRadius: 28,
    padding: 24,
    marginBottom: 35,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  livePattern1: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -50,
    right: -30,
  },
  livePattern2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -20,
    left: -20,
  },
  liveContent: {
    zIndex: 2,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginRight: 6,
  },
  liveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  liveTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    lineHeight: 28,
  },
  liveFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tinyAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  liveParticipantCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
  },
  subjectList: {
    paddingHorizontal: 20,
    marginBottom: 35,
  },
  subjectItem: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    marginRight: 15,
    minWidth: 100,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  subjectIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '700',
  },
  lectureList: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  lectureCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 24,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  lectureImageWrapper: {
    position: 'relative',
  },
  lectureImage: {
    width: 95,
    height: 95,
    borderRadius: 20,
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
  },
  lectureInfo: {
    flex: 1,
    paddingLeft: 18,
  },
  lectureStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  durationText: {
    fontSize: 10,
    fontWeight: '600',
  },
  lectureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lectureInstructor: {
    fontSize: 12,
    marginBottom: 12,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressPercentage: {
    fontSize: 11,
    fontWeight: '900',
    minWidth: 30,
  },
  quizCard: {
    marginHorizontal: 20,
    borderRadius: 28,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    marginBottom: 20,
  },
  quizIconBg: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 17,
    fontWeight: '900',
  },
  quizSubtitle: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  startBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StudyScreen;
