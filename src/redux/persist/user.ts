import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authSlice from '../features/authState/authSlice';
import { combineReducers } from '@reduxjs/toolkit';
import inventorySlice from '../features/authState/inventorySlice';

// Persist config for the root reducer
const rootPersistConfig = {
	key: 'root', // Root key for the combined reducer
	storage: AsyncStorage,
	// Optionally, you can blacklist or whitelist reducers here
	// blacklist: ['someReducer'], // if you want some reducers to be non-persistent
	// whitelist: ['auth', 'inventory'], // explicit reducers to persist
};

// Persist configs for individual reducers
const authPersistConfig = {
	key: 'auth',
	storage: AsyncStorage,
};

const inventoryPersistConfig = {
	key: 'inventory',
	storage: AsyncStorage,
};

// Persist individual reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedInventoryReducer = persistReducer(inventoryPersistConfig, inventorySlice);

// Combine the auth and inventory reducers
const rootReducer = combineReducers({
	auth: persistedAuthReducer,
	inventory: persistedInventoryReducer,
});

// Persist the combined root reducer with the root config
export const persisterReducer = persistReducer(rootPersistConfig, rootReducer);
