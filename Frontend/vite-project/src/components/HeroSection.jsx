import { useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchQuery } from "../../redux/jobSlice"
import { useNavigate } from "react-router-dom"

const HeroSection = ()=>
{
    const [query,setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = ()=>
    {
      dispatch(setSearchQuery(query))
      navigate("/browse")
    }

    return <>
    
        <section className="bg-gray-50 py-16 md:py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">

        {/* Tagline */}
        <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
          #1 Job Portal for Students & Recruiters
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-6 leading-tight">
          Find Your Dream Job with{" "}
          <span className="text-blue-600">TalentBridge</span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 mt-4 text-sm sm:text-lg max-w-2xl mx-auto">
          Discover thousands of job opportunities from top companies.
          Search, apply, and build your career with ease.
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex items-center bg-white shadow-md rounded-full overflow-hidden max-w-xl mx-auto">

          <input
            type="text"
            placeholder="Search jobs, companies..."
            className="flex-1 px-4 sm:px-6 py-3 outline-none text-gray-700 text-sm sm:text-base"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
          />

          <button className="bg-blue-600 text-white px-5 sm:px-8 py-3 font-semibold hover:bg-blue-700 transition text-sm sm:text-base" onClick={searchJobHandler}>
            Search
          </button>

        </div>

      </div>
    </section>
    
    </>
}
export default HeroSection