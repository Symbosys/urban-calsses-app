import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { useTheme } from '../../theme/theme';
import { useAuthStore } from '../../store/auth.store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useGetAllSubCategories, useSetUserGoals, useGetUserGoals } from '../../api/hooks/goalsuser';

const { width } = Dimensions.get('window');

const GoalSelectionScreen = () => {
  const theme = useTheme();
  const { user, setGoal } = useAuthStore();
  const [selected, setSelected] = React.useState<string | null>(null);

  const { 
    data: subCategories, 
    isLoading: isLoadingSubs, 
    isError: isErrorSubs 
  } = useGetAllSubCategories();
  
  const { 
    data: userGoals, 
    isLoading: isLoadingGoals 
  } = useGetUserGoals(user?.id || '');

  const setUserGoalsMutation = useSetUserGoals();

  // If user already has goals, auto-select the first one and move on
  React.useEffect(() => {
    if (userGoals && userGoals.length > 0) {
      setGoal(userGoals[0].subCategoryId);
    }
  }, [userGoals, setGoal]);

  const getIcon = (name: string) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('upsc')) return 'shield-star';
    if (lowercaseName.includes('ssc')) return 'briefcase-account';
    if (lowercaseName.includes('bank')) return 'bank';
    if (lowercaseName.includes('rail')) return 'train-variant';
    if (lowercaseName.includes('jee') || lowercaseName.includes('iit')) return 'atom';
    if (lowercaseName.includes('neet') || lowercaseName.includes('medical')) return 'heart-pulse';
    if (lowercaseName.includes('pcs')) return 'map-marker-star';
    if (lowercaseName.includes('cuet')) return 'book-open-variant';
    return 'school';
  };

  const handleContinue = () => {
    if (selected && user?.id) {
      setUserGoalsMutation.mutate(
        { userId: user.id, subCategoryIds: [selected] },
        {
          onSuccess: () => {
            setGoal(selected);
          },
        }
      );
    }
  };

  if (isLoadingSubs || isLoadingGoals) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (isErrorSubs) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Icon name="alert-circle-outline" size={64} color="#FF5252" />
        <Text style={[styles.emptyTitle, { color: theme.text }]}>Failed to load goals</Text>
        <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>Please check your internet connection and try again.</Text>
      </View>
    );
  }

  const hasSubCategories = subCategories && subCategories.length > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: theme.textSecondary }]}>Welcome to Urban Classes 👋</Text>
          <Text style={[styles.title, { color: theme.text }]}>What is your focus of preparation?</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Select a goal to personalize your learning experience</Text>
        </View>

        {!hasSubCategories ? (
          <View style={styles.emptyState}>
            <Icon name="database-off-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>No Goals Available</Text>
            <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>We're currently setting up the preparation goals. Please check back later.</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {subCategories?.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalCard,
                  { 
                    backgroundColor: theme.surface,
                    borderColor: selected === goal.id ? theme.primary : theme.border
                  }
                ]}
                activeOpacity={0.7}
                onPress={() => setSelected(goal.id)}
              >
                <View style={[styles.iconContainer, { backgroundColor: (goal.category?.name === 'UPSC' ? '#8B0000' : theme.primary) + '15' }]}>
                  <Icon 
                    name={getIcon(goal.name)} 
                    size={32} 
                    color={goal.category?.name === 'UPSC' ? '#8B0000' : theme.primary} 
                  />
                </View>
                <Text style={[styles.goalName, { color: theme.text }]} numberOfLines={1}>{goal.name}</Text>
                <Text style={[styles.goalSubtitle, { color: theme.textSecondary }]} numberOfLines={2}>
                  {goal.description || 'Preparation focus'}
                </Text>
                
                {selected === goal.id && (
                  <View style={[styles.selectedBadge, { backgroundColor: theme.primary }]}>
                    <Icon name="check" size={14} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {hasSubCategories && (
        <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              { backgroundColor: selected ? theme.primary : theme.border }
            ]}
            disabled={!selected || setUserGoalsMutation.isPending}
            onPress={handleContinue}
          >
            {setUserGoalsMutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={[styles.continueText, { color: selected ? '#fff' : theme.textSecondary }]}>Continue to Dashboard</Text>
                <Icon name="arrow-right" size={20} color={selected ? '#fff' : theme.textSecondary} />
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 40,
    marginTop: 20,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 40,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
  },
  goalCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 24,
    borderWidth: 2,
    marginBottom: 16,
    position: 'relative',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
  },
  goalSubtitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  selectedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  continueButton: {
    height: 64,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '900',
  },
});

export default GoalSelectionScreen;
