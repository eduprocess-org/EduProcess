import { Outlet } from "react-router-dom";
<<<<<<< HEAD
import logo from "../assets/images/Logo.jpeg";

function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-cyan-50">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center bg-white p-12">
        <img
          src={logo}
          alt="EduProcess"
          className="w-56 mb-6"
        />

        <h1 className="text-5xl font-bold mb-4 text-[#0B2D63]">
          EduProcess
        </h1>

        <p className="text-xl text-center text-gray-600 mb-10">
          Academic Procedure Management System
        </p>

        <div className="space-y-4 text-lg text-gray-700">
          <p>✓ Submit procedures online</p>
          <p>✓ Track request status</p>
          <p>✓ Receive real-time notifications</p>
          <p>✓ Secure institutional access</p>
        </div>

        <div className="mt-16 text-sm text-gray-500">
          © 2026 EduProcess
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex justify-center items-center p-6 bg-[#0B2D63]">        <Outlet />
      </div>

=======

function AuthLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
>>>>>>> qa
    </div>
  );
}

export default AuthLayout;