import { useState, useEffect } from 'react';
import {Switch, Route, useHistory} from 'react-router-dom'
import Login from './components/Login'
import Chat from './components/Chat';
import {auth} from './firebase'
import './App.css';

function App() {
  const [username, setUsername] = useState({})
  const history = useHistory()


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUsername(user);
      if(username) {
        history.push('/Chat')
      }
    })
  
  }, [username, history])

  return (
    <div className="App">
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path="/Chat" exact component={Chat} />
        </Switch>
    </div>
  );
}

export default App;
