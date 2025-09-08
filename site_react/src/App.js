import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navibar from './components/navibar';
import Home from './pages/Home';
import {Orders} from './pages/Orders';
import {Services} from './pages/Services';
import {Notfounded} from './pages/Notfounded';
import {Login} from './pages/Login';
import {Signin} from './pages/Signin';
import {StorisCompani} from './pages/StorisCompani';

import { 
  BrowserRouter as Router,
  Routes,
  Route,
 } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/storiscompani" element={<StorisCompani/>}/>
        <Route path="*" element={<Notfounded/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
