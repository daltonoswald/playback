import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import Nav from '../nav/Nav';
import './search.styles.css';
import personIcon from '../../assets/icons/person.svg'
import albumIcon from '../../assets/icons/album.svg'
import spotifyIcon from '../../assets/icons/spotify.png'
import Footer from '../nav/Footer';
import ErrorModal from '../error/ErrorModal';

export default function Search () {
    const spotifyToken = localStorage.getItem('spotifyToken')
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tracks, setTracks] = useState(null)
    const [artists, setArtists] = useState(null)
    const [albums, setAlbums] = useState(null);
    const spotifyApi = new SpotifyWebApi();
    const navigate = useNavigate();

    useEffect(() => {
        if (!spotifyToken) {
          navigate('/');
        }
      },[spotifyToken])

    const handleSearch = (e) => {
        e.preventDefault();
        spotifyApi.setAccessToken(spotifyToken);
        // spotifyApi.searchTracks(e.target.search.value, { limit: 9 }).then((tracks) => {
        //     setTracks(tracks.tracks.items)
        // })
        spotifyApi.searchTracks(e.target.search.value, { limit: 9 }).then(
            function(tracks) {
                setTracks(tracks.tracks.items)
            },
            function(err) {
                console.error(err.response)
                setError(err.response)
            }
        )
        // spotifyApi.searchArtists(e.target.search.value, { limit: 6 }).then((artists) => {
        //     setArtists(artists.artists.items)
        // })
        spotifyApi.searchArtists(e.target.search.value, { limit: 6 }).then(
            function(artists) {
                setArtists(artists.artists.items)
            },
            function(err) {
                console.error(err.response)
                setError(err.response)
            }
        )
        // spotifyApi.searchAlbums(e.target.search.value, { limit: 6 }).then((albums) => {
        //     setAlbums(albums.albums.items)
        // })
        spotifyApi.searchAlbums(e.target.search.value, { limit: 6 }).then(
            function(albums) {
                setAlbums(albums.albums.items)
                setIsLoading(false)
            },
            function(err) {
                console.error(err.response)
                setError(err.response)
                setIsLoading(false)
            }
        )
    }

    const handlePlayTrack = (e) => {
        spotifyApi.play({uris: [`spotify:track:${e.target.id}`]}) 
    }

    const handlePlayArtist = (e) => {
        spotifyApi.play({context_uri: `spotify:artist:${e.target.id}`})
    }

    const handlePlayAlbum = (e) => {
        spotifyApi.play({context_uri: `spotify:album:${e.target.id}`})
    }

    return (
        <>
            <Nav />
            <div className='content'>
                <h1>Search</h1>
                    <form onSubmit={handleSearch} className='search-form'>
                        <input type='text' id='search' name='search' placeholder='What are you looking for?' />
                        {/* <button className='search-button' type='submit'>Search</button> */}
                    </form>
                {(tracks && artists && albums && !isLoading && !error) && (
                    <>
                        <div className='search-tracks'>
                            <h1>Tracks</h1>
                            <div className='track-results'>
                                {tracks && (
                                    tracks.map(track => (
                                        <div className='track-result' key={track.id} id={track.id} onDoubleClick={handlePlayTrack}>
                                            <Link to={`/album/${track.album.id}`}>
                                                <img src={track.album.images[0].url} className='search-result-image' />
                                            </Link>
                                            <div className='result-details'>
                                                <Link to={`/album/${track.album.id}`}>{track.name}</Link>
                                                <div className='result-track-artists'>
                                                    {track.artists.map((artist, i, arr) => (
                                                        <Link to={`/artist/${artist.id}`} key={artist.id}>{artist.name}{i != (arr.length-1) ? ', ' : ''}</Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <a href={track.uri} className='result-spotify-icon'>
                                                <img src={spotifyIcon} className='search-spotify-icon'/>
                                            </a>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className='search-artists'>
                            <h1>Artists</h1>
                            <div className='artist-results'>
                                {artists && (
                                    artists.map(artist => (
                                        <div className='artist-result' key={artist.id} id={artist.id} onDoubleClick={handlePlayArtist}>
                                            <Link to={`/artist/${artist.id}`} className='search-artist-image-container'>
                                                {artist.images.length >= 1 && (
                                                        <img src={artist.images[0].url} className='search-artist-image' />
                                                        // <div className='search-result-image search-artist-image' style={{backgroundImage: 'url(' + artist.images[0].url + ')'}} />
                                                )}
                                                {artist.images.length === 0 && (
                                                        <img src={personIcon} className='search-result-image' />
                                                )}
                                            </Link>
                                            <div className='result-details'>
                                                <Link to={`/artist/${artist.id}`} key={artist.id}>{artist.name}</Link>
                                            </div>
                                            <a href={artist.uri} className='result-spotify-icon'>
                                                <img src={spotifyIcon} className='search-spotify-icon'/>
                                            </a>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className='search-albums'>
                            <h1>Albums</h1>
                            <div className='album-results'>
                                {albums && (
                                    albums.map(album => (
                                        <div className='album-result' key={album.id} id={album.id} onDoubleClick={handlePlayAlbum}>
                                            <Link to={`/album/${album.id}`}>
                                            {album.images.length >= 1 && (
                                                <img src={album.images[0].url} className='search-result-image' /> 
                                            )}
                                            {album.images.length === 0 && (
                                                <img src={albumIcon} className='search-result-image' /> 
                                            )}
                                            </Link>
                                            <div className='result-details'>
                                                <Link to={`/album/${album.id}`}>{album.name}</Link> 
                                                <div className='result-album-artists'>
                                                    {album.artists.map((artist, i, arr) => (
                                                        <Link to={`/artist/${artist.id}`} key={artist.id}>{artist.name}{i != (arr.length-1) ? ', ' : ''}</Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <a href={album.uri} className='result-spotify-icon'>
                                                <img src={spotifyIcon} className='search-spotify-icon'/>
                                            </a>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </>
                )}
                {(spotifyToken && !isLoading && error && (
                    <div className='content'>
                        <ErrorModal error={error} />
                    </div>
                ))}
            </div>
            <Footer />
        </>
    )
}