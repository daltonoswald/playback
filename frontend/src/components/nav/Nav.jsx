import { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './nav.styles.css'

export default function Nav() {
  const spotifyToken = localStorage.getItem('spotifyToken')
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('spotifyToken');
    localStorage.removeItem('spotifyRefreshToken');
    navigate('/')
  }

  console.log(location)

  useEffect(() => {
    if (!spotifyToken && location.pathname !== '/home') {
      navigate('/');
    }
  })

    return (
      <>
        <div className='nav'>
          <Link to='/home' className='nav-left'>Statsify</Link>
          <div className='nav-middle'>
              <Link to='/my-top-tracks'>Top Tracks</Link>
              <Link to='/my-top-artists'>Top Artists</Link>
              <Link to='/search'>Search</Link>
          </div>
              <Link to='/' className='nav-right' onClick={logout}>Logout</Link>
        </div>
  
      </>
    )
  }