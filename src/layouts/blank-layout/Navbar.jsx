import logo from "../../assets/react.svg";
import { User, Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex justify-around items-center w-full h-15  text-gray-400 shadow-sm bg-white">
      <img src={logo} alt="logo" />
      <div className="flex items-center relative">
        <input
          className="outline-none border-gray bg-white w-120 px-5 py-1 pl-10 border-1 border-gray-300 rounded-md"
          type="text"
          placeholder="Search"
        />
        <Search className="absolute left-3 text-gray-400" />
      </div>
      <div className="flex gap-3 text-black">
        <button className="">Logout</button>
        <User />
      </div>
    </div>
  );
};

export default Navbar;
