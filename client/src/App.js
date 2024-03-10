import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout.js';
import HomePage from './pages/HomePage.js';
import PageNotFound from './pages/PageNotFound.js';

function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<HomePage/>}/>
        <Route path = '*' element = {<PageNotFound/>}/>
      </Routes>
    </>
  )
}

export default App;
