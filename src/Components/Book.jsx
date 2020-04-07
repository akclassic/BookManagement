import React from 'react';
import { Button } from 'react-bootstrap';
import './css/Book.css';
import bookimg from '../images/book3.png';

export default function Book({ book, index, handleEdit, handleDelete }) {
    return (
        
        <div className="BookCard">
            <img src={bookimg} alt="Avatar" style={{ width: '100%' }} />
            <div className="container">
                <p>Isbn Number: {book.isbn}</p>
                <p>Title: {book.bookName}</p>
                <p>Summary: {book.bookDescription}</p>
            </div>
            <div className="EditDelete">
                <Button variant="warning" id={book.bookId} onClick={handleEdit}>Edit Details</Button>
                <Button variant="danger" id={book.bookId} onClick={handleDelete}>Delete</Button>
            </div>
        </div>
    )
}
