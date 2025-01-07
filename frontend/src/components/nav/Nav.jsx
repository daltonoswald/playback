import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Nav() {
    const [spotifyToken, setSpotifyToken] = useState('');
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { state } = useLocation();
  
    useEffect(() => {
      if (state) {
        setSpotifyToken(state.spotifyToken)
        setUser(state.user);
        setIsLoggedIn(true);
        console.log(state);
      }
    },[state])
  
  
    return (
      <>
        <div className='nav'>
              <Link to='/my-top-tracks' state={{spotifyToken: spotifyToken, user: user, isLoggedIn: isLoggedIn}}>Top Tracks</Link>
              <Link to='/my-top-artists' state={{spotifyToken: spotifyToken, user: user, isLoggedIn: isLoggedIn}}>Top Artists</Link>
              <Link to='/search' state={{spotifyToken: spotifyToken, user: user, isLoggedIn: isLoggedIn}}>Search</Link>
        </div>
  
      </>
    )
  }