import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout.js';
import HomePage from './pages/HomePage.js';

function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<HomePage/>}/>
      </Routes>
    </>
  )
}

export default App;
