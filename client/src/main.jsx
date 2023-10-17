import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'

import App from './App.jsx'
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import CampaignForm from './components/CampaignForm';
import NoteForm from './components/NoteForm';
import Campaign from './pages/Campaign';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Landing />
      }, {
        path: '/home',
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/profile/:username', // Define the route with a username parameter
        element: <Profile />
      },
      {
        path: '/campaign-form', // Define the route with a username parameter
        element: <CampaignForm />
      },
      {
        path: '/note-form', // Define the route with a username parameter
        element: <NoteForm />
        path: '/campaign/:campaignId',
        element: <Campaign />
      },
      {
        path: '*', // Catch-all route for undefined routes
        element: <Error />, // Render an error component or a not found page
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
