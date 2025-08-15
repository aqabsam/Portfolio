import React, { useEffect, useState } from "react";
import { Menu, X, User } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  onOpenTrialModal?: () => void;
  onOpenLoginModal?: () => void;
  onOpenChatModal?: () => void; 
}

const Navbar: React.FC<NavbarProps> = ({
  onOpenTrialModal,
  onOpenLoginModal,
  onOpenChatModal,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "certifications", label: "Certifications", path: "/certifications" },
    { id: "skills", label: "Skills", path: "/skills" },
    { id: "projects", label: "Projects", path: "/projects" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseLink =
    "relative px-3 py-2 text-sm font-medium transition-colors duration-200";
  const inactiveDesktop = isScrolled
    ? "text-gray-700 hover:text-blue-600"
    : "text-gray-800 hover:text-blue-600";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Aqab Sami</h1>
              <p className="text-xs text-gray-600">Frontend Developer</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  [
                    baseLink,
                    isActive ? "text-blue-600" : inactiveDesktop,
                  ].join(" ")
                }
                end={item.path === "/"}
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* CTA Buttons (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/resume.pdf"
              download
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200"
            >
              Download Resume
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen((s) => !s)}
            className="lg:hidden w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 bg-white/95 backdrop-blur-md rounded-b-2xl border-t border-gray-100">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "block w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                  ].join(" ")
                }
                end={item.path === "/"}
              >
                {item.label}
              </NavLink>
            ))}

            <div className="px-4 pt-2 space-y-2">
              <a
                href="/resume.pdf"
                download
                className="w-full block text-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-teal-700 transition-all duration-200"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
