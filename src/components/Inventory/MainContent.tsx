import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Inventory from './Inventory';
import ExcelSheet from './Sheet';

const MainContent = () => {
	return <View>{<ExcelSheet />}</View>;
};

export default MainContent;
