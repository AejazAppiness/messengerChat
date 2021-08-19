import { useState, useEffect } from 'react';
import {Switch, Route} from 'react-router-dom'
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
  const [showChat, setShowChat] = useState(null);
  const [login, setLogin] = useState(null)
  const [users, setUsers] = useState([])

  console.log(message);

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleChatWith = (name) => {
    const otherPerson = users.find(item => item.user === name)
    console.log(otherPerson);
    setChatWith(otherPerson)
    setShowChat(otherPerson)
  }

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("messages").add({username: username.displayName, user_uid_1: username.uid, user_id_2: chatWith.uid, message:input, timestamp: firebase.firestore.FieldValue.serverTimestamp()});
    setInput('');
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(auth);
      setUsername(user);
    })
    
  }, [username])
  

  useEffect(() => {
        
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      const messages = snapshot.docs.map(doc => {
        if((doc.data().user_uid_1 === username.uid && doc.data().user_id_2 === chatWith.uid) || (doc.data().user_uid_1 === chatWith.uid && doc.data().user_id_2 === username.uid)){
          return {id: doc.id, message: doc.data()}
        } 
      });
      const filteredMessages = messages.filter(item => item != undefined);
      setMessage(filteredMessages);
     })
    db.collection('users').onSnapshot(snapshot => {
      setUsers(snapshot.docs.map(doc => (doc.data())))
    });
  }, [chatWith])


  return (
    <div className="App">
        <Switch>

          <Route path="/Chat" exact render={(props) =>  <Chat {...props} message={message} sendMessage={sendMessage} input={input} handleChange={handleChange} setInput={setInput} username={username} users={users} handleChatWith={handleChatWith} chatWith={chatWith} showChat={showChat}/> } />

          <Route path='/' exact  render={(props) => <Login {...props} setLogin={setLogin} login={login}/>} />

        </Switch>
    </div>
  );
}

export default App;
