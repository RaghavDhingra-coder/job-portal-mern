import { useEffect } from "react"
import Navbar from "../Navbar"
import axios from "axios"
import { APPLICATION_API_END_POINT } from "../../utils/constant"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setAllApplicants } from "../../../redux/ApplicationSlice"
import ApplicantsTable from "./ApplicantsTable"

const Applicants = () => {

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {

        const fetchApplicants = async () => {
            try {

                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
                    { withCredentials: true }
                )

                if (res.data.success) {
                    console.log(res.data)
                    dispatch(setAllApplicants(res.data.job))
                }

            } catch (err) {
                console.log(err)
            }
        }

        fetchApplicants()

    }, [])

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">

                <div className="bg-white shadow-md rounded-xl p-6">

                    <ApplicantsTable />

                </div>

            </div>
        </>
    )
}

export default Applicants