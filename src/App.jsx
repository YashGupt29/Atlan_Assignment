import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './components/Home/Home'
import HomeLayout from './components/Home/Layout'


const router=createBrowserRouter([
  {
    path:"/",
    element:<HomeLayout/>,
    children:[
      {
        index:true,element:<Home/>
      }
    ]
  }
])

function App() {

  return (
    <>
     <RouterProvider  router={router}/>
    </>
  )
}

export default App
