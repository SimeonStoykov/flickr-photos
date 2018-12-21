import { config } from '../config';
export const FETCH_PHOTOS_BEGIN = 'FETCH_PHOTOS_BEGIN';
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const FETCH_PHOTOS_FAILURE = 'FETCH_PHOTOS_FAILURE';

export const fetchPhotosBegin = () => ({
    type: FETCH_PHOTOS_BEGIN
});

export const fetchPhotosSuccess = photosResp => ({
    type: FETCH_PHOTOS_SUCCESS,
    payload: photosResp
});

export const fetchPhotosFailure = error => ({
    type: FETCH_PHOTOS_FAILURE,
    payload: { error }
});

export const fetchPhotos = params => {
    const { page, resultsPerPage, searchTerm } = params;
    const apiKey = '9098edcf1042f4c9445e4f63e75a840e';
    let fetchUrl = config.flickrApiBaseUrl;

    if (searchTerm) { // Search for photos with the provided searchTerm
        fetchUrl += `?method=flickr.photos.search&api_key=${apiKey}&text=${searchTerm}&extras=tags%2Cdescription&per_page=${resultsPerPage}&page=${page}&format=json&nojsoncallback=1`;
    } else { // Search for the recent photos
        fetchUrl += `?method=flickr.photos.getRecent&api_key=${apiKey}&extras=tags%2Cdescription&per_page=${resultsPerPage}&page=${page}&format=json&nojsoncallback=1`;
    }

    return dispatch => {
        dispatch(fetchPhotosBegin());

        return fetch(fetchUrl)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                return dispatch(fetchPhotosSuccess(json));
            })
            .catch(error => dispatch(fetchPhotosFailure(error)));
    };
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
