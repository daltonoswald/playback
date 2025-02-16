import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/login/Login';
import Homepage from './components/homepage/Homepage';
import Callback from './components/login/Callback';
import TopTracks from './components/top-tracks/TopTracks';
import TopArtists from './components/top-artists/TopArtists';
import Artist from './components/artist/Artist';
import Album from './components/album/Album';
import Search from './components/search/Search';
import Error from './components/error/Error';
import About from './components/about/About';

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Login />,
            errorElement: <Error />
        },
        {
            path: '/home',
            element: <Homepage />
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
            element: <Artist />,
        },
        {
            path: '/album/:albumid',
            element: <Album />
        },
        {
            path: '/about',
            element: <About />
        }
    ])
    return <RouterProvider router={router} />
}