import { axiosInstance, handleError } from './axiosInstance';

export const signIn = async (email: string, password: string) => {
	try {
		const response = await axiosInstance.post('/auth', {
			email: email,
			password: password,
		});
		console.log(response.data.message);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};
