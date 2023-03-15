import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";

import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import { useRouter } from "next/router";

const TOP_OFFSET = 66;

type Props = {};

const Navbar = (props: Props) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.screenY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleProfileMenu = useCallback(() => {
    setShowProfileMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`
                px-4
                md:px-16
                py-6
                flex
                flex-row
                items-center
                transition
                duration-500
                ${showBackground ? "bg-zinc-900/90" : ""}
            `}
      >
        <img src="/images/logo.png" className="h-4 lg:h-7 cursor-pointer" alt="logo" onClick={() => router.push("/")} />
        <div
          className="
                    flex-row
                    ml-8
                    gap-7
                    hidden
                    lg:flex

                "
        >
          <div onClick={() => router.push("/")}>
            <NavbarItem label="Home" />
          </div>
          <div onClick={() => router.push("/series")}>
            <NavbarItem label="Series" />
          </div>
          <div onClick={() => router.push("/films")}>
            <NavbarItem label="Films" />
          </div>
          <div onClick={() => router.push("/trending")}>
            <NavbarItem label="New & popular" />
          </div>
          <div onClick={() => router.push("/favorites")}>
            <NavbarItem label="My List" />
          </div>
          <div onClick={() => router.push("/")}>
            <NavbarItem label="Browse by languages" />
          </div>
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu && "rotate-180"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>

          <div
            onClick={toggleProfileMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="profile" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showProfileMenu && "rotate-180"
              }`}
            />
            <AccountMenu visible={showProfileMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
