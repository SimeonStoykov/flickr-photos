import { fromJS } from 'immutable';

import {
	FETCH_PHOTOS_BEGIN,
	FETCH_PHOTOS_SUCCESS,
	FETCH_PHOTOS_FAILURE,
	SET_SEARCH_INPUT_VALUE,
	SET_SEARCH_TERM,
	SET_CURRENT_PAGE
} from './PhotoActions';

const initialState = fromJS({
	searchInputValue: '',
	searchTerm: '',
	currentPage: 1,
	totalPages: 0,
	fetchPhotosLoading: false,
	fetchPhotosError: null,
	fetchMorePhotosLoading: false,
	fetchMorePhotosError: null,
	photos: []
});

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PHOTOS_BEGIN: {
			let loadingVar = 'fetchPhotosLoading';
			let errorVar = 'fetchPhotosError';

			if (action.loadMorePhotos) {
				loadingVar = 'fetchMorePhotosLoading';
				errorVar = 'fetchMorePhotosError';
			}

			return state
				.set(loadingVar, true)
				.set(errorVar, initialState.get(errorVar));
		}
		case FETCH_PHOTOS_SUCCESS: {
			let newPhotos = [];
			let totalPages = initialState.get('totalPages');

			if (action.payload && action.payload.photos) {
				action.payload.photos.photo && (newPhotos = action.payload.photos.photo);
				action.payload.photos.pages && (totalPages = action.payload.photos.pages);
			}

			newPhotos = newPhotos.map(photo => {
				photo.src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
				return photo;
			});

			let photos = newPhotos;

			if (action.loadMorePhotos) {
				let currentPhotos = state.get('photos').toJS();

				for (let i = 0; i < newPhotos.length; i++) {
					let newPhoto = newPhotos[i];
					let newPhotoAlreadyExists = currentPhotos.find((photo) => photo.id === newPhoto.id);
					if (!newPhotoAlreadyExists) {
						currentPhotos.push(newPhoto);
					}
				}

				photos = [...currentPhotos];
			}

			return state
				.set(action.loadMorePhotos ? 'fetchMorePhotosLoading' : 'fetchPhotosLoading', initialState.get('fetchPhotosLoading'))
				.set('photos', fromJS(photos))
				.set('totalPages', totalPages);
		}
		case FETCH_PHOTOS_FAILURE: {
			let loadingVar = 'fetchPhotosLoading';
			let errorVar = 'fetchPhotosError';

			if (action.loadMorePhotos) {
				loadingVar = 'fetchMorePhotosLoading';
				errorVar = 'fetchMorePhotosError';
			}

			return state
				.set(loadingVar, initialState.get(loadingVar))
				.set(errorVar, action.payload.error);
		}
		case SET_SEARCH_INPUT_VALUE: {
			return state.set('searchInputValue', action.value);
		}
		case SET_SEARCH_TERM: {
			return state.set('searchTerm', action.value);
		}
		case SET_CURRENT_PAGE: {
			return state.set('currentPage', state.get('currentPage') + 1);
		}
		default:
			return state;
	}
}
