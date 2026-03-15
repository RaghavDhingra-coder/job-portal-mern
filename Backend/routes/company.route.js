import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js"
import { singleUpload } from "../middlewares/multer.js"

const CompanyRouter = express.Router()

CompanyRouter.route("/register").post(isAuthenticated,registerCompany)
CompanyRouter.route("/get").get(isAuthenticated,getCompany)
CompanyRouter.route("/get/:id").get(isAuthenticated,getCompanyById)
CompanyRouter.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany)

export default CompanyRouter