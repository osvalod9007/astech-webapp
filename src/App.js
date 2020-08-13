import React from 'react';
import './App.scss';
import AppRouter from './routes/AppRouting';
import DeviceState from './context/device/deviceState';
import AuthState from './context/auth/authState';
function App() {
	return (
		<AuthState>
			<DeviceState>
				<AppRouter />
			</DeviceState>
		</AuthState>
	);
}

export default App;
