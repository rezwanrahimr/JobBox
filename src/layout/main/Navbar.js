import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import auth from "../../firebase/firebase.init";
import { logOut } from "../../features/auth/authSlice";

const Navbar = () => {
  const { pathname } = useLocation();
  const { email, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(logOut())
    })
  }
  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${pathname === "/" ? null : "bg-white"
        }`}
    >
      <ul className='max-w-7xl mx-auto flex gap-3 h-full items-center'>
        <li className='flex-auto font-semibold text-2xl'>
          <Link to='/'>JobBox</Link>
        </li>
        <li>
          <Link className='hover:text-primary' to='/jobs'>
            Jobs
          </Link>
        </li>
        {
          email && role && <li>
            <Link className='hover:text-primary' to='/dashboard'>
              Dashboard
            </Link>
          </li>
        }
        {
          email && !role && <li>
            <Link className='bg-primary text-white  px-2 py-1.5 rounded-full hover:border-white hover:text-white hover:bg-primary hover:px-4 transition-all' to='/register'>
              Get Started
            </Link>
          </li>
        }
        <li>
          {
            email ? <button
              className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
              onClick={handleLogOut}
            >
              Logout
            </button> : <Link
              className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
              to='/login'
            >
              Login
            </Link>
          }
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
