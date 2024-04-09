import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
  const [email, setEmail] = useState('');
  const [newotp, setNewOtp] = useState('');
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    const sanitizedOtp = e.target.value.replace(/\D/g, '').slice(0, 4);
    setNewOtp(sanitizedOtp);
  };

  const handleVerifySubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`http://localhost:8080/api/auth/otpVerification`, { email, newotp });

    if (res.data.success) {
      console.log(res.message);
      navigate('/logIn');
    } else {
      console.log(res.message);
      alert('Wrong otp');
      navigate('/');
    }
  } catch (error) {
    console.error('Error during OTP verification:', error);
  }
};

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="text-center mb-4">OTP VERIFICATION</h2>
        <form onSubmit={handleVerifySubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter 4-digit OTP"
              value={newotp}
              onChange={handleOtpChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Verify
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Otp;
