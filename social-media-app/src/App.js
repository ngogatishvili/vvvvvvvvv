import React from 'react';
import {Container} from '@material-ui/core';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Routes,Route,BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import {GoogleOAuthProvider} from "@react-oauth/google"


const App = () => {
  return (
    <GoogleOAuthProvider clientId='1054285493030-l1704lrh82noti6be4pdjk6ijsbvfojs.apps.googleusercontent.com'>
        <BrowserRouter>
    <Container maxWidth='lg'>
      <NavBar />
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/auth" element={<Auth/>}/>
   
    </Routes>
     
 
      
    </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
    
    
  );
};

export default App;
