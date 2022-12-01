import React, { useContext } from 'react'
import Cameraicon from '../pages/Estilos/Home/Images/video-camera.png';
import Moreicon from '../pages/Estilos/Home/Images/plus.png';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';
import CryptoJS from 'crypto-js';

function Chat() {
  const {data} = useContext(ChatContext);

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
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cameraicon} alt=''/>
          <img src={Moreicon} alt=''/>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat