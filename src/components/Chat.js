import React, {useState, useEffect} from 'react'
import firebase  from 'firebase';
import { auth, db } from '../firebase';
import { useHistory } from 'react-router';
import {IoSend} from 'react-icons/io5'
import UserDetails from './UserDetails'
import Message from './Message'
import Users from './Users';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import './chat.css'

function Chat() {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState([]);
    const [username, setUsername] = useState({});
    const [showEmoji, setShowEmoji] = useState(false);
    // const [chatWith, setChatWith] = useState(null);
    // const [singleChat, setSingleChat] = useState([])
    const history = useHistory()
    
    const handleChange = (e) => {
      setInput(e.target.value)
    }
  
    const sendMessage = (e) => {
      e.preventDefault();
      db.collection("messages").add({username: username.displayName, message:input, timestamp: firebase.firestore.FieldValue.serverTimestamp()})
    //   db.collection(`${chatWith}`).add({username: username.displayName, message:[...message, input], timestamp: firebase.firestore.FieldValue.serverTimestamp()})
      setInput('')
    }
  
    useEffect(() => {
      db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
       setMessage(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()}))) 
      })
    }, [])

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          setUsername(user);
        })
      
      }, [])

    //   useEffect(() => {
    //     db.collection(`${chatWith}`).orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    //      setSingleChat(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()}))) 
    //     })
    //   }, [chatWith])
      const addEmoji = (e) => {
          let emoji = e.native
          setInput(input + emoji)
          setShowEmoji(false)
      }

    //   const handleChatWith = (name) => {
    //     setChatWith(name)
    //   }

    //   console.log(chatWith, singleChat);

    // console.log(username.displayName);
    return (
        <div className="chat">
            <div className="chat__header">
                <div>
                    Messenger
                </div>
                <div>
                    <button onClick={async () => {
                await auth.signOut();
                history.push("/")
            }}>Logout</button>
                </div>
            </div>
            <div className="chat__body">
                <div className="chat__users"><Users message={message} username={username} /></div>
                <div className='chat__messages'>
                  <form className="chat__form">
                    <input placeholder='enter text' value={input} onChange={handleChange} className="chat__input"/>
                    <button type='submit' disabled={!input} onClick={sendMessage} className="chat__sendBtn"> <IoSend /></button>
                    {showEmoji ? (
                    <span className='chat__emojiPicker'>
                        <Picker
                            onSelect={addEmoji}
                            emojiTooltip={true}
                            title="weChat"
                        />
                    </span>
                    ) : (
                    <p className='chat__emoji' onClick={() =>           setShowEmoji(!showEmoji)}>
                        {String.fromCodePoint(0x1f60a)}
                    </p>
                    )}
                </form>
               <div className='chat__messages__container'>
               {
                    message.map(({message, id}) => {
                        return <Message username={username} message={message} key={id} />
                    })
                }
               </div>
                </div>
                <div className='chat__userDetails'>
                    <UserDetails username={username}/>
                </div>
            </div>
        </div>
    )
}

export default Chat
