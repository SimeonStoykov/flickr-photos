import React from 'react';
import PhotoSearchBar from '../photo/PhotoSearchBar';
import history from '../app/history';
import './Header.css';

const HOME_PATH = '/';

const Header = ({ currentPath }) => {
	function loadHomePage() {
		if (currentPath !== HOME_PATH) {
			history.push(HOME_PATH);
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
