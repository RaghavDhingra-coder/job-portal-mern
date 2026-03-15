import { useEffect } from "react"
import useGetAllJobs from "../hooks/useGetAllJobs"
import Footer from "./Footer"
import HeroSection from "./HeroSection"
import LatestJobs from "./LatestJobs"
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Home = ()=>
{   useGetAllJobs()
    const navigate = useNavigate()
    const {user} = useSelector((store)=>store.auth)

    useEffect(()=>
    {
        if(user?.role === 'recruiter')
        {
            navigate("/admin/companies")
        }
    },[])
    return <>
    
    <Navbar></Navbar>
    <HeroSection></HeroSection>
    <LatestJobs></LatestJobs>
    <Footer></Footer>
    </>
}

export default Home