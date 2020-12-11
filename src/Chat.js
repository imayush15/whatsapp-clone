import React, {useState, useEffect} from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons';
// import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat() {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState('');
    const {roomId} = useParams();

    const [roomName, setRoomName] = useState('');
    const [messages, setmessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    // firstName
    const fName = user.displayName.split(" ")[0];

    // Changing the room name 
    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            })

            db.collection("rooms").doc(roomId).collection("message").orderBy("timestamp", "asc").onSnapshot((snapshot) => setmessages(snapshot.docs.map((doc) => doc.data())));

        }
    })

    // Changing the Avatar
    useEffect(() => {
        setSeed(Math.floor(Math.random()*4000))
    }, [roomId]);

    const sendMessage = (e) => {
        
        // e.preventDefault() prevents the webpage from reloading after "Enter" is pressed!
        e.preventDefault(); 
        console.log("Your Message: ", input);
         db.collection("rooms").doc(roomId).collection("message").add({
                message: input,
                name: fName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`} />

                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    last seen{" "}
                    {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                </div>

                <div className="chat_headerRight">
                    <IconButton >
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
            {messages.map(message => (
                <p className={`chat_message ${message.name === fName && "chat_receiver"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span> 
                </p>
            ))}
                
            </div>

            <div className="chat_footer">
                <InsertEmoticon />
                <form action="">
                    <input value={input} onChange={e => {
                        setInput(e.target.value)
                    }} type="text" placeholder="Type a Message"/>
                    <button type="submit" onClick={sendMessage}>Send</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat