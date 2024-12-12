import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../../assets/iba.jpeg";
import { Link } from "react-scroll";
import menu_icon from "../../../../assets/menu-icon.png";
import { Link as RLink } from "react-router-dom";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []);

  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardEndPoint, setDashboardEndPoint] = useState("");

  const sendRequestWithBearerToken = () => {
    const studentToken = localStorage.getItem("studentToken");
    const teacherToken = localStorage.getItem("teacherToken");
    const parentToken = localStorage.getItem("parentToken");
    const adminToken = localStorage.getItem("adminToken");

    let token = null;
    let endpoint = "";

    if (studentToken) {
      token = studentToken;
      endpoint = "/student";
    } else if (teacherToken) {
      token = teacherToken;
      endpoint = "/teacher";
    } else if (parentToken) {
      token = parentToken;
      endpoint = "/parent";
    } else if (adminToken) {
      token = adminToken;
      endpoint = "/admin";
    } else {
      console.log("No valid auth token found in localStorage.");
      return;
    }

    setDashboardEndPoint(endpoint);

    try {
      (async () => {
        let res = await fetch(`http://localhost:4000/Auth${endpoint}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        res = await res.json();
        if (res.success === true) {
          setIsLoggedIn(true);
        }
      })();
    } catch (error) {
      console.log("Error sending Auth request: ", error);
    }
  };

  const redirectToDashboard = useNavigate();

  useEffect(() => {
    sendRequestWithBearerToken();
  }, []);

  return (
    <nav
      className={`w-full text-white px-0 py-3 fixed top-0 left-0 flex items-center justify-between z-10 custom-container ${
        sticky ? "dark-nav" : ""
      }`}
    >
      <div className="w-20 h-20 rounded-full bg-red-500 overflow-hidden">
        <img src={logo} alt="College Logo" />
      </div>
      <ul className={`nav-links ${mobileMenu ? "open" : ""}`}>
        <li className="inline-block my-2 mx-4 text-[16px]">
          <Link to="hero" smooth={true} offset={0} duration={500}>
            Home
          </Link>
        </li>
        <li className="inline-block my-2 mx-4 text-[16px]">
          <Link to="faculty" smooth={true} offset={-260} duration={500}>
            Our Faculty
          </Link>
        </li>
        <li className="inline-block my-2 mx-4 text-[16px]">
          <Link to="about" smooth={true} offset={-250} duration={500}>
            About Us
          </Link>
        </li>
        <li className="inline-block my-2 mx-4 text-[16px]">
          <Link to="testimonials" smooth={true} offset={-260} duration={500}>
            Testimonials
          </Link>
        </li>
        <li className="inline-block my-2 mx-4 text-[16px]">
          <Link className="btn" to="contact" smooth={true} offset={-260} duration={500}>
            Contact Us
          </Link>
        </li>
        <RLink to="/login">
          <li className="btn inline-block my-2 text-[16px]">Sign In</li>
        </RLink>
        <li className="inline-block my-2 mx-4 text-[16px]">
          <Link
            className={`px-6 py-5 rounded-3xl bg-yellow-600 transition-all hover:bg-yellow-500 text-black ${isLoggedIn ? "" : "hidden"}`}
            to=""
            smooth={true}
            offset={-260}
            duration={500}
            onClick={() => {
              redirectToDashboard(`${dashboardEndPoint}`);
            }}
          >
            Dashboard
          </Link>
        </li>
      </ul>
      <img
        src={menu_icon}
        alt="Menu Icon"
        className="menu-icon"
        onClick={toggleMenu}
      />
    </nav>
  );
};

export default Navbar;
