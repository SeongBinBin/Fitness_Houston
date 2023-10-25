/* eslint-disable */

import React from 'react';
import './asset/css/reset.css'
import './asset/css/App.css';
import Main_Page from './Components/Main_Page/Main_Page';
import Common_Contents from './Components/Common_Contents/Common_Contents'
import Sub_Page from './Components/Sub_Page/Sub_Page'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Sub_Page/Login/Login';
import Map from './Components/Common_Contents/Map/Map'
import Condition from './Components/Sub_Page/Login/Condition';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main_Page />} />
          <Route path="sub" element={<Sub_Page />} />
          <Route path="announcement" element={<Common_Contents />} />
          <Route path="login" element={<Login />} />
          <Route path="condition" element={<Condition />}/>
          <Route path="map" element={<Map />}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
