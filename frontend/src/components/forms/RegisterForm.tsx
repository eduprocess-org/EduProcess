import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { registerSchema, type RegisterFormData } from "../../utils/validators";
import { register as registerUser } from "../../services/auth/register.service";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // 🌟 Ícono de carga

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
  const [isLoading, setIsLoading] = useState(false); // 🌟 Control de estado de carga
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true); 

      const response = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      toast.success(response.message || "Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 409) {
        toast.error("Email already exists");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Validation failed");
      } else {
        toast.error("Unable to connect to server. Please check your network connection.");
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-[#0B2D63] mb-2">
        Create Account 🎓
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Join EduProcess and manage academic procedures online
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* FIRST NAME & LAST NAME */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-2 font-medium">First Name</label>
            <input
              type="text"
              placeholder="John"
              disabled={isLoading}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-gray-400"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              disabled={isLoading}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-gray-400"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            placeholder="example@uce.edu.ec"
            disabled={isLoading}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-gray-400"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block mb-2 font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              disabled={isLoading}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-gray-400"
              {...register("password")}
            />
            <button
              type="button"
              disabled={isLoading}
              className="absolute right-3 top-3 text-gray-500 disabled:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="block mb-2 font-medium">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="********"
              disabled={isLoading}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-gray-400"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              disabled={isLoading}
              className="absolute right-3 top-3 text-gray-500 disabled:text-gray-300"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#0B2D63] hover:bg-[#143F86] text-white p-3 rounded-xl transition-all duration-200 font-medium w-full flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Registering account...
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;