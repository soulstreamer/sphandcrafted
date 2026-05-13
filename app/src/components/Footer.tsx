import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#111111] border-t border-orange-500/30">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img
              src="/images/logo.png"
              alt="SPHandcraft"
              className="h-8 w-auto object-contain mb-4"
            />
            <p className="font-inter text-sm text-gray-400 leading-relaxed">
              {t("footer.brand")}
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-oswald font-semibold text-[13px] uppercase text-white mb-4 tracking-wider">
              {t("footer.shop")}
            </h4>
            <ul className="space-y-2">
              {[
                { label: t("footer.shopLinks.all"), to: "/shop" },
                { label: t("footer.shopLinks.damascus"), to: "/shop?category=damascus" },
                { label: t("footer.shopLinks.hunting"), to: "/shop?category=hunting-camping" },
                { label: t("footer.shopLinks.axes"), to: "/shop?category=outdoor" },
                { label: t("footer.shopLinks.pocket"), to: "/shop?category=pocket-necklace" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-inter text-sm text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-oswald font-semibold text-[13px] uppercase text-white mb-4 tracking-wider">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2">
              {[
                { label: t("footer.companyLinks.about"), id: "about" },
                { label: t("footer.companyLinks.shipping"), to: "/delivery-returns" },
                { label: t("footer.companyLinks.returns"), to: "/refund-policy" },
                { label: t("footer.companyLinks.privacy"), to: "/privacy-policy" },
                { label: t("footer.companyLinks.contact"), id: "contact" },
              ].map((link) => (
                <li key={link.label}>
                  {"to" in link && link.to ? (
                    <Link
                      to={link.to}
                      className="font-inter text-sm text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() =>
                        document
                          .getElementById(link.id!)
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="font-inter text-sm text-gray-400 hover:text-orange-500 transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h4 className="font-oswald font-semibold text-[13px] uppercase text-white mb-4 tracking-wider">
              {t("footer.contactTitle")}
            </h4>
            <div className="space-y-2 font-inter text-sm text-gray-400">
              <p>
                Str. Nicolae Caramfil nr.68-70,
                <br />
                bl.22B, sc.2, ap.16,
                <br />
                Sector 1, Bucuresti
              </p>
              <p className="pt-1">Phone: +40 721 557 015</p>
              <p>Email: info@sphandcraft.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-orange-500/30">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-gray-500">
            {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-orange-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-500 transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
