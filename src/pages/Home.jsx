import React from 'react'
import "./Estilos/Login_Register/css/Estilo_Home.scss";
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat';

function Home() {
  return (
    <div className='home_Chat'>
        <div className='container_Chat'>
        <Sidebar/>
        <Chat/>
        </div>
    </div>
  )
}

export default Home