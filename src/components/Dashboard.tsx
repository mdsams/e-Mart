import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import InventoryHeader from './Inventory/Header';
import Sidebar from './Inventory/Sidebar';
import MainContent from './Inventory/MainContent';
import Inventory from './Inventory/Inventory';
import Header from './Inventory/Header';

const Dashboard = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const toggleSidebar = () => {
		setSidebarOpen((prev) => !prev);
	};

	return (
		<>
			<Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			<Sidebar isOpen={isSidebarOpen} />
			<View style={styles.main}>
				<MainContent />
			</View>
		</>
	);
};

export default Dashboard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		zIndex: 1, // Ensure container has a low zIndex to not overlap modal
	},
	main: {
		// backgroundColor: 'black',
		// flex: 1,
		zIndex: 1000,
	},
});
