import React, { useState, ChangeEvent, FormEvent } from 'react';

const UpdatePasswordPage = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://guest-lecturer.vercel.app/api/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, currentPassword, newPassword }),
      });

      if (response.ok) {
        console.log('Password updated successfully');
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update password');
      }
    } catch (error: any) {
      console.error('Error updating password:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default UpdatePasswordPage;
