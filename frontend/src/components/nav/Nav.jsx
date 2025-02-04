import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './nav.styles.css'

export default function Nav() {
    // const [spotifyToken, setSpotifyToken] = useState(localStorage.getItem('spotifyToken'));
    // const [user, setUser] = useState({});

    // useEffect(() => {
    //   if (state) {
    //     setSpotifyToken(state.spotifyToken)
    //     setUser(state.user);
    //     console.log(state);
    //   }
    // },[state])

  
    return (
      <>
        <div className='nav'>
          {/* <div className='nav-left'>Statsify</div> */}
          <Link to='/home' className='nav-left'>Statsify</Link>
          <div className='nav-middle'>
              <Link to='/my-top-tracks'>Top Tracks</Link>
              <Link to='/my-top-artists'>Top Artists</Link>
              <Link to='/search'>Search</Link>
          </div>
              <Link to='/' className='nav-right' reloadDocument>Logout</Link>
        </div>
  
      </>
    )
  }