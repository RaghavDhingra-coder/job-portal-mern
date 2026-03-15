import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../../redux/authSlice";

const Login = () => {

    const dispatch = useDispatch()
    const {loading,user} = useSelector((store)=>store.auth)

    const [err, setError] = useState("")
    const [input, setInput] = useState({

        email: "",
        password: "",
        role: "",
    })

    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate("/")
            }
        }
        catch (err) {
            console.log(err)
            setError(err.response?.data?.message || "Something went wrong")
        }
        finally{
            dispatch(setLoading(false))
        }

    }

    useEffect(()=>
    {
        if(user)
        {
            navigate("/")
        }
    },)

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-12">

                <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md border p-8">

                    {/* Heading */}
                    <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
                        Login
                    </h2>

                    {err && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-md text-center mb-4">
                            {err}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={submitHandler}>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role
                            </label>

                            <div className="flex gap-8">
                                <label className="flex items-center gap-2 text-gray-700">
                                    <input type="radio" name="role" value="student" onChange={changeEventHandler} className="accent-blue-600" />
                                    Student
                                </label>

                                <label className="flex items-center gap-2 text-gray-700">
                                    <input type="radio" name="role" value="recruiter" onChange={changeEventHandler} className="accent-blue-600" />
                                    Recruiter
                                </label>
                            </div>
                        </div>

                        {/* Login Button */}


                        {
                            loading?<button
                            type="submit"
                            className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        >
                            Please Wait
                        </button>:<button
                            type="submit"
                            className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                        }

                    </form>

                    {/* Signup Link */}
                    <p className="text-sm text-gray-600 text-center mt-6">
                        New user?{" "}
                        <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                            <Link to="/signup">Signup</Link>
                        </span>
                    </p>

                </div>

            </div>
        </>
    );
};

export default Login;