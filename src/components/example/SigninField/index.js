import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../../context/auth/AuthContext';
import { TextField, InputLabel, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

const SigninField = (props) => {
	// extract values from context
	const authContext = useContext(AuthContext);
	const { signinUser, is_authenticated } = authContext;
	let history = useHistory();
	let location = useLocation();
	// create state
	const [ user, setUserState ] = useState({
		email: '',
		password: ''
	});

	useEffect(() => {
		let { from } = location.state || { from: { pathname: '/' } };
		if (is_authenticated) {
			history.replace(from);
		}
	});

	//const { email, password } = user;

	const onChange = (e) => {
		setUserState({
			...user,
			[e.target.name]: e.target.value
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		signinUser();
	};

	const style = {
		space: {
			paddingTop: 5,
			paddingBottom: 5
		},
		button: {
			marginTop: 10
		},
		forgot: {
			fontSize: 12,
			color: 'gray'
		}
	};
	return (
		<form autoComplete="off" className="form__signin" onSubmit={onSubmit}>
			<InputLabel className="label__signin" shrink>
				Email
			</InputLabel>
			<TextField style={style.space} id="email" name="email" type="email" onChange={onChange} fullWidth />
			<InputLabel className="label__signin" shrink>
				Password
			</InputLabel>
			<TextField
				style={style.space}
				id="password"
				name="password"
				type="password"
				onChange={onChange}
				fullWidth
			/>
			<p align="end" style={style.forgot}>
				Forgot Password
			</p>
			<Button variant="outlined" color="primary" type="submit" className="btn-signin" style={style.button}>
				Login
			</Button>
		</form>
	);
};

export default SigninField;
