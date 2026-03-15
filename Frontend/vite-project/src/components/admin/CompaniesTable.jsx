import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { setSearchCompanyByText } from "../../../redux/companySlice"
import { useNavigate } from "react-router-dom"

const CompaniesTable = () => {

    const navigate = useNavigate()

    const {companies,searchCompanyByText} = useSelector((store)=>store.company)

    const [filterCompany,setFilterCompany] = useState(companies)

    useEffect(()=>
    {
        const filteredCompany = companies?.length >=0 && companies?.filter((company)=>{
            if(!searchCompanyByText)
            {
                return true
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())

        })

        setFilterCompany(filteredCompany)
    },[companies,searchCompanyByText])

    

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          {/* Table Head */}
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">

            <tr>
              <th className="px-6 py-4">Logo</th>
              <th className="px-6 py-4">Company Name</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>

          </thead>

          {/* Table Body */}
          <tbody className="divide-y">

            {filterCompany?.length <= 0 ? <span>You have not Register any company</span>: filterCompany?.map((company,index)=>(
              <tr key={company?._id} className="hover:bg-gray-50 transition">

                {/* Logo */}
                <td className="px-6 py-4">
                  <img
                    src={company?.logo}
                    alt="logo"
                    className="w-10 h-10 rounded object-contain"
                  />
                </td>

                {/* Company Name */}
                <td className="px-6 py-4 font-medium text-gray-900">
                  {company.name}
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-gray-600">
                  {company.createdAt.split("T")[0]}
                </td>

                {/* Edit Button */}
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 font-medium" onClick={()=>navigate(`/admin/companies/${company._id}`)}>
                    Edit
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default CompaniesTable