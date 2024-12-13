import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />
            // errorElement: <ErrorPage />
        }
    ])
    return <RouterProvider router={router} />
}