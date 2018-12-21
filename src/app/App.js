import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import PhotoList from '../photo/PhotoList';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<PhotoList />
			</React.Fragment>
		);
	}
}

export default App;
