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
	photos: []
});

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PHOTOS_BEGIN: {
			const photos = action.loadMorePhotos ? state.get('photos') : initialState.get('photos');

			return state
				.set('fetchPhotosLoading', true)
				.set('fetchPhotosError', initialState.get('fetchPhotosError'))
				.set('photos', photos);
		}
		case FETCH_PHOTOS_SUCCESS: {
			let fetchedPhotos = [];
			let totalPages = initialState.get('totalPages');

			if (action.payload && action.payload.photos) {
				action.payload.photos.photo && (fetchedPhotos = action.payload.photos.photo);
				action.payload.photos.pages && (totalPages = action.payload.photos.pages);
			}

			fetchedPhotos = fetchedPhotos.map(photo => {
				photo.src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
				return photo;
			});

			let photos = fetchedPhotos;

			if (action.loadMorePhotos) { // Load more photos (add to the existing photos)
				let currentPhotos = state.get('photos').toJS();

				for (let i = 0; i < fetchedPhotos.length; i++) { // Add only unique photos
					const fetchedPhoto = fetchedPhotos[i];
					const fetchedPhotoAlreadyExists = currentPhotos.find((photo) => photo.id === fetchedPhoto.id);
					if (!fetchedPhotoAlreadyExists) {
						currentPhotos.push(fetchedPhoto);
					}
				}

				photos = [...currentPhotos];
			}

			return state
				.set('fetchPhotosLoading', initialState.get('fetchPhotosLoading'))
				.set('photos', fromJS(photos))
				.set('totalPages', totalPages);
		}
		case FETCH_PHOTOS_FAILURE: {
			return state
				.set('fetchPhotosLoading', initialState.get('fetchPhotosLoading'))
				.set('fetchPhotosError', action.payload.error);
		}
		case SET_SEARCH_INPUT_VALUE: {
			return state.set('searchInputValue', action.value);
		}
		case SET_SEARCH_TERM: {
			return state.set('searchTerm', action.value);
		}
		case SET_CURRENT_PAGE: {
			return state.set('currentPage', action.value);
		}
		default:
			return state;
	}
}
