import { useEffect, useState } from "react";
import axios from "axios";
import FetchAllCourses from "../fetchAllCourses";
import Slider from "../slider/Slider";
import Input from '../Tags/Input'
function Home() {
  return (
    <div className="h-full">
      <div>E-learing-Portal</div>
      <div className="home">
        <Slider />
      
      </div>
        <FetchAllCourses />
    </div>
  );
}

export default Home;
