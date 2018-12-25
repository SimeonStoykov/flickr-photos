import React, { Component } from 'react';
import Header from '../header/Header';
import PhotoList from '../photo/PhotoList';

class App extends Component {
	render() {
		return (
			<div className="app">
				<Header currentPath={this.props.location.pathname}/>
				<PhotoList />
			</div>
		);
	}
}

export default App;
