import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, router } from 'expo-router';
import { User, MapPin, Clock, Heart, Thermometer, Activity, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Droplets, Pill, FileText, ArrowLeft, Share, CreditCard as Edit3 } from 'lucide-react-native';

export default function ScanResultScreen() {
  const { type, scanId } = useLocalSearchParams();

  // Mock data based on scan type
  const getMockData = () => {
    switch (type) {
      case 'patient':
        return {
          type: 'Patient',
          title: 'John Doe',
          id: 'P-2024-001',
          details: {
            age: 45,
            gender: 'Male',
            bloodType: 'A+',
            location: 'ICU-3, Bed B-12',
            admissionDate: '2024-01-10',
            condition: 'Stable',
            allergies: ['Penicillin', 'Shellfish'],
            vitals: {
              heartRate: 85,
              bloodPressure: '120/80',
              temperature: 98.6,
              oxygenSat: 98
            },
            medications: [
              { name: 'Morphine', dose: '10mg IV', time: '14:30', status: 'administered' },
              { name: 'Antibiotics', dose: '500mg', time: '16:00', status: 'pending' }
            ],
            recentNotes: [
              { note: 'Patient responding well to treatment', author: 'Dr. Wilson', time: '14:25' },
              { note: 'Vitals stable, continue monitoring', author: 'Nurse Davis', time: '13:45' }
            ]
          }
        };
      case 'garment':
        return {
          type: 'Garment',
          title: 'Scrubs Set - Blue',
          id: 'G-001',
          details: {
            size: 'Medium',
            color: 'Blue',
            material: 'Cotton Blend',
            location: 'ICU-3',
            assignedTo: 'Dr. Sarah Wilson',
            lastWash: '2024-01-15 08:00',
            lastSterilization: '2024-01-15 09:30',
            washCount: 47,
            status: 'Clean',
            condition: 'Excellent',
            nextWash: '2024-01-16 08:00'
          }
        };
      case 'staff':
        return {
          type: 'Staff',
          title: 'Dr. Sarah Wilson',
          id: 'S-001',
          details: {
            role: 'Attending Physician',
            department: 'ICU',
            shift: 'Day Shift (7AM-7PM)',
            status: 'Active',
            lastActivity: '2024-01-15 14:30',
            todayStats: {
              scans: 23,
              patients: 8,
              hours: 6.5
            },
            certifications: ['MD', 'Board Certified Internal Medicine', 'ICU Specialist'],
            contact: 'ext. 4521'
          }
        };
      default:
        return null;
    }
  };

  const data = getMockData();

  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Invalid scan result</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderPatientDetails = () => (
    <>
      {/* Patient Info */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <User size={16} color="#6b7280" />
          <Text style={styles.infoText}>Age: {data.details.age} • Gender: {data.details.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Droplets size={16} color="#ef4444" />
          <Text style={styles.infoText}>Blood Type: {data.details.bloodType}</Text>
        </View>
        <View style={styles.infoRow}>
          <MapPin size={16} color="#6b7280" />
          <Text style={styles.infoText}>{data.details.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Clock size={16} color="#6b7280" />
          <Text style={styles.infoText}>Admitted: {data.details.admissionDate}</Text>
        </View>
      </View>

      {/* Allergies */}
      <View style={styles.allergiesCard}>
        <View style={styles.allergiesHeader}>
          <AlertTriangle size={20} color="#ef4444" />
          <Text style={styles.allergiesTitle}>Allergies</Text>
        </View>
        <View style={styles.allergiesList}>
          {data.details.allergies.map((allergy, index) => (
            <View key={index} style={styles.allergyTag}>
              <Text style={styles.allergyText}>{allergy}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Vitals */}
      <View style={styles.vitalsCard}>
        <Text style={styles.cardTitle}>Current Vitals</Text>
        <View style={styles.vitalsGrid}>
          <View style={styles.vitalItem}>
            <Heart size={20} color="#ef4444" />
            <Text style={styles.vitalValue}>{data.details.vitals.heartRate}</Text>
            <Text style={styles.vitalLabel}>BPM</Text>
          </View>
          <View style={styles.vitalItem}>
            <Activity size={20} color="#10b981" />
            <Text style={styles.vitalValue}>{data.details.vitals.bloodPressure}</Text>
            <Text style={styles.vitalLabel}>Blood Pressure</Text>
          </View>
          <View style={styles.vitalItem}>
            <Thermometer size={20} color="#f59e0b" />
            <Text style={styles.vitalValue}>{data.details.vitals.temperature}°F</Text>
            <Text style={styles.vitalLabel}>Temperature</Text>
          </View>
          <View style={styles.vitalItem}>
            <Activity size={20} color="#0ea5e9" />
            <Text style={styles.vitalValue}>{data.details.vitals.oxygenSat}%</Text>
            <Text style={styles.vitalLabel}>O2 Sat</Text>
          </View>
        </View>
      </View>

      {/* Medications */}
      <View style={styles.medicationsCard}>
        <Text style={styles.cardTitle}>Current Medications</Text>
        {data.details.medications.map((med, index) => (
          <View key={index} style={styles.medicationItem}>
            <View style={styles.medicationIcon}>
              <Pill size={16} color="#8b5cf6" />
            </View>
            <View style={styles.medicationContent}>
              <Text style={styles.medicationName}>{med.name}</Text>
              <Text style={styles.medicationDose}>{med.dose}</Text>
              <Text style={styles.medicationTime}>Scheduled: {med.time}</Text>
            </View>
            <View style={[
              styles.medicationStatus,
              { backgroundColor: med.status === 'administered' ? '#10b981' : '#f59e0b' }
            ]}>
              <Text style={styles.medicationStatusText}>
                {med.status === 'administered' ? 'Given' : 'Pending'}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderGarmentDetails = () => (
    <>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Size: {data.details.size} • Color: {data.details.color}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Material: {data.details.material}</Text>
        </View>
        <View style={styles.infoRow}>
          <MapPin size={16} color="#6b7280" />
          <Text style={styles.infoText}>Location: {data.details.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <User size={16} color="#6b7280" />
          <Text style={styles.infoText}>Assigned to: {data.details.assignedTo}</Text>
        </View>
      </View>

      {/* Washing Status */}
      <View style={styles.washingCard}>
        <Text style={styles.cardTitle}>Washing Status</Text>
        <View style={styles.washingStats}>
          <View style={styles.washingStat}>
            <Text style={styles.statValue}>{data.details.washCount}</Text>
            <Text style={styles.statLabel}>Total Washes</Text>
          </View>
          <View style={styles.washingStat}>
            <Text style={styles.statValue}>{data.details.status}</Text>
            <Text style={styles.statLabel}>Current Status</Text>
          </View>
          <View style={styles.washingStat}>
            <Text style={styles.statValue}>{data.details.condition}</Text>
            <Text style={styles.statLabel}>Condition</Text>
          </View>
        </View>
        <View style={styles.washingTimes}>
          <Text style={styles.washingTime}>Last Wash: {data.details.lastWash}</Text>
          <Text style={styles.washingTime}>Last Sterilization: {data.details.lastSterilization}</Text>
          <Text style={styles.washingTime}>Next Wash: {data.details.nextWash}</Text>
        </View>
      </View>
    </>
  );

  const renderStaffDetails = () => (
    <>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Role: {data.details.role}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Department: {data.details.department}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Shift: {data.details.shift}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Contact: {data.details.contact}</Text>
        </View>
      </View>

      {/* Today's Stats */}
      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Today's Activity</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{data.details.todayStats.scans}</Text>
            <Text style={styles.statLabel}>Scans</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{data.details.todayStats.patients}</Text>
            <Text style={styles.statLabel}>Patients</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{data.details.todayStats.hours}h</Text>
            <Text style={styles.statLabel}>Hours</Text>
          </View>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#0ea5e9" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Result</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Share size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main Info */}
        <View style={styles.mainCard}>
          <View style={styles.mainHeader}>
            <View style={styles.typeContainer}>
              <View style={styles.typeBadge}>
                <Text style={styles.typeText}>{data.type}</Text>
              </View>
              <Text style={styles.scanId}>ID: {data.id}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Edit3 size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <Text style={styles.mainTitle}>{data.title}</Text>
          <Text style={styles.scanTime}>
            Scanned: {new Date().toLocaleString()}
          </Text>
        </View>

        {/* Type-specific Details */}
        {type === 'patient' && renderPatientDetails()}
        {type === 'garment' && renderGarmentDetails()}
        {type === 'staff' && renderStaffDetails()}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryAction}>
            <FileText size={20} color="#ffffff" />
            <Text style={styles.primaryActionText}>Add Note</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryAction}>
            <CheckCircle size={20} color="#10b981" />
            <Text style={styles.secondaryActionText}>Mark Complete</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  shareButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  mainCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  typeContainer: {
    flex: 1,
  },
  typeBadge: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  typeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  scanId: {
    fontSize: 14,
    fontFamily: 'RobotoMono-Regular',
    color: '#6b7280',
  },
  editButton: {
    padding: 4,
  },
  mainTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  scanTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  infoCard: {
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginLeft: 8,
  },
  allergiesCard: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  allergiesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  allergiesTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
    marginLeft: 8,
  },
  allergiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  allergyTag: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  allergyText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#dc2626',
  },
  vitalsCard: {
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
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  vitalItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
  },
  vitalValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginTop: 8,
    marginBottom: 4,
  },
  vitalLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  medicationsCard: {
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
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  medicationIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  medicationContent: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 2,
  },
  medicationDose: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginBottom: 2,
  },
  medicationTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  medicationStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  medicationStatusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  washingCard: {
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
  washingStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  washingStat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#0ea5e9',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  washingTimes: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
  },
  washingTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginBottom: 4,
  },
  statsCard: {
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 32,
  },
  primaryAction: {
    flex: 1,
    backgroundColor: '#0ea5e9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  primaryActionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  secondaryActionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
    marginLeft: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
    marginBottom: 16,
  },
});