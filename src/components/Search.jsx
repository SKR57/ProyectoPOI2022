import React from 'react'
import { useContext , useState } from 'react'
import { collection, query, where, setDoc, doc, updateDoc, serverTimestamp, getDocs, getDoc } from "firebase/firestore";
import {db} from "../firebase"
import { async } from '@firebase/util';
import {AuthContext} from '../context/AuthContext';

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  //Id del usuario iniciado
  const {currentUser} = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    }catch(err){
        setErr(true);
        console.dir(err);
    }
  };

  const handleKey =  e=>{
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async ()=>{
  /*  //checar si existe un chat en el grupo, sino crearlo
    const combinedId = 
    currentUser.uid > user.uid 
    ? currentUser.uid + user.uid 
    : user.id + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      //console.dir("holaMeSeleccionaste")
      if(!res.exists()){
        //crear chat en la coleccion de chats
        await setDoc(doc(db,"chats", combinedId), {messages:[]});

        //crear chat entre usuarios
        await updateDoc(doc(db, "userChats", currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        })
      };

      await updateDoc(doc(db, "userChats", user.uid),{
        [combinedId+".userInfo"]:{
          uid:currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        },
        [combinedId+".date"]:serverTimestamp()
      });

    } catch (err) {
      setErr(true);
      console.dir(err);
    }
    
    setUser(null);
    setUsername("");*/

    const combinedid = currentUser.uid > user.uid 
    ? currentUser.uid + user.uid 
    : user.uid +  currentUser.uid;

  try {
    const res = await getDoc(doc(db, "chats", combinedid));

    if(!res.exists()){
      //create chat in the chats collection
      await setDoc(doc(db, "chats", combinedid),{messages:[]});

      //create user chats
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedid + ".userInfo"]:{
          uid:user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        },
        [combinedid+".date"]: serverTimestamp()
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedid + ".userInfo"]:{
          uid:currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        },
        [combinedid+".date"]: serverTimestamp()
      });
    }
  } catch (err) {}

  setUser(null);
  setUsername("");
  };

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Buscar un Usuario' 
        onKeyDown={handleKey} 
        onChange={e=>setUsername(e.target.value)}
        value={username}/>
      </div>
      {err && <span>Usuario no encontrado...</span>}
      {user && <div className="userchat" onClick={handleSelect}>
        <img src={user.photoURL} alt=''/>
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search