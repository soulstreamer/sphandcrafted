import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Truck,
  ShieldCheck,
  RefreshCw,
  Mail,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Shield,
} from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import { categories, getSaleProducts, getFeaturedProducts, getAdditionalProducts } from "@/data/products";
import { formatPriceSimple } from "@/utils/formatPrice";

gsap.registerPlugin(ScrollTrigger);

/* ─────────── Hero Section ─────────── */
function HeroSection() {
  const { t } = useTranslation();
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    gsap.from(textRef.current.children, {
      y: 30,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        src="/videos/hero-fixed.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/60 via-[#030303]/30 to-[#030303]/80 z-[1]" />

      {/* Hero Content */}
      <div ref={textRef} className="relative z-[2] text-center px-5 max-w-3xl mx-auto">
        <h1 className="font-oswald font-bold uppercase text-shadow-hero text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide">
          <span className="text-orange-500">{t("hero.title1")}</span>
          <span className="text-white"> {t("hero.titleMiddle")} </span>
          <span className="text-orange-500">{t("hero.title2")}</span>
        </h1>
        <p className="font-inter text-gray-300 text-base md:text-lg mt-5 max-w-lg mx-auto leading-relaxed">
          {t("hero.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link to="/shop" className="btn-primary">
            {t("hero.ctaShop")}
          </Link>
          <button
            onClick={() =>
              document
                .getElementById("categories")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-outline"
          >
            {t("hero.ctaCategories")}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Lifetime Guarantee ─────────── */
function GuaranteeSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".g-item"), {
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-5 lg:px-20 bg-[#030303] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-[1280px] mx-auto text-center">
        <div className="g-item inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6">
          <Shield size={36} className="text-orange-500" />
        </div>
        <h2 className="g-item section-heading">{t("guarantee.title")}</h2>
        <p className="g-item font-inter text-gray-400 text-base md:text-lg mt-3 max-w-2xl mx-auto">
          {t("guarantee.subtitle")}
        </p>
        <p className="g-item font-inter text-gray-300 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
          {t("guarantee.desc")}
        </p>
        <Link
          to="/how-its-forged"
          className="g-item btn-outline mt-8 inline-block"
        >
          {t("guarantee.learnMore")}
        </Link>
      </div>
    </section>
  );
}

/* ─────────── Discount Slideshow ─────────── */
function DiscountSlideshow() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const saleProducts = getSaleProducts();

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".animate-item"), {
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const scroll = (dir: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-5 lg:px-20 bg-[#030303]"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-8 animate-item">
          <h2 className="section-heading">{t("sale.heading")}</h2>
          <p className="font-inter text-gray-400 text-base mt-2">
            {t("sale.subtitle")}
          </p>
          <CountdownTimer />
        </div>

        <div className="relative">
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-white hover:bg-orange-500 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-white hover:bg-orange-500 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide px-12 pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {saleProducts.map((product) => (
              <Link
                to={`/product/${product.slug}`}
                key={product.id}
                className="animate-item flex-shrink-0 w-[260px] bg-[#111111] border border-[#262626] rounded-lg overflow-hidden group hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-orange-500 text-white font-oswald font-medium text-[10px] uppercase px-2 py-1 rounded-sm">
                    {t("sale.saleBadge")}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-oswald font-medium text-sm uppercase text-white truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-inter text-sm text-gray-500 line-through">
                      {formatPriceSimple(product.price)}
                    </span>
                    <span className="font-oswald font-semibold text-base text-orange-500">
                      {formatPriceSimple(product.salePrice!)}
                    </span>
                  </div>
                  <span className="inline-block mt-2 font-oswald text-xs uppercase tracking-wider text-orange-500 hover:underline">
                    View Product
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Categories Section ─────────── */
function SectionSeparator() {
  return <div className="h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />;
}

function CategoriesSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".cat-card"), {
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="py-24 px-5 lg:px-20 bg-[#030303]"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading">{t("categories.heading")}</h2>
          <p className="font-inter text-gray-400 text-base mt-2">
            {t("categories.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              to={`/shop?category=${cat.slug}`}
              key={cat.slug}
              className="cat-card relative aspect-[4/5] rounded-lg overflow-hidden group border border-transparent hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 z-[1] bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300" />
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030303]/85 z-[1]" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-[2]">
                <h3 className="font-oswald font-semibold text-lg uppercase text-white group-hover:text-orange-400 transition-colors duration-300">
                  {cat.name}
                </h3>
                <span className="font-oswald text-[11px] uppercase tracking-wider text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t("categories.explore")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Additional Products ─────────── */
function AdditionalProducts() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const additional = getAdditionalProducts();

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".add-card"), {
      y: 40,
      stagger: 0.08,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-5 lg:px-20 bg-[#030303]">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading">{t("moreProducts.heading")}</h2>
          <p className="font-inter text-gray-400 text-base mt-2">
            {t("moreProducts.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {additional.slice(0, 8).map((product) => (
            <Link
              to={`/product/${product.slug}`}
              key={product.id}
              className="add-card bg-[#111111] border border-[#262626] rounded-lg overflow-hidden group hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                  loading="lazy"
                />
              </div>
              <div className="p-4 border-t border-[#262626]">
                <p className="font-inter text-[11px] uppercase tracking-wider text-gray-500">
                  {product.category}
                </p>
                <h3 className="font-oswald font-medium text-sm uppercase text-white mt-1 truncate">
                  {product.name}
                </h3>
                <span className="font-oswald font-semibold text-base text-orange-500 mt-1">
                  {formatPriceSimple(product.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Featured Video Section ─────────── */
function VideoSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !videoRef.current || !overlayRef.current) return;

    const video = videoRef.current;

    video.play().catch(() => {});

    gsap.to(overlayRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: false,
      },
    });
  }, []);

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#030303]"
    >
      <video
        ref={videoRef}
        src="/videos/craft.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#030303]/60 z-[1]" />
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-5 max-w-4xl mx-auto"
      >
        <h2 className="font-oswald font-bold uppercase text-white text-3xl md:text-5xl lg:text-6xl text-shadow-hero">
          {t("video.heading")}
        </h2>
        <p className="font-inter text-gray-300 text-base md:text-lg mt-6 leading-relaxed max-w-2xl">
          {t("video.p1")}
        </p>
        <p className="font-inter text-gray-400 text-sm md:text-base mt-4 leading-relaxed max-w-2xl">
          {t("video.p2")}
        </p>
        <blockquote className="mt-8 border-l-2 border-orange-500 pl-6 max-w-xl">
          <p className="font-inter text-white/80 text-base md:text-lg italic leading-relaxed">
            {t("video.quote")}
          </p>
          <footer className="font-oswald text-orange-500 text-xs uppercase tracking-widest mt-3">
            {t("video.quoteAuthor")}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

/* ─────────── Trust Bar ─────────── */
function TrustBar() {
  const { t } = useTranslation();
  const items = [
    { icon: Truck, title: t("trust.shipping.title"), subtitle: t("trust.shipping.subtitle") },
    { icon: ShieldCheck, title: t("trust.shopping.title"), subtitle: t("trust.shopping.subtitle") },
    { icon: null, title: t("trust.payments.title"), subtitle: t("trust.payments.subtitle") },
    { icon: RefreshCw, title: t("trust.returns.title"), subtitle: t("trust.returns.subtitle") },
  ];

  return (
    <section className="bg-[#111111] border-y border-[#262626] py-12 px-5 lg:px-20">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="flex flex-col items-center text-center gap-2">
            {Icon ? (
              <Icon size={32} className="text-orange-500" />
            ) : (
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 40 28" className="w-8 h-auto"><rect width="40" height="28" rx="3" fill="#1A1F71"/><text x="20" y="19" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="Arial">VISA</text></svg>
                <svg viewBox="0 0 40 28" className="w-8 h-auto"><rect width="40" height="28" rx="3" fill="#EB001B"/><text x="12" y="19" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="Arial">MC</text><circle cx="26" cy="14" r="8" fill="#F79E1B"/></svg>
                <svg viewBox="0 0 40 28" className="w-8 h-auto"><rect width="40" height="28" rx="3" fill="#003087"/><text x="20" y="19" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="Arial">PayPal</text></svg>
                <svg viewBox="0 0 40 28" className="w-8 h-auto"><rect width="40" height="28" rx="3" fill="#4285F4"/><text x="20" y="19" textAnchor="middle" fill="white" fontSize="4.5" fontWeight="bold" fontFamily="Arial">GPay</text></svg>
              </div>
            )}
            <h4 className="font-oswald font-semibold text-sm uppercase tracking-[0.08em] text-white">
              {title}
            </h4>
            <p className="font-inter text-[13px] text-gray-400">{subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────── Featured Products ─────────── */
function FeaturedProducts() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const featured = getFeaturedProducts();

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".feat-card"), {
      y: 40,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });
  }, []);

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="py-24 px-5 lg:px-20 bg-[#030303]"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading">{t("featured.heading")}</h2>
          <p className="font-inter text-gray-400 text-base mt-2">
            {t("featured.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <Link
              to={`/product/${product.slug}`}
              key={product.id}
              className="feat-card bg-[#111111] border border-[#262626] rounded-lg overflow-hidden group hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-oswald font-medium text-sm uppercase text-white truncate">
                  {product.name}
                </h3>
                <p className="font-oswald font-semibold text-base text-orange-500 mt-1">
                  {formatPriceSimple(product.price)}
                </p>
                <span className="inline-block mt-2 font-oswald text-xs uppercase tracking-wider text-orange-500 hover:underline">
                  {t("featured.viewProduct")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Newsletter ─────────── */
function NewsletterSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelector(".newsletter-content"), {
      scale: 0.95,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section ref={sectionRef} className="py-20 px-5 lg:px-20 bg-[#111111]">
      <div className="newsletter-content max-w-[600px] mx-auto text-center">
        <Mail size={32} className="text-orange-500 mx-auto mb-4" />
        <h2 className="section-heading">{t("newsletter.heading")}</h2>
        <p className="font-inter text-gray-400 text-base mt-2">
          {t("newsletter.subtitle")}
        </p>

        {submitted ? (
          <p className="font-oswald text-orange-500 uppercase text-sm tracking-wider mt-6">
            {t("newsletter.success")}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 mt-6 max-w-[480px] mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              required
              className="flex-1 bg-[#030303] border border-[#262626] rounded-sm px-4 py-3 font-inter text-sm text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
            />
            <button type="submit" className="btn-primary">
              {t("newsletter.button")}
            </button>
          </form>
        )}
        <p className="font-inter text-[11px] text-gray-500 mt-3">
          {t("newsletter.disclaimer")}
        </p>
      </div>
    </section>
  );
}

/* ─────────── About Section ─────────── */
function AboutSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const img = sectionRef.current.querySelector(".about-img");
    const txt = sectionRef.current.querySelector(".about-text");
    if (img) {
      gsap.from(img, {
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }
    if (txt) {
      gsap.from(txt, {
        x: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-5 lg:px-20 bg-[#030303]"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="about-img rounded-lg overflow-hidden mx-auto w-full max-w-sm lg:max-w-none">
          <img
            src="/images/about.jpg"
            alt="Artisan crafting a Damascus blade"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
        <div className="about-text text-center lg:text-left flex flex-col items-center lg:items-start">
          <h2 className="section-heading">{t("about.heading")}</h2>
          <p className="font-inter text-gray-300 text-base leading-relaxed mt-5">
            {t("about.p1")}
          </p>
          <p className="font-inter text-gray-300 text-base leading-relaxed mt-4">
            {t("about.p2")}
          </p>
          <Link to="/how-its-forged" className="btn-outline mt-6 inline-block">
            {t("about.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Perspective Text Marquee ─────────── */
function TextMarquee() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const lines = sectionRef.current.querySelectorAll(".marquee-line");

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        lines.forEach((line, i) => {
          const el = line as HTMLElement;
          const speed = i % 2 === 0 ? 1 : -1;
          el.style.transform = `translateX(${speed * progress * 40}%)`;
        });
      },
    });
  }, []);

  const lines = [
    t("marquee.line1"),
    t("marquee.line2"),
    t("marquee.line3"),
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-[#030303] overflow-hidden"
    >
      <div className="space-y-4">
        {lines.map((text, i) => (
          <div
            key={i}
            className="marquee-line whitespace-nowrap"
            style={{
              transform: `translateX(${i % 2 === 0 ? "-20%" : "20%"})`,
            }}
          >
            <span
              className="font-oswald font-bold uppercase text-transparent [-webkit-text-stroke:1.5px_white] inline-block"
              style={{ fontSize: "clamp(28px, 7vw, 80px)" }}
            >
              {text}&nbsp;&nbsp;&nbsp;&nbsp;{text}&nbsp;&nbsp;&nbsp;&nbsp;{text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────── Contact Section ─────────── */
function ContactSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".contact-item"), {
      y: 30,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email) {
      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", message: "" });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-5 lg:px-20 bg-[#030303]"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading">{t("contact.heading")} <span className="text-orange-500">{t("contact.headingOrange")}</span></h2>
          <p className="font-inter text-gray-400 text-base mt-2">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Google Map */}
          <div className="contact-item rounded-lg overflow-hidden border border-orange-500/30 h-[400px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2844.5555555555554!2d26.1!3d44.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDI3JzAwLjAiTiAyNsKwMDYnMDAuMCJF!5e0!3m2!1sen!2sro!4v1600000000000!5m2!1sen!2sro"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SPHandcraft Location"
            />
          </div>

          {/* Contact Form with Info */}
          <div className="contact-item bg-[#111111] border border-orange-500/30 rounded-lg p-6 lg:p-8 flex flex-col justify-center">
            <h3 className="font-oswald font-bold text-lg uppercase text-white tracking-wide mb-6 text-center">
              {t("contact.formTitle")}
            </h3>
            {submitted ? (
              <p className="font-oswald text-orange-500 uppercase text-sm tracking-wider text-center py-12">
                {t("contact.success")}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-oswald text-[11px] uppercase tracking-wider text-gray-400">{t("contact.name")}</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full bg-[#030303] border border-[#262626] rounded-sm px-4 py-3 font-inter text-sm text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none mt-1" placeholder={t("contact.placeholderName")} />
                  </div>
                  <div>
                    <label className="font-oswald text-[11px] uppercase tracking-wider text-gray-400">{t("contact.phone")}</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full bg-[#030303] border border-[#262626] rounded-sm px-4 py-3 font-inter text-sm text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none mt-1" placeholder={t("contact.placeholderPhone")} />
                  </div>
                </div>
                <div>
                  <label className="font-oswald text-[11px] uppercase tracking-wider text-gray-400">{t("contact.email")}</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full bg-[#030303] border border-[#262626] rounded-sm px-4 py-3 font-inter text-sm text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none mt-1" placeholder={t("contact.placeholderEmail")} />
                </div>
                <div>
                  <label className="font-oswald text-[11px] uppercase tracking-wider text-gray-400">{t("contact.message")}</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="w-full bg-[#030303] border border-[#262626] rounded-sm px-4 py-3 font-inter text-sm text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none mt-1 resize-none" placeholder={t("contact.placeholderMessage")} />
                </div>
                <button type="submit" className="btn-primary w-full">{t("contact.submit")}</button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-[#262626]">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-orange-500 flex-shrink-0" />
                  <p className="font-inter text-sm text-gray-400 leading-relaxed text-center">
                    Str. Nicolae Caramfil nr.68-70, bl.22B, sc.2, ap.16, Sector 1, Bucuresti
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a href="tel:+40721557015" className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors">
                    <Phone size={14} className="text-orange-500" />
                    <span className="font-inter text-sm">+40 721 557 015</span>
                  </a>
                  <a href="mailto:info@sphandcraft.com" className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors">
                    <Mail size={14} className="text-orange-500" />
                    <span className="font-inter text-sm">info@sphandcraft.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Main Home Page ─────────── */
export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="pt-[100px] md:pt-[116px]">
      <HeroSection />
      <GuaranteeSection />
      <SectionSeparator />
      <TrustBar />
      <SectionSeparator />
      <DiscountSlideshow />
      <SectionSeparator />
      <CategoriesSection />
      <SectionSeparator />
      <AdditionalProducts />
      <SectionSeparator />
      <VideoSection />
      <SectionSeparator />
      <FeaturedProducts />
      <SectionSeparator />
      <NewsletterSection />
      <SectionSeparator />
      <AboutSection />
      <SectionSeparator />
      <TextMarquee />
      <SectionSeparator />
      <ContactSection />

      {/* Call Us Button */}
      <a
        href="tel:+40721557015"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-oswald font-semibold text-sm uppercase tracking-wider px-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
      >
        <Phone size={16} />
        {t("callUs")}
      </a>
    </div>
  );
}
