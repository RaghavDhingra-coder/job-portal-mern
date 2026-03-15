import { useSelector } from "react-redux"

const AppliedJobsTable = () => {

  const { allAppliedJobs } = useSelector((store) => store.job)

  const getStatusStyle = (status) => {
    if (status === "accepted") {
      return "bg-green-100 text-green-700"
    }

    if (status === "rejected") {
      return "bg-red-100 text-red-700"
    }

    return "bg-yellow-100 text-yellow-700"
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl">

      <table className="w-full border-collapse">

        {/* Table Head */}
        <thead className="bg-gray-100">
          <tr className="text-gray-700 text-left">
            <th className="px-5 py-3 text-sm font-semibold">Date</th>
            <th className="px-5 py-3 text-sm font-semibold">Job Role</th>
            <th className="px-5 py-3 text-sm font-semibold">Company</th>
            <th className="px-5 py-3 text-sm font-semibold">Status</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>

          {allAppliedJobs?.length <= 0 ? (

            <tr>
              <td
                colSpan="4"
                className="text-center py-6 text-gray-500 text-sm"
              >
                You have not applied to any job yet
              </td>
            </tr>

          ) : (

            allAppliedJobs.map((appliedJob) => (

              <tr
                key={appliedJob?._id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="px-5 py-3 text-sm text-gray-600">
                  {appliedJob?.createdAt?.split("T")[0]}
                </td>

                <td className="px-5 py-3 text-sm text-gray-900 font-medium">
                  {appliedJob?.job?.title}
                </td>

                <td className="px-5 py-3 text-sm text-gray-700">
                  {appliedJob?.job?.company?.name}
                </td>

                <td className="px-5 py-3">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(appliedJob?.status)}`}
                  >
                    {appliedJob?.status}
                  </span>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  )
}

export default AppliedJobsTable