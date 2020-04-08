export const publisherDetailsReducer  = (state =[], action) =>{
    switch(action.type){
        case 'PublisherDetails' : return action.payload
        default: return state;
    }
}