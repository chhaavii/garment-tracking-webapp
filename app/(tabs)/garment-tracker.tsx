import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Search, Shirt as ShirtIcon, Droplets, Zap, Clock, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Circle as XCircle, User, MapPin, Calendar } from 'lucide-react-native';

export default function GarmentTrackerScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const garments = [
    {
      id: 'G-001',
      type: 'Scrubs Set',
      size: 'Medium',
      color: 'Blue',
      location: 'ICU-3',
      assignedTo: 'Dr. Sarah Wilson',
      lastWash: '2024-01-15 08:00',
      lastSterilization: '2024-01-15 09:30',
      washCount: 47,
      status: 'clean',
      condition: 'excellent',
      nfcId: 'NFC-G001',
      nextWash: '2024-01-16 08:00'
    },
    {
      id: 'G-002',
      type: 'Surgical Gown',
      size: 'Large',
      color: 'Green',
      location: 'OR-1',
      assignedTo: 'Dr. Michael Brown',
      lastWash: '2024-01-14 18:00',
      lastSterilization: '2024-01-14 19:30',
      washCount: 23,
      status: 'needs-wash',
      condition: 'good',
      nfcId: 'NFC-G002',
      nextWash: '2024-01-15 18:00'
    },
    {
      id: 'G-003',
      type: 'Lab Coat',
      size: 'Small',
      color: 'White',
      location: 'Lab-2',
      assignedTo: 'Dr. Emily Davis',
      lastWash: '2024-01-15 10:00',
      lastSterilization: '2024-01-15 11:15',
      washCount: 62,
      status: 'sterilizing',
      condition: 'fair',
      nfcId: 'NFC-G003',
      nextWash: '2024-01-16 10:00'
    },
    {
      id: 'G-004',
      type: 'Patient Gown',
      size: 'Large',
      color: 'Light Blue',
      location: 'Ward-2A',
      assignedTo: 'Sarah Johnson',
      lastWash: '2024-01-13 16:00',
      lastSterilization: '2024-01-13 17:30',
      washCount: 89,
      status: 'overdue',
      condition: 'needs-replacement',
      nfcId: 'NFC-G004',
      nextWash: '2024-01-14 16:00'
    }
  ];

  const statusFilters = [
    { key: 'all', label: 'All', count: garments.length },
    { key: 'clean', label: 'Clean', count: garments.filter(g => g.status === 'clean').length },
    { key: 'needs-wash', label: 'Needs Wash', count: garments.filter(g => g.status === 'needs-wash').length },
    { key: 'sterilizing', label: 'Sterilizing', count: garments.filter(g => g.status === 'sterilizing').length },
    { key: 'overdue', label: 'Overdue', count: garments.filter(g => g.status === 'overdue').length },
  ];

  const filteredGarments = garments.filter(garment => {
    const matchesSearch = garment.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         garment.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         garment.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         garment.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || garment.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clean': return '#10b981';
      case 'needs-wash': return '#f59e0b';
      case 'sterilizing': return '#8b5cf6';
      case 'overdue': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clean': return CheckCircle;
      case 'needs-wash': return Droplets;
      case 'sterilizing': return Zap;
      case 'overdue': return XCircle;
      default: return AlertTriangle;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return '#10b981';
      case 'good': return '#0ea5e9';
      case 'fair': return '#f59e0b';
      case 'needs-replacement': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#0ea5e9" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Garment Tracker</Text>
        <Text style={styles.headerSubtitle}>Monitor washing & sterilization</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search garments, staff, or location..."
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
          {statusFilters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                selectedStatus === filter.key && styles.activeFilterChip
              ]}
              onPress={() => setSelectedStatus(filter.key)}
            >
              <Text style={[
                styles.filterText,
                selectedStatus === filter.key && styles.activeFilterText
              ]}>
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Garments List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredGarments.map((garment) => {
          const StatusIcon = getStatusIcon(garment.status);
          const statusColor = getStatusColor(garment.status);
          const conditionColor = getConditionColor(garment.condition);

          return (
            <View key={garment.id} style={styles.garmentCard}>
              {/* Header */}
              <View style={styles.garmentHeader}>
                <View style={styles.garmentInfo}>
                  <Text style={styles.garmentType}>{garment.type}</Text>
                  <Text style={styles.garmentId}>{garment.id}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <StatusIcon size={16} color={statusColor} />
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {garment.status.replace('-', ' ').toUpperCase()}
                  </Text>
                </View>
              </View>

              {/* Details */}
              <View style={styles.garmentDetails}>
                <View style={styles.detailRow}>
                  <ShirtIcon size={16} color="#6b7280" />
                  <Text style={styles.detailText}>Size: {garment.size} • Color: {garment.color}</Text>
                </View>
                <View style={styles.detailRow}>
                  <User size={16} color="#6b7280" />
                  <Text style={styles.detailText}>Assigned to: {garment.assignedTo}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MapPin size={16} color="#6b7280" />
                  <Text style={styles.detailText}>Location: {garment.location}</Text>
                </View>
              </View>

              {/* Condition & NFC */}
              <View style={styles.conditionSection}>
                <View style={styles.conditionBadge}>
                  <View style={[styles.conditionDot, { backgroundColor: conditionColor }]} />
                  <Text style={styles.conditionText}>
                    Condition: <Text style={[styles.conditionValue, { color: conditionColor }]}>
                      {garment.condition.replace('-', ' ')}
                    </Text>
                  </Text>
                </View>
                <View style={styles.nfcBadge}>
                  <Text style={styles.nfcText}>NFC: {garment.nfcId}</Text>
                </View>
              </View>

              {/* Washing History */}
              <View style={styles.washingSection}>
                <Text style={styles.washingTitle}>Washing History</Text>
                <View style={styles.washingStats}>
                  <View style={styles.washingStat}>
                    <Text style={styles.statValue}>{garment.washCount}</Text>
                    <Text style={styles.statLabel}>Total Washes</Text>
                  </View>
                  <View style={styles.washingStat}>
                    <Text style={styles.statValue}>
                      {garment.lastWash.split(' ')[1]}
                    </Text>
                    <Text style={styles.statLabel}>Last Wash</Text>
                  </View>
                  <View style={styles.washingStat}>
                    <Text style={styles.statValue}>
                      {garment.lastSterilization.split(' ')[1]}
                    </Text>
                    <Text style={styles.statLabel}>Last Sterilized</Text>
                  </View>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actionsSection}>
                <TouchableOpacity style={styles.actionButton}>
                  <Droplets size={16} color="#0ea5e9" />
                  <Text style={styles.actionButtonText}>Mark for Wash</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <CheckCircle size={16} color="#10b981" />
                  <Text style={styles.actionButtonText}>Mark Clean</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Zap size={16} color="#8b5cf6" />
                  <Text style={styles.actionButtonText}>Sterilize</Text>
                </TouchableOpacity>
              </View>

              {/* Next Wash Indicator */}
              {garment.status === 'overdue' && (
                <View style={styles.overdueAlert}>
                  <AlertTriangle size={16} color="#ef4444" />
                  <Text style={styles.overdueText}>
                    Overdue for washing since {garment.nextWash}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
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
  garmentCard: {
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
  garmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  garmentInfo: {
    flex: 1,
  },
  garmentType: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  garmentId: {
    fontSize: 14,
    fontFamily: 'RobotoMono-Regular',
    color: '#6b7280',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  garmentDetails: {
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
  conditionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  conditionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conditionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  conditionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
  },
  conditionValue: {
    fontFamily: 'Inter-SemiBold',
    textTransform: 'capitalize',
  },
  nfcBadge: {
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
  nfcText: {
    fontSize: 12,
    fontFamily: 'RobotoMono-Regular',
    color: '#0ea5e9',
  },
  washingSection: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  washingTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 8,
  },
  washingStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  washingStat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#0ea5e9',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4b5563',
    marginLeft: 4,
  },
  overdueAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  overdueText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#ef4444',
    marginLeft: 6,
  },
});