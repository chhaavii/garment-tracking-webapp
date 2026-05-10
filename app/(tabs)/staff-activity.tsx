import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { 
  Search, 
  User,
  Clock,
  Activity,
  MapPin,
  Scan,
  Shield,
  Calendar,
  TrendingUp,
  Users
} from 'lucide-react-native';

export default function StaffActivityScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  const staffMembers = [
    {
      id: 'S001',
      name: 'Dr. Sarah Wilson',
      role: 'Attending Physician',
      department: 'ICU',
      avatar: null,
      status: 'active',
      lastActivity: '2024-01-15 14:30',
      todayStats: {
        scans: 23,
        patients: 8,
        hours: 6.5,
        locations: ['ICU-3', 'ICU-4', 'Emergency']
      },
      recentActivities: [
        { action: 'Scanned patient tag', patient: 'John Doe', time: '14:30', location: 'ICU-3' },
        { action: 'Logged medication', patient: 'John Doe', time: '14:25', location: 'ICU-3' },
        { action: 'Recorded vitals', patient: 'Mike Wilson', time: '14:15', location: 'ICU-4' }
      ]
    },
    {
      id: 'S002',
      name: 'Nurse Emily Davis',
      role: 'Registered Nurse',
      department: 'Ward 2A',
      avatar: null,
      status: 'active',
      lastActivity: '2024-01-15 14:15',
      todayStats: {
        scans: 31,
        patients: 12,
        hours: 7.2,
        locations: ['Ward-2A', 'Ward-2B']
      },
      recentActivities: [
        { action: 'Scanned garment tag', patient: 'Sarah Johnson', time: '14:15', location: 'Ward-2A' },
        { action: 'Updated patient record', patient: 'Sarah Johnson', time: '14:10', location: 'Ward-2A' },
        { action: 'Administered medication', patient: 'Lisa Anderson', time: '14:05', location: 'Ward-2A' }
      ]
    },
    {
      id: 'S003',
      name: 'Dr. Michael Brown',
      role: 'Surgeon',
      department: 'Operating Room',
      avatar: null,
      status: 'in-surgery',
      lastActivity: '2024-01-15 13:45',
      todayStats: {
        scans: 15,
        patients: 3,
        hours: 8.0,
        locations: ['OR-1', 'OR-2', 'Pre-Op']
      },
      recentActivities: [
        { action: 'Pre-op scan completed', patient: 'Mike Wilson', time: '13:45', location: 'OR-1' },
        { action: 'Surgical prep logged', patient: 'Mike Wilson', time: '13:40', location: 'OR-1' },
        { action: 'Patient transfer', patient: 'Mike Wilson', time: '13:30', location: 'Pre-Op' }
      ]
    },
    {
      id: 'S004',
      name: 'Dr. James Smith',
      role: 'Cardiologist',
      department: 'Cardiology',
      avatar: null,
      status: 'off-duty',
      lastActivity: '2024-01-15 13:20',
      todayStats: {
        scans: 18,
        patients: 6,
        hours: 4.5,
        locations: ['Cardiology', 'Cath Lab']
      },
      recentActivities: [
        { action: 'ECG review completed', patient: 'Lisa Anderson', time: '13:20', location: 'Cardiology' },
        { action: 'Cardiac assessment', patient: 'Lisa Anderson', time: '13:15', location: 'Cardiology' },
        { action: 'Patient consultation', patient: 'Robert Lee', time: '13:00', location: 'Cardiology' }
      ]
    }
  ];

  const timeframes = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
  ];

  const filteredStaff = staffMembers.filter(staff => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'in-surgery': return '#f59e0b';
      case 'off-duty': return '#6b7280';
      case 'break': return '#0ea5e9';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'in-surgery': return 'In Surgery';
      case 'off-duty': return 'Off Duty';
      case 'break': return 'On Break';
      default: return 'Unknown';
    }
  };

  const totalStats = {
    activeStaff: staffMembers.filter(s => s.status === 'active').length,
    totalScans: staffMembers.reduce((sum, staff) => sum + staff.todayStats.scans, 0),
    totalPatients: staffMembers.reduce((sum, staff) => sum + staff.todayStats.patients, 0),
    avgHours: staffMembers.reduce((sum, staff) => sum + staff.todayStats.hours, 0) / staffMembers.length
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#0ea5e9" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Staff Activity</Text>
        <Text style={styles.headerSubtitle}>Monitor team performance</Text>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Users size={24} color="#0ea5e9" />
          <Text style={styles.statValue}>{totalStats.activeStaff}</Text>
          <Text style={styles.statLabel}>Active Staff</Text>
        </View>
        <View style={styles.statCard}>
          <Scan size={24} color="#10b981" />
          <Text style={styles.statValue}>{totalStats.totalScans}</Text>
          <Text style={styles.statLabel}>Total Scans</Text>
        </View>
        <View style={styles.statCard}>
          <Activity size={24} color="#f59e0b" />
          <Text style={styles.statValue}>{totalStats.totalPatients}</Text>
          <Text style={styles.statLabel}>Patients</Text>
        </View>
        <View style={styles.statCard}>
          <Clock size={24} color="#8b5cf6" />
          <Text style={styles.statValue}>{totalStats.avgHours.toFixed(1)}</Text>
          <Text style={styles.statLabel}>Avg Hours</Text>
        </View>
      </View>

      {/* Search and Timeframe */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search staff, role, or department..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.timeframeScroll}
        >
          {timeframes.map((timeframe) => (
            <TouchableOpacity
              key={timeframe.key}
              style={[
                styles.timeframeChip,
                selectedTimeframe === timeframe.key && styles.activeTimeframeChip
              ]}
              onPress={() => setSelectedTimeframe(timeframe.key)}
            >
              <Text style={[
                styles.timeframeText,
                selectedTimeframe === timeframe.key && styles.activeTimeframeText
              ]}>
                {timeframe.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Staff List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredStaff.map((staff) => (
          <View key={staff.id} style={styles.staffCard}>
            {/* Header */}
            <View style={styles.staffHeader}>
              <View style={styles.staffInfo}>
                <View style={styles.staffAvatar}>
                  <User size={20} color="#6b7280" />
                </View>
                <View style={styles.staffDetails}>
                  <Text style={styles.staffName}>{staff.name}</Text>
                  <Text style={styles.staffRole}>{staff.role}</Text>
                  <Text style={styles.staffDepartment}>{staff.department}</Text>
                </View>
              </View>
              <View style={styles.statusContainer}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(staff.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(staff.status)}</Text>
                </View>
                <Text style={styles.lastActivity}>
                  Last: {staff.lastActivity.split(' ')[1]}
                </Text>
              </View>
            </View>

            {/* Daily Stats */}
            <View style={styles.dailyStats}>
              <Text style={styles.dailyStatsTitle}>Today's Activity</Text>
              <View style={styles.statsRow}>
                <View style={styles.miniStat}>
                  <Text style={styles.miniStatValue}>{staff.todayStats.scans}</Text>
                  <Text style={styles.miniStatLabel}>Scans</Text>
                </View>
                <View style={styles.miniStat}>
                  <Text style={styles.miniStatValue}>{staff.todayStats.patients}</Text>
                  <Text style={styles.miniStatLabel}>Patients</Text>
                </View>
                <View style={styles.miniStat}>
                  <Text style={styles.miniStatValue}>{staff.todayStats.hours}h</Text>
                  <Text style={styles.miniStatLabel}>Hours</Text>
                </View>
              </View>
            </View>

            {/* Locations */}
            <View style={styles.locationsSection}>
              <Text style={styles.locationsTitle}>Active Locations</Text>
              <View style={styles.locationsList}>
                {staff.todayStats.locations.map((location, index) => (
                  <View key={index} style={styles.locationTag}>
                    <MapPin size={12} color="#6b7280" />
                    <Text style={styles.locationText}>{location}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Recent Activities */}
            <View style={styles.recentActivities}>
              <Text style={styles.recentActivitiesTitle}>Recent Activities</Text>
              {staff.recentActivities.slice(0, 3).map((activity, index) => (
                <View key={index} style={styles.activityItem}>
                  <View style={styles.activityIcon}>
                    <Activity size={12} color="#6b7280" />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityAction}>{activity.action}</Text>
                    <Text style={styles.activityMeta}>
                      {activity.patient} • {activity.location} • {activity.time}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
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
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  searchSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
  },
  timeframeScroll: {
    flexDirection: 'row',
  },
  timeframeChip: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  activeTimeframeChip: {
    backgroundColor: '#0ea5e9',
    borderColor: '#0ea5e9',
  },
  timeframeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  activeTimeframeText: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  staffCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  staffHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  staffInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  staffAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  staffDetails: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  staffRole: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4b5563',
    marginBottom: 2,
  },
  staffDepartment: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  lastActivity: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  dailyStats: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  dailyStatsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  miniStat: {
    alignItems: 'center',
  },
  miniStatValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#0ea5e9',
    marginBottom: 2,
  },
  miniStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  locationsSection: {
    marginBottom: 12,
  },
  locationsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 8,
  },
  locationsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#0ea5e9',
    marginLeft: 4,
  },
  recentActivities: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  recentActivitiesTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
    marginBottom: 2,
  },
  activityMeta: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
});