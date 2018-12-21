import { createStore, combineReducers, applyMiddleware } from 'redux';
import photoReducer from '../photo/PhotoReducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
	photosData: photoReducer
});

const store = createStore(
	reducers,
	applyMiddleware(thunk)
);

export default store;
