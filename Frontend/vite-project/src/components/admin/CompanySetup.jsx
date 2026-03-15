import { useEffect, useState } from "react"
import Navbar from "../Navbar"
import { COMPANY_API_END_POINT } from "../../utils/constant"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"
import useGetCompanyById from "../../hooks/useGetCompanyById"

const CompanySetup = () => {   
    const params = useParams()
    useGetCompanyById(params.id)
    const navigate = useNavigate()
    const {singleCompany} = useSelector((store)=>store.company)

    const [input,setInput] = useState({
        name:"",
        description:"",
        website:"",
        location:"",
        file:null
    })

    
    useEffect(()=>
    {
        setInput({
            name:singleCompany?.name || "",
            description:singleCompany?.description || "",
            website:singleCompany?.website || "",
            location: singleCompany?.location || "",
            file:null
        })
    },[singleCompany])


    const changeEventHandler = (e) =>
    {
        setInput({...input,[e.target.name]:e.target.value})
    }

    const changeFileHandler = (e) =>
    {
        const file = e.target.files?.[0]
        setInput({...input,file})
    }

    const submitHandler = async(e) =>
    {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append("name",input.name)
        formData.append("description",input.description)
        formData.append("website",input.website)
        formData.append("location",input.location)

        if(input.file)
        {
            formData.append("file",input.file)
        }

        try
        {
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formData,{
               
                 withCredentials:true
            })

            if(res.data.success)
            {   console.log("successfull")
                navigate("/admin/companies")
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

        <div className="max-w-3xl mx-auto px-4 pt-24 pb-12">

            <div className="bg-white shadow-md rounded-xl p-8">

                <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                    Update Company
                </h1>

                <form onSubmit={submitHandler} className="space-y-5">

                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changeEventHandler}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeEventHandler}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Website */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Website
                        </label>
                        <input
                            type="text"
                            name="website"
                            value={input.website}
                            onChange={changeEventHandler}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={changeEventHandler}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Logo Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Logo
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={changeFileHandler}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white file:rounded-md hover:file:bg-blue-700"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Update Company
                    </button>

                </form>

            </div>

        </div>
    </>
    )
}

export default CompanySetup