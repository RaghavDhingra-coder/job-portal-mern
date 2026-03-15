import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js"


const ApplicationRouter = express.Router()

ApplicationRouter.route("/apply/:id").get(isAuthenticated,applyJob)
ApplicationRouter.route("/get").get(isAuthenticated,getAppliedJobs)
ApplicationRouter.route("/:id/applicants").get(isAuthenticated,getApplicants)
ApplicationRouter.route("/status/:id/update").post(isAuthenticated,updateStatus)


export default ApplicationRouter