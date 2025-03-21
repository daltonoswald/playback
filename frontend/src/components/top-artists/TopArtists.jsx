import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import './topArtists.styles.css'
import Nav from '../nav/Nav';
import playIcon from  '../../assets/icons/play-icon.svg'
import spotifyIcon from '../../assets/icons/spotify.png'
import personIcon from '../../assets/icons/person.svg'
import Footer from '../nav/Footer';
import ErrorModal from '../error/ErrorModal';

export default function TopArtists() {
    const spotifyToken = localStorage.getItem('spotifyToken');
    const [topArtists, setTopArtists] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);
    const [term, setTerm] = useState('medium');
    const navigate = useNavigate();
    const spotifyApi = new SpotifyWebApi();
  
    useEffect(() => {
      if (!spotifyToken) {
        navigate('/');
      } else {
        handleGetTopArtists();
      }
    },[spotifyToken])
  
    const handleGetTopArtists = (e) => {
        if (e) {
            spotifyApi.setAccessToken(spotifyToken);
            // spotifyApi.getMyTopArtists({time_range: (e.target.id + '_term')}).then((artists) => {
            //     setTerm(e.target.id)
            //     setTopArtists(artists.items)
            // })
            spotifyApi.getMyTopArtists({time_range: (e.target.id + '_term')}).then(
                function(artists) {
                    setIsLoading(false)
                    setTerm(e.target.id)
                    setTopArtists(artists.items)
                },
                function(err) {
                    console.error(err.response)
                    setError(err.response)
                    setIsLoading(false);
                }
            )
        } else {
            spotifyApi.setAccessToken(spotifyToken);
            // spotifyApi.getMyTopArtists({time_range: 'medium_term'}).then((artists) => {
            //     setTopArtists(artists.items)
            // })
            spotifyApi.getMyTopArtists({time_range: 'medium_term'}).then(
                function(artists) {
                    setIsLoading(false)
                    setTopArtists(artists.items)
                },
                function(err) {
                    console.error(err.response) 
                    setError(err.response)
                    setIsLoading(false);
                }
            )
        }
    }

    const handlePlayArtist = (e) => {
        spotifyApi.play({context_uri: `spotify:artist:${e.target.parentElement.parentElement.id}`})
    }

    const navigateToArtist = (e) => {
        navigate(`/artist/${e.target.id}`)
    }


      return (
        <>
            <Nav />
            {(spotifyToken && !isLoading && !error) && (
                <div className='content'>
                    <div className='term-buttons'>
                        <button id="short" onClick={handleGetTopArtists} className={(term === 'short' ? 'active' : '')}>Short</button>
                        <button id="medium" onClick={handleGetTopArtists} className={(term === 'medium' ? 'active' : '')}>Medium</button>
                        <button id="long" onClick={handleGetTopArtists} className={(term === 'long' ? 'active' : '')}>Long</button>
                    </div>
                    <div className='artists-container'>
                        {topArtists && (
                            topArtists.map((artist) => (
                                <div key={artist.id} className='artist' id={artist.id}>
                                    {artist.images.length >= 1 && (
                                        // <div className='artist-image-container' id={artist.id} onClick={navigateToArtist} style={{backgroundImage: 'url(' + artist.images[0].url + ')',}} />
                                        <Link to={`/artist/${artist.id}`} className='artist-image-container' id={artist.id} >
                                            <img src={artist.images[0].url} />
                                        </Link>
                                    )}
                                    {artist.images.length === 0 && (
                                        <img className='artist-image-container' id={artist.id} onClick={navigateToArtist} src={personIcon} />
                                    )}
                                    <div className='artist-info'>
                                        {/* <a href={artist.uri} className='artist-name'>{artist.name}</a> */}
                                        <Link to={`/artist/${artist.id}`} className='artist-name'>{artist.name}</Link>
                                        <div className='artist-info-icons'>
                                            <img src={playIcon} className='play-icon' onClick={handlePlayArtist} />
                                            <a href={artist.uri}><img src={spotifyIcon} className='play-spotify-icon'/></a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
            {(spotifyToken && !isLoading && error && (
                <div className='content'>
                    <ErrorModal error={error} />
                </div>
            ))}
            <Footer />
        </>
      )
}