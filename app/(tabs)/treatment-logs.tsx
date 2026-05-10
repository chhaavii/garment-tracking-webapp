import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Clock, User, Activity, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function TreatmentLogsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const treatmentLogs = [
    {
      id: 'TL001',
      patient: 'John Doe',
      patientId: 'P-2024-001',
      age: 45,
      ward: 'ICU-3',
      bed: 'B-12',
      lastAction: 'Medication: Morphine 10mg IV',
      timestamp: '2024-01-15 14:30',
      staff: 'Dr. Sarah Wilson',
      priority: 'high',
      vitals: { hr: 85, bp: '120/80', temp: 98.6 },
      allergies: ['Penicillin', 'Shellfish'],
      status: 'stable'
    },
    {
      id: 'TL002',
      patient: 'Sarah Johnson',
      patientId: 'P-2024-002',
      age: 32,
      ward: 'Ward-2A',
      bed: 'B-05',
      lastAction: 'Vitals recorded - Normal',
      timestamp: '2024-01-15 14:15',
      staff: 'Nurse Emily Davis',
      priority: 'normal',
      vitals: { hr: 72, bp: '118/75', temp: 98.2 },
      allergies: [],
      status: 'stable'
    },
    {
      id: 'TL003',
      patient: 'Mike Wilson',
      patientId: 'P-2024-003',
      age: 28,
      ward: 'OR-1',
      bed: 'T-01',
      lastAction: 'Pre-op preparation completed',
      timestamp: '2024-01-15 13:45',
      staff: 'Dr. Michael Brown',
      priority: 'urgent',
      vitals: { hr: 90, bp: '125/82', temp: 99.1 },
      allergies: ['Latex'],
      status: 'pre-op'
    },
    {
      id: 'TL004',
      patient: 'Lisa Anderson',
      patientId: 'P-2024-004',
      age: 67,
      ward: 'Cardiology',
      bed: 'C-08',
      lastAction: 'ECG completed - Abnormal',
      timestamp: '2024-01-15 13:20',
      staff: 'Dr. James Smith',
      priority: 'high',
      vitals: { hr: 110, bp: '140/90', temp: 98.8 },
      allergies: ['Aspirin'],
      status: 'monitoring'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Patients', count: treatmentLogs.length },
    { key: 'high', label: 'High Priority', count: treatmentLogs.filter(log => log.priority === 'high').length },
    { key: 'urgent', label: 'Urgent', count: treatmentLogs.filter(log => log.priority === 'urgent').length },
    { key: 'today', label: 'Today', count: treatmentLogs.length },
  ];

  const filteredLogs = treatmentLogs.filter(log => {
    const matchesSearch = log.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.ward.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'high' && log.priority === 'high') ||
                         (selectedFilter === 'urgent' && log.priority === 'urgent') ||
                         (selectedFilter === 'today');
    
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'normal': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return '#10b981';
      case 'monitoring': return '#f59e0b';
      case 'pre-op': return '#8b5cf6';
      case 'post-op': return '#0ea5e9';
      default: return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#0ea5e9" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Treatment Logs</Text>
        <Text style={styles.headerSubtitle}>Patient records & activity</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search patients, ID, or ward..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                selectedFilter === filter.key && styles.activeFilterChip
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter.key && styles.activeFilterText
              ]}>
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Treatment Logs List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredLogs.map((log) => (
          <View key={log.id} style={styles.logCard}>
            {/* Header */}
            <View style={styles.logHeader}>
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>{log.patient}</Text>
                <Text style={styles.patientId}>{log.patientId}</Text>
              </View>
              <View style={styles.priorityBadge}>
                <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(log.priority) }]} />
                <Text style={[styles.priorityText, { color: getPriorityColor(log.priority) }]}>
                  {log.priority.toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Patient Details */}
            <View style={styles.patientDetails}>
              <View style={styles.detailRow}>
                <User size={16} color="#6b7280" />
                <Text style={styles.detailText}>Age: {log.age}</Text>
              </View>
              <View style={styles.detailRow}>
                <MapPin size={16} color="#6b7280" />
                <Text style={styles.detailText}>{log.ward} - {log.bed}</Text>
              </View>
              <View style={styles.detailRow}>
                <Activity size={16} color="#6b7280" />
                <Text style={styles.detailText}>Status: </Text>
                <Text style={[styles.statusText, { color: getStatusColor(log.status) }]}>
                  {log.status}
                </Text>
              </View>
            </View>

            {/* Vitals */}
            <View style={styles.vitalsSection}>
              <Text style={styles.vitalsTitle}>Latest Vitals</Text>
              <View style={styles.vitalsRow}>
                <View style={styles.vitalItem}>
                  <Text style={styles.vitalValue}>{log.vitals.hr}</Text>
                  <Text style={styles.vitalLabel}>HR</Text>
                </View>
                <View style={styles.vitalItem}>
                  <Text style={styles.vitalValue}>{log.vitals.bp}</Text>
                  <Text style={styles.vitalLabel}>BP</Text>
                </View>
                <View style={styles.vitalItem}>
                  <Text style={styles.vitalValue}>{log.vitals.temp}°F</Text>
                  <Text style={styles.vitalLabel}>Temp</Text>
                </View>
              </View>
            </View>

            {/* Allergies */}
            {log.allergies.length > 0 && (
              <View style={styles.allergiesSection}>
                <View style={styles.allergiesHeader}>
                  <AlertCircle size={16} color="#ef4444" />
                  <Text style={styles.allergiesTitle}>Allergies</Text>
                </View>
                <View style={styles.allergiesList}>
                  {log.allergies.map((allergy, index) => (
                    <View key={index} style={styles.allergyTag}>
                      <Text style={styles.allergyText}>{allergy}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Last Action */}
            <View style={styles.lastActionSection}>
              <Text style={styles.lastActionTitle}>Last Action</Text>
              <Text style={styles.lastActionText}>{log.lastAction}</Text>
              <View style={styles.actionMeta}>
                <Clock size={14} color="#6b7280" />
                <Text style={styles.actionTime}>{log.timestamp}</Text>
                <Text style={styles.actionStaff}>by {log.staff}</Text>
              </View>
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
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  activeFilterChip: {
    backgroundColor: '#0ea5e9',
    borderColor: '#0ea5e9',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  logCard: {
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
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  patientId: {
    fontSize: 14,
    fontFamily: 'RobotoMono-Regular',
    color: '#6b7280',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  priorityText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  patientDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginLeft: 8,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'capitalize',
  },
  vitalsSection: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  vitalsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 8,
  },
  vitalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  vitalItem: {
    alignItems: 'center',
  },
  vitalValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#0ea5e9',
    marginBottom: 2,
  },
  vitalLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  allergiesSection: {
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  allergiesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  allergiesTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
    marginLeft: 6,
  },
  allergiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  allergyTag: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  allergyText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#dc2626',
  },
  lastActionSection: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  lastActionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  lastActionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginBottom: 8,
  },
  actionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  actionStaff: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
});