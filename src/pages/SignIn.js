import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import axios from "axios";

function SignIn() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const result = await axios.post('http://localhost:3000/login', {
                email: email,
                password: password
            })
            console.log(result.data.accessToken);
            login(result.data.accessToken);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Gegevens</legend>
                    <label htmlFor="details-email">
                        Emailadres:
                        <input
                            type="email"
                            id="details-email"
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            name="details-email"

                        />
                    </label>
                    <label htmlFor="details-password">
                        Wachtwoord:
                        <input
                            type="password"
                            id="details-password"
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                            name="details-password"

                        />
                    </label>
                    <button type="submit">
                        Versturen
                    </button>
                </fieldset>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;