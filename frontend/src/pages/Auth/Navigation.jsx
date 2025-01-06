import { useState } from "react";
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart,
  } from "react-icons/ai";
  import { FaHeart } from "react-icons/fa";
  import { Link } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${showSidebar ? "hidden" : "flex"} xl: flex lg:flex sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed `} id="navigation-container">
        <div className="flex flex-col justfiy-center space-y-4">
            <Link to='/' className="flex items-center transition-trnsform trnsform hover:translate-x-2">
            <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
            </Link>
        </div>
      </div>
  );
};

export default Navigation;
