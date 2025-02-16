import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import Footer from '../nav/Footer';
import Nav from '../nav/Nav';

export default function Callback() {
    const spotifyApi = new SpotifyWebApi();
    const navigate = useNavigate();
    const [error, setError] = useState(null)

    const getTokenFromUrl = () => {
      return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
          let parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
          return initial
        }, {})
    }

    useEffect(() => {
      // console.log(getTokenFromUrl())
      const spotifyToken = getTokenFromUrl().access_token;
      // console.log(spotifyToken);
      localStorage.setItem('spotifyToken', spotifyToken)
      // localStorage.setItem('spotifyRefreshToken', refresh_token)

      if (spotifyToken) {
        spotifyApi.setAccessToken(spotifyToken)
        spotifyApi.getMe().then(
          function(user) {
            navigate('/home')
          },
          function (err) {
            setError(err.response)
          }
        )
      }
    })

    const logout = () => {
      localStorage.removeItem('spotifyToken');
      localStorage.removeItem('spotifyRefreshToken');
      navigate('/')
    }

      return (
        <>
          <div className='nav'>
          <Link to='/home' className='nav-left'>Playback</Link>
          <div className='nav-middle'>
          </div>
              <Link to='/' className='nav-right' onClick={logout}>Logout</Link>
        </div>
          <div className='content'>
              <p>Redirecting you back to the app...</p>
              {error && (
                <div className='error'>
                  <p>{error}</p>
                  <p>If this error persists and looks incorrect please contact the site owner.</p>
                </div>
              )}
          </div>
          <Footer />
        </>
      )
}