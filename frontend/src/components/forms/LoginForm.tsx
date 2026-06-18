import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth/auth.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner"; 
import { loginSchema, type LoginFormData } from "../../utils/validators";
import { Eye, EyeOff, Loader2 } from "lucide-react"; 
import { useAuth } from "../../hooks/useAuth";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login: authLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const navigate = useNavigate();

  // 🛠️ REPARADO: Se reinyectó la firma de la función asíncrona y la apertura del bloque try
  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true); 
      const response = await login(data);

      authLogin(
        response.data.user,
        response.data.tokens.sessionToken
      );

      localStorage.setItem(
        "refreshToken",
        response.data.tokens.refreshToken
      );

      toast.success("Welcome back! Loading system...");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      
      // Feedback consistente usando Toasts de Sonner
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Bad request parameters");
      } else {
        toast.error("Unable to connect to server. Please check your internet connection.");
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-[#0B2D63] mb-2">
        Welcome 
      </h2>

      <p className="text-center text-gray-500 mb-8">
        Sign in to continue managing your academic procedures
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

        {/* Botón reactivo al estado de carga */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#0B2D63] hover:bg-[#143F86] text-white p-3 rounded-xl transition-all duration-200 font-medium w-full flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Authenticating...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Create account
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;