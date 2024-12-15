import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import './tracks.styles.css'

export default function Tracks() {
    const { state } = useLocation();
    console.log(state);
    const [topTracks, setTopTracks] = useState(null);
    const navigate = useNavigate();
    const spotifyApi = new SpotifyWebApi();
  
    useEffect(() => {
      if (!state) {
        navigate('/');
      } else {
        handleGetTopTracks();
      }
    },[state])
  
    const handleGetTopTracks = (e) => {
        if (e) {
            spotifyApi.setAccessToken(state.spotifyToken);
            spotifyApi.getMyTopTracks({time_range: e.target.id}).then((tracks) => {
                setTopTracks(tracks.items)
                console.log(tracks.items)
            })
        } else {
            spotifyApi.setAccessToken(state.spotifyToken);
            spotifyApi.getMyTopTracks({time_range: 'medium_term'}).then((tracks) => {
                setTopTracks(tracks.items)
                console.log(tracks.items)
            })
        }
    }


      return (
        <div className='content'>
            <div>This is the top Tracks page
                <button id="short_term" onClick={handleGetTopTracks}>Get Top Tracks (Short)</button>
                <button id="medium_term" onClick={handleGetTopTracks}>Get Top Tracks (Medium)</button>
                <button id="long_term" onClick={handleGetTopTracks}>Get Top Tracks (Long)</button>
            </div>
            <div className='track-container'>
                {topTracks && (
                    topTracks.map((track) => (
                        <div key={track.id} className='track'>
                            <a href={track.external_urls.spotify}>
                                <img src={track.album.images[0].url} className='album-image'/>
                            </a>
                            <div className='track-info'>
                                <a href={track.uri} className='track-name'>{track.name}</a>
                                <a href={track.artists[0].uri} className='track-artist'>{track.artists[0].name}</a>
                                {/* <a href={track.album.uri} className='track-album'>{track.album.name}</a> */}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
      )
}