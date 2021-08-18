import React from 'react'
import firebase from 'firebase';
import { auth} from '../firebase'
import { useHistory } from 'react-router';
import './login.css'


function Login({login}) {
const history = useHistory();
    return (
        <div className="login__btnContainer">
            <div>
                <p>Welcome to Messenger</p>
                <button onClick={(e) => {
                    auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
                    console.log('log in login component');
                    // history.push('/Chats');
                    // sendUser()
                }} >Login with Google</button>
            </div>
        </div>
    )
}

export default Login
