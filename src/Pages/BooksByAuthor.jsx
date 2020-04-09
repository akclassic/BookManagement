import React, { useEffect } from 'react';
import { useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Book from '../Components/Book';
import './css/BooksByAuthor.css';

export default function BooksByAuthor({ match }) {

    const publisherid = Number(match.params.publisherid);
    const authorid = Number(match.params.authorid);
    let publishersData = useSelector(state => state.publisherDetails);
    publishersData = Array.isArray(publishersData) && publishersData.filter( publisher => publisher.publisher.id === publisherid)[0];
    const publisherName = publishersData && publishersData.publisher.publisherName;

    let  authorData = publishersData && publishersData.authorBook
    authorData = authorData && authorData.filter(author => author.id === authorid)[0];


    return (
        <div className="BooksAuthor">
            <Link to="/booksbypublisher">Go Back</Link>
            <div className="Title">
                Publisher: {publisherName} Author: {authorData.authorName}
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {
                    authorData && authorData.books.map((book,index) => {
                        return <Book key={book.isbn} book={book} index={index}/>
                    })
                }
            </div>
        </div>
    )
}
