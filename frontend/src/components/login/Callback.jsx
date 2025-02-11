import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'

export default function Callback() {
    const spotifyApi = new SpotifyWebApi();
    const navigate = useNavigate();

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
      console.log(getTokenFromUrl())
      const spotifyToken = getTokenFromUrl().access_token;
      console.log(spotifyToken);
      localStorage.setItem('spotifyToken', spotifyToken)
      // localStorage.setItem('spotifyRefreshToken', refresh_token)

      if (spotifyToken) {
        spotifyApi.setAccessToken(spotifyToken)
        spotifyApi.getMe().then((user) => {
          // console.log(user);
          navigate('/home');
        })
      }
    })


    // useEffect(() => {
    //     const queryParameters = new URLSearchParams(window.location.search)
    //     const access_token = queryParameters.get('access_token')
    //     const refresh_token = queryParameters.get('refresh_token')
    //     const spotifyToken = access_token
    //     localStorage.setItem('spotifyToken', spotifyToken)
    //     localStorage.setItem('spotifyRefreshToken', refresh_token)
    
    //     if (spotifyToken) {
    //       spotifyApi.setAccessToken(spotifyToken)
    //       spotifyApi.getMe().then((user) => {
    //         // navigate('/home', {state: {spotifyToken: spotifyToken, user: user}})
    //         navigate('/home')
    //       })
    //     }
    //   },[window])

      return (
        <div>
            Redirecting you back to the app...
        </div>
      )
}