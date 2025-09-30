import { Home, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

const BottomNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex justify-around h-16 items-center">
        <Link to="/" className="flex flex-col items-center text-gray-700 hover:text-red-500">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/saved" className="flex flex-col items-center text-gray-700 hover:text-red-500">
          <Bookmark className="w-6 h-6" />
          <span className="text-xs mt-1">Saved</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavbar;
