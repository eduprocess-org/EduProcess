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
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">

      <div className="flex items-center gap-4">

        <button
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl font-semibold text-blue-600">
          EduProcess
        </h1>

      </div>

      <div className="flex items-center gap-4">

        <button>
          <Bell size={20} />
        </button>

        <button>
          <Moon size={20} />
        </button>

        <button>
          <CircleUser size={24} />
        </button>

      </div>

    </header>
  );
}

export default Navbar;