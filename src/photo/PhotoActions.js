import { config } from '../config';
export const FETCH_PHOTOS_BEGIN = 'FETCH_PHOTOS_BEGIN';
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const FETCH_PHOTOS_FAILURE = 'FETCH_PHOTOS_FAILURE';
export const SET_SEARCH_INPUT_VALUE = 'SET_SEARCH_INPUT_VALUE';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export const fetchPhotosBegin = loadMorePhotos => ({
    type: FETCH_PHOTOS_BEGIN,
    loadMorePhotos
});

export const fetchPhotosSuccess = ({ photosResp, loadMorePhotos }) => ({
    type: FETCH_PHOTOS_SUCCESS,
    payload: photosResp,
    loadMorePhotos
});

export const fetchPhotosFailure = ({ error, loadMorePhotos }) => ({
    type: FETCH_PHOTOS_FAILURE,
    payload: { error },
    loadMorePhotos
});

export const fetchPhotos = (params) => {
    let { currentPage, searchTerm, loadMorePhotos } = params;
    let textParam = searchTerm ? `&text=${searchTerm}` : '';
    const fetchUrl = config.flickrSearchPhotosUrl + textParam +
        `&max_upload_date=${+ new Date()}&safe_search=1&extras=tags%2Cdescription%2Cowner_name&page=${currentPage}&per_page=${config.resultsPerPage}&format=json&nojsoncallback=1`;

    return dispatch => {
        dispatch(fetchPhotosBegin(loadMorePhotos));

        return fetch(fetchUrl)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                return dispatch(fetchPhotosSuccess({ photosResp: json, loadMorePhotos }));
            })
            .catch(error => dispatch(fetchPhotosFailure({ error, loadMorePhotos })));
    };
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const setSearchInputValue = value => ({
    type: SET_SEARCH_INPUT_VALUE,
    value
});

export const setSearchTerm = value => dispatch => {
    dispatch({
        type: SET_SEARCH_TERM,
        value
    });

    return Promise.resolve();
};

export const setCurrentPage = () => dispatch => {
    dispatch({
        type: SET_CURRENT_PAGE
    });

    return Promise.resolve();
};
