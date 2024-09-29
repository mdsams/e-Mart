import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, ToggleButton } from 'react-native-paper';
import ProfileSidebar from './ProfileSidebar';

interface HeaderProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
	const [isDropdownOpen, setDropdownOpen] = React.useState(false);

	const toggleDropdown = () => {
		setDropdownOpen((prev) => !prev);
	};
	return (
		<View style={styles.header}>
			<View style={styles.logo}>
				<ToggleButton icon={isSidebarOpen ? 'format-align-left' : 'format-align-right'} size={34} value={isSidebarOpen ? 'left' : 'right'} onPress={toggleSidebar} />
			</View>
			<View style={styles.navLinks}>
				<Text style={styles.link}>Dashboard</Text>
				<Text style={styles.link}>KYC</Text>
				<Text style={styles.link}>Loan Section</Text>
			</View>
			<TouchableOpacity style={styles.profile} onPress={toggleDropdown}>
				<Avatar.Text size={38} label='XD' />
				<ProfileSidebar isOpen={isDropdownOpen} closeDropdown={toggleDropdown} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#D9EAF8',
		padding: 10,
	},
	logo: {
		flex: 1,
		alignItems: 'flex-start',
	},
	navLinks: {
		flex: 4,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginRight: 3,
	},
	link: {
		color: '#007bff',
		fontWeight: 'bold',
		marginHorizontal: 10,
	},
	profile: {
		position: 'relative',
	},
});
