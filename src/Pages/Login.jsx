import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './css/Login.css';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    let history = useHistory();

    function handleUsernameChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
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
                if (response.status === 200) {
                    console.log('login',response);
                    response.json().then(function(data) {
                        if(data){
                            localStorage.setItem("authToken",data.authtoken);
                            document.cookie = `Username=${data.user.username}`
                            history.push('/dashboard')
                        }
                     });
                } else if (response.status === 404) {
                    setMessage("Invalid email or password");
                    setEmail("");
                    setPassword("");
                }
                setLoading(false);
            })
            .catch((response) => { console.log(response) })
    }

    useEffect(()=>{
        let username = document.cookie.split('=');
        if(username[1]){
            history.push('/dashboard');
        }
    })
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
                    disabled={loading}
                >
                    {loading && (
                        <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginRight: "5px" }}
                        />
                    )}
                    {loading && <span>Singning In</span>}
                    {!loading && <span>Sign In</span>}
              </button>
            </form>
        </div>
    )
}
