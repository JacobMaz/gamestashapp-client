
import './App.css';
import './css/nav.css'
import TopNav from './components/Nav/TopNav';
import Splashpage from './components/Nav/Splashpage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import {useSelector} from 'react-redux';
import { PasswordResetRequest } from './components/Auth/PasswordResetRequest';
import { ResetPassword } from './components/Auth/ResetPassword';
import UserGames from './components/Game/UserGames';
import Logout from './components/Auth/Logout';
import GamesSearch from './components/Game/GamesSearch';

function App() {
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
  const user = useSelector(state=>state.user.user)

  return (
    <div className="App">
      <Router>
        <header>
          <TopNav isLoggedIn={isLoggedIn} />
        </header>
        <div className='App_Body'>
          <Routes>
            <Route exact path='/' element={<Splashpage />} />
            <Route exact path='/register' element={<Register isLoggedIn={isLoggedIn} />}/>
            <Route exact path='/login' element={<Login isLoggedIn={isLoggedIn} />}/>
            <Route exact path='/logout' element={<Logout isLoggedIn={isLoggedIn} />}/>
            <Route exact path='/passwordresetrequest' element={<PasswordResetRequest />}/>
            <Route exact path='/resetpassword/:token' element={<ResetPassword />} />
            <Route exact path='/usergames' element={<UserGames user={user}/>} />
            <Route exact path='/searchgames' element={<GamesSearch />} />
          </Routes>
        </div>          
      </Router>
      {/* <AppAlert /> */}
    </div>
  );
}

export default App;