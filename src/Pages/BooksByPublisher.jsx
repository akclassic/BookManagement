import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadPublisherDetails } from '../actions';
import { Link } from 'react-router-dom';
import './css/BooksByPublisher.css';

export default function BooksByPublisher() {

    const dispatch = useDispatch();

    const publisherDetails = useSelector(state => state.publisherDetails);

    useEffect(() => {
        dispatch(loadPublisherDetails());
    }, [])

    return (
        <div className="PublisherBooksContainer">
            {Array.isArray(publisherDetails) && publisherDetails.length > 0 &&
                publisherDetails.map((publisher, index) => {
                    return <div key={index} className="publisher">
                        {
                            <div>
                                <p className="Name">{publisher.publisher.publisherName}</p>
                                <div className="AuthorList">{
                                    publisher.authorBook.map((author, index) => {
                                    return <p key={index} className="Author" style={{marginLeft: '20px'}}>{author.authorName} - Number of books <Link to={`/booksbypublisher/${publisher.publisher.id}/${author.id}`}>{author.books.length}</Link></p>
                                    })
                                }
                                </div>
                            </div>
                        }
                    </div>
                })
            }
        </div>
    )
}
