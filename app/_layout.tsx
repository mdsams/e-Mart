import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/src/hooks/useColorScheme';
import Inventory from '@/src/components/Inventory/Inventory';
import Dashboard from '@/src/components/Dashboard';
import CustomSafeAreaView from '@/src/components/CustomSafeAreaView';

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
		// <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
		// 	<Stack>
		// 		<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
		// 		<Stack.Screen name='+not-found' />
		// 	</Stack>
		// </ThemeProvider>
		<CustomSafeAreaView>
			<Dashboard />
		</CustomSafeAreaView>
	);
}
