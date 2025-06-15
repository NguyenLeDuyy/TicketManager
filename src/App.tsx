import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppNavbar } from './components/AppNavbar';
import { Route, Routes } from 'react-router-dom';
import { CoachBooking } from './pages/CoachBooking';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <AppNavbar />
      <Header />
      <Routes>
        <Route path='/coach' element={<CoachBooking />}></Route>
        <Route path='/movie' element={<CoachBooking />}></Route>
        <Route path='/flight' element={<CoachBooking />}></Route>
        <Route path='/train' element={<CoachBooking />}></Route>
        <Route path="/" element={<div><h1>Trang chủ</h1><p>Chọn một loại vé từ menu.</p></div>} />
      </Routes>

    </>
  );
}

export default App;
