import { useNavigate } from "react-router-dom"
import AppliedJobsTable from "./AppliedJobsTable"
import Navbar from "./Navbar"
import { useSelector } from "react-redux"
import useGetAppliedJobs from "../hooks/useGetAppliedJobs"

const Profile = () => {
  useGetAppliedJobs()
  const isResume = true
  const navigate = useNavigate()


  const {user} = useSelector(store=>store.auth)

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 pt-24 pb-12 space-y-10">

        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-xl p-6">

          {/* Top Section */}
          <div className="flex items-center justify-between mb-6">

            <div className="flex items-center gap-4">

              <img
                src={user?.profile?.profilePhoto}
                alt="profile"
                className="w-16 h-16 rounded-full ring-2 ring-blue-500"
              />

              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {user?.fullName}
                </h1>

                <p className="text-sm text-gray-600 max-w-md">
                  {user?.profile?.bio}
                </p>
              </div>

            </div>

            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={()=>navigate("/editprofile")}>
              Edit
            </button>

          </div>

          {/* Contact Info */}
          <div className="space-y-2 mb-6 text-gray-700">

            <p>
              <span className="font-semibold">Email:</span> {user?.email}
            </p>

            <p>
              <span className="font-semibold">Contact:</span> {user?.phoneNumber}
            </p>

          </div>

          {/* Skills */}
          <div className="mb-6">

            <h2 className="text-lg font-semibold mb-3">Skills</h2>

            <div className="flex flex-wrap gap-2">

              {
                user?.profile?.skills?.length !== 0
                ? user?.profile?.skills?.map((item,index)=>(
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))
                : <p className="text-gray-500">No skills added</p>
              }

            </div>

          </div>

          {/* Resume */}
          <div>

            <h2 className="text-lg font-semibold mb-2">Resume</h2>

            {
              isResume
              ? (
                <a
                  href={user?.profile?.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  {user?.profile?.resumeOriginalName}
                </a>
              )
              : <p className="text-gray-500">NA</p>
            }

          </div>

        </div>


        {/* Applied Jobs Section */}
        <div className="bg-white shadow-md rounded-xl p-6">

          <h1 className="text-xl font-semibold text-gray-900 mb-6">
            Applied Jobs
          </h1>

          <AppliedJobsTable />

        </div>

      </div>
    </>
  )
}

export default Profile