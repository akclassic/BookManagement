export const errorPublisherDetailReducer = (state = false , action) =>{
    switch(action.type){
        case 'LOAD_PUBLISHERDETAILS': 
        case 'PUBLISHERDETAILS_LOAD_SUCCESS': return null;
        case 'PUBLISHERDETAILS_LOAD_FAIL': return action.error;
        default : return state
    }
}