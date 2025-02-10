import { useEffect, useState } from 'react'
import { loginEndpoint } from '../../unused/loginEndpoint'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import Footer from '../nav/Footer';
import Nav from '../nav/Nav'
import './homepage.styles.css'
import personIcon from '../../assets/icons/person.svg'

function App() {
  const spotifyToken = localStorage.getItem('spotifyToken');
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const spotifyApi = new SpotifyWebApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('spotifyToken')) {
      spotifyApi.setAccessToken(spotifyToken)
      // spotifyApi.getMe().then((user) => {
      //   setUser(user)
      //   setIsLoading(false)
      // })
      spotifyApi.getMe().then(
        function(user) {
          setUser(user);
          setIsLoading(false);
        },
        function (err) {
          console.error(err)
          localStorage.removeItem('spotifyToken');
          localStorage.removeItem('spotifyRefreshToken');
        }
      )
    } else {
      localStorage.removeItem('spotifyToken');
      localStorage.removeItem('spotifyRefreshToken');
      navigate('/')
    }
  },[spotifyToken])


  return (
    <>
        {isLoading && !user && (
          <div className='content'>
            <div className='welcome-message'>
              <h1>Welcome to Statsify</h1>
              <h2>Find your top Artists and Songs</h2>
              <h2>Explore Spotify&apos;s catalog</h2>
              <a href={loginEndpoint}>Log In With Spotify</a>
            </div>
          </div>
        )}
        {(spotifyToken && user && !isLoading) && (
          <>
            <Nav />
            <div className='content'>
              <div className='user-info'>
                {user.images.length > 0 && (
                  <img src={user.images[0].url} className='user-picture' />
                )}
                {user.images.length === 0 && (
                  <img src={personIcon} className='user-picture' />
                )}
                <h2>{user.display_name}</h2>
              </div>
              <div className='welcome-links'>
                <Link to='/my-top-tracks'>Get My Top Tracks</Link>
                <Link to='/my-top-artists'>Get My Top Artists</Link>
                <Link to='/search'>Search</Link>
              </div>
            </div>
            <Footer />
          </>
        )}
    </>
  )
}

export default App
