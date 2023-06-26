import React, {useState} from "react";
import {wsChanel} from "./Messenger";

export const MessengerForm = () => {
    const [newMessage, setNewMessage] = useState('');

    const onMessageChange = (newText: string) => {
        setNewMessage(newText);
    }

    const sendMessage = () => {
        if (newMessage) {
            wsChanel.send(newMessage);
        }
        setNewMessage('');
    }

    return (
        <div>
            <div>
                <input type="text" value={newMessage} onChange={(e) => onMessageChange(e.target.value)}/>
            </div>
            <div>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}