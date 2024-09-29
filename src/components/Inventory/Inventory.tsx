import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';

const Inventory = () => {
	const state = {
		tableHead: ['Header 1', 'Header 2', 'Header 3', 'Header 4', 'Header 5'],
		widthArr: [100, 100, 100, 100, 100],
	};

	const generateTableData = (rowCount: number, columnCount: number) => {
		const data = [];

		for (let i = 1; i <= rowCount; i++) {
			const row = [];
			for (let j = 1; j <= columnCount; j++) {
				row.push(`R${i} C${j}`);
			}
			data.push(row);
		}

		return data;
	};

	const data = generateTableData(30, 5);

	return (
		<View style={styles.container}>
			<ScrollView horizontal={true}>
				<View>
					<Table borderStyle={{ borderColor: '#C1C0B9' }}>
						<Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text} />
					</Table>
					<ScrollView style={styles.dataWrapper}>
						<Table borderStyle={{ borderColor: '#C1C0B9' }}>
							{data.map((dataRow, index) => (
								<Row
									key={index}
									data={dataRow}
									widthArr={state.widthArr}
									style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
									textStyle={styles.text} // Ensuring this is passed as an object
								/>
							))}
						</Table>
					</ScrollView>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
	head: { height: 40, backgroundColor: '#f1f8ff' },
	text: { textAlign: 'center', fontWeight: 'bold' }, // Make sure this is always an object, not an array
	dataWrapper: { marginTop: -1 },
	rowEven: { height: 30, backgroundColor: '#f9f9f9' }, // Even row background color
	rowOdd: { height: 30, backgroundColor: '#ffffff' }, // Odd row background color
});

export default Inventory;
