import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppNavbar } from './components/AppNavbar';
import { Route, Routes } from 'react-router-dom';
import { CoachBooking } from './pages/CoachBooking';

function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path='/coach' element={<CoachBooking />}></Route>
        <Route path='/movie' element={<CoachBooking />}></Route>
        <Route path='/flight' element={<CoachBooking />}></Route>
        <Route path='/train' element={<CoachBooking />}></Route>
      </Routes>

    </>
  );
}

export default App;
