export const publisherDetailsReducer  = (state =[], action) =>{
    switch(action.type){
        case 'PUBLISHERDETAILS_LOAD_SUCCESS' : return action.payload
        default: return state;
    }
}