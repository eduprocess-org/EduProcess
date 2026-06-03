import { Link } from "react-router-dom";
import { toast } from "sonner";
import { login } from "../../services/auth/auth.service";
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
  const [apiError, setApiError] = useState("");
  const onSubmit = async (data: LoginFormData) => {
    try {

    const response = await login(data);

      localStorage.setItem(
        "sessionToken",
        response.data.tokens.sessionToken
      );

      localStorage.setItem(
        "refreshToken",
        response.data.tokens.refreshToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/");

    } catch (error: any) {

    if (error.response?.status === 401) {

      setApiError("Invalid email or password");

    } else if (error.response?.status === 400) {

      setApiError(error.response.data.message);

    } else {

      setApiError("Unable to connect to server");

    }

    console.error(error);
}
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      {apiError && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg">
          {apiError}
        </div>
      )}

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