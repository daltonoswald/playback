import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Callback from './components/login/Callback';
import Tracks from './components/tracks/Tracks';

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
            element: <Tracks />
        }
    ])
    return <RouterProvider router={router} />
}