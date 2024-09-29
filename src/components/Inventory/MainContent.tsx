import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Inventory from './Inventory';

const MainContent = () => {
	return <View style={styles.content}>{<Inventory />}</View>;
};

const styles = StyleSheet.create({
	content: {
		// flex: 1,
		// padding: 20,
		// backgroundColor: 'red',
		height: '100%',
	},
});

export default MainContent;
