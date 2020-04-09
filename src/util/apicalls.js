export const fetchAuthorList = () => {
    return fetch("http://localhost:65497/api/Author",
        {
            method: 'GET'
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json().then(function (data) {
                    return (data);
                });
            } else {
                alert("Unable to fetch books from database!");
            }
        });
}

export const fetchCategoryList = () => {
    return fetch("http://localhost:65497/api/BookCategory",
        {
            method: 'GET'
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json().then(function (data) {
                    return (data);
                });
            } else {
                alert("Unable to fetch books from database!");
            }
        });
}

export const fetchPublisherList = () => {
    return fetch("http://localhost:65497/api/Publisher",
        {
            method: 'GET'
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json().then(function (data) {
                    // console.log(data);
                    return data;
                });
            } else {
                alert("Unable to fetch books from database!");
            }
        });
}


export const fetchBookList = async () => {
    const response = await fetch("http://localhost:65497/api/Book",
    {
        method: 'GET'
    });

    const data = await response.json();
    if(response.status === 200){
        return data;
    }else{
        return "Unable to fetch books from database!"
    }
    // return fetch("http://localhost:65497/api/Book",
    //     {
    //         method: 'GET'
    //     })
    //     .then((response) => {
    //         if (response.status === 200) {
    //             return response.json().then(function (data) {
    //                 return (data);
    //             });
    //         } else {
    //             alert("Unable to fetch books from database!");
    //         }
    //     });
}

// export  const fetchBookListById = (id) => {
//     fetch(`http://localhost:65497/api/Book/${id}`,
//         {
//             method: 'GET'
//         })
//         .then((response) => {
//             if (response.status === 200) {
//                 response.json().then(function (book) {
//                     setIsbn(book.isbn);
//                     setBookId(book.bookId);
//                     setBookTitle(book.bookName);
//                     setBookDescription(book.bookDescription);
//                     setQuantity(book.quantity);
//                     setBookPrice(book.price);
//                     setAuthorId(book.authorId);
//                     setPublisherId(book.pulisherId);
//                     setCategoryId(book.bookCategoryId);
//                 });
//             } else {
//                 alert("Unable to fetch books from database!");
//             }
//         });
// }

export const deleteBook = (id) => {
    fetch(`http://localhost:65497/api/Book/${id}`,
        {
            method: 'Delete'
        })
        .then((response) => {
            if (response.status === 200) {
                response.json().then(function (data) {
                    if (data) {
                        fetchBookList();
                        alert("Book with id: " + id + " deleted.")
                    }
                });
            } else {
                alert("Unable to Delete book in the database!");
            }
        });
}

// export const fetchPublisherDetails = () => {
//     return fetch("http://localhost:65497/api/Publisher/publisherdetails",
//         {
//             method: 'GET'
//         })
//         .then((response) => {
//             if (response.status === 200) {
//                 return response.json().then(function (data) {
//                     // dispatch(setPublisherDetails(data));
//                     return data;
//                 });
//             } else {
//                 throw new Error("Unable to fetch details");
//             }
//         });
// }

export const fetchPublisherDetails = async () => {
    const response = await fetch("http://localhost:65497/api/Publisher/publisherdetails",
            {
                method: 'GET'
            });
    const data = await response.json();
    if(response.status !== 200){
        throw new Error(response.status+ " Unable to fetch data!");
    }
    return data;
};