import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { GrUserWorker } from "react-icons/gr";
import { FaDollarSign } from "react-icons/fa";


import {useNavigate} from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (message="something went wrong") => toast.error(message);


import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  let navigate = useNavigate();
  const logout = () => {
    let confirmation = confirm("do you want to logout?")
    if(confirmation){
    try {
      (async ()=>{
        let res = await fetch("http://localhost:4000/admin/logout",{
          method:"POST",
          headers:{
            "content-type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("adminToken")}`
          }
        });
        res = await res.json()
        if(res.statusCode == 200){
          localStorage.removeItem("adminToken")
          navigate("/")
        }
      })()
    } catch (error) {
      notify(error?.message || "something went wrong")
    }
  }
  } 

  // switch active status to side bar tabs
  const [actibveTab,setActiveTab] = useState("overview");


  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
       <ToastContainer />
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
          <span className="sidebar-brand-text">IBA CC Dadu</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/admin"
              onClick={() => setActiveTab("overview")}
              className={`${actibveTab == "overview" ? 'menu-link active' : 'menu-link '}`}
              >
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Overview</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/teachers"
               onClick={() => setActiveTab("teachers")}
               className={`${actibveTab == "teachers" ? 'menu-link active' : 'menu-link '}`}
              >
                <span className="menu-link-icon">
                  <GiTeacher size={20} />
                </span>
                <span className="menu-link-text">All Teachers</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/classes"
              onClick={() => setActiveTab("classes")}
              className={`${actibveTab == "classes" ? 'menu-link active' : 'menu-link '}`}
              >
                <span className="menu-link-icon">
                    <SiGoogleclassroom size={20} />
                </span>
                <span className="menu-link-text">All classes</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/students"
              onClick={() => setActiveTab("students")}
              className={`${actibveTab == "students" ? 'menu-link active' : 'menu-link '}`}
              >
                <span className="menu-link-icon">
                    <PiStudentFill size={20} />
                </span>
                <span className="menu-link-text">All students</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/NonAcademicStaff" 
              onClick={() => setActiveTab("staff")}
              className={`${actibveTab == "staff" ? 'menu-link active' : 'menu-link '}`}>
                <span className="menu-link-icon">
                <GrUserWorker size={18} />
                </span>
                <span className="menu-link-text">Non-Academic Staff</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/Fee"
              onClick={() => setActiveTab("fee")}
              className={`${actibveTab == "fee" ? 'menu-link active' : 'menu-link '}`}
              >
                <span className="menu-link-icon">
                <FaDollarSign size={20} />
                </span>
                <span className="menu-link-text">Tution Fee</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/admin/settings"
              nClick={() => setActiveTab("settings")}
              className={`${actibveTab == "settings" ? 'menu-link active' : 'menu-link '}`}
              >
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Settings</span>
              </Link>
            </li>
            <li className="menu-item" onClick={logout}>
              <Link to="" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
