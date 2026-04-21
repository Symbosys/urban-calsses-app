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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/theme';

const OFFLINE_CLASSES = [
  {
    id: '1',
    title: 'Kinematics & Dynamics',
    subject: 'Physics',
    duration: '1h 25m',
    size: '145 MB',
    date: '20 Feb 2024',
    thumbnailColor: '#FF9F43',
    icon: 'motion-play',
  },
  {
    id: '2',
    title: 'Integration Techniques',
    subject: 'Mathematics',
    duration: '55m',
    size: '88 MB',
    date: '18 Feb 2024',
    thumbnailColor: '#4D96FF',
    icon: 'math-integral',
  },
  {
    id: '3',
    title: 'Organic Chemistry Basics',
    subject: 'Chemistry',
    duration: '1h 10m',
    size: '112 MB',
    date: '15 Feb 2024',
    thumbnailColor: '#6BCB77',
    icon: 'flask-outline',
  },
  {
    id: '4',
    title: 'Shakespearean Tragedies',
    subject: 'English',
    duration: '45m',
    size: '64 MB',
    date: '12 Feb 2024',
    thumbnailColor: '#FF6B6B',
    icon: 'book-open-page-variant',
  },
];

const OfflineScreen = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('Videos');

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconCircle, { backgroundColor: theme.accent }]}>
        <Icon name="cloud-download-outline" size={80} color={theme.primary} />
      </View>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>No Downloads Yet</Text>
      <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
        Your downloaded classes will appear here for offline viewing.
      </Text>
      <TouchableOpacity style={[styles.browseBtn, { backgroundColor: theme.primary }]}>
        <Text style={styles.browseBtnText}>Browse Classes</Text>
      </TouchableOpacity>
    </View>
  );

  const renderClassItem = ({ item }: any) => (
    <TouchableOpacity style={[styles.classCard, { backgroundColor: theme.surface, shadowColor: theme.black }]}>
      <View style={[styles.thumbnail, { backgroundColor: item.thumbnailColor }]}>
        <Icon name={item.icon} size={32} color="#fff" />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.classDetails}>
        <View style={styles.classHeader}>
          <Text style={[styles.subjectTag, { color: theme.primary, backgroundColor: theme.primary + '15' }]}>
            {item.subject}
          </Text>
          <TouchableOpacity>
            <Icon name="dots-vertical" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.classTitle, { color: theme.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.classFooter}>
          <View style={styles.footerInfo}>
            <Icon name="file-video-outline" size={14} color={theme.textSecondary} />
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>{item.size}</Text>
          </View>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.background === '#ffffff' ? 'dark-content' : 'light-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Downloads</Text>
        <View style={styles.storageContainer}>
          <View style={styles.storageLabelRow}>
            <Text style={[styles.storageText, { color: theme.textSecondary }]}>Device Storage</Text>
            <Text style={[styles.storageValue, { color: theme.text }]}>12.4 GB / 64 GB</Text>
          </View>
          <View style={[styles.progressBarBg, { backgroundColor: theme.border }]}>
            <View style={[styles.progressBarFill, { backgroundColor: theme.primary, width: '25%' }]} />
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Videos', 'Documents'].map((tab) => (
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

      {/* Content */}
      {OFFLINE_CLASSES.length > 0 && activeTab === 'Videos' ? (
        <FlatList
          data={OFFLINE_CLASSES}
          renderItem={renderClassItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : activeTab === 'Documents' ? (
        <View style={styles.centered}>
           <Icon name="file-document-outline" size={60} color={theme.textSecondary} />
           <Text style={{ color: theme.textSecondary, marginTop: 10 }}>No downloaded documents</Text>
        </View>
      ) : (
        renderEmptyState()
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
    paddingTop: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  storageContainer: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 15,
    borderRadius: 12,
  },
  storageLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  storageText: {
    fontSize: 13,
  },
  storageValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 25,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 20,
  },
  classCard: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  classDetails: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectTag: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    textTransform: 'uppercase',
  },
  classTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
    lineHeight: 22,
  },
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  browseBtn: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  browseBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default OfflineScreen;
