// export const setPublisherDetails = (publisherDetails) =>{
//     return {
//         type: 'PublisherDetails',
//         payload: publisherDetails
//     }
// }

export const loadPublisherDetails = () =>{
    return {
        type: 'LOAD_PUBLISHERDETAILS',
        // payload: publisherDetails
    }
}

export const setPublisherDetails = (publisherDetails) =>{
    return {
        type: 'PUBLISHERDETAILS_LOAD_SUCCESS',
        payload: publisherDetails
    }
}

export const setError = (error) =>{
    return {
        type: 'PUBLISHERDETAILS_LOAD_FAIL',
        payload: error
    }
}