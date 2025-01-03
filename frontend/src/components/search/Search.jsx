import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import Nav from '../nav/Nav';
import './search.styles.css';

export default function Search () {
    const [tracks, setTracks] = useState(null)
    const [artists, setArtists] = useState(null)
    const [albums, setAlbums] = useState(null);
    const { state } = useLocation();
    console.log(state);
    const spotifyApi = new SpotifyWebApi();

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(e.target.search.value);
        spotifyApi.setAccessToken(state.spotifyToken);
        spotifyApi.searchTracks(e.target.search.value, { limit: 10 }).then((tracks) => {
            console.log(tracks.tracks.items)
            setTracks(tracks.tracks.items)
        })
        spotifyApi.searchArtists(e.target.search.value, { limit: 5 }).then((artists) => {
            console.log(artists.artists.items);
            setArtists(artists.artists.items)
        })
        spotifyApi.searchAlbums(e.target.search.value, { limit: 5 }).then((albums) => {
            console.log('albums ', albums.albums.items)
            setAlbums(albums.albums.items)
        })
    }

    return (
        <>
            <Nav />
            <div className='content'>
                <h1>Search Page</h1>
                <div className='search-container'>
                    <form onSubmit={handleSearch}>
                        <input type='text' id='search' name='search' />
                        <button className='search-button' type='submit'>Search</button>
                    </form>
                </div>
                <div className='track-results'>Tracks:
                    {tracks && (
                        tracks.map(track => (
                            <div className='track-result' key={track.id}>
                                <img src={track.album.images[0].url} className='search-result-image' />
                                <div className='result-details'>
                                    <p>{track.name}</p>
                                    {track.artists.map(artist => (
                                        <Link to={`/artist/${artist.id}`} key={artist.id} state={state} >{artist.name}</Link>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className='artist-results'>Artists:
                    {artists && (
                        artists.map(artist => (
                            <div className='artist-result' key={artist.id}>
                                <img src={artist.images[0].url} className='search-result-image' />
                                <div className='result-details'>
                                    <Link to={`/artist/${artist.id}`} key={artist.id} state={state} >{artist.name}</Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className='album-results'>Albums:
                    {albums && (
                        albums.map(album => (
                            <div className='album-result' key={album.id}>
                                <img src={album.images[0].url} className='search-result-image' />
                                <div className='result-details'>
                                    <p>{album.name}</p>
                                    {album.artists.map(artist => (
                                        <Link to={`/artist/${artist.id}`} key={artist.id} state={state} >{artist.name}</Link>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}