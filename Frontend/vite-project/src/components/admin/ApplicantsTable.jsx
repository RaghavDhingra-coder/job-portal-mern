import axios from "axios"
import { useSelector } from "react-redux"
import { APPLICATION_API_END_POINT } from "../../utils/constant"

const ApplicantsTable = () => {

    const { applicants } = useSelector((store) => store.application)

    const shortListingStatus = ["pending", "Accepted", "Rejected"]

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/status/${id}/update`,
                { status },
                { withCredentials: true }
            )

            if (res.data.success) {
                console.log("Status updated successfully")
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Applicants {applicants?.applications?.length}
            </h1>

            <p className="text-gray-600 mb-6">
                List of applied users for this job
            </p>

            <div className="overflow-x-auto">

                <table className="w-full text-sm text-left border-collapse">

                    {/* Table Head */}
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-6 py-3 font-semibold">Full Name</th>
                            <th className="px-6 py-3 font-semibold">Email</th>
                            <th className="px-6 py-3 font-semibold">Contact</th>
                            <th className="px-6 py-3 font-semibold">Resume</th>
                            <th className="px-6 py-3 font-semibold">Date</th>
                            <th className="px-6 py-3 font-semibold text-right">Action</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>

                        {applicants?.applications?.map((item) => (

                            <tr
                                className="border-b hover:bg-gray-50 transition"
                                key={item?._id}
                            >

                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {item?.applicant?.fullName}
                                </td>

                                <td className="px-6 py-4 text-gray-700">
                                    {item?.applicant?.email}
                                </td>

                                <td className="px-6 py-4 text-gray-700">
                                    {item?.applicant?.phoneNumber}
                                </td>

                                <td className="px-6 py-4">

                                    {item?.applicant?.profile?.resume ? (
                                        <a
                                            className="text-blue-600 hover:underline"
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : (
                                        <span>NA</span>
                                    )}

                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {item?.createdAt?.split("T")[0]}
                                </td>

                                <td className="px-6 py-4 text-right">

                                    <select
                                        className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                      
                                        onChange={(e) =>
                                            statusHandler(e.target.value, item._id)
                                        }
                                    >
                                        {shortListingStatus.map((status, index) => (
                                            <option key={index} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default ApplicantsTable