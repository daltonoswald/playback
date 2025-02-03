import { useRouteError, Link } from 'react-router-dom';
import './error.styles.css';

export default function Error() {
    const error = useRouteError();
    
    return (
        <>
            <div className='content'>
                <div className='error-page'>
                    <p>There has been an error:</p>
                    <p>{error.data}</p>
                    <Link to='/home' className='error-link'>Return to home</Link>
                    <Link to='/home' className='error-link' reloadDocument>Logout and try again.</Link>
                </div>
            </div>
        </>
    )
}