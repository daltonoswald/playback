import { Link } from 'react-router-dom';
import Footer from '../nav/Footer';
import './about.styles.css'

export default function About() {


  return (
    <>
        <div className='nav'>
          <Link to='/home' className='nav-left'>Playback</Link>
          <a href='https://playback-production.up.railway.app' className='nav-right'>Login With Spotify</a>
        </div>
          <div className='content'>
            <h1>About Playback</h1>
            <div className='about'>
              <p>View your top artists and tracks using the Spotify API.</p>
              <p>Logging into Spotify uses the Spotify OAuth 2.0 service and the <a href='https://developer.spotify.com/documentation/web-api/tutorials/code-flow'>Authorization Code Flow</a>.</p>
              <p>Playback does not store any user data. Logging in retrieves an access token from Spotify which is sent back to Spotify for data requests.</p>
              <div className='information'>
                <h3>&#9432; Information</h3>
                <p>Playback is current in <a href='https://developer.spotify.com/documentation/web-api/concepts/quota-modes'>development mode</a>.</p>
                <p>If you are interested in using this website please contact me so your email can be added to the allowlist.</p>
                <a href='mailto:daltonoswald@gmail.com'>daltonoswald@gmail.com</a>
                </div>
            </div>
          </div>
          <Footer />
    </>
  )
}