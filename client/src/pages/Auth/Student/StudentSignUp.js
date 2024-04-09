import React, { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const StudentSignUp = () => {

  const [name, setName] = useState("");
  const [registration_number, setRegistration_Number] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/auth/studentSignup`, {
        name,
        registration_number,
        email,
        password,
        phone,
        branch,
      });

      if(res.data.success){
        navigate('/signUp/otp');
      }else{
        navigate('/')
      }
    } catch (error) {
      console.log(error);  
    }
  }

  return (
    <Layout>
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">STUDENT SIGN UP</h4>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputRegistrationNumber"
              placeholder="Enter Your Registration Number"
              value={registration_number}
              onChange={(e)=>setRegistration_Number(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter Your Phone"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputBranch"
              placeholder="Enter Your Branch"
              value={branch}
              onChange={(e)=>setBranch(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            SIGN UP
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default StudentSignUp;
