import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './feature/store';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css'
import App from './App.jsx'

const publishableKey =import.meta.env.VITE_CLERK_FRONTEND_API;
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={publishableKey}>
        <App />
      </ClerkProvider>
    </Provider>
  </StrictMode>,
)
