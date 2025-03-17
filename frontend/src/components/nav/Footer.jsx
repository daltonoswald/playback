import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import spotifyIcon from '../../assets/icons/spotify-full.png'
import githubIcon from '../../assets/icons/github-original.svg'
import linkedinIcon from '../../assets/icons/linkedin-plain.svg'
import './footer.styles.css'

export default function Footer() {

    return (
        <div className="footer">
            <div className="footer-spotify">
                <a href='https://open.spotify.com'><img className="icon" src={spotifyIcon} alt="Spotify Icon" /></a>
                <div className="footer-text">
                    <a href='https://developer.spotify.com/documentation/web-api' >Built using Spotify Web API</a>
                </div>
            </div>
            <div className="footer-links">
                <Link to='/about'>About</Link>
                <a href='https://github.com/daltonoswald/playback' className="footer-github">
                    <img className="icon link-icon white-svg" src={githubIcon} alt="github icon" />
                </a>
                <a href='https://linkedin.com/in/daltonoswald' className="footer-linkedin">
                    <img className="icon link-icon white-svg" src={linkedinIcon} alt="linkedin icon" />
                </a>
            </div>
        </div>
    )
  }