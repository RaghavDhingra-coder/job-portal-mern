
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/profile'
import JobDescription from './components/JobDescription'
import EditProfile from './components/EditProfile'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'


const appRouter = createBrowserRouter([

   {
    path:"/",
    element:<Home></Home>
   }
   ,
   {
    path:"/signup",
    element:<Signup></Signup>
   },
   {
    path:"/login",
    element:<Login></Login>
   },
   {
    path:"/jobs",
    element:<Jobs></Jobs>
   },
   {
    path:"/browse",
    element:<Browse></Browse>
   },
   {
      path:"/profile",
      element:<Profile></Profile>
   },
   {
      path:"/description/:id",
      element:<JobDescription></JobDescription>
   },
   {
    path:"/editprofile",
    element:<EditProfile></EditProfile>
   },
  //  admin
  {
    path:"/admin/companies",
    element:<ProtectedRoute><Companies></Companies></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoute><CreateCompany></CreateCompany></ProtectedRoute>
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup></CompanySetup></ProtectedRoute>
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs></AdminJobs></ProtectedRoute>
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob></PostJob></ProtectedRoute>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants></Applicants></ProtectedRoute>
  }
])

function App() {

  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  )
}

export default App
