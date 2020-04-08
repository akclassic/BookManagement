import { combineReducers } from 'redux';
import {publisherDetailsReducer} from './PublisherDetailReducer';

const reducers = combineReducers({
    publisherDetails: publisherDetailsReducer
});

export default reducers;