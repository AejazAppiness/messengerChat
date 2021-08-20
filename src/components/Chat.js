import React, {useState} from 'react'
import { auth, storage } from '../firebase';
import {IoSend} from 'react-icons/io5'
import UserDetails from './UserDetails'
import Message from './Message'
import Users from './Users';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart';
import {IoIosAttach} from 'react-icons/io' 
import './chat.css'

function Chat(props) {
    const {input, handleChange, message, sendMessage, setInput, username, users, handleChatWith, showChat, chatWith, setSongFileUrl , songFileUrl, imgFileUrl, setImgFileUrl} = props
    const [showEmoji, setShowEmoji] = useState(false);
    const [metaData, setMetaData] = useState({})
   

    const addEmoji = (e) => {
        let emoji = e.native
        setInput(input + emoji)
        setShowEmoji(false)
    }

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        const type = file.type ? file.type : 'NOT SUPPORTED';
        const fileType = type.substring(0, 5);
        console.log(fileType);
        const size = file.size ? file.size : 'NOT SUPPORTED';
        if(size < 10485760) {
            if(fileType === "audio") {
                await fileRef.put(file);
                setSongFileUrl(await fileRef.getDownloadURL());
            } else if( fileType === "image" ){
                await fileRef.put(file);
                setImgFileUrl(await fileRef.getDownloadURL());
            } else {
                return
            }
        } else {
            prompt('please select a file less than 10mb')
        } 
      }
    
      
    return (
        <div className="chat">
            <div className="chat__header">
                <div>
                    Messenger
                </div>
                <div>
                    <button onClick={() => {
                        auth.signOut();
                        props.history.replace('/');

                    }}>Logout</button>
                </div>
            </div>
            <div className="chat__body">
                <div className="chat__users"><Users users={users} username={username} handleChatWith={handleChatWith}/></div>
                <div className='chat__messages'>
                   {showChat ? <div className="chat__person">
                        <p>Say Hello to <span>{chatWith.user}</span></p>
                    </div> : null} 
                    {showChat ? <form className="chat__form">
                    <span className="image-upload">
                        <label htmlFor="file-input">
                            <IoIosAttach />
                        </label>

                        <input type='file' id="file-input" onChange={onFileChange}/>
                    </span>
                        
                        <input placeholder='enter text' value={input} onChange={handleChange} className="chat__input"/>

                        <button type='submit' onClick={sendMessage} className="chat__sendBtn"> <IoSend /></button>
                        {showEmoji && 
                        <span className='chat__emojiPicker'>
                            <Picker
                            onSelect={addEmoji}
                            emojiTooltip={true}
                            title="weChat"
                            />
                        </span>}
                        <p className='chat__emoji' onClick={() =>           setShowEmoji(!showEmoji)}>
                            {String.fromCodePoint(0x1f60a)}
                        </p>
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
