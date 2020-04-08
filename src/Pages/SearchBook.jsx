import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Book from '../Components/Book';
import './css/SearchBook.css';

export default function SearchBook() {
    const [publisherList, setPublisherList] = useState([]);
    const [authorList, setAuthorList] = useState([]);
    const [booklist, setBookList] = useState([]);
    const [selectedAuthorId, setSelectedAuthorId] = useState(0);
    const [selectPublisherId, setSelectPublisherId] = useState(0);

    const fetchAuthorList = () => {
        fetch("http://localhost:65497/api/Author",
            {
                method: 'GET'
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(function (data) {
                        setAuthorList(data);
                    });
                } else {
                    alert("Unable to fetch books from database!");
                }
            });
    }

    const fetchPublisherList = () => {
        fetch("http://localhost:65497/api/Publisher",
            {
                method: 'GET'
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(function (data) {
                        setPublisherList(data);
                    });
                } else {
                    alert("Unable to fetch books from database!");
                }
            });
    }

    const fetchBookByGroup = () =>{
        fetch(`http://localhost:65497/api/Book/groupby/${selectedAuthorId}/${selectPublisherId}`,
            {
                method: 'GET'
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(function (data) {
                        setBookList(data);
                    });
                } else {
                    alert("Unable to fetch books from database!");
                }
            });
    }

    useEffect(() => {
        fetchAuthorList();
        fetchPublisherList();
        fetchBookByGroup();
    }, [])

    const handlePublisherSelect = (event) =>{
        setSelectPublisherId(event.target.value);
    }

    const handleAuthorSelect = (event) =>{
        setSelectedAuthorId(event.target.value);
    }

    const handleSearchBook = (event) =>{
        fetchBookByGroup(selectedAuthorId,);
    }

    return (
        <div className="SearchBook">
            <div className="Searchbox">
                <Form.Group controlId="exampleForm.ControlSelect1" className="PublisherSelect">
                    <Form.Label>Select Publisher</Form.Label>
                    <Form.Control as="select" onChange={handlePublisherSelect}>
                        {Array.isArray(publisherList) &&
                            publisherList.map((publisher, index) => {
                                return <option key={index} value={publisher.publisherId}>{publisher.publisherName}</option>
                            })
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1" className="AuthorSelect">
                    <Form.Label>Select Author</Form.Label>
                    <Form.Control as="select" onChange={handleAuthorSelect}>
                        {Array.isArray(authorList) &&
                            authorList.map((author, index) => {
                                return <option key={index} value={author.authorId}>{author.authorName}</option>
                            })
                        }
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleSearchBook} style={{margin: '10px 0 0 20px', height: '40px'}}>Show Books</Button>
            </div>
`               `
            <div className="BooksContainer">
                    { Array.isArray(booklist) && booklist.length > 0 && <p style={{textAlign: 'center',width: '100%', marginLeft: '10px'}}>Number of books: {booklist[0].numberOfBooks}</p>}
                    {Array.isArray(booklist) && booklist.length ?
                        booklist.map((singlebook,index) => {
                            return singlebook.books.map((book, index) => {
                                return <Book key={index} book={book} index={index} />
                            })
                        })
                        : <p style={{textAlign: 'center', width: '100%'}}>No books of this Publisher And Author in the database</p>
                    }
                </div>
        </div>
    )
}
