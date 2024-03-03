// Router.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/login'; // Adjust the path as per your project structure

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Add more Route components for other paths */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
