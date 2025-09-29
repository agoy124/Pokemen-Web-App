import { useTheme } from "@/utils/hooks/useTheme";
import { Link } from "react-router-dom";
import pokeball from "@/assets/pokeball.webp";
import { useSearch } from "@/hooks/userSearch";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { query, setQuery } = useSearch();

  return (
    <div className="sticky top-0 z-50 w-full border-gray-200 bg-black px-2 py-2.5 sm:px-4">
      <div className="container mx-auto flex items-center justify-between relative">
        <Link to={"/"}>
          <img
            src={pokeball}
            width="60"
            height="60"
            className="cursor-pointer"
            alt="pokedex-logo"
          />
        </Link>

        {/* Search bar */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari Pokemon..."
          className="font-arcade text-center text-xs w-64 rounded-lg px-3 py-1 text-black focus:outline-none"
        />

        {/* Theme toggle */}
        {theme === "light" ? (
          <svg
            className="h-8 w-8 text-white cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            onClick={toggleTheme}
            viewBox="0 0 512 512"
          >
            <path d="M283.211 512c78.962 ..."></path>
          </svg>
        ) : (
          <svg
            className="h-8 w-8 text-white cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            onClick={toggleTheme}
            viewBox="0 0 512 512"
          >
            <path d="M256 160c-52.9 ..."></path>
          </svg>
        )}
      </div>
    </div>
  );
};

export default Header;
