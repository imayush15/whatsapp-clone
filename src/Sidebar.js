import { Avatar, IconButton } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import DonutLargeIconn from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';


function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        // snapshot is basically taking a picture of the page and listening to the changes is there are any and setting the room
       const unsubscribe =  db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ))

        return () => {
            // removing the event listener after the addition of the new chat
            unsubscribe();
        }
    }, [])
    

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIconn />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <input type="text" name="" id="" placeholder="Search or Start New Chat"/>
                </div>
            </div>

            <div className="sidebar_chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
                
                
            </div>
        </div>
    )
}

export default Sidebar
