import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authSlice from '../features/authState/authSlice';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};

export const persisterReducer = persistReducer(persistConfig, authSlice);
