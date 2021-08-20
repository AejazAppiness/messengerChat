import React from 'react';
import './message.css'

function Message({username, message}) {
    const isUser = username && username.displayName === message.username ;
    console.log(message.audio);
    return (
        <div className={isUser ? "message__align" : ' '}>
             {message.audio && <audio className="audio-element" controls>
                    <source src={message.audio} ype="audio/mpeg" ></source>
                 </audio>}
                 {message.avatar && <div className={isUser ? "img" : ''} >
                    <img style={{width: "100px"}} src={message.avatar}/>
                     </div>}
            {message.message && <button className={isUser ? "message__text card" : 'card '}>    
            {message.message}</button> }
        </div>
    )
}

export default Message;
