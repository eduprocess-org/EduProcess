import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/auth/auth.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { loginSchema, type LoginFormData } from "../../../utils/validators";
import { Eye, EyeOff, Loader2, BookOpen, Users, Award } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import logo from "../../../assets/images/Logo.jpeg";

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

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
    const response = await login(data);

    authLogin(
      {
        ...response.data.user,
        career: "Information Systems",
      },
      response.data.tokens.sessionToken
    );
      localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
      toast.success("Welcome back! Loading system...");
      navigate("/");
    } catch (error: any) {
      console.error(error);
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
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL — blanco ── */}
      <div className="hidden lg:flex lg:w-[43%] flex-col justify-between relative overflow-hidden bg-white">
        {/* Subtle pattern */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="g-l" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(11,45,99,0.035)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g-l)" />
            <circle cx="92%" cy="6%" r="220" fill="rgba(126,179,255,0.10)" />
            <circle cx="4%" cy="84%" r="200" fill="rgba(11,45,99,0.04)" />
          </svg>
        </div>

        {/* Brand */}
        <div className="relative z-10 p-10 pt-12">
          <div className="flex items-center  gap-3 mb-14">
            <img
              src={logo}
              alt="EduProcess"
              className="w-20 h-20 rounded-xl object-contain"
            />
            <span className="text-[#0B2D63] font-bold text-3xl tracking-tight">EduProcess</span>
          </div>

          <p className="text-[#6B86B3] text-sm uppercase tracking-widest mb-3 font-medium">
            Academic platform
          </p>
          <h1 className="leading-[1.12] mb-6">
            <span className="block text-[2.6rem] font-bold text-[#0B2D63]">Welcome to</span>
            <span
              className="block text-[2.8rem] font-bold"
              style={{
                color: "#1A52A8",
                fontStyle: "italic",
                fontFamily: "'Georgia', 'Times New Roman', serif",
              }}
            >
              your academic
            </span>
            <span className="block text-[2.6rem] font-bold text-[#0B2D63]">hub.</span>
          </h1>

          <div className="w-12 h-[3px] rounded-full" style={{ background: "linear-gradient(90deg,#1A52A8,transparent)" }} />
        </div>

        {/* Pills */}
        <div className="relative z-10 px-10 pb-6 flex flex-col gap-2.5">
          {[
            { icon: BookOpen, label: "Academic procedures online" },
            { icon: Users, label: "Manage your career & courses" },
            { icon: Award, label: "Track requests in real time" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: "#F5F8FD", border: "1px solid #E6EDF8" }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(11,45,99,0.08)" }}
              >
                <Icon size={14} style={{ color: "#0B2D63" }} />
              </div>
              <span className="text-slate-500 text-sm">{label}</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 px-10 pb-8">
          <p className="text-slate-300 text-xs">
            © {new Date().getFullYear()} EduProcess · Universidad Central del Ecuador
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL — azul, card blanco ── */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-10 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0d2a5e 0%, #0B2D63 60%, #071d42 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none select-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="g-r" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g-r)" />
            <circle cx="8%" cy="10%" r="200" fill="rgba(126,179,255,0.08)" />
            <circle cx="95%" cy="92%" r="220" fill="rgba(255,255,255,0.03)" />
          </svg>
        </div>

        <div className="w-full max-w-[420px] relative z-10">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <img
              src={logo}
              alt="EduProcess"
              className="w-12 h-12 rounded-lg object-contain"
            />
            <span className="text-white font-bold text-lg">EduProcess</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-9">

            {/* Header */}
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#4A6FA5" }}>
                Welcome back
              </p>
              <h2 className="text-[1.75rem] font-bold text-[#0B2D63] leading-tight">Sign in to EduProcess</h2>
              <p className="text-slate-400 text-sm mt-1.5">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

              <Field label="Email address" error={errors.email?.message}>
                <input
                  type="email"
                  placeholder="user@uce.edu.ec"
                  disabled={isLoading}
                  className={inputCls(!!errors.email)}
                  {...register("email")}
                />
              </Field>

              <Field label="Password" error={errors.password?.message}>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    disabled={isLoading}
                    className={inputCls(!!errors.password) + " pr-11"}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-40"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </Field>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: isLoading ? "#94a3b8" : "linear-gradient(135deg, #0B2D63 0%, #1a52a8 100%)",
                  boxShadow: isLoading ? "none" : "0 4px 24px rgba(11,45,99,0.28)",
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={17} />
                    Authenticating…
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-white/60 mt-7">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-white hover:text-[#7EB3FF] transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none transition-all duration-150 bg-white",
    "text-slate-700 placeholder:text-slate-300",
    "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
    "focus:ring-2 focus:ring-[#0B2D63]/15 focus:border-[#0B2D63]",
    hasError
      ? "border-red-300 bg-red-50/40 focus:ring-red-100 focus:border-red-400"
      : "border-slate-200 hover:border-slate-300",
  ].join(" ");
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

export default LoginForm;