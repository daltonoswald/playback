import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './components/homepage/Homepage'
import Callback from './components/login/Callback';
import TopTracks from './components/top-tracks/TopTracks';
import TopArtists from './components/top-artists/TopArtists';
import Artist from './components/artist/Artist';
import Album from './components/album/Album';
import Search from './components/search/Search';

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Homepage />
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
            path: '/search',
            element: <Search />
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