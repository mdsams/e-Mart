import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import { logout } from '@/src/redux/features/authState/authSlice';
import { useAppDispatch } from '@/src/redux/App/hooks';

interface ProfileSidebarProps {
	isOpen: boolean;
	closeDropdown: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ isOpen, closeDropdown }) => {
	const ios = Platform.OS === 'ios';
	const dispatch = useAppDispatch();

	function logOut() {
		dispatch(logout());
	}

	return (
		<Modal
			visible={isOpen}
			transparent={true} // Make the modal transparent
			animationType='fade' // Optional: Animation for opening/closing
		>
			<TouchableOpacity
				style={styles.modalOverlay}
				onPress={closeDropdown} // Close when tapping outside
				activeOpacity={1}
			>
				<View style={ios ? styles.dropdownIos : styles.dropdown}>
					<TouchableOpacity onPress={closeDropdown}>
						<Text style={styles.item}>Profile</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							closeDropdown();
							logOut();
						}}
					>
						<Text style={styles.item}>Logout</Text>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-end', // Align dropdown to the top-right
		backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: Dim background
		paddingTop: 50, // Adjust based on the position of the dropdown
	},
	dropdownIos: {
		backgroundColor: '#d0dff5',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
		shadowColor: '#000',
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		width: 150,
		paddingVertical: 10,
		height: 120,
	},
	dropdown: {
		backgroundColor: '#d0dff5',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
		shadowColor: '#000',
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		width: 150,
		paddingVertical: 10,
		height: 120,
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
