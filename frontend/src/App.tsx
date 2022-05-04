import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { GlobalContextProvider } from './context/GlobalContext';


import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostCreate from './pages/PostCreate';
import PostUpdate from './pages/PostUpdate';
import Profile from './pages/Profile';

import Nav from './components/Nav';
import Footer from './components/Footer';

import { URL } from './constants';

function App() {

  return (
    <BrowserRouter>

      <GlobalContextProvider>

        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createpost" element={<PostCreate />} />
          <Route path="/updatepost/:id" element={<PostUpdate />} />
        </Routes>

        <Footer />

      </GlobalContextProvider>

    </BrowserRouter>
  );
}

export default App;
