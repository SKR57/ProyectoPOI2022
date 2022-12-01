import React from 'react'
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Chats from './Chat';
import Contacts from './Contacts';

function Sidebar() {
  return (
    <div className='sidebar'>
      <Navbar/>
      <Search/>
      <Contacts/>
    </div>
  )
}

export default Sidebar