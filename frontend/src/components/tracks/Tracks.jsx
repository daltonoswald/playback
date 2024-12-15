import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'

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
            {topTracks && (
                topTracks.map((track) => (
                    <div key={track.id} className='track'>
                        <img src={track.album.images[0].url} />
                        <p>{track.name}</p>
                    </div>
                ))
            )}
        </div>
      )
}