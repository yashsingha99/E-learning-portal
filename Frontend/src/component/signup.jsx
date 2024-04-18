import React from "react";
import Input from "./Tags/Input";
import Button from "./Tags/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import Cookies from "js-cookie";

function signup() {
  const { register, handleSubmit } = useForm();
  const [Error, setError] = useState("");
  const [Value, setValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async (data) => {
    const {username, email, password } = data;
    try {
      // const isExistUser = await axios.get(`http://localhost:1337/api/users?username=${username}`)
      // console.log(isExistUser);
      const newUser = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {username, email, password}
      );
      if(newUser.ok){
      Cookies.set("userData", JSON.stringify(newUser), { expires: 1 });
      dispatch(login(newUser));
      navigate("/");
      }
      else {
        alert("Username is already exist")
      }
    } catch (error) {
      alert("Username is already exist or other error occure")
        setError(error)
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]"></span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {/* {Error && <p className="text-red-600 mt-8 text-center">{Error}</p>} */}
        <form>
          <div className="space-y-5">
            <Input
              label="Enter Full Name"
              placeholder="Enter full name"
              type="text"
              {...register("username", {
                require: true,
              })}
            />
            <Input
              label="Enter Email Address"
              type="email"
              placeholder="Enter email address"
              {...register("email", {
                require: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Enter Password"
              type="text"
              placeholder="Enter password"
              {...register("password", {
                require: true,
              })}
            />
            <Button onClick={handleSubmit(signup)} type="submit">
              {" "}
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default signup;
