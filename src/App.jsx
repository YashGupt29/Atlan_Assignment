import './App.css'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './components/(Home)/Home'
import HomeLayout from './components/(Home)/Layout'
import DashboardLayout from './components/(platform)/(Dashboard)/DashboardLayout'
import DashboardPage from './components/(platform)/(Dashboard)/DashboardPage'
import SignInPage from './components/(platform)/(clerk)/(sign-in)/SignInPage';
import CreateOrganizationPage from './components/(platform)/(clerk)/(select-org)/SelectOrganisationPage';
import SignUpPage from './components/(platform)/(clerk)/(sign-up)/SignupPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/organization',
    element: (
      <SignedIn>
        <CreateOrganizationPage />
      </SignedIn>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <>
        <SignedIn>
          <DashboardLayout />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
    ],
  },
]);
function App() {

  return (
    <>
     <RouterProvider  router={router}/>
    </>
  )
}

export default App
