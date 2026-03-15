import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AdminJobsTable = ()=>
{

    const {allAdminJobs,searchJobByText} = useSelector((store)=>store.job)

    const [filterJobs,setFilterJobs] = useState(allAdminJobs)

    const navigate = useNavigate()
    console.log(allAdminJobs)
    console.log(filterJobs)

    useEffect(()=>
    {
        
            const filteredJobs = allAdminJobs?.filter((job)=>{

                if(!searchJobByText) return true // if no search text, show all jobs

                return (job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()))
            })

            setFilterJobs(filteredJobs)
        
    },[allAdminJobs,searchJobByText])

   return <> <div className="overflow-x-auto">

      <table className="w-full border-collapse">

        {/* Table Head */}
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">

            <th className="px-5 py-3 text-sm font-semibold">
              Company Name
            </th>

            <th className="px-5 py-3 text-sm font-semibold">
              Role
            </th>

            <th className="px-5 py-3 text-sm font-semibold">
              Date
            </th>

            <th className="px-5 py-3 text-sm font-semibold text-right">
              Edit
            </th>

          </tr>
        </thead>


        {/* Table Body */}
        <tbody>

        {filterJobs?.map((job)=>
        {
            return <tr className="border-b hover:bg-gray-50 transition" key={job?._id}>

            <td className="px-5 py-3 text-gray-800 font-medium">
              {job?.company?.name}
            </td>

            <td className="px-5 py-3 text-gray-700">
              {job?.title}
            </td>

            <td className="px-5 py-3 text-gray-600 text-sm">
              {job?.createdAt.split("T")[0]}
            </td>

            <td className="px-5 py-3 text-right">
              <button className="text-blue-600 font-medium hover:underline" onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}>
                Applicants
              </button>
            </td>

          </tr>
        })}

          {/* Sample Row */}
         

        </tbody>

      </table>

    </div>
   
   
   </>
}

export default AdminJobsTable