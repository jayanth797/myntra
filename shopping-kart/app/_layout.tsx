import {
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider as CheckThemeProvider, useTheme } from '@/context/ThemeContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { NotificationToast } from '@/components/NotificationToast';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <CheckThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
            <Stack.Screen name="checkout" options={{ headerShown: true, title: "Checkout" }} />
            <Stack.Screen name="orders" options={{ headerShown: true, title: "Orders" }} />
            <Stack.Screen name="transactions" options={{ headerShown: true, title: "My Transactions" }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <NotificationToast />
          <StatusBar style="auto" />
        </NotificationProvider>
      </AuthProvider>
    </CheckThemeProvider>
  );
}
