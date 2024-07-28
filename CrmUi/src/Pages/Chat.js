import React, { useEffect, useRef, useState } from 'react';
import ChatInput from '../Components/Chat/ChatInput';
import ChatWindow from '../Components/Chat/ChatWindow';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { API_HOST } from '../Constants';

const Chat = () => {

    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);
    
    latestChat.current = chat;

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(`${API_HOST}/hubs/chat`)
            .withAutomaticReconnect()
            .build();

        connection.start()
        .then(result => {
            console.log('Connected!');
            connection.on('ReceiveMessage', message => {
                const updatedChat = [...latestChat.current];
                updatedChat.push(message);
                setChat(updatedChat);
            });
        })
        .catch(e => console.log('Connection failed: ', e));
    }, [latestChat]);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };
        
        try {
            await fetch(`${API_HOST}/api/Chat/Messages`, { 
                method: 'POST', 
                body: JSON.stringify(chatMessage),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch(e) {
            console.log('Sending message failed.', e);
        }
    };

    return (
        <>
            <ChatInput sendMessage={sendMessage} />
            <ChatWindow chat={chat} />
        </>
    );
}

export default Chat;