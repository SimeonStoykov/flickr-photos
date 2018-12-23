import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import App from './App';
import history from './history';

export default () => {
	return (
		<Router basename={process.env.PUBLIC_URL} history={history}>
			<Switch>
				<Route exact path="/" component={App} />} />
				{/* <Route path="/asset/:id" render={routeProps => <AssetDetails {...routeProps} />} /> */}
			</Switch>
		</Router>
	);
};
