import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout.js';
import { useAuth } from '../context/auth.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card.js';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [fetched, setFetched] = useState([]);
  const [profile, setProfile] = useState(null);

  const checkIfLoggedIn = async () => {
    let profileData = localStorage.getItem('profile');
    if (!profileData) {
      navigate("/logIn");
      return;
    }
    profileData = await JSON.parse(profileData);
    setProfile(profileData);
    if (!profileData?.user) {
      navigate("/logIn");
    }
  };

  const getRooms = async () => {
    try {
      console.log("Calling getRooms function");
      const res = await axios.get('http://localhost:8080/api/rooms/getRooms');
      setFetched(res.data.rooms);
    } catch (error) {
      console.error("Error in getRooms:", error);
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
    getRooms();
    // eslint-disable-next-line 
  }, []);  

  return (
    <>
      <Layout>
        <div className="container mt-3">
            <h1 className='text-center'>All Available Rooms</h1>
            <div className="d-flex flex-wrap ">
                {fetched?.map((r) => (
                    !r.booked ? (
                        <div className="card m-2" style={{ width: "18rem" }} key={r.id}>
                            <div className="card-body">
                                <h5 className="card-title text-center">{r.name}</h5>
                                <p className="card-text text-center"><b>Floor:- </b>{r.floor}</p>
                                <p className="card-text text-center"><b>Capacity:- </b>{r.capacity}</p>
                                {profile && profile?.user.role === 1 && <button className="btn btn-primary m-3">Book Room</button>}
                                <button className="btn btn-secondary">Complain</button>
                            </div>
                        </div>
                    ) : null
                ))}
            </div>
        </div>
    </Layout>
    </>
  );
};

export default HomePage;
