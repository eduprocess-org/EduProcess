import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { registerSchema, type RegisterFormData } from "../../../utils/validators";
import { register as registerUser } from "../../../services/auth/register.service";
import { apiClient } from "../../../services/api/apiClient";
import { Eye, EyeOff, Loader2, BookOpen, Users, Award } from "lucide-react";

interface Career {
  id: string;
  name: string;
  description: string;
  faculty: { id: string; name: string };
}
import logo from "../../../assets/images/Logo.jpeg";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { careerId: "" },
  });

  const [careers, setCareers] = useState<Career[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await apiClient.get("/careers");
        setCareers(response.data.data);
      } catch (error) {
        console.error("Error loading careers:", error);
      }
    };
    fetchCareers();
  }, []);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const response = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        careerId: data.careerId,
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
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL — blanco ── */}
      <div className="hidden lg:flex lg:w-[43%] flex-col justify-between relative overflow-hidden bg-white">
        {/* Subtle pattern */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-r" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(11,45,99,0.035)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-r)" />
            <circle cx="90%" cy="8%" r="200" fill="rgba(126,179,255,0.10)" />
            <circle cx="10%" cy="80%" r="220" fill="rgba(11,45,99,0.04)" />
          </svg>
        </div>

        {/* Top */}
        <div className="relative z-10 p-10 pt-12">
          <div className="flex items-center gap-3 mb-14">
            <img
              src={logo}
              alt="EduProcess"
              className="w-20 h-20 rounded-xl object-contain" 
            />
            <span className="text-[#0B2D63] font-bold text-3xl tracking-tight">
              EduProcess
            </span>
          </div>

          <div className="mb-5">
            <p className="text-[#6B86B3] text-base font-normal mb-1 tracking-wide">
              One platform to
            </p>
            <h1 className="leading-[1.15] mb-0">
              <span className="block text-4xl font-bold text-[#0B2D63]">Manage your</span>
              <span
                className="block text-5xl font-bold"
                style={{
                  color: "#1A52A8",
                  fontStyle: "italic",
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  letterSpacing: "-0.5px",
                }}
              >
                academic journey
              </span>
              <span className="block text-4xl font-bold text-[#0B2D63]">with ease.</span>
            </h1>
          </div>

          {/* Accent line */}
          <div className="w-14 h-[3px] rounded-full mt-6 -mb-30" style={{ background: "linear-gradient(90deg, #1A52A8, transparent)" }} />
        </div>

        {/* Pills */}
        <div className="relative z-10 px-10 pb-6 flex flex-col gap-3">
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
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(11,45,99,0.08)" }}
              >
                <Icon size={15} style={{ color: "#0B2D63" }} />
              </div>
              <span className="text-slate-500 text-sm">{label}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="relative z-10 px-10 pb-8">
          <p className="text-slate-300 text-xs">
            © {new Date().getFullYear()} EduProcess · Universidad Central del Ecuador
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-10 relative overflow-hidden overflow-y-auto"
        style={{ background: "linear-gradient(180deg, #0d2a5e 0%, #0B2D63 60%, #071d42 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none select-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-rr" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-rr)" />
            <circle cx="8%" cy="10%" r="200" fill="rgba(126,179,255,0.08)" />
            <circle cx="95%" cy="92%" r="220" fill="rgba(255,255,255,0.03)" />
          </svg>
        </div>

        <div className="w-full max-w-md relative z-10">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <img
              src={logo}
              alt="EduProcess"
              className="w-10 h-10 rounded-lg object-contain"
            />
            <span className="text-white font-bold text-lg">EduProcess</span>
          </div>

          {/* Card blanca */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">

            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#4A6FA5" }}>
                Get started
              </p>
              <h2 className="text-2xl font-bold text-[#0B2D63]">Create your account</h2>
              <p className="text-slate-400 text-sm mt-1">Fill in your details to join EduProcess</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

              <div className="grid grid-cols-2 gap-3">
                <Field label="First Name" error={errors.firstName?.message}>
                  <input
                    type="text"
                    placeholder="John"
                    disabled={isLoading}
                    className={inputCls(!!errors.firstName)}
                    {...register("firstName")}
                  />
                </Field>
                <Field label="Last Name" error={errors.lastName?.message}>
                  <input
                    type="text"
                    placeholder="Doe"
                    disabled={isLoading}
                    className={inputCls(!!errors.lastName)}
                    {...register("lastName")}
                  />
                </Field>
              </div>

              <Field label="Email address" error={errors.email?.message}>
                <input
                  type="email"
                  placeholder="user@uce.edu.ec"
                  disabled={isLoading}
                  className={inputCls(!!errors.email)}
                  {...register("email")}
                />
              </Field>

              {/* Career */}
              <Field label="Career" error={errors.careerId?.message}>
                <div className="relative">
                  <select
                    disabled={isLoading}
                    className={inputCls(!!errors.careerId) + " appearance-none pr-8 cursor-pointer"}
                    {...register("careerId")}
                    style={{ color: watch("careerId") ? "#334155" : "#CBD5E1" }}
                  >
                    <option value="" disabled style={{ color: "#94a3b8" }}>Select your career</option>
                    {careers.map((career) => (
                      <option key={career.id} value={career.id} style={{ color: "#334155" }}>
                        {career.name}
                      </option>
                    ))}
                  </select>
                  {/* chevron */}
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </Field>

              <Field label="Password" error={errors.password?.message}>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
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
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                  {["8 characters minimum", "1 uppercase letter", "1 lowercase letter", "1 number", "1 special character"].map((r) => (
                    <li key={r} className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </Field>

              <Field label="Confirm Password" error={errors.confirmPassword?.message}>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat your password"
                    disabled={isLoading}
                    className={inputCls(!!errors.confirmPassword) + " pr-11"}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-40"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </Field>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-1 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-white text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: isLoading ? "#94a3b8" : "linear-gradient(135deg, #0B2D63 0%, #1a52a8 100%)",
                  boxShadow: isLoading ? "none" : "0 4px 20px rgba(11,45,99,0.4)",
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Creating account…
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-white/60 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-white hover:text-[#7EB3FF] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full rounded-lg px-3 py-2.5 text-sm border outline-none transition-all duration-150",
    "text-slate-700 placeholder:text-slate-300",
    "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
    "focus:ring-2 focus:ring-[#0B2D63]/20 focus:border-[#0B2D63]",
    hasError
      ? "border-red-300 bg-red-50/30 focus:ring-red-200 focus:border-red-400"
      : "border-slate-200 bg-white hover:border-slate-300",
  ].join(" ");
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

export default RegisterForm;