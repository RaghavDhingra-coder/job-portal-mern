
import { useEffect, useState } from "react"
import useGetAllCompanies from "../../hooks/useGetAllCompanies"
import Navbar from "../Navbar"
import CompaniesTable from "./CompaniesTable"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSearchCompanyByText } from "../../../redux/companySlice"

const Companies = () => {

  const navigate = useNavigate()
  useGetAllCompanies()

  const [input,setInput] = useState("")
  const dispatch = useDispatch()

  useEffect(()=>{

        dispatch(setSearchCompanyByText(input))

  },[input])

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search company..."
            className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e)=>setInput(e.target.value)}
          />

          {/* Add Company Button */}
          <button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Company
          </button>

        </div>

        {/* Companies Table */}
        <CompaniesTable />

      </div>
    </>
  )
}

export default Companies