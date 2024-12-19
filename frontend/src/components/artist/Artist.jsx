import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'

export default function Artist() {
    const [artist, setArtist] = useState('');
    const [topTracks, setTopTracks] = useState(null)
    const [albums, setAlbums] = useState(null);
    const spotifyApi = new SpotifyWebApi();
    const params = useParams();
    console.log(params.artistid);

    useEffect(() => {
        spotifyApi.getArtist(params.artistid).then((artist) => {
            console.log(artist)
            setArtist(artist);
        })
        .then(spotifyApi.getArtistTopTracks(params.artistid).then((tracks) => {
            console.log(tracks);
            setTopTracks(topTracks);
        }))
        .then(spotifyApi.getArtistAlbums(params.artistid).then((albums) => {
            console.log(albums.items)
            setAlbums(albums.items);
        }))
    },[params])

    return (
        <>
        <p>hi</p>
        </>
    )
}