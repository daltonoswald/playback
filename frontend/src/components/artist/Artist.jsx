import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import Nav from '../nav/Nav';
import './artist.styles.css';
import playIcon from  '../../assets/icons/play-icon.svg'

export default function Artist() {
    const [isLoading, setIsLoading] = useState(true);
    const [artist, setArtist] = useState('');
    const [topTracks, setTopTracks] = useState(null)
    const [albums, setAlbums] = useState(null);
    const spotifyApi = new SpotifyWebApi();
    const params = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        console.log(state);
        console.log('params', params)
        if (!state) {
          navigate('/');
        }
      },[state])

    useEffect(() => {
        spotifyApi.setAccessToken(state.spotifyToken);
        spotifyApi.getArtist(params.artistid).then((artist) => {
            console.log('artist: ', artist)
            setArtist(artist);
        })
        .then(spotifyApi.getArtistTopTracks(params.artistid).then((tracks) => {
            console.log('tracks: ', tracks.tracks);
            setTopTracks(tracks.tracks);
        }))
        .then(spotifyApi.getArtistAlbums(params.artistid).then((albums) => {
            console.log('albums: ', albums.items)
            const discog = albums.items;
            const key = 'album_type'
            const value = 'album'
            const key2 = 'album_group'
            const value2 = 'album'
            const filteredData = discog.filter(item => ((item[key] === value) && (item[key2] === value2)));
            console.log(filteredData);
            setAlbums(filteredData);
            // setIsLoading(false);
        }))
    },[params])

    const handlePlayAlbum = (e) => {
        spotifyApi.play({context_uri: `spotify:album:${e.target.parentElement.parentElement.id}`})
    }

    useEffect(() => {
        if (artist && topTracks && albums) {
            setIsLoading(false);
        }
    },[artist, topTracks, albums])
    

    return (
        <>
        <Nav />
        {!isLoading && (
        <div className='content'>
            <div className='artist-details'>
                <img src={artist.images[0].url} className='artist-details-image' />
                <div>{artist.name}</div>
            </div>
            <div className='artist-albums'>
                {albums && (
                    albums.map((album) => (
                        <div className='album' key={album.id} id={album.id}>
                            <div className='artist-album-image-container'>
                                <img src={album.images[0].url} className='artist-album-image'/>
                            </div>
                            <div className='artist-album-details'>
                                <div className='album-title'>{album.name}</div>
                                <img src={playIcon} className='play-icon' onClick={handlePlayAlbum} />
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className='artist-tracks'>
                {topTracks && (
                    topTracks.map((track) => (
                        <div className='artist-track' key={track.id} id={track.id}>
                            <div className='artist-track-image-container'>
                                <img src={track.album.images[0].url} className='artist-track-image'/>
                            </div>
                            <div className='artist-track-details'>
                                <div className='track-title'>{track.name}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        )}
        </>
    )
}