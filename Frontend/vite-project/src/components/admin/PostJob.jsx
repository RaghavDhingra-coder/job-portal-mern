import { useState } from "react"
import Navbar from "../Navbar"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import { JOB_API_END_POINT } from "../../utils/constant"

const PostJob = () => {

    const [input,setInput] = useState({
        title:"",
        description:"",
        requirements:"",
        salary:"",
        location:"",
        jobType:"",
        experienceLevel:"",
        position:"",
        company:""
    })

    const navigate = useNavigate()
    const {companies} = useSelector((store)=>store.company)

    const changeEventHandler = (e) =>
    {
        setInput({...input,[e.target.name]:e.target.value})
    }

    const submitHandler = async(e)=>
    {
        e.preventDefault()

        try
        {
            const res = await axios.post(`${JOB_API_END_POINT}/post`,input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })

            if(res.data.success)
            {
                navigate("/admin/jobs")
            }
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (
    <>
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 pt-24 pb-12">

            <div className="bg-white shadow-md rounded-xl p-8">

                <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                    Post New Job
                </h1>

                <form onSubmit={submitHandler} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={input.title}
                            onChange={changeEventHandler}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>

                        <input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeEventHandler}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    {/* Requirements */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Requirements
                        </label>

                        <input
                            type="text"
                            name="requirements"
                            value={input.requirements}
                            onChange={changeEventHandler}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Salary
                        </label>

                        <input
                            type="text"
                            name="salary"
                            value={input.salary}
                            onChange={changeEventHandler}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={changeEventHandler}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    {/* Job Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Type
                        </label>

                        <input
                            type="text"
                            name="jobType"
                            value={input.jobType}
                            onChange={changeEventHandler}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    {/* Experience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Experience Level
                        </label>

                        <input
                            type="text"
                            name="experienceLevel"
                            value={input.experienceLevel}
                            onChange={changeEventHandler}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    {/* Positions */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Positions
                        </label>

                        <input
                            type="number"
                            name="position"
                            value={input.position}
                            onChange={changeEventHandler}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    {/* Company Select */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Company
                        </label>

                        {
                            companies.length === 0
                            ? (
                                <p className="text-sm text-red-500">
                                    Please register at least one company before posting a job
                                </p>
                            )
                            :
                            (
                                <select
                                    name="company"
                                    onChange={changeEventHandler}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                >

                                    <option value="">Select Company</option>

                                    {
                                        companies.map((company)=>(
                                            <option key={company?._id} value={company?._id}>
                                                {company?.name}
                                            </option>
                                        ))
                                    }

                                </select>
                            )
                        }

                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Post Job
                    </button>

                </form>

            </div>

        </div>
    </>
    )
}

export default PostJob