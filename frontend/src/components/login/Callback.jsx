import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'

export default function Callback() {
    const spotifyApi = new SpotifyWebApi();
    const navigate = useNavigate();


    useEffect(() => {
        const queryParamaters = new URLSearchParams(window.location.search)
        const access_token = queryParamaters.get('access_token')
        const spotifyToken = access_token
        console.log(queryParamaters);
    
        if (spotifyToken) {
          spotifyApi.setAccessToken(spotifyToken)
          spotifyApi.getMe().then((user) => {
            console.log(user);
            navigate('/', {state: {spotifyToken: spotifyToken, user: user}})
          })
        }
      },[])

      return (
        <div>
            Redirecting you back to the app...
        </div>
      )
}