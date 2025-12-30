# Daily Fetal Movement Tracker

A React Native mobile application for tracking fetal movements (kicks) during pregnancy. The app helps expectant mothers monitor baby activity by timing how long it takes to feel 10 movements.

## 📱 Features

- **Timer Functionality**: Start/stop timer to track duration of fetal movements
- **Session Management**: Save and view past tracking sessions
- **Local Storage**: All data persists locally using MMKV (no backend required)
- **Information Guide**: Built-in instructions on how to track fetal movements
- **Smart Time Display**: Automatically formats time in seconds, minutes, or hours

## 🚀 How to Run the Project

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator/Device (for Android)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Daily-Fetal-Movement-Tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run on iOS**

   ```bash
   npx expo run:ios
   ```

4. **Run on Android**

   ```bash
   npx expo run:android
   ```

5. **Run with Expo Go** (Development)
   ```bash
   npx expo start
   ```
   Then scan the QR code with Expo Go app on your phone.

## 📚 Libraries Used

### Core Framework

- **expo** (v52.0.32) - React Native framework
- **react-native** (0.81.5) - Mobile app framework
- **expo-router** (v4.0.15) - File-based routing

### Storage

- **react-native-mmkv** (v4.1.0) - Fast, synchronous local storage

### UI Components

- **expo-blur** (v14.0.4) - Blur effects for modal
- **expo-linear-gradient** (v14.0.2) - Gradient backgrounds
- **react-native-svg** (v15.15.1) - SVG icon support
- **react-native-modal** (v13.0.1) - Modal component
- **nativewind** (v4.1.23) - Tailwind CSS for React Native

### Navigation & Layout

- **react-native-safe-area-context** (v5.0.0) - Safe area handling
- **react-native-screens** (v4.6.1) - Native screen optimization

## 📊 Data Structure

Sessions are stored locally using MMKV with the following structure:

```typescript
interface Session {
  id: string; // Unique identifier (timestamp)
  date: string; // Formatted date (e.g., "29 Dec 2025")
  day: string; // Day of week (e.g., "Sunday")
  time: number; // Duration in SECONDS
  kicks: number; // Number of kicks (always 10)
  timestamp: number; // Unix timestamp for sorting
}
```

**Storage Key**: `fetal_movement_sessions`

**Example Session**:

```json
{
  "id": "1735478400000",
  "date": "29 Dec 2025",
  "day": "Sunday",
  "time": 90,
  "kicks": 10,
  "timestamp": 1735478400000
}
```

## 🎯 How It Works

1. **Start Tracking**: User navigates to Counter screen and presses Play
2. **Count Movements**: User mentally counts baby kicks while timer runs
3. **Save Session**: When 10 kicks are felt, user presses Save
4. **View History**: Saved sessions appear on Home screen with date and duration

## 💡 Assumptions Made

1. **Kick Count**: Always 10 kicks per session (medical standard)
2. **User Counting**: User counts kicks mentally; app only tracks time
3. **Time Precision**: Stored in seconds for accuracy
4. **Single User**: No authentication or multi-user support needed
5. **No Backend**: All data stored locally with MMKV
6. **No Deletion**: Sessions cannot be deleted (not required in spec)
7. **Time Display**: Smart formatting based on duration:
   - Under 1 minute: "45 secs"
   - 1-59 minutes: "5 mins" or "1min :30secs"
   - 1+ hours: "2 hours"

## 📁 Project Structure

```
Daily-Fetal-Movement-Tracker/
├── app/
│   ├── index.tsx           # Home screen
│   ├── counter.tsx         # Counter/Timer screen
│   └── _layout.tsx         # Root layout
├── components/
│   ├── Header.tsx          # Custom header component
│   ├── RecordCard.tsx      # Session display card
│   ├── AppButton.tsx       # Reusable button
│   ├── Typography.tsx      # Text component
│   ├── modals/
│   │   └── AppModal.tsx    # Information modal
│   └── Icons/              # SVG icon components
├── services/
│   └── storage.ts          # MMKV storage service
├── constants/
│   └── Colors.ts           # Color palette
└── README.md
```

## 🧪 Testing

The app has been tested on:

- ✅ iOS Simulator (iPhone)
- ✅ Android Emulator

**Test Scenarios**:

- Timer start/stop functionality
- Session save and persistence
- Data loading on app restart
- Time formatting for various durations
- Modal open/close interactions

## 📝 Notes

- **Medical Context**: This app helps pregnant women track fetal movements. Doctors recommend feeling 10 kicks within 2 hours as a sign of healthy baby activity.
- **No Network Required**: App works completely offline
- **Data Privacy**: All data stays on device; nothing is sent to external servers

## 🛠️ Development

Built with modern React Native best practices:

- TypeScript for type safety
- Functional components with hooks
- File-based routing with Expo Router
- Fast local storage with MMKV
- Responsive design with NativeWind

## 📄 License

This project was created as part of a technical assignment.

---

**Developer**: [Your Name]  
**Date**: December 2025  
**Framework**: React Native (Expo)
