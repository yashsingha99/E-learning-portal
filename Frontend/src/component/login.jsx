import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Tags/Input";
import Button from "./Tags/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login as loginUser } from "../store/authSlice";
import Cookies from "js-cookie";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [Error, setError] = useState("");
  const dispatch = useDispatch();

  const Login = async (data) => {
    try {
      const user = await axios.post(
        "http://localhost:1337/api/auth/local",
        data
      );
      console.log(user);
      dispatch(loginUser(user));
      Cookies.set("userData", JSON.stringify(user), { expires: 1 });
      navigate("/");

    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]"></span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {/* {Error && <p className="text-red-600 mt-8 text-center">{Error}</p>} */}
      
        <form onSubmit={handleSubmit(Login)} className="mt-8">
          <div className="space-y-5">
            <Input
              type="email"
              label="Email: "
              placeholder="Enter your email"
              {...register("identifier", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button  type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default login;
