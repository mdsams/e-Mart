import { axiosInstance, handleError } from './axiosInstance';

export const signup = async (email: string, password: string) => {
	try {
		const response = await axiosInstance.post('/signup', {
			username: email,
			password: password,
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};
