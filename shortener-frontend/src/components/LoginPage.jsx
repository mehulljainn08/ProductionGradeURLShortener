import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import TextField from './TextField';
import { motion } from 'framer-motion';
import { ContextApi } from '../contextApi/ContextApi';
import api from '../api/api';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [loader, setLoader] = useState(false);
  const { setToken } = useContext(ContextApi);
  const navigate = useNavigate();
  const location = useLocation(); // 🧭 to know from where user came

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const loginHandler = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post("/api/auth/login", data);
      console.log(response);
      setToken(response);
      localStorage.setItem("JWT_TOKEN", JSON.stringify(response));
      toast.success("Login Successful!");

      reset();

      // 🔁 Redirect to originally intended page or dashboard
      const redirectPath = location.state?.from || "/dashboard";
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Login Failed!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-white px-4 py-10">
      <motion.form
        onSubmit={handleSubmit(loginHandler)}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full sm:w-[420px] bg-white rounded-2xl shadow-xl px-8 py-10"
      >
        <h2 className="text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Login to Your Account
        </h2>
        <p className="text-center text-sm text-gray-600 mt-1 mb-6">
          Join PrivURL and simplify your link management experience.
        </p>

        <div className="flex flex-col gap-4">
          <TextField
            label="Username"
            id="userName"
            required
            type="text"
            message="Username is required"
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />

          <TextField
            label="Password"
            id="password"
            required
            type="password"
            message="Password is required"
            placeholder="Enter your password"
            register={register}
            min={6}
            errors={errors}
          />
        </div>

        <button
          disabled={loader}
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-md hover:opacity-90 transition"
        >
          {loader ? 'Loading...' : 'Login'}
        </button>

        <p className="text-center text-sm text-gray-700 mt-6">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-purple-600 font-semibold underline hover:text-purple-800"
          >
            SignUp
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default LoginPage;
