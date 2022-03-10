
import './App.css';
import TopNav from './components/Nav/TopNav';
import Splashpage from './components/Nav/Splashpage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(null);

  console.log('Current Token: ', token)

  return (
    <div className="App">
      <Router>
        <header>
          <TopNav />
        </header>
        <div className='App_Body'>
          <Routes>
            <Route exact path='/' element={<Splashpage />}/>
            <Route exact path='/register' element={<Register />}/>
            <Route exact path='/login' element={<Login setToken={setToken}/>}/>
          </Routes>
        </div>          
      </Router>
    </div>
  );
}

export default App;