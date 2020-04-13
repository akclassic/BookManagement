import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import './css/Navigation.css';

export default function Navigation() {

    const history = useHistory(); 
    const username = document.cookie.split('=')[1];

    const handleLogout = () =>{
        document.cookie = "Username=";
        history.push('/');
    }

    return (
        <header className="App-Header">
            <ul className="Logo">
                <li><h1 style={{letterSpacing: '1.5px'}}>Book Management App</h1></li>
            </ul>
            {
                username && <ul className="Nav-components">
                                <li><span>Hello {username}</span></li>
                                <li><Link onClick={handleLogout}>Logout</Link> </li>
                            </ul>
            }
        </header>
    )
}
