import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, text, status }) => {
  console.log(user, text, status);

  return (
    <nav className="px-8 flex items-center justify-between h-20 bg-amber-500">
      <h1 className="text-2xl font-bold">LOGO</h1>

      {status === 0 ? (
        <h1>Hello</h1>
      ) : (
        <ul className="flex gap-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/service">Service</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      )}

      {user === "" ? (
        <div className="flex gap-2">
          <button className="p-2 px-4 rounded-md bg-blue-500">Login</button>
          <button className="p-2 px-4 rounded-md bg-red-500">Register</button>
        </div>
      ) : (
        <span className="font-bold text-xl">{user}</span>
      )}
    </nav>
  );
};

export default Navbar;