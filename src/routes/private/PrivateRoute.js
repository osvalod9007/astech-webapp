/* import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
	const authContext = useContext(AuthContext);
	const { is_authenticated } = authContext;

	console.log(is_authenticated);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				is_authenticated ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)}
		/>
	);
};

export default PrivateRoute; */