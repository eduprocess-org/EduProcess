import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
      h-10
      w-10
      rounded-full
      flex
      items-center
      justify-center
      transition-all
      hover:bg-slate-100
      dark:hover:bg-slate-800
      text-slate-600
      dark:text-yellow-300
      "
    >
      {theme === "light" ? (
        <Moon size={19} />
      ) : (
        <Sun size={19} />
      )}
    </button>
  );
}