import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import spotifyIcon from '../../assets/icons/spotify.png'
import githubIcon from '../../assets/icons/github-original.svg'
import linkedinIcon from '../../assets/icons/linkedin-plain.svg'
import './footer.styles.css'

export default function Footer() {

    return (
        <div className="footer">
            <a href='https://developer.spotify.com/documentation/web-api' className="footer-spotify">
                <img className="icon" src={spotifyIcon} alt="Spotify Icon" />
                <div className="footer-text">
                    <p>Built using Spotify Web API</p>
                </div>
            </a>
            <div className="footer-links">
                    <a href='https://github.com/daltonoswald/photo-tagging-app' className="footer-github">
                        <img className="icon white-svg" src={githubIcon} alt="github icon" />
                    </a>
                    <a href='https://linkedin.com/in/daltonoswald' className="footer-linkedin">
                        <img className="icon white-svg" src={linkedinIcon} alt="linkedin icon" />
                    </a>
            </div>
        </div>
    )
  }