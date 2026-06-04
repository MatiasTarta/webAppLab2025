import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Evita que la pantalla de carga se oculte antes de tiempo
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  // Ocultamos la pantalla de carga inmediatamente cuando el layout se monta
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => { });
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0a0a0a' } }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}