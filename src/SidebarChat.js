import { Avatar } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import './SidebarChat.css'
import db from './firebase';
import { Link } from 'react-router-dom';

function SidebarChat({id, name, addNewChat}) {

    const [seed, setSeed] = useState('');
    const [messages, setmessages] = useState("")

    useEffect(() => {
        setSeed(Math.floor(Math.random()*4000))
    }, []);

    useEffect(() => {
        if (id) {
            db.collection("rooms").doc(id).collection("message").orderBy("timestamp", "desc").onSnapshot((snapshot) => setmessages(snapshot.docs.map((doc) => doc.data())))
        }
    }, [id])


    // createChat Function
    const createChat = () => {
        const roomName = prompt("Please Enter Name for Chat: ")
        
        if(roomName) {
            db.collection('rooms').add({
                name: roomName
            })
        }
    }
    
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`} />
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div className="sidebarChat" onClick= { createChat }>
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
