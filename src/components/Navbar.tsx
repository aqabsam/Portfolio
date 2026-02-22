import React, { useEffect, useState } from "react";
import { Menu, User, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { getResumeLink, subscribeToResume } from "../utils/resumeStorage";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [resumeLink, setResumeLink] = useState("/resume.pdf");

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "certifications", label: "Certifications", path: "/certifications" },
    { id: "skills", label: "Skills", path: "/skills" },
    { id: "projects", label: "Projects", path: "/projects" },
    { id: "contact", label: "Contact", path: "/contact" },
    { id: "admin", label: "Admin", path: "/admin" },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setResumeLink(getResumeLink());
    const unsubscribe = subscribeToResume(setResumeLink);
    return unsubscribe;
  }, []);

  const baseLink = "relative px-3 py-2 text-sm font-medium transition-colors duration-200";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm dark:bg-slate-900/80 dark:border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Mohd Aqab Sami</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">Full-Stack Developer</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  [
                    baseLink,
                    isActive
                      ? "text-cyan-600 dark:text-cyan-400"
                      : "text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400",
                  ].join(" ")
                }
                end={item.path === "/"}
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 rounded-full" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <a
              href={resumeLink}
              download
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-600/30"
            >
              Download Resume
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen((s) => !s)}
              className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors duration-200 dark:bg-slate-800 dark:hover:bg-slate-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-slate-700 dark:text-slate-300" /> : <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />}
            </button>
          </div>
        </div>

        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-[34rem] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="py-4 space-y-2 bg-white/90 backdrop-blur-md rounded-b-2xl border-t border-slate-200 dark:bg-slate-900/90 dark:border-slate-800">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "block w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-cyan-600 bg-cyan-50 dark:text-cyan-400 dark:bg-slate-800"
                      : "text-slate-700 hover:text-cyan-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-cyan-400 dark:hover:bg-slate-800",
                  ].join(" ")
                }
                end={item.path === "/"}
              >
                {item.label}
              </NavLink>
            ))}

            <div className="px-4 pt-2">
              <a
                href={resumeLink}
                download
                className="w-full block text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:from-cyan-600 hover:to-blue-700 transition-all duration-200"
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
