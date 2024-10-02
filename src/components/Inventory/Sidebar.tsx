import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Drawer, Avatar, Button } from 'react-native-paper'; // Avatar and Button components
import { AntDesign, MaterialIcons } from '@expo/vector-icons'; // Icons for the buttons
import { useAppDispatch, useAppSelector } from '@/src/redux/App/hooks';
import { logout } from '@/src/redux/features/authState/authSlice';
import downloadExcelSheet from '../DownloadExcel';
import { RootState } from '@/src/redux/App/store';

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
	const ios = Platform.OS === 'ios';
	const dispatch = useAppDispatch();
	const { tableData } = useAppSelector((state: RootState) => state.inventory);

	return (
		<View style={isOpen ? (ios ? styles.sidebarIos : styles.sidebar) : styles.collapsedSidebar}>
			{isOpen && (
				<View style={styles.menu}>
					<View style={styles.userProfile}>
						<Avatar.Text size={80} label='XD' />
						<Text style={styles.userName}>User Name</Text>
					</View>

					{/* Bottom Buttons */}
					<View style={styles.bottomButtons}>
						<Button icon={() => <MaterialIcons name='qr-code' size={20} color='black' />} mode='contained' style={styles.createButton} onPress={() => console.log('Create Barcode')}>
							Create Barcode
						</Button>

						<Button icon={() => <AntDesign name='download' size={20} color='black' />} mode='contained' style={styles.downloadButton} onPress={() => downloadExcelSheet(tableData)}>
							Download Excel
						</Button>

						<Button icon={() => <AntDesign name='logout' size={20} color='white' />} mode='contained' color='red' style={styles.logoutButton} onPress={() => dispatch(logout())}>
							Logout
						</Button>
					</View>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	sidebarIos: {
		backgroundColor: '#d0dff5',
		justifyContent: 'space-between',
		padding: 10,
		height: '100%',
		width: '50%',
		position: 'absolute',
		marginTop: 100,
		top: 1,
		zIndex: 1,
	},
	sidebar: {
		backgroundColor: '#d0dff5',
		justifyContent: 'space-between',
		padding: 10,
		height: '100%',
		width: '50%',
		position: 'absolute',
		marginTop: 100,
		top: 1,
		zIndex: 1000,
	},
	collapsedSidebar: {
		width: 0,
		overflow: 'hidden',
	},
	menu: {
		flex: 1,
		justifyContent: 'space-between', // Space between profile and buttons
	},
	userProfile: {
		alignItems: 'center',
		marginTop: 50,
	},
	userName: {
		marginTop: 10,
		fontSize: 16,
		fontWeight: 'bold',
	},
	menuItem: {
		fontSize: 16,
		paddingVertical: 5,
		textAlign: 'left',
	},
	bottomButtons: {
		justifyContent: 'flex-end',
		marginBottom: 80,
	},
	createButton: {
		marginBottom: 10,
		backgroundColor: '#f0ad4e',
	},
	downloadButton: {
		marginBottom: 10,
		backgroundColor: '#5bc0de',
	},
	logoutButton: {
		backgroundColor: 'red',
	},
});

export default Sidebar;
