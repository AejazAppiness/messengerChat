import React from 'react'
import firebase from 'firebase';
import { auth } from '../firebase'
import './login.css'


function Login() {
    // const history = useHistory()
    // console.log(auth);
    // console.log(history);
    return (
        <div className="login__btnContainer">
            <div>
                <p>Welcome to Messenger</p>
                <button onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())} >Login with Google</button>
            </div>
        </div>
    )
}

export default Login
