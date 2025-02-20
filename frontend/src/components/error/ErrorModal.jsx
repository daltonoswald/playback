import { Link, useNavigate } from 'react-router-dom';
import Nav from '../nav/Nav';
import Footer from '../nav/Footer';

export default function ErrorModal({ error }) {

    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem('spotifyToken');
      localStorage.removeItem('spotifyRefreshToken');
      navigate('/')
    }

    const formattedError = JSON.parse(error)

    return (
        <>
            <div className='error'>
                <p>Error Status {formattedError.error.status}: {formattedError.error.message}</p>
                <p>If this error persists and looks incorrect please contact the site owner.</p>
                <Link to='/' onClick={logout} className='error-logout'>Logout and try again.</Link>
            </div>
        </>
    )
}