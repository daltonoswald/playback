import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'

export default function Artist() {
    const [isLoading, setIsLoading] = useState(true);
    const [artist, setArtist] = useState('');
    const [topTracks, setTopTracks] = useState(null)
    const [albums, setAlbums] = useState(null);
    const spotifyApi = new SpotifyWebApi();
    const params = useParams();
    console.log(params.artistid);

    useEffect(() => {
        spotifyApi.getArtist(params.artistid).then((artist) => {
            console.log('artist: ', artist)
            setArtist(artist);
        })
        .then(spotifyApi.getArtistTopTracks(params.artistid).then((tracks) => {
            console.log('tracks: ', tracks);
            setTopTracks(topTracks);
        }))
        .then(spotifyApi.getArtistAlbums(params.artistid).then((albums) => {
            console.log('albums: ', albums.items)
            const discog = albums.items;
            const key = 'album_type'
            const value = 'album'
            const filteredData = discog.filter(item => item[key] === value);
            console.log(filteredData);
            setAlbums(filteredData);
            setIsLoading(false);
        }))
    },[params])

    return (
        <>
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
                            <div className='album-title'>{album.name}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
        )}
        </>
    )
}