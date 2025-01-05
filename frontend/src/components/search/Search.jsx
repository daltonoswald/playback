import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import Nav from '../nav/Nav';
import './search.styles.css';
import personIcon from '../../assets/icons/person.svg'
import albumIcon from '../../assets/icons/album.svg'
import playIcon from '../../assets/icons/play-icon.svg'

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
        spotifyApi.searchTracks(e.target.search.value, { limit: 9 }).then((tracks) => {
            console.log(tracks.tracks.items)
            setTracks(tracks.tracks.items)
        })
        spotifyApi.searchArtists(e.target.search.value, { limit: 6 }).then((artists) => {
            console.log(artists.artists.items);
            setArtists(artists.artists.items)
        })
        spotifyApi.searchAlbums(e.target.search.value, { limit: 6 }).then((albums) => {
            console.log('albums ', albums.albums.items)
            setAlbums(albums.albums.items)
        })
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
                <h1>Search Page</h1>
                <div className='search-container'>
                    <form onSubmit={handleSearch}>
                        <input type='text' id='search' name='search' />
                        <button className='search-button' type='submit'>Search</button>
                    </form>
                </div>
                {(tracks && artists && albums) && (
                    <>
                        <div className='search-tracks'>
                            <h1>Tracks</h1>
                            <div className='track-results'>
                                {tracks && (
                                    tracks.map(track => (
                                        <div className='track-result' key={track.id} id={track.id} onDoubleClick={handlePlayTrack}>
                                            <img src={track.album.images[0].url} className='search-result-image' />
                                            <div className='result-details'>
                                                {/* <p>{track.name}</p> */}
                                                <Link to={`/album/${track.album.id}`} state={state}>{track.name}</Link>
                                                <div className='result-track-artists'>
                                                    {track.artists.map((artist, i, arr) => (
                                                        <Link to={`/artist/${artist.id}`} state={state} key={artist.id}>{artist.name}{i != (arr.length-1) ? ', ' : ''}</Link>
                                                    ))}
                                                </div>
                                            </div>
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
                                            {artist.images.length >= 1 && (
                                                <img src={artist.images[0].url} className='search-result-image' />
                                            )}
                                            {artist.images.length === 0 && (
                                                <img src={personIcon} className='search-result-image' />
                                            )}
                                            <div className='result-details'>
                                                <Link to={`/artist/${artist.id}`} key={artist.id} state={state} >{artist.name}</Link>
                                            </div>
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
                                            {album.images.length >= 1 && (
                                                <img src={album.images[0].url} className='search-result-image' /> 
                                            )}
                                            {album.images.length === 0 && (
                                                <img src={albumIcon} className='search-result-image' /> 
                                            )}
                                            <div className='result-details'>
                                                <Link to={`/album/${album.id}`} state={state} >{album.name}</Link>
                                                <div className='result-album-artists'>
                                                    {album.artists.map((artist, i, arr) => (
                                                        <Link to={`/artist/${artist.id}`} state={state} key={artist.id}>{artist.name}{i != (arr.length-1) ? ', ' : ''}</Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}