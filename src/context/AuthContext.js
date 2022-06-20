import React, {createContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
    });
    const history = useHistory();

    function login(jwt) {
        localStorage.setItem('token', jwt)
        const decode = jwtDecode(jwt)
        console.log(decode)
        getData(decode.sub, jwt)
        /*toggleAuth(false);*/

    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        localStorage.removeItem('token');
        toggleAuth({isAuth: false, user: null});
        history.push('/');
    }

    async function getData(id, token) {
        try {
            const data = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            toggleAuth({
                isAuth: true,
                user: {
                    username: data.data.username,
                    email: data.data.email,
                    id: data.data.id,
                },
            });
            history.push('/profile');
        } catch (e) {
            console.error(e);
        }
    }

    const contextData = {
        isAuth: auth.isAuth,
        login: login,
        logout: logout,
        user: auth.user,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;