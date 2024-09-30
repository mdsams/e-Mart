import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from '@/src/redux/App/store';
import { persistor } from '@/src/redux/App/store';
import AuthPage from '@/src/components/auth/Auth';
import { useAppSelector } from '@/src/redux/App/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dashboard from '@/src/components/Dashboard';
import CustomSafeAreaView from '@/src/components/CustomSafeAreaView';
import ExcelSheet from '@/src/components/Inventory/Sheet';

const AppPage = () => {
	return (
		<CustomSafeAreaView>
			<Dashboard />
			{/* <ExcelSheet /> */}
		</CustomSafeAreaView>
	);
};

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const authToken = useAppSelector((state) => state.auth.userToken);

	// return <>{!authToken ? <AuthPage /> : <AppPage />}</>;
	return <AppPage />;
};

export default App;
