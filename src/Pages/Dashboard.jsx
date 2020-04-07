import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Book from '../Components/Book';
import './css/Dashboard.css';
import { Form, Button } from 'react-bootstrap';

Modal.setAppElement('#root');

export default function Dashboard() {

    const [booklist, setBookList] = useState([]);
    const [aurthorList, setAuthorList] = useState([]);
    const [publisherList, setPublisherList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [isbn, setIsbn] = useState("");
    const [bookId, setBookId] = useState(0);
    const [booktitle, setBookTitle] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    const [bookPrice, setBookPrice] = useState(0.0);
    const [quantity, setQuantity] = useState(0);
    const [categoryId, setCategoryId] = useState(1);
    const [authorId, setAuthorId] = useState(1);
    const [publisherId, setPublisherId] = useState(1);

    const [isSave, setIsSave] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAuthorList = () => {
        fetch("http://localhost:65497/api/Author",
            {
                method: 'GET'
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(function (data) {
                        setAuthorList(data);
                        setIsLoading(false);
                    });
                } else {
                    alert("Unable to fetch books from database!");
                }
            });
    }

    const fetchCategoryList = () => {
        fetch("http://localhost:65497/api/BookCategory",
            {
                method: 'GET'
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(function (data) {
                        setCategoryList(data);
                        setIsLoading(false);
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
                        setIsLoading(false);
                    });
                } else {
                    alert("Unable to fetch books from database!");
                }
            });
    }

    const fetchBookList = () => {
        fetch("http://localhost:65497/api/Book",
            {
                method: 'GET'
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(function (data) {
                        setBookList(data);
                        setIsLoading(false);
                    });
                } else {
                    alert("Unable to fetch books from database!");
                }
            });
    }

    const fetchBookListById = (id) => {
        fetch(`http://localhost:65497/api/Book/${id}`,
            {
                method: 'GET'
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(function (book) {
                        setIsbn(book.isbn);
                        setBookId(book.bookId);
                        setBookTitle(book.bookName);
                        setBookDescription(book.bookDescription);
                        setQuantity(book.quantity);
                        setBookPrice(book.price);
                        setAuthorId(book.authorId);
                        setPublisherId(book.pulisherId);
                        setCategoryId(book.bookCategoryId);
                    });
                } else {
                    alert("Unable to fetch books from database!");
                }
            });
    }

    const deleteBook = (id) => {
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

    useEffect(() => {
        fetchBookList();
        fetchAuthorList();
        fetchCategoryList();
        fetchPublisherList();
    }, []);

    const handleAddNewBook = () => {
        setModalIsOpen(true);
    }

    const handleBookSubmit = (event) => {
        event.preventDefault();
        const book = {
            Isbn: isbn,
            BookId: Number(bookId),
            BookName: booktitle,
            BookDescription: bookDescription,
            BookCategoryId: Number(categoryId),
            Price: Number(bookPrice),
            AuthorId: Number(authorId),
            PulisherId: Number(publisherId),
            Quantity: Number(quantity)
        }
        debugger;
        if (isSave) {
            fetch("http://localhost:65497/api/Book", {
                method: 'POST',
                body: JSON.stringify(book),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert("Book Detail added");
                        fetchBookList();
                        setModalIsOpen(false);
                    } else {
                        alert("failed to save details");
                    }
                })
        } else if (!isSave) {
            fetch(`http://localhost:65497/api/Book/${bookId}`, {
                method: 'PUT',
                body: JSON.stringify(book),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert("Book Detail Updated");
                        fetchBookList();
                        setModalIsOpen(false);
                    } else {
                        alert("failed to save details");
                    }
                })
        }
    }

    const handleEdit = (event) => {
        fetchBookListById(event.target.id);
        setIsSave(false);
        setModalIsOpen(true);
    }

    const handleDelete = (event) => {
        event.persist();
        deleteBook(event.target.id);
    }

    return (
        <div className="dashboard">
            <div className="AddNew">
                <button onClick={handleAddNewBook} className="addbtn">Add a book</button>
            </div>
            {isLoading &&
                <div style={{ alignSelf: 'center', margin: 'auto' }}>
                    <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                    />
                    <span>Loading</span>
                </div>
            }
            {!isLoading &&
                <div className="BooksContainer">
                    {Array.isArray(booklist) && booklist.length ?
                        booklist.map((book, index) => {
                            return <Book key={index} book={book} index={index} handleEdit={handleEdit} handleDelete={handleDelete} />
                        })
                        : "Unable to fetch book list"
                    }
                </div>
            }
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <div>
                    <h2>Enter Details <span onClick={() => setModalIsOpen(false)} style={{ float: 'right', cursor: 'pointer' }}> x </span></h2>
                </div>
                <Form>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>ISBN Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicNumber">
                        <Form.Label>Book Id</Form.Label>
                        <Form.Control type="number" placeholder="Enter Book Id" value={bookId} onChange={(e) => setBookId(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Email Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Book Title" value={booktitle} onChange={(e) => setBookTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows="3" value={bookDescription} onChange={(e) => setBookDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicNumber">
                        <Form.Label>Book Price</Form.Label>
                        <Form.Control type="number" step="any" placeholder="Enter Book Price" value={bookPrice} onChange={(e) => setBookPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicNumber">
                        <Form.Label>Available Quantity</Form.Label>
                        <Form.Control type="number" placeholder="Enter Book Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Publisher Id</Form.Label>
                        <Form.Control as="select" onChange={(e) => setPublisherId(e.target.value)} >
                            {publisherList.map((publisher,index) =>{
                                return <option key={index} value={publisher.publisherId}>{publisher.publisherId}</option>
                            })}                            
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Author Id</Form.Label>
                        <Form.Control as="select" onChange={(e) => setAuthorId(e.target.value)}>
                            {aurthorList.map((author,index) =>{
                                return <option key={index} value={author.authorId}>{author.authorId}</option>
                            })}                            
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Category Id</Form.Label>
                        <Form.Control as="select" onChange={(e) => setCategoryId(e.target.value)}>
                            {categoryList.map((category,index) =>{
                                return <option key={index} value={category.categoryId}>{category.categoryId}</option>
                            })}                            
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ marginRight: '10px' }}
                        onClick={handleBookSubmit}
                    >
                        Submit
                    </Button>
                    <Button variant="primary" onClick={() => setModalIsOpen(false)}>close</Button>
                </Form>
            </Modal>
        </div>
    )
}
