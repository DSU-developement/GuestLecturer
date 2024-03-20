import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [school,setSchool] = useState('');
  const [department, setDepartment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const roles = ['HOD', 'Dean', 'HR', 'Registrar', 'ViceChancellor', 'ProChanCellor', 'CFO', 'Guest Lecture'];
  const schools =['School of Health Sciences', 'School of Engineering', 'College of Journalism & Mass Communication',  'School of Basic & Applied Sciences', 'School of Commerce & Management', 'School of Law']

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', {
        name,
        email,
        password,
        role,
        department,
        school
      });
      console.log(response.data);
      // Redirect to login page or another appropriate page after successful signup
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred while signing up');
        }
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
  };

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleSchoolChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSchool(e.target.value);
  };

  const redirectToGuestLectureSignup = () => {
    window.location.href = '/signup/guest-lecture';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center" style={{ backgroundImage: `url("./bg.jpeg")` }}>
      <div className="max-w-md w-full space-y-8 border border-gray-600 p-20 rounded-xl shadow-xl">
        <div className='flex justify-center mb-4'>
          <CgProfile className='text-6xl text-blue-600' />
        </div>
        <h2 className="text-4xl mb-4 text-center font-bold">Create an Account</h2>
        <form onSubmit={handleSignup}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='name' className="sr-only">Name:</label>
              <input required id="name" placeholder="Name" type="text" value={name} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
            </div>
            <div>
              <label htmlFor='pwd' className="sr-only">Email:</label>
              <input id="email" placeholder='Email address' type="email" value={email} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label htmlFor='pwd' className="sr-only">Password:</label>
              <input id="pwd" type="password" placeholder='Password' value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
            </div><br />
            <div className='mb-2'>
              <label className="sr-only">School:</label>
              <select value={school} onChange={handleSchoolChange} required className="w-full px-3 py-2 border rounded">
                <option value="">Select School</option>
                {schools.map((r, index) => (
                  <option key={index} value={r}>{r}</option>
                ))}
              </select>
            </div><br/>
            <div className='mb-2'>
              <label className="sr-only">Role:</label>
              <select value={role} onChange={handleRoleChange} required className="w-full px-3 py-2 border rounded">
                <option value="">Select Role</option>
                {roles.map((r, index) => (
                  <option key={index} value={r}>{r}</option>
                ))}
              </select>
            </div><br/>
            {role === 'Guest Lecture' ? (
              <button type="button" onClick={redirectToGuestLectureSignup} className="bg-blue-500 text-white px-4 py-2 rounded">Continue as Guest Lecture</button>
            ) : (
              <div>
                <div>
                  <label className="sr-only">Department:</label>
                  <input type="text" placeholder='Department' value={department} onChange={(e: ChangeEvent<HTMLInputElement>) => setDepartment(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <button type="submit" className="mx-auto bg-blue-500 text-white px-4 py-2 rounded mt-5">Signup</button>
              </div>
            )}
          </div>
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default SignupPage;
