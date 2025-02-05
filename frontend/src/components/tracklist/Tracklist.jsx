import SpotifyWebApi from 'spotify-web-api-js'
import './tracklist.styles.css';
import playIcon from  '../../assets/icons/play-icon.svg'

export default function Tracklist({ tracks }) {
    const spotifyApi = new SpotifyWebApi();

    const handlePlayTrack = (e) => {
        spotifyApi.play({uris: [`spotify:track:${e.target.parentElement.id}`]})
    }

    return (
            tracks.map((track, i) => (
                <div className='tracklist-track' key={track.id} id={track.id}>
                        <div className='tracklist-index'>{i+1}</div>
                        <img src={playIcon} className='tracklist-play-icon' onClick={handlePlayTrack} />
                        <div className='tracklist-title'>{track.name}</div>
                        <div className='tracklist-duration'>{Math.floor((track.duration_ms / 60000))}:{(Math.floor((track.duration_ms % 60000)/1000).toString()).padStart(2, "0")}</div>
                </div>
            ))
    )
}