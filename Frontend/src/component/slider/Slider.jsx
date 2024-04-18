import axios from "axios";
import React, { useEffect, useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import "./slider.scss"
import { Carousel } from "react-bootstrap";

function Slider() {
  const [sliderData, setSliderData] = useState([]);
  const [slider, setSlider] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      const Data = await axios.get(
        "http://localhost:1337/api/sliders?populate=*"
      );
      setSlider(Data.data.data);
    };
    fetchImages();
   
    // console.log("slider", slider[0]?.attributes.image.data[0].attributes.url);
}, []);

// console.log("sliderData",slider);
  // const prevSlide = () => {
  //   setSliderData(sliderData === 0 ? 2 : (prev) => prev - 1);
  // };
  // const nextSlide = () => {
  //   setSliderData(sliderData === 2 ? 0 : (prev) => prev + 1);
  // };

  return (
    <></>
    // <div className="slider">
    //   <div className="container" style={{transform:`translateX(-${sliderData * 100}vw)`}}>
    //      {slider && slider.map((image, i) => (
    //         <img key={i} src={`http://localhost:1337${image.attributes.image.data[0].attributes.url}`} alt="" />
    //      ))}
    //   </div>
    //   <div className="icons">
    //     <div className="icon" onClick={prevSlide}>
    //       <WestOutlinedIcon />
    //     </div>
    //     <div className="icon" onClick={nextSlide}>
    //       <EastOutlinedIcon />
    //     </div>
    //   </div>
    // </div>
  //   <Carousel className="flex">
  //   {/* {slider.map((image, index) => ( */}
  //     <Carousel.Item   key={index}>
  //       <img
  //       height="200px"
  //       width="100px"
  //         // className="d-block w-100"
  //         src={`http://localhost:1337${slider.attributes.image.data[0].attributes.url}`}
  //       />
  //     </Carousel.Item>
  //   {/* ))} */}
  // </Carousel>
  );

}

export default Slider;
