import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store, persistor } from './feature/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css'
import App from './App.jsx'

const publishableKey =import.meta.env.VITE_CLERK_FRONTEND_API;
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ClerkProvider publishableKey={publishableKey}>
          <App />
        </ClerkProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
