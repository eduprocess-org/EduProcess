import {
  Bell,
  CircleUser,
  Menu,
} from "lucide-react";

import ThemeToggle from "../../common/atoms/ThemeToggle";

type Props = {
  onMenuClick: () => void;
  onToggleSidebar: () => void;
};

function Navbar({
  onMenuClick,
  onToggleSidebar,
}: Props) {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
   <header
      className="
        h-16
        flex
        items-center
        justify-between
        px-6
        shadow-sm
        border-b
        border-slate-200
        bg-white
        dark:bg-slate-900
        dark:border-slate-700
        transition-colors
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* MOBILE */}
        <button
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>

        {/* DESKTOP */}
        <button
          className="hidden lg:block"
          onClick={onToggleSidebar}
        >
          <Menu size={24} />
        </button>

        <div>
          <h1 className="text-xl font-bold text-[#0B2D63] dark:text-blue-300">            EduProcess
          </h1>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Academic Procedure Management
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell
            size={20}
            className="text-slate-600 dark:text-slate-300"
          />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <ThemeToggle />

          <div
          className="
          flex
          items-center
          gap-3
          border-l
          border-slate-200
          dark:border-slate-700
          pl-4
          "
          >
          <CircleUser
            size={32}
            className="text-[#0B2D63]"
          />

          <div className="hidden sm:block">
            <p className="font-semibold text-sm text-slate-800 dark:text-white">
              {user.firstName} {user.lastName}
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;