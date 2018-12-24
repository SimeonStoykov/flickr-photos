import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Photo from './Photo';
import './Photo.css';
import Loading from '../shared/Loading/Loading';

import {
	fetchPhotos,
	setCurrentPage
} from '../photo/PhotoActions';

export class PhotoList extends Component {
	constructor() {
		super();

		window.onscroll = () => {
			let { setCurrentPage, fetchPhotos, currentPage, searchTerm, totalPages } = this.props;

			if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
				if (totalPages === currentPage) {
					return;
				}

				setCurrentPage(currentPage + 1);
				fetchPhotos({ currentPage: currentPage + 1, searchTerm });
			}
		};
	}

	componentDidMount() {
		let { fetchPhotos, searchTerm } = this.props;
		fetchPhotos({ currentPage: 1, searchTerm });
	}

	render() {
		const { photos, fetchPhotosLoading, fetchPhotosError, searchTerm, currentPage, totalPages } = this.props;

		return (
			<React.Fragment>
				{searchTerm && photos.length > 0 && !fetchPhotosLoading && <div>Results for: {searchTerm}</div>}
				<div>Total pages: {totalPages}</div>
				<div className="photos-list">
					{photos.length === 0 && !fetchPhotosLoading ? <div className="photo-list--no-results">No results found!</div> : ''}
					{photos.map(photo => <Photo key={photo.id} data={photo} />)}
					{fetchPhotosLoading && <Loading />}
					{fetchPhotosError && <div className="photo-list--error-message">Error! {fetchPhotosError.message}</div>}
					{totalPages === currentPage && !fetchPhotosLoading && <div className="photo-list--no-results">No more results!</div>}
				</div>
			</React.Fragment>
		);
	}
}

PhotoList.propTypes = {
	fetchPhotos: PropTypes.func,
	fetchPhotosLoading: PropTypes.bool,
	fetchPhotosError: PropTypes.string,
	photos: PropTypes.array,
	searchTerm: PropTypes.string,
	currentPage: PropTypes.number,
	totalPages: PropTypes.number
};

const mapStateToProps = ({ photosData }) => {
	return {
		fetchPhotosLoading: photosData.get('fetchPhotosLoading'),
		fetchPhotosError: photosData.get('fetchPhotosError'),
		photos: photosData.get('photos').toJS(),
		searchTerm: photosData.get('searchTerm'),
		currentPage: photosData.get('currentPage'),
		totalPages: photosData.get('totalPages')
	};
}

const mapDispatchToProps = dispatch => {
	return {
		fetchPhotos: params => dispatch(fetchPhotos(params)),
		setCurrentPage: value => dispatch(setCurrentPage(value))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PhotoList);
