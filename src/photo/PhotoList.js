import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Photo from './Photo';
import './Photo.css';
import InfiniteScroll from 'react-infinite-scroller';

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

				setCurrentPage();
				fetchPhotos({ currentPage: currentPage + 1, searchTerm, loadMorePhotos: true });
			}
		};
	}

	componentDidMount() {
		let { fetchPhotos, searchTerm } = this.props;
		fetchPhotos({ currentPage: 1, searchTerm, loadMorePhotos: false });
	}

	render() {
		const { fetchPhotos, photos, fetchPhotosLoading, fetchPhotosError, fetchMorePhotosLoading, fetchMorePhotosError, searchTerm, currentPage, totalPages } = this.props;

		if (fetchPhotosError) {
			return <div>Error! {fetchPhotosError.message}</div>;
		}

		if (fetchPhotosLoading) {
			return <div>Loading...</div>;
		}

		return (
			<React.Fragment>
				{searchTerm && <div>Results for: {searchTerm}</div>}
				{totalPages && <div>Total pages: {totalPages}</div>}
				<div className="photos-list">
					{photos.map(photo => <Photo key={photo.id} data={photo} />)}
					{fetchMorePhotosLoading && <div>Loading...</div>}
					{fetchMorePhotosError && <div>Error! {fetchMorePhotosError.message}</div>}
				</div>
				{totalPages === currentPage && <div>No more results!</div>}
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
		fetchMorePhotosLoading: photosData.get('fetchMorePhotosLoading'),
		fetchMorePhotosError: photosData.get('fetchMorePhotosError'),
		photos: photosData.get('photos').toJS(),
		searchTerm: photosData.get('searchTerm'),
		currentPage: photosData.get('currentPage'),
		totalPages: photosData.get('totalPages')
	};
}

const mapDispatchToProps = dispatch => {
	return {
		fetchPhotos: params => dispatch(fetchPhotos(params)),
		setCurrentPage: () => dispatch(setCurrentPage())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PhotoList);
