#MediTrack -Healthcare Garment Tracking System

A comprehensive healthcare garment tracking and patient management system designed for hospitals and healthcare facilities. Combines IoT technology (NFC tags) with mobile/web interfaces to streamline critical healthcare operations.



## 🎯 Healthcare Benefits

### Infection Control & Patient Safety
- **Sterilization Tracking** - Monitors garment wash cycles and sterilization status
- **Compliance Management** - Ensures proper hygiene protocols are followed
- **Cross-Contamination Prevention** - Tracks garment movement between departments
- **Real-time Status Updates** - Clean/Dirty/In-Use status visibility

### Operational Efficiency
- **Automated Inventory Management** - Reduces manual counting and tracking
- **Staff Assignment Tracking** - Knows which garments are assigned to which healthcare workers
- **Location Intelligence** - Real-time garment location (ICU, OR, Ward, Lab)
- **Predictive Maintenance** - Alerts when garments need washing/replacement

### Patient Care Integration
- **Patient Tag Scanning** - Quick access to patient information via NFC
- **Treatment Logs** - Real-time medication and vital sign recording
- **Emergency Protocols** - Quick access to critical patient information
- **Staff Activity Monitoring** - Tracks caregiver activities and response times

## 🛠 Technology Stack

- **Frontend:** React Native with Expo
- **Language:** TypeScript
- **Styling:** React Native StyleSheet
- **Navigation:** Expo Router
- **Icons:** Lucide React Native
- **Deployment:** GitHub Pages
- **IoT:** NFC Tag Integration

## 📱 Features

### 🏠 Dashboard
- Real-time statistics (Active Patients, Pending Logs, Clean Garments)
- Quick action buttons for common tasks
- Recent activity feed
- Dark/Light mode toggle

### 👕 Garment Tracker
- Comprehensive garment inventory management
- Search and filter functionality
- Status tracking (Clean, Needs Wash, In Use)
- NFC tag scanning support
- Assignment and location tracking

### 📋 Treatment Logs
- Patient treatment history
- Real-time vital signs recording
- Medication tracking
- Staff activity monitoring
- Emergency information access

### 🚨 Emergency Mode
- Quick access to critical patient information
- Emergency contact information
- Allergy alerts
- Ward and bed location tracking

### 👥 Staff Activity
- Caregiver performance monitoring
- Response time tracking
- Activity logging
- Department assignment tracking

### ⚙️ Settings
- App configuration
- User preferences
- Dark mode toggle
- System settings

## 🏆 Hackathon Value Proposition

### Problem Solved
Healthcare facilities lose **$50,000+ annually** in lost garments and face **infection control challenges** from improper sterilization tracking.

### Innovation Points
1. **IoT Integration** - NFC tags enable real-time tracking without manual input
2. **Mobile-First Design** - Works on tablets/phones used by healthcare staff
3. **Dark Mode Support** - Reduces eye strain during night shifts
4. **Real-Time Analytics** - Live dashboard for hospital administrators
5. **Emergency Response** - Quick access to critical patient information

### Competitive Advantages
- **HIPAA Compliant** - Secure patient data handling
- **Scalable Architecture** - Works for small clinics to large hospitals
- **Cross-Platform** - Web, iOS, Android support
- **Offline Capability** - Works even without internet connectivity

## 📊 Market Impact

- **Reduces Infection Rates** - Better sterilization tracking
- **Saves Labor Costs** - Automated vs manual tracking
- **Improves Patient Safety** - Quick emergency information access
- **Enhances Compliance** - Audit-ready reporting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Expo CLI installed
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chhaavii/garment-tracking-webapp.git
   cd garment-tracking-webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build:web
   ```

### Development Commands

```bash
# Start Expo development server
npm run dev

# Build web version
npm run build:web

# Start local web server
serve dist -p 3000
```

## 📱 Screenshots

### Dashboard
- Real-time statistics display
- Quick action buttons
- Recent activity feed
- Dark mode support

### Garment Tracker
- Comprehensive inventory list
- Search and filter options
- Status indicators
- NFC scanning interface

### Treatment Logs
- Patient information cards
- Vital signs tracking
- Medication records
- Staff activity logging

## 🔧 Configuration

### Environment Variables
Create a `.env` file for local development:
```env
EXPO_PUBLIC_API_URL=your_api_url
EXPO_PUBLIC_NFC_ENABLED=true
```

### GitHub Pages Deployment
The app is automatically deployed to GitHub Pages using GitHub Actions:
- Push to `main` branch triggers deployment
- Built files are deployed to `gh-pages` branch
- Live site available at repository URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Project Creator:** Chhavi
- **GitHub:** [@chhaavii](https://github.com/chhaavii)
- **Live Demo:** [https://chhaavii.github.io/garment-tracking-webapp](https://chhaavii.github.io/garment-tracking-webapp)

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) - React Native framework
- [Lucide](https://lucide.dev/) - Icon library
- [React Native](https://reactnative.dev/) - Mobile framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

---

**Transforming healthcare garment management into a smart, data-driven operation!** 🏥✨
