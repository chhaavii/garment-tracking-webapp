import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { TriangleAlert as AlertTriangle, Phone, MapPin, Clock, Heart, Activity, User, X, Zap, Shield, FileText } from 'lucide-react-native';

export default function EmergencyScreen() {
  // Mock emergency patient data
  const emergencyPatient = {
    name: 'John Doe',
    id: 'P-2024-001',
    age: 45,
    bloodType: 'A+',
    allergies: ['Penicillin', 'Shellfish'],
    medicalConditions: ['Diabetes Type 2', 'Hypertension'],
    emergencyContact: 'Jane Doe (Wife) - (555) 123-4567',
    dnrStatus: false,
    lastKnownLocation: 'ICU-3, Bed B-12',
    lastVitals: {
      heartRate: 85,
      bloodPressure: '120/80',
      temperature: 98.6,
      oxygenSat: 98,
      timestamp: '2024-01-15 14:30'
    },
    criticalNotes: [
      'Recently underwent cardiac surgery',
      'Monitor for post-operative complications',
      'Patient has expressed anxiety about procedures'
    ]
  };

  const emergencyContacts = [
    { name: 'Emergency Room', number: '911', type: 'primary' },
    { name: 'Hospital Main', number: '(555) 123-4567', type: 'hospital' },
    { name: 'Poison Control', number: '(800) 222-1222', type: 'poison' },
    { name: 'Security', number: '(555) 123-4444', type: 'security' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#ef4444" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <X size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <AlertTriangle size={24} color="#ffffff" />
          <Text style={styles.headerTitle}>EMERGENCY MODE</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Emergency Alert */}
        <View style={styles.emergencyAlert}>
          <View style={styles.alertContent}>
            <Zap size={32} color="#ffffff" />
            <Text style={styles.alertTitle}>Emergency Access Active</Text>
            <Text style={styles.alertSubtitle}>
              Quick access to critical patient information
            </Text>
          </View>
        </View>

        {/* Patient Critical Info */}
        <View style={styles.patientCard}>
          <View style={styles.patientHeader}>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{emergencyPatient.name}</Text>
              <Text style={styles.patientId}>ID: {emergencyPatient.id}</Text>
            </View>
            <View style={styles.bloodTypeContainer}>
              <Text style={styles.bloodTypeLabel}>Blood Type</Text>
              <Text style={styles.bloodType}>{emergencyPatient.bloodType}</Text>
            </View>
          </View>

          <View style={styles.criticalInfo}>
            <View style={styles.infoRow}>
              <User size={16} color="#6b7280" />
              <Text style={styles.infoText}>Age: {emergencyPatient.age}</Text>
            </View>
            <View style={styles.infoRow}>
              <MapPin size={16} color="#6b7280" />
              <Text style={styles.infoText}>{emergencyPatient.lastKnownLocation}</Text>
            </View>
            <View style={styles.infoRow}>
              <Shield size={16} color="#6b7280" />
              <Text style={styles.infoText}>
                DNR Status: {emergencyPatient.dnrStatus ? 'YES' : 'NO'}
              </Text>
            </View>
          </View>
        </View>

        {/* Critical Allergies */}
        <View style={styles.allergiesCard}>
          <View style={styles.allergiesHeader}>
            <AlertTriangle size={20} color="#ef4444" />
            <Text style={styles.allergiesTitle}>CRITICAL ALLERGIES</Text>
          </View>
          <View style={styles.allergiesList}>
            {emergencyPatient.allergies.map((allergy, index) => (
              <View key={index} style={styles.allergyTag}>
                <Text style={styles.allergyText}>{allergy}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Medical Conditions */}
        <View style={styles.conditionsCard}>
          <Text style={styles.conditionsTitle}>Known Medical Conditions</Text>
          {emergencyPatient.medicalConditions.map((condition, index) => (
            <View key={index} style={styles.conditionItem}>
              <View style={styles.conditionBullet} />
              <Text style={styles.conditionText}>{condition}</Text>
            </View>
          ))}
        </View>

        {/* Last Known Vitals */}
        <View style={styles.vitalsCard}>
          <View style={styles.vitalsHeader}>
            <Text style={styles.vitalsTitle}>Last Known Vitals</Text>
            <Text style={styles.vitalsTimestamp}>
              {emergencyPatient.lastVitals.timestamp}
            </Text>
          </View>
          <View style={styles.vitalsGrid}>
            <View style={styles.vitalItem}>
              <Heart size={20} color="#ef4444" />
              <Text style={styles.vitalValue}>{emergencyPatient.lastVitals.heartRate}</Text>
              <Text style={styles.vitalLabel}>BPM</Text>
            </View>
            <View style={styles.vitalItem}>
              <Activity size={20} color="#10b981" />
              <Text style={styles.vitalValue}>{emergencyPatient.lastVitals.bloodPressure}</Text>
              <Text style={styles.vitalLabel}>BP</Text>
            </View>
            <View style={styles.vitalItem}>
              <Activity size={20} color="#0ea5e9" />
              <Text style={styles.vitalValue}>{emergencyPatient.lastVitals.oxygenSat}%</Text>
              <Text style={styles.vitalLabel}>O2 Sat</Text>
            </View>
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Emergency Contact</Text>
          <View style={styles.contactInfo}>
            <Phone size={20} color="#0ea5e9" />
            <Text style={styles.contactText}>{emergencyPatient.emergencyContact}</Text>
          </View>
        </View>

        {/* Critical Notes */}
        <View style={styles.notesCard}>
          <Text style={styles.notesTitle}>Critical Notes</Text>
          {emergencyPatient.criticalNotes.map((note, index) => (
            <View key={index} style={styles.noteItem}>
              <FileText size={16} color="#f59e0b" />
              <Text style={styles.noteText}>{note}</Text>
            </View>
          ))}
        </View>

        {/* Emergency Contacts */}
        <View style={styles.emergencyContactsCard}>
          <Text style={styles.emergencyContactsTitle}>Emergency Contacts</Text>
          <View style={styles.contactsList}>
            {emergencyContacts.map((contact, index) => (
              <TouchableOpacity key={index} style={styles.emergencyContactItem}>
                <View style={styles.emergencyContactIcon}>
                  <Phone size={20} color="#ffffff" />
                </View>
                <View style={styles.emergencyContactContent}>
                  <Text style={styles.emergencyContactName}>{contact.name}</Text>
                  <Text style={styles.emergencyContactNumber}>{contact.number}</Text>
                </View>
              </TouchableOpacity>
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
  header: {
    backgroundColor: '#ef4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  closeButton: {
    padding: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  emergencyAlert: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  alertContent: {
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 4,
  },
  alertSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#fecaca',
    textAlign: 'center',
  },
  patientCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  patientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  patientId: {
    fontSize: 16,
    fontFamily: 'RobotoMono-Regular',
    color: '#6b7280',
  },
  bloodTypeContainer: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  bloodTypeLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
  },
  bloodType: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  criticalInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    marginLeft: 8,
  },
  allergiesCard: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#fecaca',
  },
  allergiesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  allergiesTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ef4444',
    marginLeft: 8,
  },
  allergiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  allergyTag: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  allergyText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  conditionsCard: {
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
  conditionsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 12,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  conditionBullet: {
    width: 6,
    height: 6,
    backgroundColor: '#f59e0b',
    borderRadius: 3,
    marginRight: 12,
  },
  conditionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
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
  vitalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  vitalsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  vitalsTimestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  vitalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vitalItem: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  vitalValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginTop: 4,
    marginBottom: 2,
  },
  vitalLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  contactCard: {
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
  contactTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 12,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
  contactText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#0ea5e9',
    marginLeft: 8,
  },
  notesCard: {
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
  notesTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 12,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fffbeb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  noteText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400e',
    marginLeft: 8,
    flex: 1,
  },
  emergencyContactsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  emergencyContactsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 12,
  },
  contactsList: {
    gap: 8,
  },
  emergencyContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    padding: 12,
    borderRadius: 8,
  },
  emergencyContactIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emergencyContactContent: {
    flex: 1,
  },
  emergencyContactName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 2,
  },
  emergencyContactNumber: {
    fontSize: 14,
    fontFamily: 'RobotoMono-Regular',
    color: '#fecaca',
  },
});