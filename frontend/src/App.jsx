import { useEffect, useState } from 'react'
import { loginEndpoint } from './components/login/loginEndpoint'
import { useLocation, Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import Nav from './components/nav/Nav';

function App() {
  const [spotifyToken, setSpotifyToken] = useState('');
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { state } = useLocation();
  console.log(state);
  const spotifyApi = new SpotifyWebApi();

  useEffect(() => {
    if (state) {
      setSpotifyToken(state.spotifyToken)
      setUser(state.user);
      setIsLoggedIn(true);
    }
  },[state])

  const handleGetTopArtists = () => {
    spotifyApi.setAccessToken(spotifyToken)
    spotifyApi.getMyTopArtists().then((artist) => {
      console.log(artist)
    })
  }

  return (
    <>
      <div className='hi'>
        {!isLoggedIn && (
          <>
            <a href={loginEndpoint}>Log In</a>
            
          </>
        )}
        {(spotifyToken && user) && (
          <>
            <Nav />
            <p>{spotifyToken}</p>
            <p>{user.display_name}</p>
            <img src={user.images[0].url} />
            <button onClick={handleGetTopArtists}>Get Top Artists</button>
            <Link to='/my-top-tracks' state={{spotifyToken: spotifyToken, user: user, isLoggedIn: isLoggedIn}}>Get My Top Tracks</Link>
            <Link to='/my-top-artists' state={{spotifyToken: spotifyToken, user: user, isLoggedIn: isLoggedIn}}>Get My Top Artists</Link>
            <Link to='/search' state={{spotifyToken: spotifyToken, user: user, isLoggedIn: isLoggedIn}}>Search</Link>
          </>
        )}

      </div>

    </>
  )
}

export default App
