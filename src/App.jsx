import './App.css'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './components/(Home)/Home'
import HomeLayout from './components/(Home)/Layout'
import DashboardLayout from './components/(platform)/(Dashboard)/dashboardLayout'
import SignInPage from './components/(platform)/(clerk)/(sign-in)/SignInPage';
import CreateOrganizationPage from './components/(platform)/(clerk)/(select-org)/SelectOrganisationPage';
import SignUpPage from './components/(platform)/(clerk)/(sign-up)/SignupPage';
import ClerkLayout from './components/(platform)/(clerk)/ClerkLayout';
import DashboardPage from './components/(platform)/(Dashboard)/dashboardPage';
import { Toaster } from 'sonner';
import BoardIdLayout from './components/(platform)/(board)/boardLayout';
import BoardIdPage from './components/(platform)/(board)/boardPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    element: <ClerkLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/sign-up/sso-callback',
        element: <SignUpPage />,
      },
      {
        path: '/organization',
        element: <CreateOrganizationPage />,
      },
    ]
  },
  {
    path: '/organization/:id',
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
  {
    path:'/plan/:boardId',
    element: (
      <>
        <SignedIn>
          <BoardIdLayout />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </>
    ),
    children:[
      {index:true,element:<BoardIdPage/>}
    ]
  }
]);

function App() {

  return (
    <>
     <Toaster/>
     <RouterProvider  router={router}/>
    </>
  )
}

export default App
