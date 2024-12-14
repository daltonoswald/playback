import { useEffect, useState } from 'react'
import { loginEndpoint } from './components/login/loginEndpoint'
import { useLocation } from 'react-router-dom';

function App() {
  const [spotifyToken, setSpotifyToken] = useState('');
  const [user, setUser] = useState({});
  const { state } = useLocation();
  console.log(state);

  useEffect(() => {
    if (state) {
      setSpotifyToken(state.spotifyToken)
      setUser(state.user);
      console.log(state.spotifyToken);
    }
  },[state])

  return (
    <>
      <div className='hi'>
        <a href={loginEndpoint}>Log In</a>
        {(spotifyToken && user) && (
          <>
            <p>{spotifyToken}</p>
            <p>{user.display_name}</p>
          </>
        )}

      </div>

    </>
  )
}

export default App
