/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns'
import SpotifyWebApi from 'spotify-web-api-js'
import Nav from '../nav/Nav';
import Tracklist from '../tracklist/Tracklist';
import albumIcon from '../../assets/icons/album.svg'
import './album.styles.css'
import Footer from '../nav/Footer';

export default function Album() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [album, setAlbum] = useState('');
    const spotifyApi = new SpotifyWebApi();
    const params = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const spotifyToken = localStorage.getItem('spotifyToken')

    // useEffect(() => {
    //     console.log(state);
    //     console.log('params', params)
    //     if (!state) {
    //       navigate('/');
    //     }
    //   },[state])
    console.log(album)

    useEffect(() => {
        // spotifyApi.setAccessToken(state.spotifyToken);
        spotifyApi.setAccessToken(spotifyToken);
        // spotifyApi.getAlbum(params.albumid).then((album) => {
        //     console.log('album', album);
        //     setAlbum(album)
        // })
        spotifyApi.getAlbum(params.albumid).then(
            function(data) {
                console.log('album', data);
                setAlbum(data)
                setIsLoading(false)
            },
            function (err) {
                console.error(err)
                setError(err)
            }
        )
    },[params])

    // useEffect(() => {
    //     if (album !== '') {
    //         setIsLoading(false);
    //     }
    // },[album])

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
                        {album.images.length >= 0 && (
                           <img src={album.images[0].url} className='album-details-image' /> 
                        )}
                        {album.images.length === 0 && (
                           <img src={albumIcon} className='album-details-image' /> 
                        )}
                        
                        <h1 className='album-details-name'>{album.name}</h1>
                    </div>
                    <div className='album-details-bottom'>
                        <div className='album-deatils-artists-container'>
                            {album.artists.map((artist, i, arr) => (
                                <Link to={`/artist/${artist.id}`} state={state} className='album-details-artist'>{artist.name}{i != (arr.length-1) ? ', ' : ''}</Link>
                                // <Link to={`/artist/${artist.id}`} className='artist-name' state={state} >{artist.name}</Link>
                            ))}
                        </div>
                        <div className='album-details-release'>{format(album.release_date, 'yyyy')}</div>
                        <div className='album-details-length'>{album.total_tracks} Songs</div>
                    </div>
                </div>
                <div className='album-tracklist'>
                    <Tracklist tracks={album.tracks.items} />
                </div>
            </div>
        )}
        {(isLoading && error && album === '') && (
            <div className='content'>
                <h1>Album not found.</h1>
            </div>
        )}
        <Footer />
        </>
    )
}