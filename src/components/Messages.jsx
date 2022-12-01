import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import Message from './Message';

const Messages = () => {
  const {data} = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })

    return ()=>{
      unSub()
    }
  },[data.chatId]);

  console.log(messages);

  return (
    <div className='messages_chat'>
      {messages.map(m=>{
        return <Message message={m} key={m.id}/>

      })}
    </div>
  )
}

export default Messages