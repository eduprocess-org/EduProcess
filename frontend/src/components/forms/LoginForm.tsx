import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import {
  loginSchema,
  type LoginFormData,
} from "../../utils/validators";

import {
  Eye,
  EyeOff,
} from "lucide-react";

function LoginForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (data: LoginFormData) => {

  console.log(data);

  navigate("/");
  };


  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
        EduProcess
      </h1>

      <p className="text-center text-gray-500 mb-6">
        Sign in to continue
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >

        {/* EMAIL */}

        <div>

          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="example@uce.edu.ec"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}

        </div>

        {/* PASSWORD */}

        <div>

          <label className="block mb-2 font-medium">
            Password
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password")}
            />

            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >

              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}

            </button>

          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

        </div>

        {/* BUTTON */}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition font-medium"
        >
          Login
        </button>

      </form>

      {/* FOOTER */}

      <p className="text-center text-sm text-gray-500 mt-6">

        Don't have an account?{" "}

        <Link
          to="/register"
          className="text-blue-600 hover:underline"
        >
          Create account
        </Link>

      </p>

    </div>
  );
}

export default LoginForm;