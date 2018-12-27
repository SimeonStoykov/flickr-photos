import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import App from './App';

export default () => {
	return (
		<HashRouter basename={process.env.PUBLIC_URL}>
			<Switch>
				<Route exact path="/" component={App} />
			</Switch>
		</HashRouter>
	);
};
