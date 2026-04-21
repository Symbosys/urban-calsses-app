import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/theme';
import { useAuthStore } from '../../store/auth.store';
import { useNavigation } from '@react-navigation/native';

const InfoRow = ({ label, value, icon, theme }: any) => (
  <View style={[styles.infoRow, { borderBottomColor: theme.border }]}>
    <View style={[styles.iconBox, { backgroundColor: theme.surface }]}>
      <Icon name={icon} size={22} color={theme.primary} />
    </View>
    <View style={styles.textBox}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
      <Text style={[styles.value, { color: theme.text }]}>{value || 'Not provided'}</Text>
    </View>
  </View>
);

const PersonalInformationScreen = () => {
  const theme = useTheme();
  const { user } = useAuthStore();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.background === '#ffffff' ? 'dark-content' : 'light-content'} />
      
      {/* Custom Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Personal Information</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Summary Badge */}
        <View style={[styles.summaryCard, { backgroundColor: theme.surface }]}>
          <View style={[styles.avatar, { backgroundColor: theme.primary + '15' }]}>
            <Icon name="account" size={50} color={theme.primary} />
          </View>
          <View style={styles.summaryText}>
            <Text style={[styles.summaryName, { color: theme.text }]}>
              {user?.email?.split('@')[0] || 'User Name'}
            </Text>
            <Text style={[styles.summaryRole, { color: theme.textSecondary }]}>
              Student • {user?.account?.role || 'Guest'}
            </Text>
          </View>
        </View>

        {/* Detailed Info */}
        <View style={styles.infoSection}>
          <InfoRow 
            label="Full Name" 
            value={user?.email?.split('@')[0]} 
            icon="account-outline" 
            theme={theme} 
          />
          <InfoRow 
            label="Email Address" 
            value={user?.email} 
            icon="email-outline" 
            theme={theme} 
          />
          <InfoRow 
            label="Phone Number" 
            value="+91 98765 43210" 
            icon="phone-outline" 
            theme={theme} 
          />
          <InfoRow 
            label="Address" 
            value="New Delhi, India" 
            icon="map-marker-outline" 
            theme={theme} 
          />
          <InfoRow 
            label="Account Status" 
            value="Verified" 
            icon="check-decagram-outline" 
            theme={theme} 
          />
          <InfoRow 
            label="Account ID" 
            value={user?.accountId || user?.id} 
            icon="identifier" 
            theme={theme} 
          />
          <InfoRow 
            label="Member Since" 
            value="April 2024" 
            icon="calendar-account" 
            theme={theme} 
          />
        </View>

        <View style={styles.privacyNote}>
          <Icon name="shield-lock-outline" size={16} color={theme.textSecondary} />
          <Text style={[styles.privacyText, { color: theme.textSecondary }]}>
            Your personal information is secure and never shared with anyone.
          </Text>
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
  editButton: {
    padding: 5,
  },
  scrollContent: {
    padding: 20,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryText: {
    marginLeft: 20,
  },
  summaryName: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  summaryRole: {
    fontSize: 14,
    marginTop: 4,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textBox: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  privacyText: {
    fontSize: 12,
    marginLeft: 8,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default PersonalInformationScreen;
