import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/theme';
import { useAuthStore } from '../../store/auth.store';
import { useNavigation } from '@react-navigation/native';
import { useDashboard } from '../../api/hooks/user.hooks';

const { width } = Dimensions.get('window');

const ProfileItem = ({ icon, label, onPress, color, theme, subtitle }: any) => (
  <TouchableOpacity
    style={[styles.profileItem, { backgroundColor: theme.surface }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.iconContainer, { backgroundColor: (color || theme.primary) + '10' }]}>
      <Icon name={icon} size={22} color={color || theme.primary} />
    </View>
    <View style={styles.labelContainer}>
      <Text style={[styles.profileItemLabel, { color: theme.text }]}>{label}</Text>
      {subtitle && <Text style={[styles.profileItemSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>}
    </View>
    <Icon name="chevron-right" size={20} color={theme.textSecondary + '80'} />
  </TouchableOpacity>
);

const StatCard = ({ icon, value, label, theme, color }: any) => (
  <View style={[styles.statItem, { backgroundColor: theme.surface }]}>
    <View style={[styles.statIconContainer, { backgroundColor: color + '15' }]}>
      <Icon name={icon} size={20} color={color} />
    </View>
    <View style={styles.statInfo}>
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{label}</Text>
    </View>
  </View>
);

const ProfileScreen = () => {
  const theme = useTheme();
  const { user, logout } = useAuthStore();
  const navigation = useNavigation<any>();
  const { data: dashboardData } = useDashboard();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from Urban Classes?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive', 
          onPress: logout 
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.background === '#ffffff' ? 'dark-content' : 'light-content'} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Modern Header Section */}
        <View style={[styles.header, { backgroundColor: theme.primary }]}>
          {/* Decorative shapes for background texture */}
          <View style={[styles.decorativeCircle, { top: -50, right: -50, opacity: 0.1 }]} />
          <View style={[styles.decorativeCircle, { bottom: -30, left: -40, opacity: 0.05, width: 150, height: 150 }]} />
          
          <View style={styles.headerTop}>
            <Text style={[styles.headerTitle, { color: theme.white }]}>Profile</Text>
            <TouchableOpacity style={styles.settingsBtn}>
              <Icon name="cog-outline" size={24} color={theme.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerContent}>
            <View style={styles.avatarWrapper}>
              <View style={[styles.avatarBorder, { borderColor: theme.white + '30' }]}>
                <View style={[styles.avatar, { backgroundColor: theme.surface }]}>
                  <Icon name="account" size={65} color={theme.primary} />
                </View>
              </View>
              <TouchableOpacity style={[styles.editBadge, { backgroundColor: theme.white }]}>
                <Icon name="pencil" size={14} color={theme.primary} />
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.userName, { color: theme.white }]}>
              {user?.name || user?.email?.split('@')[0] || 'Learning Student'}
            </Text>
            <View style={[styles.badgeContainer, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
              <Icon name="shield-check" size={14} color={theme.white} />
              <Text style={[styles.badgeText, { color: theme.white }]}>Verified Student</Text>
            </View>
          </View>
        </View>

        {/* Improved Stats Section */}
        <View style={styles.statsWrapper}>
          <StatCard 
            icon="book-open-variant" 
            value={dashboardData?.enrolledCoursesCount || '0'} 
            label="Courses" 
            theme={theme} 
            color="#4D96FF" 
          />
          <StatCard 
            icon="medal" 
            value="45%" 
            label="Progress" 
            theme={theme} 
            color="#FF9F43" 
          />
          <StatCard 
            icon="clock-check" 
            value={`${dashboardData?.learningHours || 0}h`} 
            label="Learned" 
            theme={theme} 
            color="#6BCB77" 
          />
        </View>

        {/* Premium Action List */}
        <View style={styles.mainContainer}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>LEARNING JOURNEY</Text>
            <ProfileItem 
              icon="account-circle-outline" 
              label="Personal Information" 
              subtitle="Email, name, and account details"
              theme={theme}
              onPress={() => navigation.navigate('PersonalInformation')} 
            />
            <ProfileItem 
              icon="notebook-outline" 
              label="My Enrolled Courses" 
              subtitle="Access your learning material"
              theme={theme}
              onPress={() => navigation.navigate('EnrolledCourses')} 
            />
            <ProfileItem 
              icon="certificate-outline" 
              label="Certificates" 
              subtitle="View and download your awards"
              theme={theme}
              onPress={() => {}} 
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>PREFERENCES</Text>
            <ProfileItem 
              icon="bell-ring-outline" 
              label="Notifications" 
              subtitle="Manage updates and alerts"
              theme={theme}
              onPress={() => {}} 
            />
            <ProfileItem 
              icon="palette-outline" 
              label="App Theme" 
              subtitle="Light or dark mode selection"
              theme={theme}
              onPress={() => {}} 
            />
            <ProfileItem 
              icon="shield-lock-outline" 
              label="Privacy & Security" 
              subtitle="Password and data management"
              theme={theme}
              onPress={() => {}} 
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>HELP & FEEDBACK</Text>
            <ProfileItem 
              icon="message-question-outline" 
              label="Support Center" 
              subtitle="Get help with your courses"
              theme={theme}
              onPress={() => {}} 
            />
            <ProfileItem 
              icon="star-outline" 
              label="Rate the App" 
              subtitle="Let us know your feedback"
              theme={theme}
              onPress={() => {}} 
            />
          </View>

          <TouchableOpacity 
            style={[styles.logoutButton, { backgroundColor: theme.surface }]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <View style={styles.logoutContent}>
              <View style={styles.logoutIconBox}>
                <Icon name="logout-variant" size={22} color="#FF3B30" />
              </View>
              <Text style={styles.logoutText}>Sign Out From Account</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} 
              style={{ width: 24, height: 24, marginBottom: 10, opacity: 0.5 }} 
            />
            <Text style={[styles.versionText, { color: theme.textSecondary }]}>
              URBAN CLASSES • VERSION 1.0.4
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingBottom: 45,
    paddingTop: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    position: 'relative',
  },
  decorativeCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  settingsBtn: {
    padding: 5,
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 15,
  },
  avatarBorder: {
    padding: 5,
    borderRadius: 60,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  editBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    letterSpacing: 0.3,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  statsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -35,
    zIndex: 10,
  },
  statItem: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 18,
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 15,
    letterSpacing: 1.5,
    paddingLeft: 5,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  labelContainer: {
    flex: 1,
  },
  profileItemLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  profileItemSubtitle: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF3B3020',
    overflow: 'hidden',
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  logoutIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FF3B3010',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  footer: {
    paddingVertical: 40,
    alignItems: 'center',
    opacity: 0.6,
  },
  versionText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
});

export default ProfileScreen;
