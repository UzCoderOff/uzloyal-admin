import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Grid,
  Users,
  Newspaper,
  Briefcase,
  Settings,
  Layers,
} from "lucide-react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation(); // Get the current path

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const isActive = (path) => {
    return location.pathname === path ? "bg-blue-600" : "";
  };

  return (
    <div
      className={`h-screen bg-[#0d1b2a] ${
        isExpanded ? "w-64" : "w-20"
      } transition-width duration-300 ease-in-out p-4 relative`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-5 right-[-12px] bg-blue-600 text-white p-1 rounded-full focus:outline-none"
      >
        {isExpanded ? "<" : ">"}
      </button>
      <div className="text-center mb-10">
        <h1 className={`text-white text-xl ${!isExpanded && "hidden"}`}>
          UzLoyalAdmin
        </h1>
      </div>
      <ul className="space-y-6">
        <li className={`${isActive("/")} rounded-lg`}>
          <Link
            to="/"
            className="flex items-center text-white hover:text-blue-400 transition-all p-2"
          >
            <Grid className="mr-4" />
            {isExpanded && <span>Categories</span>}
          </Link>
        </li>
        <li className={`${isActive("/faqs")} rounded-lg`}>
          <Link
            to="/faqs"
            className="flex items-center text-white hover:text-blue-400 transition-all p-2"
          >
            <Users className="mr-4" />
            {isExpanded && <span>Faqs</span>}
          </Link>
        </li>
        <li className={`${isActive("/news")} rounded-lg`}>
          <Link
            to="/news"
            className="flex items-center text-white hover:text-blue-400 transition-all p-2"
          >
            <Newspaper className="mr-4" />
            {isExpanded && <span>News</span>}
          </Link>
        </li>
        <li className={`${isActive("/blogs")} rounded-lg`}>
          <Link
            to="/blogs"
            className="flex items-center text-white hover:text-blue-400 transition-all p-2"
          >
            <Briefcase className="mr-4" />
            {isExpanded && <span>Blogs</span>}
          </Link>
        </li>
        <li className={`${isActive("/services")} rounded-lg`}>
          <Link
            to="/services"
            className="flex items-center text-white hover:text-blue-400 transition-all p-2"
          >
            <Settings className="mr-4" />
            {isExpanded && <span>Services</span>}
          </Link>
        </li>
        <li className={`${isActive("/sources")} rounded-lg`}>
          <Link
            to="/sources"
            className="flex items-center text-white hover:text-blue-400 transition-all p-2"
          >
            <Layers className="mr-4" />
            {isExpanded && <span>Sources</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
