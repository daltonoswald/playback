import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import './tracks.styles.css'
import Nav from '../nav/Nav';
import playIcon from '../../assets/icons/play-icon.svg'
import albumIcon from '../../assets/icons/album.svg'
import Footer from '../nav/Footer';

export default function TopTracks() {
    const { state } = useLocation();
    console.log(state);
    const [topTracks, setTopTracks] = useState(null);
    const [term, setTerm] = useState('medium');
    const navigate = useNavigate();
    const spotifyApi = new SpotifyWebApi();
  
    useEffect(() => {
      if (!state || state.spotifyToken === '') {
        navigate('/');
      } else {
        handleGetTopTracks();
      }
    },[state])
  
    const handleGetTopTracks = (e) => {
        if (e) {
            spotifyApi.setAccessToken(state.spotifyToken);
            spotifyApi.getMyTopTracks({time_range: (e.target.id + '_term')}).then((tracks) => {
                setTerm(e.target.id)
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

    const handlePlayTrack = (e) => {
        spotifyApi.play({uris: [`spotify:track:${e.target.parentElement.parentElement.id}`]})
    }

    const navigateToAlbum = (e) => {
        console.log(e.target.id)
        navigate(`/album/${e.target.id}`, { state: state })
    }


      return (
        <>
        <Nav />
            <div className='content'>
                <div className='term-buttons'>
                    <button id="short" onClick={handleGetTopTracks} className={(term === 'short' ? 'active' : '')}>Short</button>
                    <button id="medium" onClick={handleGetTopTracks} className={(term === 'medium' ? 'active' : '')}>Medium</button>
                    <button id="long" onClick={handleGetTopTracks} className={(term === 'long' ? 'active' : '')}>Long</button>
                </div>
                <div className='track-container'>
                    {topTracks && (
                        topTracks.map((track) => (
                            <div key={track.id} className='track' id={track.id}>
                                <div className='album-image-container' id={track.album.id} onClick={navigateToAlbum}>
                                    {track.album.images.length >= 1 && (
                                        <img src={track.album.images[0].url} className='album-image' id={track.album.id} />   
                                    )}
                                    {track.album.images.length === 0 && (
                                        <img src={albumIcon} className='album-image' id={track.album.id} />   
                                    )}
                                </div>
                                <div className='track-info'>
                                    {/* <a href={track.uri} className='track-name'>{track.name}</a> */}
                                    <Link to={`/album/${track.album.id}`} className='track-name' state={state} >{track.name}</Link>
                                    <Link to={`/artist/${track.artists[0].id}`} className='track-artist' state={state} >{track.artists[0].name}</Link>
                                    <img src={playIcon} className='play-icon' onClick={handlePlayTrack} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </>
      )
}