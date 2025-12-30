import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.white.main,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="counter" />
    </Stack>
  );
}
