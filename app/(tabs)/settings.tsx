import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Settings as SettingsIcon, User, Shield, Bell, Smartphone, Database, Wifi, Languages as Language, Moon, CircleHelp as HelpCircle, LogOut, ChevronRight, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [nfcEnabled, setNfcEnabled] = useState(true);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          title: 'Profile',
          subtitle: 'Dr. Sarah Wilson',
          action: 'navigate',
          color: '#0ea5e9'
        },
        {
          icon: Shield,
          title: 'Security',
          subtitle: 'Password, biometrics',
          action: 'navigate',
          color: '#10b981'
        },
        {
          icon: LogOut,
          title: 'Sign Out',
          subtitle: 'End current session',
          action: 'logout',
          color: '#ef4444'
        }
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          title: 'Push Notifications',
          subtitle: 'Patient alerts and updates',
          action: 'toggle',
          value: notifications,
          onToggle: setNotifications,
          color: '#f59e0b'
        }
      ]
    },
    {
      title: 'NFC & Hardware',
      items: [
        {
          icon: Smartphone,
          title: 'NFC Scanner',
          subtitle: 'Enable NFC tag scanning',
          action: 'toggle',
          value: nfcEnabled,
          onToggle: setNfcEnabled,
          color: '#8b5cf6'
        },
        {
          icon: AlertTriangle,
          title: 'Emergency Mode',
          subtitle: 'Quick access without login',
          action: 'toggle',
          value: emergencyMode,
          onToggle: setEmergencyMode,
          color: '#ef4444'
        }
      ]
    },
    {
      title: 'Data & Sync',
      items: [
        {
          icon: Database,
          title: 'Database Connection',
          subtitle: 'Connected to St. Mary\'s HIS',
          action: 'status',
          status: 'connected',
          color: '#10b981'
        },
        {
          icon: Wifi,
          title: 'Auto Sync',
          subtitle: 'Sync data automatically',
          action: 'toggle',
          value: autoSync,
          onToggle: setAutoSync,
          color: '#0ea5e9'
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Language,
          title: 'Language',
          subtitle: 'English (US)',
          action: 'navigate',
          color: '#6b7280'
        },
        {
          icon: Moon,
          title: 'Dark Mode',
          subtitle: 'Use dark theme',
          action: 'toggle',
          value: darkMode,
          onToggle: setDarkMode,
          color: '#374151'
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          title: 'Help & Support',
          subtitle: 'Get help and documentation',
          action: 'navigate',
          color: '#6b7280'
        },
        {
          icon: Info,
          title: 'About',
          subtitle: 'SmartMed NFC v1.0.0',
          action: 'navigate',
          color: '#6b7280'
        }
      ]
    }
  ];

  const systemStatus = [
    { label: 'Database', status: 'connected', color: '#10b981' },
    { label: 'NFC Scanner', status: 'ready', color: '#10b981' },
    { label: 'Network', status: 'connected', color: '#10b981' },
    { label: 'Sync', status: 'up-to-date', color: '#10b981' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'ready':
      case 'up-to-date':
        return CheckCircle;
      case 'disconnected':
      case 'error':
        return AlertTriangle;
      default:
        return Info;
    }
  };

  const renderSettingItem = (item: any) => {
    const IconComponent = item.icon;
    
    return (
      <TouchableOpacity key={item.title} style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <View style={[styles.settingIcon, { backgroundColor: item.color }]}>
            <IconComponent size={20} color="#ffffff" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          </View>
        </View>
        <View style={styles.settingRight}>
          {item.action === 'toggle' && (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#e5e7eb', true: '#0ea5e9' }}
              thumbColor={item.value ? '#ffffff' : '#f4f3f4'}
            />
          )}
          {item.action === 'status' && (
            <View style={styles.statusContainer}>
              {React.createElement(getStatusIcon(item.status), {
                size: 16,
                color: item.color
              })}
            </View>
          )}
          {(item.action === 'navigate' || item.action === 'logout') && (
            <ChevronRight size={20} color="#9ca3af" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#0ea5e9" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Configure app preferences</Text>
      </View>

      {/* System Status */}
      <View style={styles.statusSection}>
        <Text style={styles.statusTitle}>System Status</Text>
        <View style={styles.statusGrid}>
          {systemStatus.map((status, index) => {
            const StatusIcon = getStatusIcon(status.status);
            return (
              <View key={index} style={styles.statusCard}>
                <StatusIcon size={16} color={status.color} />
                <Text style={styles.statusLabel}>{status.label}</Text>
                <Text style={[styles.statusValue, { color: status.color }]}>
                  {status.status}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Settings Sections */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  {renderSettingItem(item)}
                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>SmartMed NFC</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appCopyright}>
            © 2024 St. Mary's Hospital{'\n'}
            All rights reserved
          </Text>
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
  header: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#e0f2fe',
  },
  statusSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statusTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 12,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statusLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 4,
  },
  statusValue: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 12,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  settingRight: {
    marginLeft: 12,
  },
  statusContainer: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  appInfo: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  appName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 12,
  },
  appCopyright: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 16,
  },
});