import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="fixed w-full shadow-md bg-white py-4 z-50">
      <div className="w-4/5 m-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/home">
          <image className="font-extrabold text-3xl uppercase tracking-wide cursor-pointer " src="onledgrlogo.png" Alt="Logo" />
        </Link>
        <div className="flex gap-5 justify-center items-center">
          <FaRegCircleUser
            size={30}
            className="cursor-pointer"
            onClick={() => navigate("/profile")}
          />
          <button
            className="bg-[#074D51]  py-2 px-5 text-white cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
