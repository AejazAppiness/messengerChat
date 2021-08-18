import { useState, useEffect } from 'react';
import {Switch, Route, useHistory} from 'react-router-dom'
import firebase from 'firebase'
import Login from './components/Login'
import Chat from './components/Chat';
import {auth, db} from './firebase'
import './App.css';

function App() {
  const [username, setUsername] = useState({});
  const [input, setInput] = useState('');
  const [message, setMessage] = useState([]);
  const [chatWith, setChatWith] = useState({});
  const [singleChat, setSingleChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(null)
  const [users, setUsers] = useState([])
  const history = useHistory()


  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleChatWith = (name) => {
    const otherPerson = users.find(item => item.user === name)
    setChatWith(otherPerson)
    setSingleChat(otherPerson)

  }


  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("messages").add({username: username.displayName, user_uid_1: username.uid, user_id_2: chatWith.uid, message:input, timestamp: firebase.firestore.FieldValue.serverTimestamp()});
    setInput('');
  }

  const sendUser = () => {
    db.collection(`users`).add({user: username.displayName, uid: username.uid})
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUsername(user);
      setLogin(user);
      if(login) {
        console.log('log in app component');
        history.push('/Chat');
        setLoading(false)
        sendUser()
      }
    })
    
  }, [login, history])
  

  useEffect(() => {
        
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessage(snapshot.docs.map(doc => {
        if((doc.data().user_uid_1 == username.uid && doc.data().user_id_2 == chatWith.uid) || (doc.data().user_uid_1 == chatWith.uid && doc.data().user_id_2 == username.uid)){
          return {id: doc.id, message: doc.data()}
        } 
      })) 
     })
    db.collection('users').onSnapshot(snapshot => {
      setUsers(snapshot.docs.map(doc => (doc.data())))
    });
  }, [chatWith])


  return (
    <div className="App">
        <Switch>
        <Route path="/Chat" exact render={(props) => loading ? 'loading' : <Chat {...props} message={message} sendMessage={sendMessage} input={input} handleChange={handleChange} setInput={setInput} username={username} users={users} handleChatWith={handleChatWith} chatWith={chatWith} singleChat={singleChat}/> } />
          <Route path='/' exact  render={(props) => <Login {...props} sendUser={sendUser} login={login}/>} />
        </Switch>
    </div>
  );
}

export default App;
