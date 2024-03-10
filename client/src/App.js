import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage.js';
import PageNotFound from './pages/PageNotFound.js';
import SignUp from './pages/SignUp.js';

function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<HomePage/>}/>
        <Route path = '/signUp' element = {<SignUp/>}/>
        <Route path = '*' element = {<PageNotFound/>}/>
      </Routes>
    </>
  )
}

export default App;
