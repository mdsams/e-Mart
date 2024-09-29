import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button, Avatar, IconButton } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '@/src/redux/App/hooks';
import { signUpFucntion, signInFucntion } from '@/src/redux/features/authState/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Loader';

const AuthPage = () => {
	const dispatch = useAppDispatch();
	const authState = useAppSelector((state) => state.auth);
	const [isLogin, setIsLogin] = useState(true);
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
	const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
	const [error, setError] = useState('');

	const handleSignup = () => {
		if (login === '' || password === '' || confirmPassword === '') {
			setError('Please fill in all fields');
		} else if (password !== confirmPassword) {
			setError('Passwords do not match');
		} else {
			setError('');
			dispatch(signUpFucntion({ email: login, password: confirmPassword }));
		}
	};

	const handleSignIn = () => {
		if (login === '' || password === '') {
			setError('Please fill in all fields');
		} else {
			setError('');
			dispatch(signInFucntion({ email: login, password: password }));
		}
	};

	const handleForgotPassword = () => {
		alert('Forgot Password Clicked!');
		// Implement forgot password logic here
	};

	return (
		<View style={styles.container}>
			<Avatar.Icon size={94} icon='account' style={styles.icon} />

			{isLogin ? (
				<>
					<TextInput label='Login' value={login} onChangeText={(text) => setLogin(text)} style={styles.input} mode='outlined' />
					<View style={styles.passwordContainer}>
						<TextInput label='Password' value={password} onChangeText={(text) => setPassword(text)} style={[styles.input, { flex: 1 }]} secureTextEntry={!showPassword} mode='outlined' />
						<IconButton icon={showPassword ? 'eye-off' : 'eye'} size={20} onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon} />
					</View>
					{error ? <Text style={styles.error}>{error}</Text> : null}
					<Button mode='contained' style={styles.loginButton} onPress={handleSignIn}>
						LOG IN
					</Button>
					<TouchableOpacity onPress={handleForgotPassword}>
						<Text style={styles.forgotPassword}>Forgot Password?</Text>
					</TouchableOpacity>
					<Text style={styles.toggleText}>
						Don't have an account?{' '}
						<Text style={styles.toggleLink} onPress={() => setIsLogin(false)}>
							Sign Up
						</Text>
					</Text>
				</>
			) : (
				<>
					<TextInput label='Email' value={login} onChangeText={(text) => setLogin(text)} style={styles.input} mode='outlined' />
					<View style={styles.passwordContainer}>
						<TextInput label='Password' value={password} onChangeText={(text) => setPassword(text)} style={[styles.input, { flex: 1 }]} secureTextEntry={!showPassword} mode='outlined' />
						<IconButton icon={showPassword ? 'eye-off' : 'eye'} size={20} onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon} />
					</View>
					<View style={styles.passwordContainer}>
						<TextInput label='Confirm Password' value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} style={[styles.input, { flex: 1 }]} secureTextEntry={!showConfirmPassword} mode='outlined' />
						<IconButton icon={showConfirmPassword ? 'eye-off' : 'eye'} size={20} onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon} />
					</View>
					{authState.error ? <Text style={styles.error}>Got some internal error</Text> : null}
					<Button mode='contained' style={styles.loginButton} onPress={handleSignup}>
						SIGN UP
					</Button>
					<Text style={styles.toggleText}>
						Already have an account?{' '}
						<Text style={styles.toggleLink} onPress={() => setIsLogin(true)}>
							Log In
						</Text>
					</Text>
				</>
			)}

			{authState.loading && <Loader />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		paddingHorizontal: 20,
	},
	icon: {
		backgroundColor: '#00aaff',
		marginBottom: 20,
	},
	input: {
		width: '100%',
		marginBottom: 10,
		backgroundColor: 'white',
	},
	loginButton: {
		width: '100%',
		paddingVertical: 8,
		backgroundColor: '#00aaff',
	},
	toggleText: {
		marginTop: 10,
		color: '#000',
	},
	toggleLink: {
		color: '#00aaff',
		fontWeight: 'bold',
	},
	error: {
		color: 'red',
		marginBottom: 10,
	},
	passwordContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
	},
	eyeIcon: {
		position: 'absolute',
		right: 0,
	},
	forgotPassword: {
		marginTop: 10,
		color: '#007bff',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

export default AuthPage;
