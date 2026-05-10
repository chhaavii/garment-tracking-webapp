import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Scan, ClipboardList, TriangleAlert as AlertTriangle, Shirt as ShirtIcon, Activity, Settings, Bell, Clock, Moon, Sun } from 'lucide-react-native';
import { useState, useEffect } from 'react';

export default function HomeScreen() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check system preference for dark mode
    const checkDarkMode = () => {
      // For web, we can check prefers-color-scheme
      if (typeof window !== 'undefined') {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);
        
        const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener('change', handleChange);
        return () => darkModeQuery.removeEventListener('change', handleChange);
      }
    };
    
    checkDarkMode();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const quickActions = [
    {
      title: 'Scan Patient Tag',
      subtitle: 'Tap to scan NFC tag',
      icon: Scan,
      color: '#0ea5e9',
      route: '/scan',
      urgent: false
    },
    {
      title: 'Emergency Info',
      subtitle: 'Quick access mode',
      icon: AlertTriangle,
      color: '#ef4444',
      route: '/emergency',
      urgent: true
    },
    {
      title: 'Treatment Logs',
      subtitle: 'View patient records',
      icon: ClipboardList,
      color: '#10b981',
      route: '/treatment-logs',
      urgent: false
    },
    {
      title: 'Garment Tracker',
      subtitle: 'Track washing & sterilization',
      icon: ShirtIcon,
      color: '#8b5cf6',
      route: '/garment-tracker',
      urgent: false
    },
    {
      title: 'Staff Activity',
      subtitle: 'Monitor team activity',
      icon: Activity,
      color: '#f59e0b',
      route: '/staff-activity',
      urgent: false
    },
    {
      title: 'Settings',
      subtitle: 'App configuration',
      icon: Settings,
      color: '#6b7280',
      route: '/settings',
      urgent: false
    }
  ];

  const recentActivity = [
    { patient: 'John Doe', action: 'Medication logged', time: '2 min ago', ward: 'ICU-3' },
    { patient: 'Sarah Johnson', action: 'Vitals recorded', time: '8 min ago', ward: 'Ward-2A' },
    { patient: 'Mike Wilson', action: 'Garment scanned', time: '15 min ago', ward: 'OR-1' },
  ];

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar style="light" backgroundColor={isDarkMode ? "#1e293b" : "#0ea5e9"} />
      
      {/* Header */}
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={[styles.hospitalName, isDarkMode && styles.hospitalNameDark]}>St. Mary's Hospital</Text>
            <Text style={[styles.dateTime, isDarkMode && styles.dateTimeDark]}>{currentTime}</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#ffffff" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.darkModeButton} onPress={toggleDarkMode}>
              {isDarkMode ? <Sun size={20} color="#ffffff" /> : <Moon size={20} color="#ffffff" />}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={[styles.scrollView, isDarkMode && styles.scrollViewDark]} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeTitle, isDarkMode && styles.welcomeTitleDark]}>Welcome back, Dr. Smith</Text>
          <Text style={[styles.welcomeSubtitle, isDarkMode && styles.welcomeSubtitleDark]}>Ready to provide exceptional care</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, isDarkMode && styles.statCardDark]}>
            <Text style={[styles.statNumber, isDarkMode && styles.statNumberDark]}>23</Text>
            <Text style={[styles.statLabel, isDarkMode && styles.statLabelDark]}>Active Patients</Text>
          </View>
          <View style={[styles.statCard, isDarkMode && styles.statCardDark]}>
            <Text style={[styles.statNumber, isDarkMode && styles.statNumberDark]}>8</Text>
            <Text style={[styles.statLabel, isDarkMode && styles.statLabelDark]}>Pending Logs</Text>
          </View>
          <View style={[styles.statCard, isDarkMode && styles.statCardDark]}>
            <Text style={[styles.statNumber, isDarkMode && styles.statNumberDark]}>12</Text>
            <Text style={[styles.statLabel, isDarkMode && styles.statLabelDark]}>Clean Garments</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.sectionTitleDark]}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.actionCard,
                  isDarkMode && styles.actionCardDark,
                  action.urgent && (isDarkMode ? styles.urgentCardDark : styles.urgentCard)
                ]}
                onPress={() => router.push(action.route as any)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={24} color="#ffffff" />
                </View>
                <Text style={[styles.actionTitle, isDarkMode && styles.actionTitleDark]}>{action.title}</Text>
                <Text style={[styles.actionSubtitle, isDarkMode && styles.actionSubtitleDark]}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.sectionTitleDark]}>Recent Activity</Text>
          <View style={[styles.activityContainer, isDarkMode && styles.activityContainerDark]}>
            {recentActivity.map((item, index) => (
              <View key={index} style={[styles.activityItem, isDarkMode && styles.activityItemDark]}>
                <View style={[styles.activityIcon, isDarkMode && styles.activityIconDark]}>
                  <Clock size={16} color={isDarkMode ? "#9ca3af" : "#6b7280"} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={[styles.activityPatient, isDarkMode && styles.activityPatientDark]}>{item.patient}</Text>
                  <Text style={[styles.activityAction, isDarkMode && styles.activityActionDark]}>{item.action}</Text>
                  <Text style={[styles.activityMeta, isDarkMode && styles.activityMetaDark]}>{item.ward} • {item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  header: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerDark: {
    backgroundColor: '#1e293b',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hospitalName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  hospitalNameDark: {
    color: '#f1f5f9',
  },
  dateTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#e0f2fe',
    marginTop: 2,
  },
  dateTimeDark: {
    color: '#cbd5e1',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  darkModeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewDark: {
    backgroundColor: '#0f172a',
  },
  welcomeSection: {
    padding: 20,
    paddingBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  welcomeTitleDark: {
    color: '#f1f5f9',
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  welcomeSubtitleDark: {
    color: '#94a3b8',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statCardDark: {
    backgroundColor: '#1e293b',
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#0ea5e9',
    marginBottom: 4,
  },
  statNumberDark: {
    color: '#38bdf8',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    textAlign: 'center',
  },
  statLabelDark: {
    color: '#94a3b8',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  sectionTitleDark: {
    color: '#f1f5f9',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  actionCardDark: {
    backgroundColor: '#1e293b',
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  urgentCard: {
    borderWidth: 2,
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
  },
  urgentCardDark: {
    borderColor: '#7f1d1d',
    backgroundColor: '#450a0a',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionTitleDark: {
    color: '#f1f5f9',
  },
  actionSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  actionSubtitleDark: {
    color: '#94a3b8',
  },
  activityContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  activityContainerDark: {
    backgroundColor: '#1e293b',
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  activityItemDark: {
    borderBottomColor: '#334155',
  },
  activityIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconDark: {
    backgroundColor: '#334155',
  },
  activityContent: {
    flex: 1,
  },
  activityPatient: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 2,
  },
  activityPatientDark: {
    color: '#f1f5f9',
  },
  activityAction: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginBottom: 2,
  },
  activityActionDark: {
    color: '#cbd5e1',
  },
  activityMeta: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  activityMetaDark: {
    color: '#64748b',
  },
});