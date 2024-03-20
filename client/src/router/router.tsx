import React , {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/login'; 
import Table from '../pages/hod';
import DetailsPage from '../pages/details'; 
import SignupPage from '../pages/signupPage';
import { lecturersData } from '../components/dummy'; 
import UserDetailsPage from '../pages/try';
import SignupPageLect from '../pages/guest-lecturesignup';
import Higherups from '../pages/higherup';

const AppRouter: React.FC = () => {
  const [isHOD , setisHOD] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<any>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/hod" element={<Table data={lecturersData} authorized={isHOD} />} />
        <Route path="/details/:id" element={<DetailsPage data={lecturersData} />} /> 
        <Route path='/signup/guest-lecture' element={<SignupPageLect/>}/>
        <Route path='/guest' element={<Higherups data={lecturersData} authorized={isHOD} />}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;
