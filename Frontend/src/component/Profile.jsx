import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Alert, Button, Card, Placeholder } from "react-bootstrap";
import LogOutButton from "./header/LogOutButton";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function Profile() {
  const [profile, setProfile] = useState(true);
  const data = JSON.parse(Cookies.get("userData"));
  useEffect(() => {
    setProfile(data.data.user);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const onhandler = () => {
    setUser(Cookies.get("userData"));
    dispatch(logout());
    Cookies.remove("userData");
    // console.log(user);
    navigate("/login");
  };
  console.log(data.data.user.username);
  const ch = data.data.user.username
  return (
    <>
      <div className="bg-gray-100 w- min-h-500 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 flex flex-col justify-center sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 m-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-gray-200 rounded-full flex flex-shrink-0 justify-center items-center text-gray-500 text-xl font-mono">
                  {ch.charAt(0)}
                </div>
                <div>
                  <div className="flex flex-col">
                    <span className="text-xl font-medium text-gray-800">
                      {data.data.user.username}
                    </span>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                  <p>Follow me on social media:</p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-500 hover:text-gray-600 transition duration-300"
                    >
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13.794V21a2 2 0 002 2h7.206a13.958 13.958 0 01-2-2H7.5a.5.5 0 01-.5-.5v-6.706a2 2 0 00-1.317-1.886l-3.18-1.027a1 1 0 00-1.5.886v8.933A4.993 4.993 0 015 21H3a2 2 0 01-2-2V13.79l2 .648z"></path>
                        <path
                          d="M9 4.794l2.25 7.5L9 14.794"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M23 3.794v7.487a2 2 0 01-2 2H15"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M19 10.794l-1.799 1.216L14.5 9.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-gray-600 transition duration-300"
                    >
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="0"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <rect width="24" height="24" rx="4"></rect>
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M16.25 11.016a5.25 5.25 0 00-3.25-1.031"></path>
                        <path
                          d="M16.25 11.016h.01"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-gray-600 transition duration-300"
                    >
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="0"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <circle cx="12" cy="12" r="9"></circle>
                        <line x1="3.6" y1="9" x2="20.4" y2="9"></line>
                        <line x1="3.6" y1="15" x2="20.4" y2="15"></line>
                        <path d="M11.5 9h-1v6a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V9.5"></path>
                        <path d="M12.5 15v-.5"></path>
                        <path d="M8.5 9v-.5"></path>
                        <path d="M8.5 15v-.5"></path>
                        <path d="M15.5 9v-.5"></path>
                        <path d="M15.5 15v-.5"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => 
              onhandler()
            }
            className="bg-blue-600 min-w-30 text-white px-4 py-1 rounded-lg"
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
