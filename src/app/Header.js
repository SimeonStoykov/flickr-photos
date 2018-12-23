import React from 'react';
import PhotoSearchBar from '../photo/PhotoSearchBar';
import history from './history';

const Header = ({ currentPath }) => {
	function loadHomePage() {
		if (currentPath !== '/') {
			history.push('/');
		} else {
			window.location.reload();
		}
	}

	return (
		<header className="header">
			<h1 className="header--title" onClick={loadHomePage}>Flickr Photos</h1>
			<PhotoSearchBar />
		</header>
	);
}

export default Header;
