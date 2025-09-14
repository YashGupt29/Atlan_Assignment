import './App.css'
import { SignedIn, SignedOut, RedirectToSignIn, SignOutButton } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './components/homePage/home'
import HomeLayout from './components/homePage/layout'
import DashboardLayout from './components/platform/Dashboard/dashboardLayout'
import SignInPage from './components/platform/clerk/sign-in/signinPage';
import CreateOrganizationPage from './components/platform/clerk/select-org/SelectOrganisationPage';
import SignUpPage from './components/platform/clerk/sign-up/signupPage';
import ClerkLayout from './components/platform/clerk/clerkLayout';
import DashboardPage from './components/platform/Dashboard/dashboardPage';
import { Toaster } from 'sonner';
import BoardIdLayout from './components/platform/board/boardLayout';
import BoardIdPage from './components/platform/board/boardPage';
import RedirectWrapper from './hooks/useAuthRedirect';


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
        path: 'login',
        element: <SignInPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: '/organization',
        element: <CreateOrganizationPage />,
      }
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
  },
  {
    path: '*',
    element: <RedirectWrapper><div>Redirecting...</div></RedirectWrapper>,
  },
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
