import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const roles = ['HOD', 'Dean', 'HR', 'Registrar', 'ViceChancellor', 'ProChanCellor', 'CFO', 'Guest Lecture'];

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', {
        name,
        email,
        password,
        role,
        department
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

  const redirectToGuestLectureSignup = () => {
    window.location.href = '/signup/guest-lecture';
  };

  return (
    <div className="min-h-screen bg-green-200 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-blue-600">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block mb-2">Name:</label>
            <input type="text" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input type="email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input type="password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Role:</label>
            <select value={role} onChange={handleRoleChange} required className="w-full px-3 py-2 border rounded">
              <option value="">Select Role</option>
              {roles.map((r, index) => (
                <option key={index} value={r}>{r}</option>
              ))}
            </select>
          </div>
          {role === 'Guest Lecture' ? (
            <button type="button" onClick={redirectToGuestLectureSignup} className="bg-blue-500 text-white px-4 py-2 rounded">Continue as Guest Lecture</button>
          ) : (
            <div>
              <div className="mb-4">
                <label className="block mb-2">Department:</label>
                <input type="text" value={department} onChange={(e: ChangeEvent<HTMLInputElement>) => setDepartment(e.target.value)} className="w-full px-3 py-2 border rounded" />
              </div>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Signup</button>
            </div>
          )}
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default SignupPage;
