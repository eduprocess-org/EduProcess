import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerSchema, type RegisterFormData,} from "../../utils/validators";
import { useState } from "react";
import { Eye, EyeOff,} from "lucide-react";

function RegisterForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data: RegisterFormData) => {

  console.log(data);

  toast.success("Account created successfully");

  setTimeout(() => {
    navigate("/login");
  }, 1500);
};

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
        EduProcess
      </h1>

      <p className="text-center text-gray-500 mb-6">
        Create your account
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >

        {/* FULL NAME */}

        <div>

          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            {...register("fullName")}
          />

          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}

        </div>

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

          <p className="text-xs text-gray-500 mt-2">
            Password must contain at least:
            <br />
            • 8 characters
            <br />
            • 1 uppercase letter
            <br />
            • 1 lowercase letter
            <br />
            • 1 number
            <br />
            • 1 special character
          </p>

        </div>

        {/* CONFIRM PASSWORD */}

        <div>

          <label className="block mb-2 font-medium">
            Confirm Password
          </label>

          <div className="relative">

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="********"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              {...register("confirmPassword")}
            />

            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >

              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}

            </button>

          </div>

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}

        </div>

        {/* BUTTON */}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition font-medium"
        >
          Register
        </button>

      </form>

      {/* FOOTER */}

      <p className="text-center text-sm text-gray-500 mt-6">

        Already have an account?{" "}

        <Link
          to="/login"
          className="text-blue-600 hover:underline"
        >
          Login
        </Link>

      </p>

    </div>
  );
}

export default RegisterForm;