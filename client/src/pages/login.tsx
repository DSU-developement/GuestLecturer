import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CgProfile } from "react-icons/cg";
import bg from "../assets/maxresdefault.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isHOD, setisHOD] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSignup = () => {
    window.location.href = '/signup';
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.role);
        localStorage.setItem('token', JSON.stringify(data.user,data.role));
        setUserDetails(data.user);

        if (data.role === 'HOD') {
          setisHOD(true);
          window.location.href = `/hod`;
        }else if(data.role === 'Dean'){
          window.location.href = `/dean`;
        }
         else if(data.role === 'Registrar') {
          window.location.href = `/registar`;
         }
         else if(data.role === 'ViceChancellor'){
          window.location.href = `/vicechancellor`;
         }
         else if(data.role === 'HR'){
          window.location.href = `/vphr`;
         }
         else if(data.role === 'HR'){
          window.location.href = `/vphr`;
         }
         else if(data.role === 'ProChancellor'){
          window.location.href = `/prochancellor`;
         }
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error logging in:", error.message);
        setErrorMessage(error.message);
      } else {
        console.error("Unknown error:", error);
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="relative h-screen">
      <img
        src={ bg }
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      />
      <div className="flex justify-center items-center h-full">
        <div className="max-w-md w-full space-y-8 border border-gray-600 p-20 rounded-xl shadow-xl bg-white opacity-90">
          <div>
            <div className='flex justify-center mb-4'>
              <CgProfile className='text-6xl text-indigo-600' />
            </div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}
            <div className='flex'>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
              <button
                type='button'
                onClick={handleSignup}
                className="group  ml-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
