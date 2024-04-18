import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
function FetchAllCourses({ forCourses = false }) {
  const [courses, setCourses] = useState([]);
  const [username, setUsername] = useState([]);
  const [searchCourse, setSearchCourse] = useState("");
  let data = Cookies.get("userData");
  if (data) data = JSON.parse(Cookies.get("userData")).data.user.username;
  useEffect(() => {
    const fetchCourse = async () => {
      const allCourses = await axios.get(
        "http://localhost:1337/api/courses?populate=*"
      );
      const cdata = allCourses.data.data;
      setCourses(allCourses.data.data);
    };
    fetchCourse();
  }, []);


  if (courses.length == 0)
    return (
      <section className="text-gray-600  body-font ">
        <div className="px-5 w-full text-size-10 flex items-center justify-center  py-2">
          <CircularProgress color="success" />
        </div>
      </section>
    );
  else
    return (
      <>
        <section className="text-gray-600 body-font ">
          <div className="flex  justify-center w-full items-center search">
            <div
              style={{ width: "50%" }}
              className=" flex mt-10 shadow-md  rounded-3xl  justify-center py-1 px-2 items-center border border-gray-200 "
            >
              <SearchIcon />
              <input
                type="text"
                style={{ width: "95%" }}
                value={searchCourse}
                onChange={(e) => setSearchCourse(e.target.value)}
                className="px-3 py-2  rounded-lg bg-white text-black outline-none  duration-200"
                placeholder="search course"
              />
            </div>
          </div>

          <div className=" px-5 w-full  flex items-center justify-center flex-wrap py-2">
            {forCourses && courses.map((course) => {
              const title = course.attributes.title.toLowerCase();
              let userExist = false;
              for (let i = 0; i < course.attributes.users.data.length; i++) {
                if (
                  title.includes(searchCourse.toLowerCase()) &&
                  data === course.attributes.users.data[i].attributes.username
                ) {
                  return (
                    <Link key={course.id} to={`/course/${course.id}`}>
                      <div className="p-4 m-4 rounded-lg  shadow-2xl  md:w">
                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                          <img
                            className="lg:h-48 md:h-36 w-full object-cover object-center"
                            src={`http://localhost:1337${course.attributes.courseDp.data[0].attributes.url}`}
                            alt="blog"
                          />
                          <div className="p-6">
                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                              CATEGORY
                            </h2>
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                              {course.attributes.title}
                            </h1>
                            <p className="leading-relaxed mb-3">
                              {course.attributes.discription}
                            </p>
                            <div className="flex items-center flex-wrap ">
                              <div className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer">
                                Learn More
                                <svg
                                  className="w-4 h-4 ml-2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M5 12h14"></path>
                                  <path d="M12 5l7 7-7 7"></path>
                                </svg>
                              </div>
                              <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                <svg
                                  className="w-4 h-4 mr-1"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                1.2K
                              </span>
                              <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                <svg
                                  className="w-4 h-4 mr-1"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                </svg>
                                6
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                }
              }
            })}
            {!forCourses && courses.map((course) => {
              const title = course.attributes.title.toLowerCase();
              if (title.includes(searchCourse.toLowerCase())) {
                return (
                  <Link key={course.id} to={`/course/${course.id}`}>
                    <div className="p-4 m-4 rounded-lg  shadow-2xl  md:w">
                      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                        <img
                          className="lg:h-48 md:h-36 w-full object-cover object-center"
                          src={`http://localhost:1337${course.attributes.courseDp.data[0].attributes.url}`}
                          alt="blog"
                        />
                        <div className="p-6">
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                            CATEGORY
                          </h2>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            {course.attributes.title}
                          </h1>
                          <p className="leading-relaxed mb-3">
                            {course.attributes.discription}
                          </p>
                          <div className="flex items-center flex-wrap ">
                            <div className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer">
                              Learn More
                              <svg
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                              </svg>
                            </div>
                            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                              <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              1.2K
                            </span>
                            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                              <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                              </svg>
                              6
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
          </div>
        </section>
      </>
    );
}
export default FetchAllCourses;
