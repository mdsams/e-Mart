import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Drawer } from 'react-native-paper';

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
	const ios = Platform.OS === 'ios';
	return (
		<View style={isOpen ? (ios ? styles.sidebarIos : styles.sidebar) : styles.collapsedSidebar}>
			{isOpen && (
				<View style={styles.menu}>
					{/* <Drawer.Item style={styles.menuItem} icon='star' label='First Item' /> */}
					<Text style={styles.menuItem}>Dashboard</Text>
					<Text style={styles.menuItem}>KYC</Text>
					<Text style={styles.menuItem}>Loan Section</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	sidebarIos: {
		backgroundColor: '#d0dff5',
		justifyContent: 'center',
		padding: 10,
		height: '100%',
		width: '50%',
		position: 'absolute',
		marginTop: 100,
		top: 1,
		zIndex: 100,
	},
	sidebar: {
		backgroundColor: '#d0dff5',
		justifyContent: 'center',
		padding: 10,
		height: '100%',
		width: '50%',
		position: 'absolute',
		marginTop: 100,
	},
	collapsedSidebar: {
		width: 0,
		overflow: 'hidden',
	},
	menu: {
		position: 'relative',
	},
	menuItem: {
		fontSize: 16,
		paddingVertical: 5,
		textAlign: 'left',
	},
});

export default Sidebar;
