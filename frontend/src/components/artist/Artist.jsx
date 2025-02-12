import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import Nav from '../nav/Nav';
import Footer from '../nav/Footer';
import Discog from './Discog';
import personIcon from '../../assets/icons/person.svg'
import albumIcon from '../../assets/icons/album.svg'
import playIcon from '../../assets/icons/play-icon.svg'
import spotifyIcon from '../../assets/icons/spotify.png'
import './artist.styles.css';

export default function Artist() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [artist, setArtist] = useState('');
    const [discography, setDiscography] = useState(null)
    const [topTracks, setTopTracks] = useState(null)
    const [albums, setAlbums] = useState(null);
    const spotifyApi = new SpotifyWebApi();
    const params = useParams();
    const spotifyToken = localStorage.getItem('spotifyToken')
    
    useEffect(() => {
        spotifyApi.setAccessToken(spotifyToken);
        spotifyApi.getArtist(params.artistid).then(
            function(data) {
                console.log(data);
                setArtist(data)
            },
            function (err) {
                console.error(err)
                setError(err);
            }
        )
        .then(spotifyApi.getArtistTopTracks(params.artistid).then(
            function(data) {
                setTopTracks(data.tracks)
            },
            function (err) {
                console.error(err)
                setError(err);
            }
        ))
        .then(spotifyApi.getArtistAlbums(params.artistid).then(
            function (data) {
                const discog = data.items;
                setDiscography(discog)
                const key = 'album_type'
                const value = 'album'
                const key2 = 'album_group'
                const value2 = 'album'
                const filteredData = discog.filter(item => ((item[key] === value) && (item[key2] === value2)));
                setAlbums(filteredData);
                setIsLoading(false)
            },
            function (err) {
                console.error(err)
                setError(err);
            }
        ))
    },[params])

    const handlePlayTrack = (e) => {
        spotifyApi.setAccessToken(spotifyToken);
        spotifyApi.play(
            {
                context_uri: `spotify:album:${e.target.parentElement.id}`,
                offset: {
                    position: e.target.id - 1
                }
            
            })
    }
    

    if (isLoading && error && artist === '') return (
        <>
        <Nav />
        <div className='content'>
            <h1>Artist not found.</h1>
            </div>
        <Footer />
        </>
    )

    return (
        <>
        <Nav />
        {isLoading && (
            <div className='content'>
                <h1>Loading...</h1>
            </div>
        )}
        {!isLoading && artist && (
        <div className='content'>
            <div className='artist-details'>
                {artist.images.length >= 1 && (
                    <div className='artist-details-image' id={artist.id} style={{backgroundImage: 'url(' + artist.images[0].url + ')',}} />
                )}
                {artist.images.length === 0 && (
                    <img src={personIcon} className='artist-details-image' />
                )}
                <div className='artist-details-name'>
                    <a href={artist.uri}><img src={spotifyIcon} className='artist-details-spotify-icon' /></a>
                    <h1>{artist.name}</h1>
                </div>
            </div>
            <Discog discography={discography} albums={albums} />
            <div className='artist-tracks'>
                {topTracks && (
                    topTracks.map((track) => (
                        <div className='artist-track' key={track.id} id={track.id}>
                            <Link  to={`/album/${track.album.id}`} className='artist-track-image-container'>
                                {track.album.images.length >= 1 && (
                                    <img src={track.album.images[0].url} className='artist-track-image'/>   
                                )}
                                {track.album.images.length === 0 && (
                                    <img src={albumIcon} className='artist-track-image'/>
                                )}
                            </Link>
                            <div className='artist-track-details' id={track.album.id}>
                                {/* <div className='track-title'>{track.name}</div> */}
                                <Link to={`/album/${track.album.id}`} className='track-title'>{track.name}</Link>
                                <img src={playIcon} onClick={handlePlayTrack} className='play-icon' id={track.track_number} />
                            </div>
                        </div>
                    ))
                )}
                {/* <Tracklist tracks={topTracks} /> */}
            </div>
        </div>
        )}
        <Footer />
        </>
    )
}