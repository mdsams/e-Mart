import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ButtonProps {
	onPress: () => void;
	title?: string;
	color?: string;
}
export default function Button({ onPress, title = 'Save', color = '#4285F4' }: ButtonProps) {
	return (
		<TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 80,
		borderRadius: 4,
		elevation: 3,
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
	},
});
