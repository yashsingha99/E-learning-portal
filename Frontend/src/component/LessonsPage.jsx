import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LessonsPage() {
  const location = useLocation().pathname;
  const locArr = location.split("/");
  const locId = Number(locArr[locArr.length - 1]);
  const [lessondData, setLessonData] = useState([]);
  const [courseDp, setCoursesDp] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLessons = async () => {
      const res = await axios.get(
        "http://localhost:1337/api/courses?populate=*"
      );
      setLessonData(res.data.data[locId - 1].attributes.lessons.data);
      setCoursesDp(
        res.data.data[locId - 1].attributes.courseDp.data[0].attributes.url
      );
    };
    fetchLessons();
  }, []);
  return (
    <>
      <div className="  h-full">
        <IconButton
          onClick={() => navigate("/courses")}
          aria-label={"Go back to courses"}
          title={"Go back to courses"}
        >
          <ArrowBackIcon color={"action"}></ArrowBackIcon>
        </IconButton>
        {lessondData.map((lesson) => {  
          return (
            <section
              key={lesson.id}
              className="text-gray-600 body-font m-2"
            >
              <div className="container  my-4 flex justify-center items-center border-2 border-gray-300 shadow-2xl border-opacity-20 mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="sm:flex-grow bg-white  md:w-1/2 h-100 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    {lesson.attributes.title}
                  </h1>
                  <p className="mb-8 leading-relaxed">
                    {lesson.attributes.discription}
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        navigate(`/courses/${locId}/lesson/${lesson.id}`);
                      }}
                      className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/courses/${locId}/cart/${lesson.id}`);
                      }}
                      className="ml-4 inline-flex text-white bg-red-600  border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 hover:text-black rounded text-lg"
                    >
                      cart
                    </button>
                  </div>
                </div>
                <div className="w-100 ">
                  <img
                    className="h-full rounded"
                    src={`http://localhost:1337${courseDp}`}
                    height="400px"
                    width="500px"
                    alt=""
                  />
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

export default LessonsPage;
