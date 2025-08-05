"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { RocketIcon, LogInIcon } from "lucide-react";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const linkHref = isHome ? "#pricing" : "/pricing";

  const navbarToggleHandler = () => setNavbarOpen(!navbarOpen);

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  }, []);

  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <header
      className={`header left-0 top-0 z-40 flex w-full items-center ${
        sticky
          ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          {/* Logo */}
          <div className="w-60 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={`header-logo block w-full ${
                sticky ? "py-5 lg:py-2" : "py-8"
              }`}
            >
              <Image
                src="/images/logo/logo_light.png"
                alt="logo"
                width={140}
                height={30}
                className="w-full dark:hidden"
              />
              <Image
                src="/images/logo/logo_dark.png"
                alt="logo"
                width={140}
                height={30}
                className="hidden w-full dark:block"
              />
            </Link>
          </div>

          {/* Navbar + Actions */}
          <div className="flex w-full items-center justify-end px-4">
            {/* Desktop Nav */}
            <nav
              id="navbarCollapse"
              className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                navbarOpen
                  ? "visibility top-full opacity-100"
                  : "invisible top-[120%] opacity-0"
              }`}
            >
              <ul className="block lg:flex lg:space-x-12">
                {menuData.map((menuItem, index) => {
                  const href = isHome
                    ? menuItem.path
                    : `/${menuItem.path.replace(/^#/, "")}`;
                  const isActive =
                    pathname === menuItem.path ||
                    pathname === `/${menuItem.path.replace(/^#/, "")}`;

                  return (
                    <li key={index} className="group relative">
                      <Link
                        href={href}
                        className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                          isActive
                            ? "text-primary dark:text-white"
                            : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                        }`}
                      >
                        {menuItem.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pl-4 md:pl-8">
              {/* Desktop buttons */}
              <div className="hidden md:flex gap-2">
                <Link
                  href={linkHref}
                  className="rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90"
                >
                  Get Started
                </Link>
                <Link
                  href="https://cp.boostseller.ai"
                  className="rounded-sm border border-primary bg-transparent px-8 py-3 text-base font-medium text-primary transition duration-300 hover:bg-primary hover:text-white"
                >
                  Admin Panel
                </Link>
              </div>
							{/* Theme toggler */}
							<div>
								<ThemeToggler />
							</div>
              {/* Mobile icon buttons */}
              <div className="flex md:hidden gap-2">
								{/* Hamburger menu */}
								<button
									onClick={navbarToggleHandler}
									id="navbarToggler"
									aria-label="Mobile Menu"
									className="block lg:hidden ml-1 p-2"
								>
									<span
										className={`block h-0.5 w-[22px] my-1 bg-black dark:bg-white transition duration-300 ${
											navbarOpen ? "rotate-45 translate-y-[6px]" : ""
										}`}
									/>
									<span
										className={`block h-0.5 w-[22px] my-1 bg-black dark:bg-white transition duration-300 ${
											navbarOpen ? "opacity-0" : ""
										}`}
									/>
									<span
										className={`block h-0.5 w-[22px] my-1 bg-black dark:bg-white transition duration-300 ${
											navbarOpen ? "-rotate-45 -translate-y-[6px]" : ""
										}`}
									/>
								</button>	
								{/* Theme toggler */}
															
								<Link
									href={linkHref}
									aria-label="Get Started"
									title="Get Started"
									className="p-2 text-primary hover:text-white hover:bg-primary rounded-full transition"
								>
									<RocketIcon size={20} />
								</Link>
								<Link
									href="https://cp.boostseller.ai"
									aria-label="Admin Panel"
									title="Admin Panel"
									className="p-2 text-primary hover:text-white hover:bg-primary rounded-full transition"
								>
									<LogInIcon size={20} />
								</Link>
							</div>              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
