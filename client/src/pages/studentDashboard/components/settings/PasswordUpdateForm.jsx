import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePassword = () => {

  const notifyError = (message="something went wrong") => toast.error(message);
  const notifySuccess = (message="something went wrong") => toast.success(message);

  /// State for the form inputs and errors
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setError('');
    setSuccess('');

    // Validate the fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password should be at least 6 characters long');
      return;
    }

    (async()=>{
      try {
        let res = await fetch("http://localhost:4000/student/changePassword",{
          method:"PATCH",
          headers:{
            "content-type":"application/json",
            "Authorization":localStorage.getItem("studentToken")
          },
          body:JSON.stringify({
            currentPassword,
            newPassword
          })
        })
        res = await res.json();
      if(res.statusCode == 200){
        // If everything is valid
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
        setSuccess('Password updated successfully!');
        notifySuccess(res?.message)
        setTimeout(() => {
          setSuccess('');
        }, 2000);
      }else{
        setError(res?.message);
        notifyError(res?.message)
        setTimeout(() => {
          setError('');
        }, 2000);
      }
      } catch (error) {
        console.log(error);
        notifyError(error?.message)
      }
    })()
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#2E2E48] rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-white text-3xl font-bold mb-6">Update Your Password</h2>

      {/* Error or Success Messages */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Current Password */}
          <div className="flex flex-col">
            <label className="text-white font-semibold mb-2" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="p-3 border border-gray-600 rounded-lg bg-[#383854] text-white focus:outline-none focus:ring-2 focus:ring-[#475BE8]"
              required
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col">
            <label className="text-white font-semibold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="p-3 border border-gray-600 rounded-lg bg-[#383854] text-white focus:outline-none focus:ring-2 focus:ring-[#475BE8]"
              required
            />
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col">
            <label className="text-white font-semibold mb-2" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-3 border border-gray-600 rounded-lg bg-[#383854] text-white focus:outline-none focus:ring-2 focus:ring-[#475BE8]"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-[#475BE8] text-white font-semibold rounded-lg focus:outline-none hover:bg-[#3a4ad0]"
            >
              Update Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
