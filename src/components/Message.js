import React from 'react';
import './message.css'

function Message({username, message}) {
    const isUser = username && username.displayName === message.username ;
    return (
        <div className={isUser ? "message__align" : ' '}>
            <button className={isUser ? "message__text card" : 'card '}>{!isUser && `${message.username || 'unknown user'}: `} {message.message}</button>
        </div>
    )
}

export default Message
