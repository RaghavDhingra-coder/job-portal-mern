import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import axios from "axios"
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../utils/constant"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setSingleJob } from "../../redux/jobSlice"

const JobDescription = () => {

  
  const params = useParams()
  const jobId = params.id
  const {user} = useSelector((store)=>store.auth)
  const {singleJob} = useSelector((store)=>store.job)

  const isInitiallyApplied = singleJob?.applications?.some(application=>application?.applicant === user?._id)

  // useState() runs only once on initial render.
  const [isApplied,setIsApplied] = useState(isInitiallyApplied)

    useEffect(()=>{
    setIsApplied(isInitiallyApplied)
  },[isInitiallyApplied])

  const dispatch = useDispatch()
  const applyJobHandler = async ()=>
  {
      try
      {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true})

        if(res.data.success)
        {
          setIsApplied(true)
        }

      }
      catch(err)
      {
        console.log(err)
      }
  }

  useEffect(()=>
  {
    const fetchSingleJob = async ()=>
    {
        try
        {
          const res = await axios(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true})

          if(res.data.success)
          {
             dispatch(setSingleJob(res.data.job))
          }

          
        }
        catch(err)
        {
          console.log(err)
        }
    }

    fetchSingleJob()
  },[jobId,dispatch])

  return (
    <>
    <Navbar></Navbar>
    <div className="max-w-5xl mx-auto px-4 pt-24 pb-12">

      {/* Top Card */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">
              {singleJob?.title}
            </h1>

            {/* Job Tags */}
            <div className="flex flex-wrap gap-3">

              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                {singleJob?.position}
              </span>

              <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                {singleJob?.jobType}
              </span>

              <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                {singleJob?.location}
              </span>

            </div>
          </div>

          {/* Apply Button */}
          <button
            
            onClick={isApplied ? null : applyJobHandler}
            className={`px-6 py-2 rounded-lg text-white font-medium transition
              ${isApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </button>

        </div>

      </div>


      {/* Job Description Section */}
      <div className="bg-white shadow-md rounded-xl p-6">

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Job Description
        </h2>

        <div className="space-y-3 text-gray-700">

          <p>
            <span className="font-semibold">Role:</span> {singleJob?.title}
          </p>

          <p>
            <span className="font-semibold">Location:</span> {singleJob?.location}
          </p>

          <p>
            <span className="font-semibold">Description:</span> {singleJob?.description}
          </p>

          <p>
            <span className="font-semibold">Experience:</span> {`${singleJob?.experienceLevel} Year`}
          </p>

          <p>
            <span className="font-semibold">Salary:</span> {`${singleJob?.salary} LPA`}
          </p>

          <p>
            <span className="font-semibold">Total Applicants:</span> {singleJob?.applications?.length}
          </p>

          <p>
            <span className="font-semibold">Posted Date:</span> {singleJob?.createdAt?.split("T")[0]}

          </p>

        </div>

      </div>

    </div>
    </>
  )
}

export default JobDescription