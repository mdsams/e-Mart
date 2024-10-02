import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

const downloadExcelSheet = async (tableData: string[][]) => {
	try {
		// Create a workbook
		const wb = XLSX.utils.book_new();

		// Convert the data into a worksheet
		const ws = XLSX.utils.aoa_to_sheet(tableData);

		// Append the worksheet to the workbook
		XLSX.utils.book_append_sheet(wb, ws, 'InventoryData');

		// Write the Excel file in Base64 format
		const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

		// Create a path to store the Excel file
		const fileUri = FileSystem.documentDirectory + 'inventoryData.xlsx';

		// Write the file to the device's filesystem in Base64 format
		await FileSystem.writeAsStringAsync(fileUri, wbout, {
			encoding: FileSystem.EncodingType.Base64,
		});

		// Optionally open or share the file
		if (await Sharing.isAvailableAsync()) {
			await Sharing.shareAsync(fileUri);
		} else {
			Alert.alert('Download Complete', 'File saved to ' + fileUri);
		}
	} catch (error) {
		console.error('Error creating or saving Excel file:', error);
		Alert.alert('Error', 'Failed to download the Excel file.');
	}
};

export default downloadExcelSheet;
