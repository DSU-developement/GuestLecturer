import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/login'; 
import Table from '../pages/hod';
import DetailsPage from '../pages/details'; 
import SignupPage from '../pages/signupPage';
import { lecturersData } from '../components/dummy'; 

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/hod" element={<Table data={lecturersData} />} /> 
        <Route path="/details/:id" element={<DetailsPage data={lecturersData} />} /> {/* Define route for DetailsPage */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
