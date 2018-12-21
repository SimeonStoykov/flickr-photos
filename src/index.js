import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './app/store';
import AppRoutes from './app/routes';

ReactDOM.render(
	<Provider store={store}>
		<AppRoutes />
	</Provider>,
	document.getElementById('root')
);
