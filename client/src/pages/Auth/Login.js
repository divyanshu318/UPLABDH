import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
      e.preventDefault();
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`,{email,password});
        if(res.data.success){
          console.log("Login Successfull");
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <Layout>
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN</h4>
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
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default LogIn