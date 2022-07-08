import React from 'react';
import {Container} from '@material-ui/core';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Routes,Route,BrowserRouter, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import {GoogleOAuthProvider} from "@react-oauth/google"
import PostDetails from './components/PostDetails/PostDetails';


const App = () => {
 const user=JSON.parse(localStorage.getItem("profile"))
 console.log(user);
  return (
    <GoogleOAuthProvider clientId='1054285493030-l1704lrh82noti6be4pdjk6ijsbvfojs.apps.googleusercontent.com'>
        <BrowserRouter>
    <Container maxWidth='xl'>
      <NavBar />
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/posts" element={<Home/>}/>
    <Route path="/posts/search" element={<Home/>}/>
    <Route path="/posts/:id" element={<PostDetails/>}/>
    <Route path="/auth" element={!user?  <Auth/> :<Home/>}/>
   
    </Routes>
     
 
      
    </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
    
    
  );
};

export default App;
