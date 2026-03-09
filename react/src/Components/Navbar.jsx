import React from "react";

const Navbar = ({ user, text, status }) => {
  console.log(user, text, status);

  return (
    <nav className="px-8 flex items-center justify-between h-20 bg-amber-500">
      <h1 className="text-2xl font-bold">LOGO</h1>

      {status === 0 ? (
        <h1>Hello</h1>
      ) : (
        <ul className="flex gap-4">
          <li>Home</li>
          <li>About</li>
          <li>Service</li>
          <li>Contact</li>
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