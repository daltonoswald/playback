/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns'
import SpotifyWebApi from 'spotify-web-api-js'
import Nav from '../nav/Nav';
import Footer from '../nav/Footer';
import Tracklist from '../tracklist/Tracklist';
import albumIcon from '../../assets/icons/album.svg'
import spotifyIcon from '../../assets/icons/spotify.png'
import './album.styles.css'
import ErrorModal from '../error/ErrorModal';

export default function Album() {
    const spotifyToken = localStorage.getItem('spotifyToken')
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [album, setAlbum] = useState('');
    const spotifyApi = new SpotifyWebApi();
    const params = useParams();


    useEffect(() => {
        spotifyApi.setAccessToken(spotifyToken);
        spotifyApi.getAlbum(params.albumid).then(
            function(data) {
                setAlbum(data)
                setIsLoading(false)
            },
            function (err) {
                console.error(err)
                setError(err.response)
            }
        )
    },[spotifyToken, params])

    return (
        <>
        <Nav />
        {(isLoading && error === null) && (
            <div className='content'>
                <h1>Loading...</h1>
            </div>
        )}
        {(!isLoading && album !== '') && (
            <div className='content'>
                <div className='album-details'>
                    <div className='album-details-top'>
                        <div className='album-details-image-container'>
                            {album.images.length >= 0 && (
                            <img src={album.images[0].url} className='album-details-image' /> 
                            )}
                            {album.images.length === 0 && (
                            <img src={albumIcon} className='album-details-image' /> 
                            )}
                        </div>
                        <div className='album-details-name'>
                            <a href={album.uri}><img src={spotifyIcon} className='album-details-spotify-icon' /></a>
                            <h1>{album.name}</h1>
                        </div>
                    </div>
                    <div className='album-details-bottom'>
                        <div className='album-deatils-artists-container'>
                            {album.artists.map((artist, i, arr) => (
                                <Link to={`/artist/${artist.id}`} className='album-details-artist'>{artist.name}{i != (arr.length-1) ? ', ' : ''}</Link>
                            ))}
                        </div>
                        <div className='album-details-release'>{format(album.release_date, 'yyyy')}</div>
                        <div className='album-details-length'>{album.total_tracks} Songs</div>
                    </div>
                </div>
                <hr />
                <div className='album-tracklist'>
                    <Tracklist tracks={album.tracks.items} />
                </div>
            </div>
        )}
        {(isLoading && error && album === '') && (
            <div className='content'>
                <h1>Album not found.</h1>
                <ErrorModal error={error} />
            </div>
        )}
        <Footer />
        </>
    )
}