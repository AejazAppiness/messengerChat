import React from 'react'
import firebase from 'firebase';
import { auth, db} from '../firebase'
import { useHistory } from 'react-router';
import './login.css'


function Login({login, setLogin}) {
const history = useHistory();
// const [userData, setUserData] = useState('')
// console.log(userData);
console.log(auth);

const setUsers = async () => {
    firebase.auth()
  .signInWithPopup(new firebase.auth.GoogleAuthProvider())
  .then((result) => {
    console.log(result);
    db.collection(`users`).doc(result.user.uid).set({user: result.user.displayName, uid: result.user.uid})
    history.push('/Chat')
  }).catch((error) => {
    console.log(error);
  });
    
}
    return (
        <div className="login__btnContainer">
            <div>
                <p>Welcome to Messenger</p>
                <button onClick={setUsers} >Login with Google</button>
            </div>
        </div>
    )
}

export default Login;
