import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Callback from './components/login/Callback';

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
        }
    ])
    return <RouterProvider router={router} />
}