import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN
const Auth0ClientID = import.meta.env.VITE_AUTH0_CLIENTID

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <Auth0Provider domain={Auth0Domain} clientId={Auth0ClientID}             authorizationParams={{
            redirect_uri: window.location.origin
       }}>
    <App />
       </Auth0Provider>
  </React.StrictMode>,
)
