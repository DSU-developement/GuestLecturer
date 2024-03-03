// Router.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/login'; 
import  Lecturer from '../pages/hod';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/hod" element={<Lecturer />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
