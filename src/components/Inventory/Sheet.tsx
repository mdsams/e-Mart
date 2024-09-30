import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import XLSX from 'xlsx';
import { Table, Rows } from 'react-native-table-component';
import { AntDesign } from '@expo/vector-icons'; // For the plus icon

type TableData = string[][];

const ExcelSheet: React.FC = () => {
	const [tableData, setTableData] = useState<TableData>([
		['', '', ''],
		['', '', ''],
		['', '', ''],
	]);
	const [fileName, setFileName] = useState<string | null>(null);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [newRow, setNewRow] = useState<string[]>([]);

	// Set newRow's length to match the number of columns in the first row of tableData
	useEffect(() => {
		if (tableData.length > 0) {
			setNewRow(Array(tableData[0].length).fill(''));
		}
	}, [tableData]);

	// Function to handle file upload
	const uploadExcelSheet = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: '*/*', // Allow all file types to ensure flexibility
				copyToCacheDirectory: true,
			});
			if (result.canceled === false) {
				const data = result.assets[0];
				const { uri, name } = data;
				setFileName(name);

				// Fetch the file content
				const response = await fetch(uri);
				const fileBlob = await response.blob();

				const reader = new FileReader();
				reader.onload = (e) => {
					const arrayBuffer = e.target?.result as ArrayBuffer;

					// Convert the ArrayBuffer to a binary string
					const binaryString = new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '');

					// Parse the binary string using XLSX
					const workbook = XLSX.read(binaryString, { type: 'binary' });
					const sheetName = workbook.SheetNames[0]; // Get the first sheet
					const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

					setTableData(sheet as TableData); // Set the parsed data into the table
				};

				// Error handler for FileReader
				reader.onerror = (err) => {
					console.error('Error reading file:', err);
				};

				// Read the file as an array buffer
				reader.readAsArrayBuffer(fileBlob);
			} else {
				console.log('User canceled the file picking');
			}
		} catch (err) {
			console.error('Error reading file', err);
		}
	};

	// Function to add a new row to the table
	const addNewRow = () => {
		setTableData([...tableData, newRow]);
		setIsModalVisible(false); // Close the modal
		// Reset newRow based on tableData[0]'s length
		setNewRow(Array(tableData[0].length).fill(''));
	};

	// Function to open the modal
	const openModal = () => {
		setIsModalVisible(true);
	};

	// Function to close the modal
	const closeModal = () => {
		setIsModalVisible(false);
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<Button title='Upload Excel Sheet' onPress={uploadExcelSheet} />
				{fileName && <Text style={styles.fileName}>Uploaded File: {fileName}</Text>}

				<View style={styles.tableContainer}>
					<Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>
						<Rows data={tableData} />
					</Table>
				</View>

				{/* Add row button */}
				<TouchableOpacity style={styles.addButton} onPress={openModal}>
					<AntDesign name='pluscircle' size={24} color='blue' />
					<Text style={styles.addButtonText}>Add Row</Text>
				</TouchableOpacity>

				{/* Modal for input form */}
				<Modal visible={isModalVisible} transparent={true} animationType='slide'>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>Add New Row</Text>

							{newRow.map((value, index) => (
								<TextInput
									key={index}
									style={styles.input}
									placeholder={`Column ${index + 1}`}
									value={value}
									onChangeText={(text) => {
										const updatedRow = [...newRow];
										updatedRow[index] = text;
										setNewRow(updatedRow);
									}}
								/>
							))}

							<View style={styles.modalButtons}>
								<Button title='Cancel' onPress={closeModal} />
								<Button title='Add Row' onPress={addNewRow} />
							</View>
						</View>
					</View>
				</Modal>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	fileName: {
		marginVertical: 10,
		fontSize: 16,
		fontWeight: 'bold',
	},
	tableContainer: {
		marginVertical: 10,
	},
	addButton: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
	},
	addButtonText: {
		marginLeft: 5,
		fontSize: 16,
		color: 'blue',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		width: '80%',
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 10,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 8,
		marginBottom: 10,
		borderRadius: 5,
	},
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default ExcelSheet;
