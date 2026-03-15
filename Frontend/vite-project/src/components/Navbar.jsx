import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";

const Navbar = () => {

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm border-b fixed top-0 left-0 z-50">

        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              <span className="text-blue-600">Talent</span>
              <span className="text-gray-900">Bridge</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-gray-700 font-semibold text-[17px]">

            {/* Student Navigation */}
            {user?.role === "student" && (
              <>
                <Link to="/" className="hover:text-blue-600 transition">
                  Home
                </Link>

                <Link to="/jobs" className="hover:text-blue-600 transition">
                  Jobs
                </Link>

                <Link to="/browse" className="hover:text-blue-600 transition">
                  Browse
                </Link>
              </>
            )}

            {/* Recruiter Navigation */}
            {user?.role === "recruiter" && (
              <>
                <Link to="/admin/jobs" className="hover:text-blue-600 transition">
                  Jobs
                </Link>

                <Link to="/admin/companies" className="hover:text-blue-600 transition">
                  Companies
                </Link>
              </>
            )}

          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-5 relative">

            {user === null ? (
              <>
                <Link to="/login">
                  <button className="px-6 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100">
                    Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                    Signup
                  </button>
                </Link>
              </>
            ) : (
              <>
                {/* Avatar */}
                <img
                  src={user?.profile?.profilePhoto}
                  alt="profile"
                  onClick={() => setOpen(!open)}
                  className="w-11 h-11 rounded-full cursor-pointer ring-2 ring-blue-500"
                />

                {/* Dropdown */}
                {open && (
                  <div className="absolute right-0 top-16 w-48 bg-white rounded-xl shadow-lg border py-2">

                    {/* Only student can see profile */}
                    {user?.role === "student" && (
                      <Link to="/profile">
                        <button className="w-full text-left px-5 py-2 hover:bg-gray-100">
                          View Profile
                        </button>
                      </Link>
                    )}

                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-5 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>

                  </div>
                )}

              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">

            {/* Student Mobile Nav */}
            {user?.role === "student" && (
              <>
                <Link to="/" className="block hover:text-blue-600">
                  Home
                </Link>

                <Link to="/jobs" className="block hover:text-blue-600">
                  Jobs
                </Link>

                <Link to="/browse" className="block hover:text-blue-600">
                  Browse
                </Link>
              </>
            )}

            {/* Recruiter Mobile Nav */}
            {user?.role === "recruiter" && (
              <>
                <Link to="/admin/jobs" className="block hover:text-blue-600">
                  Jobs
                </Link>

                <Link to="/admin/companies" className="block hover:text-blue-600">
                  Companies
                </Link>
              </>
            )}

            {user ? (
              <button
                onClick={logoutHandler}
                className="text-red-500 font-medium"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-4">
                <Link to="/login">
                  <button className="px-4 py-2 border rounded-lg">
                    Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Signup
                  </button>
                </Link>
              </div>
            )}

          </div>
        )}

      </header>

      {/* Spacer so page content is not hidden */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;