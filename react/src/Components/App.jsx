import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Form from "./Form";
import Button from "../Button";
import { FaHome } from "react-icons/fa";

const App = () => {
  const [bgColor, setBgColor] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => 
  console.log("hello")
  
  ),[status];

  return (
    <>
      <Navbar user={"John deo"} text={"Hello"} status={1} />

      <button
        onClick={() => setStatus((prev) => !prev)}
        className="p-2 px-4 rounded-md text-white cursor-pointer bg-red-500"
      >
            <FaHome/>

        {status ? "OFF" : "ON"}
      </button>
    </>
  );
};

export default App;