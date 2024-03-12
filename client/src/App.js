import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage.js';
import PageNotFound from './pages/PageNotFound.js';
import StudentSignUp from './pages/Auth/Student/StudentSignUp.js';
import ProfessorSignUp from './pages/Auth/Professor/ProfessorSignUp.js';
import Otp from './pages/Auth/Otp.js';
import LogIn from './pages/Auth/Login.js';

function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<HomePage/>}/>
        <Route path = '/signUp/studentSignup' element = {<StudentSignUp/>}/>
        <Route path = '/signUp/otp' element = {<Otp/>}/>
        <Route path = '/signUp/professorSignup' element = {<ProfessorSignUp/>}/>
        <Route path = '/logIn' element = {<LogIn/>}/>
        <Route path = '*' element = {<PageNotFound/>}/>
      </Routes>
    </>
  )
}

export default App;
