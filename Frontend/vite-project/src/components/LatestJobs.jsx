import { useSelector } from "react-redux";
import JobCard from "./JobCard";


const LatestJobs = () => {

  // const randomjobs = [1,2,3,4,5,6,7,8,9];

  const {allJobs} = useSelector((store)=>store.job)
  console.log("abc",allJobs)

  return (
    <section className="bg-gray-50 py-16 px-4">
      
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Latest and Top Job Openings
        </h1>

        {/* Jobs Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          { allJobs?.length <=0 ? <span>No Job Available</span>:  allJobs?.slice(0,6).map((job,index)=>(
            <JobCard key={job._id} job={job}/>
          ))}

        </div>

      </div>

    </section>
  );
};

export default LatestJobs;