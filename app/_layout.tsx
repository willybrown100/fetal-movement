import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.white.main,
          },
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="counter" />
      </Stack>
    </GestureHandlerRootView>
  );
}
