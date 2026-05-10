import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useState } from 'react';
import { Scan, Zap, Shirt as ShirtIcon, User, Waves, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function ScanScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState<string | null>(null);

  const simulateNFCScan = (type: 'patient' | 'garment' | 'staff') => {
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      const scanId = Math.random().toString(36).substr(2, 9);
      setLastScan(scanId);
      
      router.push({
        pathname: '/scan-result',
        params: { type, scanId }
      });
    }, 2000);
  };

  const scanTypes = [
    {
      title: 'Patient Tag',
      subtitle: 'Scan patient wristband or garment',
      icon: User,
      color: '#0ea5e9',
      type: 'patient' as const,
    },
    {
      title: 'Garment Tag',
      subtitle: 'Track washing & sterilization',
      icon: ShirtIcon,
      color: '#8b5cf6',
      type: 'garment' as const,
    },
    {
      title: 'Staff Badge',
      subtitle: 'Quick staff identification',
      icon: Zap,
      color: '#10b981',
      type: 'staff' as const,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#0ea5e9" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NFC Scanner</Text>
        <Text style={styles.headerSubtitle}>Tap to scan NFC-enabled tags</Text>
      </View>

      <View style={styles.content}>
        {/* Scanning Animation */}
        {isScanning && (
          <View style={styles.scanningOverlay}>
            <View style={styles.scanningContainer}>
              <View style={[styles.scanningPulse, { opacity: 0.3 }]} />
              <View style={[styles.scanningPulse, { opacity: 0.6 }]} />
              <View style={[styles.scanningPulse, { opacity: 0.9 }]} />
              <Waves size={48} color="#0ea5e9" />
            </View>
            <Text style={styles.scanningText}>Scanning...</Text>
            <Text style={styles.scanningSubtext}>Hold your device near the NFC tag</Text>
          </View>
        )}

        {/* Main Scanner */}
        <View style={styles.scannerSection}>
          <TouchableOpacity
            style={[styles.mainScanButton, isScanning && styles.scanningButton]}
            onPress={() => simulateNFCScan('patient')}
            disabled={isScanning}
          >
            <View style={styles.scannerIcon}>
              <Scan size={48} color="#ffffff" />
            </View>
            <Text style={styles.scannerText}>
              {isScanning ? 'Scanning...' : 'Tap to Scan'}
            </Text>
            <Text style={styles.scannerSubtext}>
              {isScanning ? 'Hold device near tag' : 'Place NFC tag near device'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Scan Type Options */}
        <View style={styles.optionsSection}>
          <Text style={styles.optionsTitle}>Or choose scan type:</Text>
          <View style={styles.scanTypeGrid}>
            {scanTypes.map((scanType, index) => (
              <TouchableOpacity
                key={index}
                style={styles.scanTypeCard}
                onPress={() => simulateNFCScan(scanType.type)}
                disabled={isScanning}
              >
                <View style={[styles.scanTypeIcon, { backgroundColor: scanType.color }]}>
                  <scanType.icon size={24} color="#ffffff" />
                </View>
                <Text style={styles.scanTypeTitle}>{scanType.title}</Text>
                <Text style={styles.scanTypeSubtitle}>{scanType.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsSection}>
          <View style={styles.instructionCard}>
            <AlertCircle size={20} color="#0ea5e9" />
            <View style={styles.instructionContent}>
              <Text style={styles.instructionTitle}>NFC Instructions</Text>
              <Text style={styles.instructionText}>
                • Hold your device close to the NFC tag{'\n'}
                • Keep steady for 2-3 seconds{'\n'}
                • Device will vibrate when scan is complete{'\n'}
                • Works through most clothing materials
              </Text>
            </View>
          </View>
        </View>

        {/* Last Scan Info */}
        {lastScan && (
          <View style={styles.lastScanSection}>
            <Text style={styles.lastScanTitle}>Last Scan</Text>
            <Text style={styles.lastScanId}>ID: {lastScan}</Text>
            <Text style={styles.lastScanTime}>
              {new Date().toLocaleTimeString()}
            </Text>
          </View>
        )}
      </View>
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
  content: {
    flex: 1,
    padding: 20,
  },
  scanningOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(248, 250, 252, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  scanningContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  scanningPulse: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0ea5e9',
    opacity: 0.3,
  },
  scanningText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  scanningSubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
  },
  scannerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  mainScanButton: {
    backgroundColor: '#0ea5e9',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  scanningButton: {
    backgroundColor: '#0284c7',
  },
  scannerIcon: {
    marginBottom: 16,
  },
  scannerText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  scannerSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#e0f2fe',
    textAlign: 'center',
  },
  optionsSection: {
    marginBottom: 32,
  },
  optionsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  scanTypeGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  scanTypeCard: {
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
  scanTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  scanTypeTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  scanTypeSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  instructionsSection: {
    marginBottom: 24,
  },
  instructionCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  instructionContent: {
    flex: 1,
    marginLeft: 12,
  },
  instructionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    lineHeight: 20,
  },
  lastScanSection: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
  lastScanTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#0ea5e9',
    marginBottom: 4,
  },
  lastScanId: {
    fontSize: 16,
    fontFamily: 'RobotoMono-Medium',
    color: '#1e293b',
    marginBottom: 4,
  },
  lastScanTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
});