import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import './topArtists.styles.css'
import Nav from '../nav/Nav';
import playIcon from  '../../assets/icons/play-icon.svg'
import personIcon from '../../assets/icons/person.svg'

export default function TopArtists() {
    const { state } = useLocation();
    console.log(state);
    const [topArtists, setTopArtists] = useState(null);
    const [term, setTerm] = useState('medium');
    const navigate = useNavigate();
    const spotifyApi = new SpotifyWebApi();
  
    useEffect(() => {
      if (!state) {
        navigate('/');
      } else {
        handleGetTopArtists();
      }
    },[state])
  
    const handleGetTopArtists = (e) => {
        if (e) {
            spotifyApi.setAccessToken(state.spotifyToken);
            spotifyApi.getMyTopArtists({time_range: (e.target.id + '_term')}).then((artists) => {
                setTerm(e.target.id)
                setTopArtists(artists.items)
                console.log(artists.items)
            })
        } else {
            spotifyApi.setAccessToken(state.spotifyToken);
            spotifyApi.getMyTopArtists({time_range: 'medium_term'}).then((artists) => {
                setTopArtists(artists.items)
                console.log(artists.items)
            })
        }
    }

    const handlePlayArtist = (e) => {
        spotifyApi.play({context_uri: `spotify:artist:${e.target.parentElement.parentElement.id}`})
    }


      return (
        <>
            <Nav />
            <div className='content'>
                <div>Your artists based on {term} length.
                    <button id="short" onClick={handleGetTopArtists} className={(term === 'short' ? 'active' : '')} >Get Top Artists (Short)</button>
                    <button id="medium" onClick={handleGetTopArtists} className={(term === 'medium' ? 'active' : '')} >Get Top Artists (Medium)</button>
                    <button id="long" onClick={handleGetTopArtists} className={(term === 'long' ? 'active' : '')} >Get Top Artists (Long)</button>
                </div>
                <div className='artists-container'>
                    {topArtists && (
                        topArtists.map((artist) => (
                            <div key={artist.id} className='artist' id={artist.id}>
                                <a href={artist.external_urls.spotify}>
                                    <div className='artist-image-container'>
                                        {artist.images.length >= 1 && (
                                            <img src={artist.images[0].url} className='artist-image'/>  
                                        )}
                                        {artist.images.length === 0 && (
                                            <img src={personIcon} className='artist-image'/> 
                                        )} 
                                    </div>
                                </a>
                                <div className='artist-info'>
                                    {/* <a href={artist.uri} className='artist-name'>{artist.name}</a> */}
                                    <Link to={`/artist/${artist.id}`} className='artist-name' state={state} >{artist.name}</Link>
                                    <img src={playIcon} className='play-icon' onClick={handlePlayArtist} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
      )
}