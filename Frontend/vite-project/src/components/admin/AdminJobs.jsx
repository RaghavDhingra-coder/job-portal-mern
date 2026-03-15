import { useEffect, useState } from "react"
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs"
import Navbar from "../Navbar"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSearchJobByText } from "../../../redux/jobSlice"
import AdminJobsTable from "./AdminJobsTable"

const AdminJobs = () => {
       
    useGetAllAdminJobs()

    const [input,setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setSearchJobByText(input))
    },[input])

    return (
    <>
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">

            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search Job..."
                    className="w-full sm:w-80 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e)=>setInput(e.target.value)}
                />

                {/* Add Job Button */}
                <button
                    onClick={() => navigate("/admin/jobs/create")}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
                >
                    + Add Job
                </button>

            </div>

            {/* Table Section */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <AdminJobsTable />
            </div>

        </div>
    </>
    )
}

export default AdminJobs