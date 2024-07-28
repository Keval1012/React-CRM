import React from 'react';
import Message from './Message';

const ChatWindow = ({ chat }) => {

    const ChatMessage = chat.map(m =>
        <Message
            key={Date.now() * Math.random()}
            user={m.user}
            message={m.message}
        />
    )
    
    return (
        <>
            {ChatMessage}
        </>
    );
}

export default ChatWindow;