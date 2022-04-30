import React, { useState, useEffect } from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';


import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostCreate from './pages/PostCreate';
import PostUpdate from './pages/PostUpdate';

import Nav from './components/Nav';
import Footer from './components/Footer';

import { URL } from './constants';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function checkLogin() {
    axios.get(URL + "/user/profile", { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          setIsLoggedIn(true);
        }
        else {
          setIsLoggedIn(false);
        }
      })
      .catch(err => {
        console.log(err);
      });

      console.log("Current log:", isLoggedIn);
  }

  useEffect(() => {

  }, []);

  return (
    <BrowserRouter>

      <Nav
        checkLogin={checkLogin}
        isLoggedIn={isLoggedIn}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createpost" element={<PostCreate />} />
        <Route path="/updatepost/:id" element={<PostUpdate />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
