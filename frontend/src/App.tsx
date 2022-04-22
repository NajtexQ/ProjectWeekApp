import React, { useState, useEffect } from 'react';
import './App.css';

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';


import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostCreate from './pages/PostCreate';
import PostUpdate from './pages/PostUpdate';

import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {

  return (
    <BrowserRouter>

      <Nav />

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
