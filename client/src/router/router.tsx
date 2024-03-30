import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login';
import Table from '../pages/AcceptingSystem/hod';
import SignupPage from '../pages/AcceptingSystem/signupPage';
import DEAN from '../pages/AcceptingSystem/dean';
import SignupPageLect from '../pages/AcceptingSystem/guest-lecturesignup';
import Resgistar from '../pages/AcceptingSystem/Registar';
import ViceChancellor from '../pages/AcceptingSystem/vicechancellor';
import VpHr from '../pages/AcceptingSystem/vpHr';
import Prochancellor from '../pages/AcceptingSystem/prochancellor';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

const AppRouter: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/hod" element={authenticated ? <Table/> : <LoginPage />} />
        <Route path="/dean" element={authenticated ? <DEAN/> : <LoginPage />} />
        <Route path="/registar" element={authenticated ? <Resgistar/> : <LoginPage />} />
        <Route path="/vicechancellor" element={authenticated ? <ViceChancellor/> : <LoginPage />} />
        <Route path="/vphr" element={authenticated ? <VpHr/> : <LoginPage />} />
        <Route path="/prochancellor" element={authenticated ? <Prochancellor/> : <LoginPage />} />
        <Route path='/add-lecture' element={<SignupPageLect />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
