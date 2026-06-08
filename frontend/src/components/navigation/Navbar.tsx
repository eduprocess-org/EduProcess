import {
  Bell,
  CircleUser,
  Moon,
  Menu
} from "lucide-react";

type Props = {
  onMenuClick: () => void;
};

function Navbar({ onMenuClick }: Props) {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">

      {/* LEFT */}

      <div className="flex items-center gap-4">

        <button
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>

        <div>

          <h1 className="text-xl font-bold text-[#0B2D63]">
            EduProcess
          </h1>

          <p className="text-xs text-slate-500">
            Academic Procedure Management
          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-5">

        <button className="relative">

          <Bell
            size={20}
            className="text-slate-600"
          />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />

        </button>

        <button>
          <Moon
            size={20}
            className="text-slate-600"
          />
        </button>

        <div className="flex items-center gap-3 border-l pl-4">

          <CircleUser
            size={32}
            className="text-[#0B2D63]"
          />

          <div className="hidden sm:block">

            <p className="font-semibold text-sm">
              {user.firstName} {user.lastName}
            </p>

            <p className="text-xs text-slate-500 capitalize">
              {user.role}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;