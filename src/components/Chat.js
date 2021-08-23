import React, {useState, useEffect} from 'react'
import { auth, storage } from '../firebase';
import {IoSend} from 'react-icons/io5'
import UserDetails from './UserDetails'
import Message from './Message'
import Users from './Users';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart';
import {FiUpload} from 'react-icons/fi' 
import './chat.css'

function Chat(props) {
    const {input, handleChange, message, sendMessage, setInput, username, users, handleChatWith, showChat, chatWith, setSongFileUrl , songFileUrl, imgFileUrl, setImgFileUrl, setPdfFileUrl, setVideoFileUrl, pdfFileUrl, videoFileUrl} = props
    const [showEmoji, setShowEmoji] = useState(false);
    // const [file, setFile] = useState('');
    // useEffect(() => {
    //     setFileUrl(songFileUrl || imgFileUrl)
    // }, [songFileUrl, imgFileUrl])
   
    // console.log(fileUrl);

    const addEmoji = (e) => {
        let emoji = e.native
        setInput(input + emoji)
        setShowEmoji(false)
    }

    const onFileChange = async (e) => {
        const file = e.target.files[0]; 
        const storageRef = storage.ref();
        let fileRef, type, fileType, size, url ;
        
        if(file){
            fileRef = storageRef.child(file.name);
             type = file.type ? file.type : 'NOT SUPPORTED';
             fileType = type.split('/').pop();
             size = file.size ? file.size : 'NOT SUPPORTED';
             if(size < 10485760) {
                await fileRef.put(file);
                url = await fileRef.getDownloadURL()
                if(fileType === "mpeg" || fileType === "ogg") {
                    console.log("audio got executed");
                    setSongFileUrl(url);
                } else if( fileType === "png" || fileType === "jpeg" ){
                    console.log("photo got executed");
                    setImgFileUrl(url);
                } else if (fileType === "pdf") {
                    console.log("pdf got executed");
                    setPdfFileUrl(url);
                } else if (fileType === "mp4" || fileType === "avi") {
                    console.log("video got executed");
                    setVideoFileUrl(url);
                } else {
                    return
                }
            } else {
                alert('please select a file less than 10mb')
            } 
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
                    {/* <input type='file' id="file-input" onChange={onFileChange}/> */}
                    {showChat ? <form className="chat__form">
                    <span className="image-upload">
                        <label htmlFor="file-input" className="chat__upload">
                            <FiUpload />
                        </label>

                        <input type='file' id="file-input" onChange={onFileChange}/>
                    </span>
                        
                        <input placeholder='enter text' value={input} onChange={handleChange} className="chat__input"/>

                        <button type='submit' disable = {!imgFileUrl && !videoFileUrl && !pdfFileUrl && !songFileUrl && !input} onClick={sendMessage} className={!imgFileUrl && !videoFileUrl && !pdfFileUrl && !songFileUrl && !input   ? "chat__sendBtn__disabled" : "chat__sendBtn" }> <IoSend /></button>
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
                        return item === undefined ? null : <Message username={username} songFileUrl={songFileUrl} message={item.message} key={item.id} />
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
