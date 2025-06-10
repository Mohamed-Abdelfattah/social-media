import React, { useState } from "react";
import { Home, User, Mail, Bell } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ profile }) {
  const { createdAt, dateOfBirth, email, gender, name, photo } = profile || {};

  return (
    <aside className="w-full sm:w-11/12 md:w-64 mt-10 bg-white border rounded-lg border-gray-200 ">
      <div className="relative flex flex-col items-center space-y-2 mb-6">
        {/* Background image behind avatar */}
        <div
          className="w-full h-20 rounded-t-lg bg-cover bg-center mb-6"
          style={{
            backgroundImage: "url('/cover.jpg')",
            // backgroundImage: "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=400&q=80')",
          }}
        ></div>

        {/* Avatar*/}
        <img
          src={photo || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-16 h-16 rounded-full border-4 border-white -mt-12 shadow-md"
        />
        <div className="text-center">
          <h2 className="text-sm font-medium text-[#111827]">{name || "Unnamed"}</h2>
        </div>
      </div>

      {/* navigation links */}
      <nav className=" p-8 text-sm text-gray-600 flex flex-col gap-3 sm:flex-row sm:justify-center  sm:gap-10 md:flex-col md:items-start md:gap-2 ">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center space-x-2 py-2 ${isActive ? "text-[#0C1024]" : "text-[#4B5669] hover:text-[#0C1024]"}  transition-all`
          }
        >
          {({ isActive }) => <Home className="w-4 h-4" color={isActive ? "#0C1024" : "#4B5669"} />}
          <span>Home</span>
        </NavLink>
        <hr className="w-full border-[#ECF0F5]" />

        <NavLink to="/userProfile" className="flex items-center space-x-2 py-2 text-[#0C1024] font-semibold">
          <User className="w-4 h-4" color="#0C1024" />
          <span>Profile</span>
        </NavLink>
        <hr className="w-full border-[#ECF0F5]" />

        <NavLink to="/home" className="flex items-center space-x-2 py-2 hover:text-[#111827] transition">
          <Mail className="w-4 h-4" color="#4B5669" />
          <span>Messages</span>
        </NavLink>
        <hr className="w-full border-[#ECF0F5]" />

        <NavLink to="/home" className="flex items-center space-x-2 py-2 hover:text-[#111827] transition">
          <Bell className="w-4 h-4" color="#4B5669" />
          <span>Notifications</span>
        </NavLink>
      </nav>
    </aside>
  );
}
