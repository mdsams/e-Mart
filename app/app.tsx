import React from 'react';
import { useColorScheme } from 'react-native';
import AuthPage from '@/src/components/auth/Auth';
import { useAppSelector } from '@/src/redux/App/hooks';
import Dashboard from '@/src/components/Dashboard';
import CustomSafeAreaView from '@/src/components/CustomSafeAreaView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppPage = () => {
	return (
		<CustomSafeAreaView>
			<Dashboard />
		</CustomSafeAreaView>
	);
};

const clearAllKeysAndCheck = async () => {
	try {
		// Clear all items in AsyncStorage
		// await AsyncStorage.clear();
		// console.log('All keys cleared!');

		// Check if anything is left (should be empty)
		const keys = await AsyncStorage.getAllKeys();
		console.log('=================================', keys);
		if (keys.length === 0) {
			console.log('AsyncStorage is empty.');
		} else {
			const stores = await AsyncStorage.multiGet(keys);
			stores.forEach(([key, value]) => {
				console.log(`Key: ${key}, Value: ${value}`);
			});
		}
	} catch (error) {
		console.error('Error clearing and checking AsyncStorage:', error);
	}
};

const App = () => {
	// clearAllKeysAndCheck();
	const isDarkMode = useColorScheme() === 'dark';

	const authToken = useAppSelector((state) => state.auth.userToken);

	return <>{!authToken ? <AuthPage /> : <AppPage />}</>;
	// return <AppPage />;
};

export default App;
