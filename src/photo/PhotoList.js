import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Photo from './Photo';
import './Photo.css';
import Loading from '../loading/Loading';
import LazyLoad from 'react-lazyload';

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
			<main>
				{searchTerm && photos.length > 0 && !fetchPhotosLoading && <div className="results-for">Results for "{searchTerm}"</div>}
				<div className="photos-list">
					{photos.length === 0 && !fetchPhotosLoading ? <div className="photo-list--no-results">No results found for "{searchTerm}"</div> : ''}
					{
						photos.map(photo => (
							<LazyLoad key={photo.id} height={300}>
								<Photo data={photo} />
							</LazyLoad>
						))
					}
					{fetchPhotosLoading && <Loading />}
					{fetchPhotosError && <div className="photo-list--error-message">Error! {fetchPhotosError.message}</div>}
					{totalPages === currentPage && !fetchPhotosLoading && <div className="photo-list--no-results">No more results!</div>}
				</div>
			</main>
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
