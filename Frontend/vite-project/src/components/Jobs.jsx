import { useSelector } from "react-redux"
import FilterCards from "./FilterCards"
import Footer from "./Footer"
import JobCard from "./JobCard"
import Navbar from "./Navbar"
import { useState } from "react"
import useGetAllJobs from "../hooks/useGetAllJobs"

const Jobs = () => {
  useGetAllJobs()
  const { allJobs } = useSelector((store)=>store.job)


const [locations,setLocations] = useState([])
const [industries,setIndustries] = useState([])
const [salaries,setSalaries] = useState([])

const filteredJobs = allJobs.filter((job)=>{

   if(locations.length > 0 && !locations.includes(job.location)){
      return false
   }

   if(industries.length > 0 && !industries.includes(job.title)){
      return false
   }

   if(salaries.length > 0){
      const jobSalary = job.salary

      if(salaries.includes("0-3 LPA") && jobSalary <=3) return true
      if(salaries.includes("4-6 LPA") && jobSalary >=4 && jobSalary <=6) return true
      if(salaries.includes("7-12 LPA") && jobSalary >=7 && jobSalary <=12) return true
      if(salaries.includes("13-20 LPA") && jobSalary >=13 && jobSalary <=20) return true

      return false
   }

   return true
})

  return (
    <>
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-10">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <FilterCards locations={locations}
  setLocations={setLocations}
  industries={industries}
  setIndustries={setIndustries}
  salaries={salaries}
  setSalaries={setSalaries}/>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
            {allJobs?.length === 0 ? (
              <span>Jobs Not Found</span>
            ) : (
              filteredJobs?.map((job)=>(
                <JobCard key={job._id} job={job}/>
              ))
            )}
          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default Jobs