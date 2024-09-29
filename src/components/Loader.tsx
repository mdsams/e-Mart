import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Loader = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator animating={true} size='large' color='#6200ee' />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
		zIndex: 9999, // ensures the loader appears above everything
	},
});

export default Loader;
