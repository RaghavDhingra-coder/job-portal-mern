import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/authSlice";

const Signup = () => {
// fullName, email, phoneNumber, password, role

const dispatch = useDispatch()
const {loading} = useSelector((store)=>store.auth)

const [err,setError] = useState("")

 const [input,setInput] = useState({

        fullName:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
 })

 const navigate = useNavigate()

 const changeEventHandler = (e)=>
 {
    setError("")
    setInput({...input,[e.target.name]:e.target.value})
 }

 const changeFileHandler = (e)=>
 {
     setInput({...input,file:e.target.files?.[0]})
 }

 const submitHandler = async (e)=>
 {
    e.preventDefault()
    const formData = new FormData()

    formData.append("fullName",input.fullName)
    formData.append("email",input.email)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("password",input.password)
    formData.append("role",input.role)

    if(input.file)
    {
        formData.append("file",input.file)
    }
    console.log(formData)
    try
    {   dispatch(setLoading(true))
        const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{

            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })

        if(res.data.success)
        {
            navigate("/login")
        }
    }
    catch(err)
    {
        console.log(err)
       setError (err.response?.data?.message || "Something went wrong")
    }
    finally{
        dispatch(setLoading(false))
    }
 }

 useEffect(()=>
     {
         if(user)
         {
             navigate("/")
         }
     },)

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen flex justify-center px-4">
        <div className="w-full max-w-lg mt-12 bg-white shadow-md rounded-xl border p-8">

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-7">
            Create your account
          </h2>
          {err && (
  <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-md text-center mb-4">
    {err}
  </div>
)}

          <form className="space-y-5" onSubmit={submitHandler}>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="fullName"
                value={input.fullName}
                onChange={changeEventHandler}
              />
            </div> 

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>

              <input
                type="text"
                placeholder="Enter phone number"
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>

              <div className="flex gap-8">
                <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                  <input type="radio" name="role" value="student" onChange={changeEventHandler} className="accent-blue-600" />
                  Student
                </label>

                <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                  <input type="radio" name="role" value="recruiter" onChange={changeEventHandler} className="accent-blue-600" />
                  Recruiter
                </label>
              </div>
            </div>

            {/* Profile Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo
              </label>

              <input
                type="file"
                className="w-full text-sm border rounded-lg p-2 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                onChange={changeFileHandler}
              />
            </div>

            {/* Signup Button */}
            

            {
                loading?<button
              type="submit"
              className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Please wait
            </button>:<button
              type="submit"
              className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Signup
            </button>
            }

            

          </form>

          {/* Login Link */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Already signed in?{" "}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              <Link to="/login">Login</Link>
            </span>
          </p>

        </div>
      </div>
    </>
  );
};

export default Signup;