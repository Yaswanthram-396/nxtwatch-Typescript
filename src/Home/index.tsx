import React from "react";
import Navbar from "./Navbar";
import SidePanel from "./Sidebar";

function Home({Num}:{ Num: any }) {
  return (
    <div>
      <Navbar />
      <SidePanel Num={Num} />
    </div>
  );
}

export default Home;
