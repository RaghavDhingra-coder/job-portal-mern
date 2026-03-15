import { useDispatch, useSelector } from "react-redux"
import JobCard from "./JobCard"
import Navbar from "./Navbar"
import { useEffect } from "react"
import { setSearchQuery } from "../../redux/jobSlice"

function Browse() {

    const {allJobs} = useSelector((store)=>store.job)

    const dispatch = useDispatch()

    useEffect(()=>
    {
        // cleanup function
        return ()=>
        {
            dispatch(setSearchQuery(""))
        }
    },[])

    return (
        <>
        
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 pt-24 pb-10">

            {/* Heading */}
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
                Search Results <span className="text-blue-600">({allJobs.length})</span>
            </h1>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
               { allJobs?.length <=0 ? <span>No Job Available</span>:  allJobs?.map((job,index)=>(
            <JobCard key={job._id} job={job}/>
          ))}

            </div>

        </div>

        </>
    )
}

export default Browse


// Browse component mounts
// ↓
// useEffect runs
// ↓
// but inside it only a cleanup function is returned
// ↓
// so NOTHING runs now



// Now the important part
// 4️⃣ User leaves Browse page

// Example:

// /browse → /home

// Now Browse component unmounts.

// React runs the cleanup function:

// return () => {
//     dispatch(setSearchQuery(""))
// }

// So now:

// searchQuery = ""
// 5️⃣ Redux state updates

// Redux updates:

// searchQuery = ""

// If you have this hook somewhere:

// useGetAllJobs()

// with dependency:

// [searchQuery]

// then:

// searchQuery changed
// ↓
// useEffect runs again
// ↓
// API call
// ↓
// fetch all jobs