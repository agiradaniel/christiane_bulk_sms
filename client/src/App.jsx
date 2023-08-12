import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/pages/home'
import GeneralSms from './Components/pages/generalSms';
import DirectMessages from './Components/pages/directmessages';
import Info from './Components/pages/info';
import Logs from './Components/pages/logs';


function App() {


  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/generalsms" element={<GeneralSms/>}/>
          <Route path="/directmessages" element={<DirectMessages/>}/>
          <Route path="/info" element={<Info/>}/>
          <Route path="/logs" element={<Logs/>}/>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
