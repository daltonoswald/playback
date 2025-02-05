import { useEffect, useState } from 'react'
import { loginEndpoint } from '../login/loginEndpoint'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
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
          <div className='content'>
            <div className='welcome-message'>
              <h1>Welcome to Statsify</h1>
              <h2>Find your top Artists and Songs</h2>
              <h2>Explore Spotify&apos;s catalogue</h2>
              <a href={loginEndpoint}>Log In With Spotify</a>
            </div>
          </div>
          <Footer />
    </>
  )
}