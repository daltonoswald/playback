import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'

export default function Callback() {
    const spotifyApi = new SpotifyWebApi();
    const navigate = useNavigate();


    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const access_token = queryParameters.get('access_token')
        const refresh_token = queryParameters.get('refresh_token')
        const spotifyToken = access_token
        localStorage.setItem('spotifyToken', spotifyToken)
        localStorage.setItem('spotifyRefreshToken', refresh_token)
    
        if (spotifyToken) {
          spotifyApi.setAccessToken(spotifyToken)
          spotifyApi.getMe().then((user) => {
            // navigate('/home', {state: {spotifyToken: spotifyToken, user: user}})
            navigate('/home')
          })
        }
      },[])

      return (
        <div>
            Redirecting you back to the app...
        </div>
      )
}