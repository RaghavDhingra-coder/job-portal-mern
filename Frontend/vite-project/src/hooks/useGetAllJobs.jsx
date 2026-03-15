import axios from "axios"
import { useEffect } from "react"
import { JOB_API_END_POINT } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { setAllJobs } from "../../redux/jobSlice"

const useGetAllJobs = ()=>
{const dispatch = useDispatch()

    const {searchQuery} = useSelector(store=>store.job)

    useEffect(()=>
    {
        

        const fetchAllJobs = async()=>
        {
            try
            {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`,{withCredentials:true})

                if(res.data.success)
                {
                    dispatch(setAllJobs(res.data.jobs))
                }
            }
            catch(err)
            {
                console.log(err)
            }
        }
        fetchAllJobs()
    },[searchQuery])
}

export default useGetAllJobs


// if we do not use useEffect here
// Home render
// ↓
// useGetAllJobs runs
// ↓
// API call
// ↓
// Redux dispatch
// ↓
// Redux state changes
// ↓
// Component re-renders
// ↓
// useGetAllJobs runs again
// ↓
// API call again
// ↓
// Infinite loop




// What useEffect([]) does
// useEffect(() => {
//    fetchAllJobs()
// }, [])

// [] means:

// Run only once when component mounts

// Flow becomes:

// Home mount
// ↓
// useEffect runs once
// ↓
// API call
// ↓
// Redux update
// ↓
// Component re-render
// ↓
// useEffect does NOT run again

// So it prevents infinite API calls.