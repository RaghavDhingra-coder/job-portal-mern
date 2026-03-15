import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {

  const navigate = useNavigate()

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt

    return Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-6">

      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">

        <span className="text-xs text-gray-400">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </span>

      </div>


      {/* Company + Location + Logo */}
      <div className="flex items-center justify-between mb-4">

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {job?.company?.name}
          </h3>

          <p className="text-sm text-gray-500">
            {job?.location}
          </p>
        </div>

        <img
          src={job?.company?.logo}
          alt="company logo"
          className="w-12 h-12 rounded-lg object-contain"
        />

      </div>


      {/* Job Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {job?.title}
      </h2>


      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {job?.description}
      </p>


      {/* Job Details */}
      <div className="flex flex-wrap gap-3 text-sm mb-4">

        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
          {`${job?.position} positions`}
        </span>

        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full">
          {job?.jobType}
        </span>

        <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full">
          {`${job?.salary} LPA`}
        </span>

      </div>


      {/* Button */}
      <button
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={() => navigate(`/description/${job?._id}`)}
      >
        View Details
      </button>

    </div>
  );
};

export default JobCard;