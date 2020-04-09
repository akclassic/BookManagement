import { takeEvery, put,call } from 'redux-saga/effects'
import { setPublisherDetails, setError } from '../actions';
import { fetchPublisherDetails } from '../util/apicalls';

//worker saga
function* handleLoadPublisherDetails(){
    try{
        const publisherData = yield call(fetchPublisherDetails);
        yield put(setPublisherDetails(publisherData));
    }catch(error){
        yield put(setError(error.toString()));
    }
}

// watcher saga
function* rootSaga(){
    yield takeEvery('LOAD_PUBLISHERDETAILS', handleLoadPublisherDetails);
}

export default rootSaga