import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './css/Login.css';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    let history = useHistory();

    function handleUsernameChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            Email: email,
            Password: password
        }

        fetch("http://localhost:65497/api/User/Login",
            {
                method: 'POST',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => { 
                if(response.status == 200){

                }
            })
            .catch((response) => { console.log(response) })
    }
    return (
        <div className="ContentForm">
            <div className="ErrorMessage">
                {message}
            </div>
            <form className="LoginFrom" onSubmit={handleSubmit}>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter Email" value={email || ''} onChange={handleUsernameChange} required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter Password" value={password || ''} onChange={handlePasswordChange} required />

                <button
                    type="submit"
                    className="button"
                >
                    Login
              </button>
            </form>
        </div>
    )
}
