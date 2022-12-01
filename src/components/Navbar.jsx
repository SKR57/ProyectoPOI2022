import React from 'react'
import { signOut  } from 'firebase/auth'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import CryptoJS from 'crypto-js'


const Navbar = () => {
  const {currentUser} = useContext(AuthContext);

  const cifrar = (texto) =>{
		var textoCif = CryptoJS.AES.encrypt(texto, "@POI2022").toString();
		return textoCif;
	}

	const descifrar = (texto) =>{
		var bytes = CryptoJS.AES.decrypt(texto, "@POI2022");
		var textodescf = bytes.toString(CryptoJS.enc.Utf8);
		return textodescf;
	}


  return (
    <div className='navbar'>
      <span className='logo'>Kong-Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt=''/>
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar