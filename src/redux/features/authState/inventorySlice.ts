import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TableData = string[][];

export const inventoryInitialState: {
	tableData: TableData;
	newRow: string[];
} = {
	tableData: [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	],
	newRow: [],
};

const inventorySlice = createSlice({
	name: 'inventory',
	initialState: inventoryInitialState,
	reducers: {
		setInventoryData: (state, action: PayloadAction<TableData>) => {
			state.tableData = action.payload;
		},
		addInventoryRow: (state) => {
			state.tableData.push([...state.newRow]);
		},
		updateNewRow: (state, action: PayloadAction<{ index: number; value: string }>) => {
			state.newRow[action.payload.index] = action.payload.value;
		},
		resetNewRow: (state) => {
			state.newRow = Array(state.tableData[0]?.length || 0).fill('');
		},
	},
});

export const { setInventoryData, addInventoryRow, updateNewRow, resetNewRow } = inventorySlice.actions;

export default inventorySlice.reducer;
