import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Callback from './components/login/Callback';
import TopTracks from './components/top-tracks/TopTracks';
import TopArtists from './components/top-artists/TopArtists';
import Artist from './components/artist/Artist';
import Album from './components/album/Album';

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />
            // errorElement: <ErrorPage />
        },
        {
            path: '/callback',
            element: <Callback />
        },
        {
            path: '/my-top-tracks',
            element: <TopTracks />
        },
        {
            path: '/my-top-artists',
            element: <TopArtists />
        },
        {
            path: '/artist/:artistid',
            element: <Artist />
        },
        {
            path: '/album/:albumid',
            element: <Album />
        }
    ])
    return <RouterProvider router={router} />
}