import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPublisherDetails } from '../actions';
import { Link } from 'react-router-dom';
import './css/BooksByPublisher.css';

export default function BooksByPublisher() {

    const dispatch = useDispatch();
    // const history = useHistory();

    const fetchPublisherDetails = () => {
        fetch("http://localhost:65497/api/Publisher/publisherdetails",
            {
                method: 'GET'
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(function (data) {
                        dispatch(setPublisherDetails(data));
                    });
                } else {
                    alert("Unable to fetch books from database!");
                }
            });
    }

    const publisherDetails = useSelector(state => state.publisherDetails);

    useEffect(() => {
        fetchPublisherDetails();
    }, [])

    return (
        <div className="PublisherBooksContainer">
            {Array.isArray(publisherDetails) && publisherDetails.length > 0 &&
                publisherDetails.map((publisher, index) => {
                    return <div key={index} className="publisher">
                        {
                            <div>
                                <p>{publisher.publisher.publisherName}</p>
                                <div>{
                                    publisher.authorBook.map((author, index) => {
                                    return <p key={index} style={{marginLeft: '20px'}}>{author.authorName} - Number of books <Link to={`/booksbypublisher/${publisher.publisher.id}/${author.id}`}>{author.books.length}</Link></p>
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
