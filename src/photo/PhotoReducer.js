import { fromJS } from 'immutable';

import {
	FETCH_PHOTOS_BEGIN,
	FETCH_PHOTOS_SUCCESS,
	FETCH_PHOTOS_FAILURE
} from './PhotoActions';

const initialState = fromJS({
	searchTerm: '',
	fetchPhotosLoading: false,
	fetchPhotosError: null,
	photos: []
});

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PHOTOS_BEGIN:
			return state
				.set('fetchPhotosLoading', true)
				.set('fetchPhotosError', initialState.get('fetchPhotosError'));

		case FETCH_PHOTOS_SUCCESS:
			let photos = (action.payload && action.payload.photos && action.payload.photos.photo) || initialState.get('photos');
			photos = photos.map(photo => {
				photo.src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
				return photo;
			});

			return state
				.set('fetchPhotosLoading', initialState.get('fetchPhotosLoading'))
				.set('photos', fromJS(photos));

		case FETCH_PHOTOS_FAILURE:
			return state
				.set('fetchPhotosLoading', initialState.get('fetchPhotosLoading'))
				.set('photos', initialState.get('photos'))
				.set('fetchPhotosError', action.payload.error);
		default:
			return state;
	}
}
