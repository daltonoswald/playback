import { useState } from 'react';
import { useLocation} from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import Nav from '../nav/Nav';

export default function Search () {
    const [results, setResults] = useState(null)
    const { state } = useLocation();
    console.log(state);
    const spotifyApi = new SpotifyWebApi();

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(e.target.search.value);
        spotifyApi.setAccessToken(state.spotifyToken);
        spotifyApi.searchTracks(e.target.search.value).then((tracks) => {
            console.log(tracks.tracks.items)
            setResults(tracks.tracks.items)
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
                <div className='search-results'>
                    {results && (
                        results.map(result => (
                            <div className='result' key={result.id}>
                                <img src={result.album.images[0].url} />
                                <p>{result.name}</p>
                                <p>{result.artists[0].name}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}