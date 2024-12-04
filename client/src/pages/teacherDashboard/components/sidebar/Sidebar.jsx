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

import { LuFileSpreadsheet } from "react-icons/lu";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { GrResources } from "react-icons/gr";


import { SiGooglemeet } from "react-icons/si";







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


  // switch active status to side bar tabs
  const [actibveTab,setActiveTab] = useState("overview");

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
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
              <Link to="/teacher"
              onClick={() => setActiveTab("overview")}
              className={`${actibveTab == "overview" ? 'menu-link active' : 'menu-link '}`}>
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Overview</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/teacher/classes"
              onClick={() => setActiveTab("classes")}
              className={`${actibveTab == "classes" ? 'menu-link active' : 'menu-link '}`}>
                <span className="menu-link-icon">
                <SiGoogleclassroom size={20} />

                </span>
                <span className="menu-link-text">Classes</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/teacher/attendence"
               onClick={() => setActiveTab("attendence")}
               className={`${actibveTab == "attendence" ? 'menu-link active' : 'menu-link '}`}>
                <span className="menu-link-icon">
                <LuFileSpreadsheet size={20} />
                </span>
                <span className="menu-link-text">Attendence</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/teacher/assignments"
              onClick={() => setActiveTab("assignments")}
              className={`${actibveTab == "assignments" ? 'menu-link active' : 'menu-link '}`}>
                <span className="menu-link-icon">
                  <MdAssignmentTurnedIn size={20} />
                </span>
                <span className="menu-link-text">Assignments</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/teacher/resources"
              onClick={() => setActiveTab("resources")}
              className={`${actibveTab == "resources" ? 'menu-link active' : 'menu-link '}`}>
                <span className="menu-link-icon">
                  <GrResources size={20} />
                </span>
                <span className="menu-link-text">resources</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/teacher/meetings"
              onClick={() => setActiveTab("meetings")}
              className={`${actibveTab == "meetings" ? 'menu-link active' : 'menu-link '}`}>
                <span className="menu-link-icon">
                <SiGooglemeet size={20} />
                </span>
                <span className="menu-link-text">Parent's Meetings</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/teacher/settings"
              onClick={() => setActiveTab("settings")}
              className={`${actibveTab == "settings" ? 'menu-link active' : 'menu-link '}`}>
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Settings</span>
              </Link>
            </li>
            <li className="menu-item">
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
