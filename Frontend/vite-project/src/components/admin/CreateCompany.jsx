import { useNavigate } from "react-router-dom"
import Navbar from "../Navbar"
import { useState } from "react"
import axios from "axios"
import { COMPANY_API_END_POINT } from "../../utils/constant"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "../../../redux/companySlice"

const CreateCompany = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [companyName,setCompanyName] = useState("")

  const RegisterNewCompany = async()=>
  {
        try
        {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{name:companyName},{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })

            if(res.data.success)
            {   
                dispatch(setSingleCompany(res?.data?.company))
                const companyid = res?.data?.company?._id
                navigate(`/admin/companies/${companyid}`)
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

      <div className="max-w-3xl mx-auto px-4 pt-24 pb-10">

        <div className="bg-white shadow-md rounded-xl p-8">

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Your Company Name
            </h1>

            <p className="text-gray-600 text-sm">
              What would you like to give your company name? You can change this later.
            </p>
          </div>


          {/* Input */}
          <div className="mb-8">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>

            <input
              type="text"
              placeholder="Enter company name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e)=>setCompanyName(e.target.value)}
            />

          </div>


          {/* Buttons */}
          <div className="flex justify-end gap-4">

            <button
              onClick={()=>navigate("/admin/companies")}
              className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={RegisterNewCompany}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Continue
            </button>

          </div>

        </div>

      </div>
    </>
  )
}

export default CreateCompany