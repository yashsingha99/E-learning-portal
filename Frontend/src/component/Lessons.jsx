import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Cookies from "js-cookie";

function Lessons() {
  const location = useLocation().pathname;
  const locArr = location.split("/");
  const CId = Number(locArr[locArr.length - 3]);
  const LId = Number(locArr[locArr.length - 1]);
  const [LessonData, setLessonData] = useState([]);
  let data = Cookies.get("userData");
  if (data) data = JSON.parse(Cookies.get("userData")).data.user.id;
  const [comment, setComment] = useState("");
  const [allcomment, setAllComment] = useState([]);
  const navigate = useNavigate();
  let check = false;
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1337/api/courses?populate=*"
      );
      setLessonData(res.data.data[CId - 1].attributes.lessons.data);
      const allCommentsData = await axios.get(
        "http://localhost:1337/api/comments?populate=*"
      );
      setAllComment(allCommentsData.data.data);
    };
    fetch();
  }, []);

  console.log(allcomment);

  const addComment = async () => {
    const postData = {
      data: {
        texts: comment,
        lesson: LId,
        user: data,
      },
    };
    try {
      const res = await axios.post(
        `http://localhost:1337/api/comments`,
        postData
      );
      alert("comment successfully!");
      setComment("");
    } catch (error) {
      setComment("");
      console.log(error);
    }
  };

  return (
    <>
      <IconButton
        onClick={() => navigate(`/course/${CId}`)}
        aria-label={"Go back to courses"}
        title={"Go back to courses"}
      >
        <ArrowBackIcon color={"action"}></ArrowBackIcon>
      </IconButton>

      {LessonData &&
        LessonData.map((lesson) => {
          if (lesson.id === LId) {
            return (
              <section key={lesson.id} className="text-gray-600 body-font">
                <div className="container w-1/2 mx-auto flex flex-col px-5 py-24 justify-center items-center">
                  <iframe
                    height="300px"
                    width="1000px"
                    className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
                    alt="hero"
                    src={lesson.attributes.video_url}
                    allowFullScreen
                  />
                  <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center" />
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    {lesson.attributes.title}
                  </h1>
                  <p className="mb-8 leading-relaxed">
                    {lesson.attributes.discription}
                  </p>
                  <div className="flex w-full justify-center items-end">
                    <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                      <label
                        htmlFor="hero-field"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Create Comment
                      </label>
                      <textarea
                        type="text"
                        id="hero-field"
                        name="hero-field"
                        className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      onClick={() => {
                        addComment();
                      }}
                      className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                      Comment
                    </button>
                  </div>
                  <br />
                  <div className="flex">
                    <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-6 h-6"
                        viewBox="0 0 512 512"
                      >
                        <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                      </svg>
                      <span className="ml-4 flex items-start flex-col leading-none">
                        <span className="text-xs text-gray-600 mb-1">
                          GET IT ON
                        </span>
                        <span className="title-font font-medium">
                          Google Play
                        </span>
                      </span>
                    </button>
                    <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center ml-4 hover:bg-gray-200 focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-6 h-6"
                        viewBox="0 0 305 305"
                      >
                        <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                        <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
                      </svg>
                      <span className="ml-4 flex items-start flex-col leading-none">
                        <span className="text-xs text-gray-600 mb-1">
                          Download on the
                        </span>
                        <span className="title-font font-medium">
                          App Store
                        </span>
                      </span>
                    </button>
                  </div>
                </div>

                {allcomment.length != 0 && (
                  <div className=" w-60 h-40 mx-auto my-4">
                    <h2 className="text-xl font-semibold mb-2">Comments</h2>
                    <div  className="overflow-y-scroll  border border-gray-300 rounded p-2 mb-4">
                      {allcomment.map((comment, index) => {
                        if (comment.attributes.lesson.data.id === LId) {
                          check = true;
                          return (
                            <div
                              key={index}
                              className="border-b border-gray-300 py-2"
                            >
                              <p className="text-gray-400">
                                {
                                  comment.attributes.user.data.attributes
                                    .username
                                }
                              </p>
                              <p className="text-gray-700">
                                {comment.attributes.texts}
                              </p>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                )}
              </section>
            );
          }
        })}
    </>
  );
}

export default Lessons;
