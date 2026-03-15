import Job from "../models/job.model.js";
import Company from "../models/company.model.js";


export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, experienceLevel, location, position, jobType, company } = req.body

        const userId = req.id

        if (!title || !description || !requirements || !salary || !experienceLevel || !location || !position || !jobType || !company) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements,
            salary,
            experienceLevel,
            location,
            position,
            jobType,
            company,
            created_by: userId
        })

        return res.status(201).json({
            message: "New Job created successfully",
            success: true
        })
    }

    catch (err) {
        console.log(err)
    }
}

export const getJobById = async(req,res)=>
{
    try
    {
        const jobId = req.params.id

        const job = await Job.findById(jobId).populate("applications")

        if(!job)
        {
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        return res.status(200).json({
            job,
            success:true
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

export const getAdminJobs = async (req,res)=>
{
    try
    {
        const adminId = req.id
        const jobs = await Job.find({created_by:adminId}).populate("company").sort({createdAt:-1})

        return res.status(200).json({
            jobs,
            success:true
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

export const getAllJobs = async (req, res) => {
  try {

    const keyword = req.query.keyword

    let query = {}

    if (keyword) {
      query = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } }
        ]
      }
    }

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 })

    return res.status(200).json({
      jobs,
      success: true
    })

  } catch (error) {
    console.log(error)
  }
}