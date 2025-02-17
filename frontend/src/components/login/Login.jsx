import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import '../homepage/homepage.styles.css'
import Footer from '../nav/Footer';

export default function Login() {
  const spotifyToken = localStorage.getItem('spotifyToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (spotifyToken) {
        navigate('/home')
    }
  },[spotifyToken])


  return (
    <>
        <div className='nav'>
        <Link to='/home' className='nav-left'>Playback</Link>
        <a href='https://playback-production.up.railway.app' className='nav-right'>Login With Spotify</a>
        </div>
          <div className='content'>
            <div className='welcome-message'>
              <h1>Welcome to Playback</h1>
              <h2>Find your top Artists and Songs</h2>
              <h2>Explore Spotify&apos;s catalogue</h2>
              {/* <a href='http://localhost:3000'>Login With Spotify</a> */}
              <a href='https://playback-production.up.railway.app'>Login With Spotify</a>
            </div>
          </div>
          <Footer />
    </>
  )
}