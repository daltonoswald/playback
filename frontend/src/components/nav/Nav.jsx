import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './nav.styles.css'

export default function Nav() {
    const [spotifyToken, setSpotifyToken] = useState(localStorage.getItem('spotifyToken'));
    const [user, setUser] = useState({});
    const { state } = useLocation();
  
    useEffect(() => {
      if (state) {
        setSpotifyToken(state.spotifyToken)
        setUser(state.user);
        console.log(state);
      }
    },[state])

  
    return (
      <>
        <div className='nav'>
          {/* <div className='nav-left'>Statsify</div> */}
          <Link to='/home' state={{spotifyToken: spotifyToken, user: user}} className='nav-left'>Statsify</Link>
          <div className='nav-middle'>
              <Link to='/my-top-tracks' state={{spotifyToken: spotifyToken, user: user}}>Top Tracks</Link>
              <Link to='/my-top-artists' state={{spotifyToken: spotifyToken, user: user}}>Top Artists</Link>
              <Link to='/search' state={{spotifyToken: spotifyToken, user: user}}>Search</Link>
          </div>
              <Link to='/' className='nav-right' reloadDocument>Logout</Link>
        </div>
  
      </>
    )
  }