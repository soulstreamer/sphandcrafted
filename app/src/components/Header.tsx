import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
  { code: "ro", label: "RO" },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [langOpen, setLangOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setLangOpen(false);
  }, [i18n.language]);

  const isHome = location.pathname === "/";

  const scrollToSection = (id: string) => {
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
  };

  const navLink = "font-oswald font-medium uppercase text-xs tracking-[0.1em] text-white relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 after:w-0 hover:after:w-full px-3";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {announcementVisible && (
        <div className="h-9 bg-orange-600 border-b border-orange-700 flex items-center justify-center">
          <p className="font-oswald font-medium text-[11px] uppercase tracking-[0.12em] text-white text-center px-10">
            {t("announcement")}
          </p>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-3 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      )}

      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#030303]/90 backdrop-blur-md border-b border-white/20"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between md:justify-center h-16 md:h-20 px-4 md:px-0">
          {/* Left Links - Desktop */}
          <div className="hidden md:flex items-center gap-0">
            <button
              onClick={() => scrollToSection("hero")}
              className={navLink}
            >
              {t("nav.home")}
            </button>
            <span className="inline-block w-px h-5 bg-white/80 mx-2" />
            <Link
              to="/shop"
              className="font-oswald font-medium uppercase text-xs tracking-[0.1em] text-white bg-orange-500 hover:bg-orange-600 px-4 py-1.5 rounded-sm transition-colors"
            >
              {t("nav.shop")}
            </Link>
            <span className="inline-block w-px h-5 bg-white/80 mx-2" />
            <Link
              to="/how-its-forged"
              className={navLink}
            >
              {t("nav.howItsMade")}
            </Link>
            <span className="inline-block w-px h-5 bg-white/80 mx-2" />
            <Link
              to="/auction"
              className="font-oswald font-medium uppercase text-xs tracking-[0.1em] text-orange-500 relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 after:w-0 hover:after:w-full px-3"
            >
              {t("nav.auction")}
            </Link>
          </div>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mx-auto md:mx-6 group">
            <img
              src="/images/logo.png"
              alt="SPHandcraft"
              className="h-12 md:h-36 w-auto object-contain transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.5)]"
            />
          </Link>

          {/* Right Links - Desktop */}
          <div className="hidden md:flex items-center gap-0">
            <a
              href="https://www.facebook.com/sinanpashaRo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors px-2"
              aria-label="Facebook"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href="https://www.instagram.com/sphandcraftromania/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors px-2"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <button
              onClick={() => scrollToSection("video")}
              className={navLink}
            >
              {t("nav.about")}
            </button>
            <span className="inline-block w-px h-5 bg-white/80 mx-2" />
            <button
              onClick={() => scrollToSection("contact")}
              className={navLink}
            >
              {t("nav.contact")}
            </button>
            <span className="inline-block w-px h-5 bg-white/80 mx-2" />
            {/* Language Switcher */}
            <div className="relative px-2">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-gray-400 hover:text-orange-500 transition-colors font-oswald text-xs uppercase tracking-wider"
              >
                <Globe size={14} />
                {i18n.language.toUpperCase()}
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 bg-[#111111] border border-[#262626] rounded-sm shadow-lg min-w-[70px] overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLang(lang.code)}
                      className={`block w-full text-left px-4 py-2 font-oswald text-xs uppercase tracking-wider transition-colors ${
                        i18n.language === lang.code
                          ? "text-orange-500 bg-orange-500/10"
                          : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white hover:text-orange-500 transition-colors px-3"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-1 bg-orange-500 text-white text-[10px] font-oswald font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: Cart + Hamburger + Language */}
          <div className="md:hidden flex items-center gap-1">
            {/* Mobile Lang Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="text-gray-400 hover:text-orange-500 transition-colors font-oswald text-[11px] uppercase tracking-wider px-1"
              >
                {i18n.language.toUpperCase()}
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-1 bg-[#111111] border border-[#262626] rounded-sm shadow-lg min-w-[70px] overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLang(lang.code)}
                      className={`block w-full text-left px-4 py-2 font-oswald text-xs uppercase tracking-wider transition-colors ${
                        i18n.language === lang.code
                          ? "text-orange-500 bg-orange-500/10"
                          : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white hover:text-orange-500 transition-colors p-1"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] font-oswald font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white hover:text-orange-500 transition-colors p-1"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#030303]/95 backdrop-blur-md border-t border-[#262626]">
            <div className="flex flex-col px-6 py-4 gap-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="font-oswald font-medium uppercase text-sm tracking-[0.1em] text-white hover:text-orange-500 text-left transition-colors"
              >
                {t("nav.home")}
              </button>
              <Link
                to="/shop"
                className="font-oswald font-medium uppercase text-sm tracking-[0.1em] text-white bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-sm transition-colors w-fit"
              >
                {t("nav.shop")}
              </Link>
              <Link
                to="/how-its-forged"
                className="font-oswald font-medium uppercase text-sm tracking-[0.1em] text-white hover:text-orange-500 transition-colors"
              >
                {t("nav.howItsMade")}
              </Link>
              <button
                onClick={() => scrollToSection("video")}
                className="font-oswald font-medium uppercase text-sm tracking-[0.1em] text-white hover:text-orange-500 text-left transition-colors"
              >
                {t("nav.about")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="font-oswald font-medium uppercase text-sm tracking-[0.1em] text-white hover:text-orange-500 text-left transition-colors"
              >
                {t("nav.contact")}
              </button>
              <Link
                to="/auction"
                className="font-oswald font-medium uppercase text-sm tracking-[0.1em] text-orange-500 hover:text-orange-400 transition-colors"
              >
                {t("nav.auction")}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
