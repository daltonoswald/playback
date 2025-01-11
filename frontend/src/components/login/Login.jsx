import { useEffect, useState } from 'react'
import { loginEndpoint } from '../login/loginEndpoint'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import '../homepage/homepage.styles.css'

export default function Login() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);

  useEffect(() => {
    if (state) {
        navigate('/home')
    }
  },[state])

  return (
    <>
          <div className='content'>
            <div className='welcome-message'>
              <h1>Welcome to Statsify</h1>
              <h2>Find your top Artists and Songs</h2>
              <h2>Explore Spotify&apos;s catalogue</h2>
              <a href={loginEndpoint}>Log In With Spotify</a>
              {/* <Link to='/my-top-tracks' state={ state }>Get My Top Tracks</Link> */}
            </div>
          </div>
    </>
  )
}