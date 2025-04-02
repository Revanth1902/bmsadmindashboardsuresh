import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaFilm,
  FaTheaterMasks,
  FaUsers,
  FaCreditCard,
  FaFileAlt,
} from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

// Custom CSS for hover effects and smooth transitions
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column sidebar bg-dark text-white p-4 position-fixed">
      <div className="mb-4">
        <div className="sidebar-title text-center fs-4 fw-bold">
          Admin Panel
        </div>
      </div>

      <div>
        <NavLink
          to="/searchbyid"
          className="sidebar-link d-flex align-items-center mb-3"
          activeClassName="active"
        >
          <FaSearch className="sidebar-icon me-3" />
          Search by ID
        </NavLink>
        <NavLink
          to="/users"
          className="sidebar-link d-flex align-items-center mb-3"
          activeClassName="active"
        >
          <FaUsers className="sidebar-icon me-3" />
          Users
        </NavLink>

        <NavLink
          to="/theatres"
          className="sidebar-link d-flex align-items-center mb-3"
          activeClassName="active"
        >
          <FaTheaterMasks className="sidebar-icon me-3" />
          Theatres
        </NavLink>

        <NavLink
          to="/movies"
          className="sidebar-link d-flex align-items-center mb-3"
          activeClassName="active"
        >
          <FaFilm className="sidebar-icon me-3" />
          Movies
        </NavLink>

        <NavLink
          to="/bookings"
          className="sidebar-link d-flex align-items-center mb-3"
          activeClassName="active"
        >
          <FaHome className="sidebar-icon me-3" />
          Bookings
        </NavLink>

        <NavLink
          to="/payments"
          className="sidebar-link d-flex align-items-center mb-3"
          activeClassName="active"
        >
          <FaCreditCard className="sidebar-icon me-3" />
          Payments
        </NavLink>

        <NavLink
          to="/reports"
          className="sidebar-link d-flex align-items-center mb-3"
          activeClassName="active"
        >
          <FaFileAlt className="sidebar-icon me-3" />
          Reports
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
