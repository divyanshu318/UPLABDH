import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const navbarStyle = {
    backgroundColor: 'lightyellow',
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={navbarStyle}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to='/'>UPLABDH</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/logIn">LogIn</NavLink>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="signupDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  SignUp
                </a>
                <div className="dropdown-menu" aria-labelledby="signupDropdown">
                  <NavLink className="dropdown-item" to="/signUp/studentSignup">STUDENT</NavLink>
                  <NavLink className="dropdown-item" to="/signUp/professorSignup">PROFESSOR</NavLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
