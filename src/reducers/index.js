import { combineReducers } from 'redux';
import {errorPublisherDetailReducer} from './ErrorReducer';
import {loadPublisherDetailReducer} from './LoadPublisherDetailReducer';
import {publisherDetailsReducer} from './PublisherDetailReducer';

const reducers = combineReducers({
    loadPublisherDetails: loadPublisherDetailReducer,
    publisherDetails: publisherDetailsReducer,
    errorPublisherDetails: errorPublisherDetailReducer
});

export default reducers;