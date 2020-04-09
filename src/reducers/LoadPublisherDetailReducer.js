export const loadPublisherDetailReducer = (state = false , action) =>{
    switch(action.type){
        case 'LOAD_PUBLISHERDETAILS': return true;
        case 'PUBLISHERDETAILS_LOAD_SUCCESS': return false;
        case 'PUBLISHERDETAILS_LOAD_FAIL': return false;
        default : return state
    }
}