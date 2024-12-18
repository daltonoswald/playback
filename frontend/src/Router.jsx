import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Callback from './components/login/Callback';
import TopTracks from './components/tracks/TopTracks';
import TopArtists from './components/artists/TopArtists';

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
        }
    ])
    return <RouterProvider router={router} />
}