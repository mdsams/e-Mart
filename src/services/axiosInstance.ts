import axios from 'axios';
import { AuthAPI } from './Url';
export const axiosInstance = axios.create({
	baseURL: AuthAPI,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export const handleError = (error: any) => {
	if (error.response) {
		console.error('Server Error:', error.response.data.message || error.response.data);
	} else if (error.request) {
		console.error('Network Error:', error.message);
	} else {
		console.error('Error:', error.message);
	}
	throw error;
};
