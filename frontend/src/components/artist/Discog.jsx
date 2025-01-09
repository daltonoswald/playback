/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import playIcon from  '../../assets/icons/play-icon.svg'
import albumIcon from  '../../assets/icons/album.svg'

export default function Discog({discography, albums, state}) {
    const [discographySettings, setDiscographySettings] = useState('albums');
    const spotifyApi = new SpotifyWebApi();
    

    const handleDiscogSettings = (e) => {
        console.log(e.target.id);
        setDiscographySettings(e.target.id)
    }

    const handlePlayAlbum = (e) => {
        spotifyApi.play(
            {
                context_uri: `spotify:album:${e.target.parentElement.parentElement.id}`,
                offset: {
                    position: 0
                }    
            })
    }

    return (
        <div className='discography-container'>
        <h1>Discography</h1>
        <div className='discography-settings'>
            <button className={'discog-setting ' + (discographySettings === 'albums' ? 'active' : '')} id='albums' onClick={handleDiscogSettings}>Albums</button>
            <button className={'discog-setting ' + (discographySettings === 'eps' ? 'active' : '')} id='eps' onClick={handleDiscogSettings}>EPs & Singles</button>
        </div>
    {discographySettings === 'albums' && (
        <div className='artist-albums'>
            {albums && (
                albums.map((album) => (
                    <div className='album' key={album.id} id={album.id}>
                        <Link to={`/album/${album.id}`} state={state} className='artist-album-image-container'>
                            <img src={album.images[0].url} className='artist-album-image'/>
                        </Link>
                        <div className='artist-album-details'>
                            <Link to={`/album/${album.id}`} className='album-title' state={state}>{album.name}</Link>
                            <img src={playIcon} className='play-icon' onClick={handlePlayAlbum} />
                        </div>
                    </div>
                ))
            )}
        </div>
        )}
    {discographySettings === 'eps' && (
        <div className='artist-albums'>
        {discography && (
            discography.map((album) => (
                <div className='album' key={album.id} id={album.id}>
                    <div className='artist-album-image-container'>
                        {album.images.length >= 1 && (
                            <img src={album.images[0].url} className='artist-album-image'/>    
                        )}
                        {album.images.length === 0 && (
                            <img src={albumIcon} className='artist-album-image'/>    
                        )}
                    </div>
                    <div className='artist-album-details'>
                    <Link to={`/album/${album.id}`} className='album-title' state={state}>{album.name}</Link>
                        <img src={playIcon} className='play-icon' onClick={handlePlayAlbum} />
                    </div>
                </div>
            ))
        )}
    </div>
    )}
    </div>
    )
}