import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import axios from "axios"
import { USER_API_END_POINT } from "../utils/constant"
import { setUser } from "../../redux/authSlice"

const EditProfile = () => {

    // fullName, email, C, bio, skills

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector(store=>store.auth)

    const [input,setInput] = useState({

        fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null
    })

     const changeEventHandler = (e)=>
     {
        setInput({...input,[e.target.name]:e.target.value})
     }
     const fileChangeHandler = (e)=>
     {
        const file = e.target.files?.[0]
        setInput({...input,file})
     }

     const submitHandler = async(e)=>
     {
        e.preventDefault()

        const formData = new FormData()
        formData.append("fullName",input.fullName)
        formData.append("email",input.email)
        formData.append("phoneNumber",input.phoneNumber)
        formData.append("bio",input.bio)
        formData.append("skills",input.skills)

        if(input.file)
        {
            formData.append("file",input.file)
        }


        try
        {
            const res = await axios.put(`${USER_API_END_POINT}/profile/update`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })

            if(res.data.success)
            {
                dispatch(setUser(res.data.user))
                navigate("/profile")
            }
        }
        catch(err)
        {
            console.log(err)
        }
        

        console.log(input)
     }

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-24 pb-12">

        <div className="bg-white shadow-md rounded-xl p-6">

          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Edit Profile
          </h1>

          <form className="space-y-5" onSubmit={submitHandler}>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>

              <input
                type="text"
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>

              <textarea
                rows="3"
                placeholder="Write a short bio..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
              ></textarea>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>

              <input
                type="text"
                placeholder="Enter skills separated by commas"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume
              </label>

              <input
                type="file"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white file:rounded-md hover:file:bg-blue-700"
                name="resume"
                onChange={fileChangeHandler}
              />

              <p className="text-xs text-gray-500 mt-1">
                Upload PDF or DOCX (Max 5MB)
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Save Changes
              </button>

              <button
                type="button"
                className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
                onClick={()=>navigate(-1)}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>
    </>
  )
}

export default EditProfile