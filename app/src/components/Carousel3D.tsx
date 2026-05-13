import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { products } from "@/data/products";
import { formatPriceSimple } from "@/utils/formatPrice";

export default function Carousel3D() {
  const { t } = useTranslation();
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const autoRotateRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const cards = [
    products.find((p) => p.slug === "damascus-folding-knife"),
    products.find((p) => p.slug === "viking-bearded-axe"),
    products.find((p) => p.slug === "full-tang-hunting-knife"),
  ].filter(Boolean);

  useEffect(() => {
    const animate = (time: number) => {
      if (!isDragging) {
        const delta = time - lastTimeRef.current;
        autoRotateRef.current += delta * 0.00025;
      }
      lastTimeRef.current = time;
      setRotation((prev) => {
        const target = autoRotateRef.current;
        return prev + (target - prev) * 0.05;
      });
      frameRef.current = requestAnimationFrame(animate);
    };
    lastTimeRef.current = performance.now();
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = (e.clientX - startX) * 0.005;
    autoRotateRef.current += delta;
    setStartX(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const cardCount = cards.length;
  const angleStep = (2 * Math.PI) / cardCount;
  const radius = 220;

  return (
    <div
      className="relative w-full h-[400px] md:h-[450px] cursor-grab active:cursor-grabbing"
      style={{ perspective: "800px" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${rotation}rad)`,
          transition: isDragging ? "none" : "transform 0.1s ease-out",
        }}
      >
        {cards.map((card, i) => {
          if (!card) return null;
          const angle = angleStep * i - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const cardRotation = -(rotation + angle) * (180 / Math.PI) - 90;

          return (
            <div
              key={card.slug}
              className="absolute"
              style={{
                transform: `translateX(${x}px) translateZ(${z}px) rotateY(${cardRotation}deg)`,
                transformStyle: "preserve-3d",
                width: "160px",
              }}
            >
              {/* Card back */}
              <div
                className="absolute inset-0 rounded-lg bg-[#1a1a1a] border border-[#333]"
                style={{
                  transform: "rotateY(180deg) translateZ(1px)",
                  backfaceVisibility: "hidden",
                  width: "160px",
                  height: "220px",
                }}
              />
              {/* Card front */}
              <div
                className="relative rounded-lg overflow-hidden bg-[#111] border border-[#262626] shadow-2xl"
                style={{
                  backfaceVisibility: "hidden",
                  width: "160px",
                  height: "220px",
                }}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-[160px] object-cover"
                  draggable={false}
                />
                <div className="p-2 text-center">
                  <p className="font-oswald font-medium text-[11px] uppercase text-white truncate">
                    {card.name}
                  </p>
                  <p className="font-oswald font-semibold text-sm text-orange-500">
                    {formatPriceSimple(card.salePrice ?? card.price)}
                  </p>
                </div>
              </div>
              {/* HTML Label below card */}
              <div
                className="absolute text-center"
                style={{
                  top: "230px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "180px",
                }}
              >
                <Link
                  to={`/product/${card.slug}`}
                  className="font-oswald text-[10px] uppercase tracking-wider text-orange-500 hover:text-orange-400 transition-colors"
                >
                  {t("carousel.viewProduct")}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
