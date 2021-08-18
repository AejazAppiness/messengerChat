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

function Chat({input, handleChange, message, sendMessage, setInput, username, users, handleChatWith, singleChat }) {
    const [showEmoji, setShowEmoji] = useState(false);
    // console.log(singleChat);
    const history = useHistory()

      const addEmoji = (e) => {
          let emoji = e.native
          setInput(input + emoji)
          setShowEmoji(false)
      }

      
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
                <div className="chat__users"><Users users={users} username={username} handleChatWith={handleChatWith}/></div>
                <div className='chat__messages'>
                  {singleChat ? <form className="chat__form">
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
                </form> : null}
               <div className='chat__messages__container'>
               {
                    message.map((item) => {
                        return item === undefined ? null : <Message username={username} message={item.message} key={item.id} />
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
