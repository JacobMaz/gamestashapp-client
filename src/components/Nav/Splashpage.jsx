
import React from 'react';
import Placeholder_logo from '../../Assets/placeholder logo.png';

const Splashpage = () => {

  return (
    <div className='splashpageAndAuth'>
      <div className='containerForSplashAndAuth'>
        <div className='titleForSplashAndAuth'>
          <h1 id='splashpageWelcomeTitle'>Welcome To [GAME STASH]</h1>
        </div>
        <img src={Placeholder_logo} id='splashpageLogoImg'/>
      </div>
    </div>
  )
}

export default Splashpage;