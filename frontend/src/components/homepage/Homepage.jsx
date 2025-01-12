import { useEffect, useState } from 'react'
import { loginEndpoint } from '../login/loginEndpoint'
import { useLocation, Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import Nav from '../nav/Nav'
import './homepage.styles.css'
import Footer from '../nav/Footer';

function App() {
  const [spotifyToken, setSpotifyToken] = useState('');
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { state } = useLocation();
  console.log(state);

  useEffect(() => {
    if (state) {
      setSpotifyToken(state.spotifyToken)
      setUser(state.user);
      setIsLoggedIn(true);
    }
  },[state])

  return (
    <>
        {!isLoggedIn && (
          <div className='content'>
            <div className='welcome-message'>
              <h1>Welcome to Statsify</h1>
              <h2>Find your top Artists and Songs</h2>
              <h2>Explore Spotify&apos;s catalogue</h2>
              <a href={loginEndpoint}>Log In With Spotify</a>
            </div>
          </div>
        )}
        {(spotifyToken && user) && (
          <>
            <Nav />
            <div className='content'>
              <div className='user-info'>
                <img src={user.images[0].url} />
                <h2>{user.display_name}</h2>
              </div>
              <div className='welcome-links'>
                <Link to='/my-top-tracks' state={{spotifyToken: spotifyToken, user: user, isLoggedIn: isLoggedIn}}>Get My Top Tracks</Link>
                <Link to='/my-top-artists' state={{spotifyToken: spotifyToken, user: user, isLoggedIn: isLoggedIn}}>Get My Top Artists</Link>
                <Link to='/search' state={{spotifyToken: spotifyToken, user: user, isLoggedIn: isLoggedIn}}>Search</Link>
              </div>
            </div>
            <Footer />
          </>
        )}
    </>
  )
}

export default App
