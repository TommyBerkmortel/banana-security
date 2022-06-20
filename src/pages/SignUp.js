import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from "axios";



function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();


    async function handleSubmit(event) {
        event.preventDefault();
        try{
            await axios.post('http://localhost:3000/register', {
                email: email,
                password: password,
                username: username
            })
            history.push('/signin')
        } catch(e) {
            console.error(e)
        }

    }

    console.log(email)
    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
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
                    <label htmlFor="details-username">
                        Gebruikersnaam:
                        <input
                            type="text"
                            id="details-username"
                            onChange={(event) => setUsername(event.target.value)}
                            value={username}
                            name="details-username"

                        />
                    </label>
                    <button type="submit">
                        Versturen
                    </button>
                </fieldset>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;