import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { logout } from '@/src/redux/features/authState/authSlice';
import { useAppDispatch } from '@/src/redux/App/hooks';
interface ProfileSidebarProps {
	isOpen: boolean;
	closeDropdown: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ isOpen, closeDropdown }) => {
	const ios = Platform.OS === 'ios';
	const dispatch = useAppDispatch();
	if (!isOpen) return null;

	function logOut() {
		dispatch(logout());
	}

	return (
		<View style={ios ? styles.dropdownIos : styles.dropdown}>
			<TouchableOpacity onPress={closeDropdown}>
				{/* <Drawer.Item style={{ backgroundColor: '#64ffda' }} label='First Item' /> */}
				<Text style={styles.item}>Profile</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					closeDropdown;
					logOut();
				}}
			>
				<Text style={styles.item}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	dropdownIos: {
		position: 'absolute',
		top: 50,
		right: 2,
		backgroundColor: '#d0dff5',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
		shadowColor: '#000',
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		zIndex: 1,
		width: 150,
		paddingVertical: 10,
		height: 120,
	},
	dropdown: {
		position: 'absolute',
		top: 50,
		right: 2,
		backgroundColor: '#d0dff5',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
		shadowColor: '#000',
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		zIndex: 1000,
		width: 150,
		paddingVertical: 10,
	},
	item: {
		paddingVertical: 15,
		paddingHorizontal: 10,
		textAlign: 'center',
		fontSize: 16,
		color: '#007bff',
	},
});

export default ProfileSidebar;
