import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/theme';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (email.length > 0) {
      console.log('Sending OTP to:', email);
      setIsOtpSent(true);
    }
  };

  const handleVerifyOtp = () => {
    console.log('Verifying OTP:', otp, 'for:', email);
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.background === '#ffffff' ? 'dark-content' : 'light-content'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => isOtpSent ? setIsOtpSent(false) : navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={[styles.logoContainer, { backgroundColor: theme.accent }]}>
            <Icon name="school" size={60} color={theme.primary} />
          </View>
          <Text style={[styles.title, { color: theme.primary }]}>Urban Classes</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {isOtpSent 
              ? `Verification code sent to\n${email}` 
              : 'Enter your email or phone to receive an OTP'}
          </Text>
        </View>

        <View style={styles.form}>
          {!isOtpSent ? (
            <View style={[styles.inputContainer, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
              <Icon name="email-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Email or Mobile Number"
                placeholderTextColor={theme.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          ) : (
            <View style={[styles.inputContainer, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
              <Icon name="numeric" size={20} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Enter 6-digit OTP"
                placeholderTextColor={theme.placeholder}
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>
          )}

          {isOtpSent && (
            <TouchableOpacity style={styles.resendContainer} onPress={handleSendOtp}>
              <Text style={[styles.resendText, { color: theme.textSecondary }]}>
                Didn't receive OTP? <Text style={[styles.resendLink, { color: theme.primary }]}>Resend</Text>
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={[styles.loginButton, { backgroundColor: theme.primary, shadowColor: theme.primary }]} 
            onPress={isOtpSent ? handleVerifyOtp : handleSendOtp}
          >
            <Text style={styles.loginButtonText}>
              {isOtpSent ? 'Verify & Login' : 'Continue'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={[styles.registerText, { color: theme.primary }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 55,
    fontSize: 16,
  },
  resendContainer: {
    marginBottom: 25,
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
  },
  resendLink: {
    fontWeight: 'bold',
  },
  loginButton: {
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  footerText: {
    fontSize: 14,
  },
  registerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
