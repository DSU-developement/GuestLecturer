import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login';
import Table from '../pages/hod';
import DetailsPage from '../pages/details';
import SignupPage from '../pages/signupPage';
import { lecturersData } from '../components/dummy';
import SignupPageLect from '../pages/guest-lecturesignup';
import Higherups from '../pages/higherup';

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
        <Route path="/hod" element={authenticated ? <Table data={lecturersData} /> : <LoginPage />} />
        <Route path="/details/:id" element={authenticated ?<DetailsPage data={lecturersData} /> : <LoginPage />} />
        <Route path='/guest' element={authenticated ? <Higherups data={lecturersData}/> : <LoginPage />} />
        <Route path='/guest-lecture' element={<SignupPageLect />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
