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

  const handleTest = async (e) => {
    e.preventDefault();
    // const url = 'http://localhost:3000/test'
    const url = `https://statsify-production.up.railway.app/test`
    const sendData = {
      type: 'test',
      number: 2
    }
    try {
      const response = await fetch(url, {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json"
        // },
        // body: JSON.stringify(sendData),
        mode: 'cors',
      })
      const data = await response.json();
      if (!response.ok) {
        console.log('error')
        console.log(response);
      }
      if (response.ok) {
        console.log(data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogIn = async (e) => {
    e.preventDefault();
    const url = `https://statsify-production.up.railway.app/login`
    // const url = 'http://localhost:3000/login'
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors'
      })
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
          <div className='content'>
            <div className='welcome-message'>
              <h1>Welcome to Statsify</h1>
              <h2>Find your top Artists and Songs</h2>
              <h2>Explore Spotify&apos;s catalogue</h2>
              <a href={loginEndpoint}>Log In With Spotify</a>
            </div>
            <button onClick={handleLogIn}>Log In</button>
            <button onClick={handleTest}>Test</button>
          </div>
          <Footer />
    </>
  )
}