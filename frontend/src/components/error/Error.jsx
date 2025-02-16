import { useRouteError, useNavigate, Link } from 'react-router-dom';
import './error.styles.css';

export default function Error() {
    const error = useRouteError();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('spotifyToken');
        localStorage.removeItem('spotifyRefreshToken');
        navigate('/')
      }
    
    return (
        <>
            <div className='content'>
                <div className='error-page'>
                    <p>There has been an error:</p>
                    <p>{error.data}</p>
                    <Link to='/home' className='error-link'>Return to home</Link>
                    {/* <Link to='/home' className='error-link' reloadDocument>Logout and try again.</Link> */}
                    <Link to='/' className='nav-right' onClick={logout}>Logout and try again</Link>
                </div>
            </div>
        </>
    )
}