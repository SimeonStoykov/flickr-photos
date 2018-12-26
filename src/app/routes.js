import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import history from './history';

export default () => {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL} history={history}>
			<Switch>
				<Route exact path="/" component={App} />
			</Switch>
		</BrowserRouter>
	);
};
