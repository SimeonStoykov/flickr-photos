import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Photo.css';
// import './SearchBar.css';
// import Checkbox from '../Checkbox/Checkbox';

import {
	fetchPhotos
} from '../photo/PhotoActions';


export class PhotoList extends Component {
	componentDidMount() {
		this.props.fetchPhotos({ page: 1, resultsPerPage: 12 });
	}

	render() {
		const { photos, fetchPhotosLoading, fetchPhotosError } = this.props;

		console.log(photos);

		if (fetchPhotosError) {
			return <div>Error! {fetchPhotosError.message}</div>;
		}

		if (fetchPhotosLoading) {
			return <div>Loading...</div>;
		}

		return (
			<div className="grid">
				{
					photos.map(photo => (<div key={photo.id} className="grid--card">{photo.title} <img src={photo.src} alt="" /></div>))
				}
			</div>
		);
	}
}

PhotoList.propTypes = {
	fetchPhotos: PropTypes.func,
	// setSearchTerm: PropTypes.func,
	// fetchSearchResults: PropTypes.func,
	// isImagesChecked: PropTypes.bool,
	// isVideosChecked: PropTypes.bool,
	// isAudioChecked: PropTypes.bool,
	// setIsChecked: PropTypes.func,
	// setResultsFor: PropTypes.func
};

const mapStateToProps = ({ photosData }) => {
	return {
		fetchPhotosLoading: photosData.get('fetchPhotosLoading'),
		fetchPhotosError: photosData.get('fetchPhotosError'),
		photos: photosData.get('photos').toJS()
	};
}

const mapDispatchToProps = dispatch => {
	return {
		fetchPhotos: dataUrl => dispatch(fetchPhotos(dataUrl))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PhotoList);