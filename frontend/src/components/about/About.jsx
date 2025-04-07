import { useNavigate, Link } from 'react-router-dom';
import Footer from '../nav/Footer';
import './about.styles.css'
import Nav from '../nav/Nav';

export default function About() {
  const spotifyToken = localStorage.getItem('spotifyToken');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('spotifyToken');
    localStorage.removeItem('spotifyRefreshToken');
    navigate('/')
  }

  return (
    <>
      <div className='nav'>
      {!spotifyToken && (
        <>
            <Link to='/home' className='nav-left'>Playback</Link>
            <a href='https://playback-production.up.railway.app' className='nav-right'>Login With Spotify</a>
        </>
      )}
      {spotifyToken && (
        <>
          <Link to='/home' className='nav-left'>Playback</Link>
          <div className='nav-middle'>
          <Link to='/my-top-tracks'>Top Tracks</Link>
            <Link to='/my-top-artists'>Top Artists</Link>
            <Link to='/search'>Search</Link>
          </div>
          <Link to='/' className='nav-right' onClick={logout}>Logout</Link>
        </>
      )}
      </div>
          <div className='content'>
            <h1>About Playback</h1>
            <div className='about'>
              <p>View your top artists and tracks using the Spotify API.</p>
              <p>Logging into Spotify uses the Spotify OAuth 2.0 service and the <a href='https://developer.spotify.com/documentation/web-api/tutorials/code-flow'>Authorization Code Flow</a>.</p>
              <p>Playback does not store any user data. Logging in retrieves an access token from Spotify which is sent back to Spotify for data requests.</p>
              <div className='information'>
                <h3>&#9432; Information</h3>
                <p>Playback was recently granted <a href='https://developer.spotify.com/documentation/web-api/concepts/quota-modes'>extended quota mode</a>!</p>
                <p>Users no longer need to be added to the allowlist, an unlimited amount of users may now use the site.</p>
                </div>
            </div>
          </div>
        <Footer />
    </>
  )
}