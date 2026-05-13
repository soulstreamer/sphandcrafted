import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stepMedia = [
  { media: "/videos/forge-video-1.mp4", poster: "/images/forge-1.jpg" },
  { media: "/videos/forge-video-2.mp4", poster: "/images/forge-2.jpg" },
  { media: "/videos/forge-video-3.mp4", poster: "/images/forge-3.jpg" },
  { media: "/videos/forge-video-4.mp4", poster: "/images/forge-4.jpg" },
  { media: "/videos/forge-video-5.mp4", poster: "/images/forge-5.jpg" },
  { media: "/videos/forge-video-6.mp4", poster: "/images/forge-6.jpg" },
];

function StepCard({ step, index }: { step: { title: string; desc: string; media: string; poster: string }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.from(el, {
      x: index % 2 === 0 ? -60 : 60,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-16`}
    >
      <div className="w-full lg:w-1/2 rounded-lg overflow-hidden border border-[#262626] group">
        <video
          src={step.media}
          poster={step.poster}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[300px] lg:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="w-full lg:w-1/2">
        <h3 className="font-oswald font-bold uppercase text-white text-2xl md:text-3xl tracking-wide">
          {step.title}
        </h3>
        <p className="font-inter text-gray-300 text-base leading-relaxed mt-4">
          {step.desc}
        </p>
      </div>
    </div>
  );
}

export default function HowItsForged() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const steps = t("howItsForged.steps", { returnObjects: true }) as Array<{ title: string; desc: string }>;

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.from(heroRef.current.children, {
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  return (
    <div className="pt-[100px] md:pt-[116px]">
      {/* Hero */}
      <section ref={heroRef} className="relative py-24 px-5 lg:px-20 bg-[#030303] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="font-oswald font-bold uppercase text-white text-4xl md:text-6xl lg:text-7xl tracking-wide text-shadow-hero">
            {t("howItsForged.heroHeading")}
          </h1>
          <p className="font-inter text-gray-400 text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            {t("howItsForged.heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-24 px-5 lg:px-20 bg-[#030303]">
        <div className="max-w-[1100px] mx-auto space-y-24">
          {steps.map((step, i) => (
            <StepCard key={i} step={{ ...step, ...stepMedia[i] }} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 lg:px-20 bg-[#111111] border-t border-[#262626]">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-oswald font-bold uppercase text-white text-3xl md:text-4xl tracking-wide">
            {t("howItsForged.ctaHeading")}
          </h2>
          <p className="font-inter text-gray-400 text-base mt-4 leading-relaxed">
            {t("howItsForged.ctaSubtitle")}
          </p>
          <a href="/shop" className="btn-primary inline-block mt-8">
            {t("howItsForged.ctaButton")}
          </a>
        </div>
      </section>
    </div>
  );
}
