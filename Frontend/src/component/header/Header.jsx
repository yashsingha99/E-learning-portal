import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "../Container/Container";
import LogOutButton from "../header/LogOutButton";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import LoginButton from "../Auth0/Login";
import Profile from "../Profile";
import { Alert, Dropdown, Image } from "react-bootstrap";
import profileState from "../../store/authSlice";
import { useDispatch } from "react-redux";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { changeToggle } from "../../store/toggleSlice";
import EmailForm from "../Email/Emaiul";
function Header() {
  const authStatus = Cookies.get("userData");
  const navigate = useNavigate();
  const [state, setState] = useState(true);
  let themeBtn;
  useEffect(()=>{
     themeBtn = Cookies.get('Theme') 
  },[])
  const dispatch = useDispatch();
  // let theme = useSelector((state) => state.toggle.light);
  const navItems = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Email",
      slug: "/email",
      active: authStatus,
    },
  ];

  return (
    <header className=" relative w-full py-3 shadow bg-gray-400">
      <Container>
        <nav className="flex">
          <ul>
            <li className=" flex items-center justify-center ">
              <button
                onClick={() => navigate("/")}
                className="inline-bock px-6 py-1 duration-200  rounded-full"
              >
                <img
                  src="https://decimaltechnology.com/wp-content/uploads/2023/02/logo-07-e1677123997827.png"
                  height="30px"
                  width="120px"
                />
              </button>
              <button
                onClick={() => navigate("/")}
                className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/courses")}
                className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
              >
                Courses
              </button>
            </li>
          </ul>
          <ul className="flex ml-auto flex justify-center items-center just">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={themeBtn}
                    onClick={() => 
                      Cookies.set('Theme', themeBtn == true ? false : true)
                    }
                    // defaultChecked
                  />
                }
              />
            </FormGroup>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)} // when button is click then navigate is execute and reach a perticuler router or slug....
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {"  "}
            {
              !authStatus && <LoginButton />
            }
            {authStatus && (
              <li>
                <button
                  onClick={() => navigate("/profile")}
                  className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                >
                  Profile
                </button>
              </li>
            )}
            {authStatus && (
              <li>
                <LogOutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
