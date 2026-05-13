import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  Clock,
  Hammer,
  Gavel,
  Shield,
  ChevronRight,
  Trophy,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { auctionItems } from "@/data/products";
import { formatPriceSimple } from "@/utils/formatPrice";

type AuctionItem = (typeof auctionItems)[number];

gsap.registerPlugin(ScrollTrigger);

/* ─────────── Countdown Timer ─────────── */
function AuctionTimer({ endsAt }: { endsAt: Date }) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = endsAt.getTime() - Date.now();
    return Math.max(0, Math.floor(diff / 1000));
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = endsAt.getTime() - Date.now();
      setTimeLeft(Math.max(0, Math.floor(diff / 1000)));
    }, 1000);
    return () => clearInterval(timer);
  }, [endsAt]);

  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);
  const mins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (timeLeft <= 0) {
    return (
      <div className="flex items-center gap-2 text-red-500 font-oswald font-bold text-lg uppercase">
        <Clock size={20} />
        {t("auction.ended")}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Clock size={20} className="text-orange-500" />
      <div className="flex gap-2">
        {days > 0 && (
          <div className="flex flex-col items-center">
            <span className="font-oswald font-bold text-xl text-white bg-[#1a1a1a] border border-[#262626] rounded-sm px-3 py-1.5 min-w-[48px] text-center">
              {pad(days)}
            </span>
            <span className="font-inter text-[10px] uppercase text-gray-500 mt-1">
              {t("auction.days")}
            </span>
          </div>
        )}
        <div className="flex flex-col items-center">
          <span className="font-oswald font-bold text-xl text-white bg-[#1a1a1a] border border-[#262626] rounded-sm px-3 py-1.5 min-w-[48px] text-center">
            {pad(hours)}
          </span>
          <span className="font-inter text-[10px] uppercase text-gray-500 mt-1">
            {t("auction.hours")}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-oswald font-bold text-xl text-orange-500 bg-[#1a1a1a] border border-orange-500/30 rounded-sm px-3 py-1.5 min-w-[48px] text-center">
            {pad(mins)}
          </span>
          <span className="font-inter text-[10px] uppercase text-gray-500 mt-1">
            {t("auction.minutes")}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-oswald font-bold text-xl text-orange-500 bg-[#1a1a1a] border border-orange-500/30 rounded-sm px-3 py-1.5 min-w-[48px] text-center">
            {pad(secs)}
          </span>
          <span className="font-inter text-[10px] uppercase text-gray-500 mt-1">
            {t("auction.seconds")}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Auction Card (listing) ─────────── */
function AuctionCard({ item }: { item: AuctionItem }) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current!, { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current!,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <Link
      to={`/auction/${item.slug}`}
      ref={cardRef}
      className="group bg-[#111111] border border-[#262626] rounded-lg overflow-hidden hover:border-orange-500/50 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-orange-500 text-white font-oswald text-[10px] uppercase px-2.5 py-1 rounded-sm">
          <Gavel size={12} />
          {t("auction.liveBadge")}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <AuctionTimer endsAt={item.endsAt} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-oswald font-bold text-lg uppercase text-white group-hover:text-orange-500 transition-colors">
          {item.name}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="font-inter text-[11px] uppercase text-gray-500">
              {t("auction.currentBid")}
            </p>
            <p className="font-oswald font-bold text-2xl text-orange-500">
              {formatPriceSimple(item.currentBid)}
            </p>
          </div>
          <div className="text-right">
            <p className="font-inter text-[11px] uppercase text-gray-500">
              {t("auction.bids")}
            </p>
            <p className="font-oswald font-semibold text-white">
              {item.totalBids}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[#262626] flex items-center justify-between">
          <span className="font-inter text-xs text-gray-500">
            {t("auction.minBid")}: {formatPriceSimple(item.minBid)}
          </span>
          <span className="font-oswald text-xs uppercase tracking-wider text-orange-500 group-hover:underline flex items-center gap-1">
            {t("auction.placeBid")} <ChevronRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─────────── Auction Detail ─────────── */
function AuctionDetail({ item }: { item: AuctionItem }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [bidSuccess, setBidSuccess] = useState(false);
  const [currentBid, setCurrentBid] = useState(item.currentBid);
  const [totalBids, setTotalBids] = useState(item.totalBids);
  const [bidHistory, setBidHistory] = useState<{ amount: number; time: string }[]>([
    { amount: item.minBid, time: "2 days ago" },
    { amount: item.minBid + 10, time: "1 day ago" },
    { amount: item.currentBid, time: "3 hours ago" },
  ]);

  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!detailRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(detailRef.current!.querySelectorAll(".detail-item"), { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: detailRef.current!,
          start: "top 80%",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const minNextBid = currentBid + 5;

  const handleBid = () => {
    const amount = parseFloat(bidAmount);
    if (amount >= minNextBid) {
      setCurrentBid(amount);
      setTotalBids((prev) => prev + 1);
      setBidHistory((prev) => [
        { amount, time: "Just now" },
        ...prev,
      ]);
      setBidSuccess(true);
      setBidAmount("");
      setTimeout(() => setBidSuccess(false), 3000);
    }
  };

  return (
    <div ref={detailRef} className="max-w-[1280px] mx-auto">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 font-oswald text-xs uppercase tracking-wider text-gray-400 hover:text-orange-500 transition-colors mb-8"
      >
        <ChevronLeft size={16} />
        {t("auction.backToList")}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="detail-item">
          <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border border-[#262626]">
            <img
              src={item.images[selectedImage]}
              alt={item.name}
              className="w-full h-full object-contain p-8"
            />
          </div>
          {item.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {item.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                    i === selectedImage
                      ? "border-orange-500"
                      : "border-[#262626] hover:border-gray-500"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${item.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="detail-item">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 bg-orange-500 text-white font-oswald text-[10px] uppercase px-2.5 py-1 rounded-sm">
              <Gavel size={12} />
              {t("auction.liveBadge")}
            </div>
          </div>

          <h1 className="font-oswald font-bold text-2xl md:text-3xl uppercase text-white tracking-wide">
            {item.name}
          </h1>

          {/* Timer */}
          <div className="mt-6">
            <AuctionTimer endsAt={item.endsAt} />
          </div>

          {/* Current Bid */}
          <div className="mt-6 p-4 bg-[#111111] border border-[#262626] rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-inter text-[11px] uppercase text-gray-500">
                  {t("auction.currentBid")}
                </p>
                <p className="font-oswald font-bold text-3xl text-orange-500">
                  {formatPriceSimple(currentBid)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-inter text-[11px] uppercase text-gray-500">
                  {t("auction.bids")}
                </p>
                <p className="font-oswald font-semibold text-white text-lg">
                  {totalBids}
                </p>
              </div>
            </div>
            <p className="font-inter text-xs text-gray-500 mt-2">
              {t("auction.minBid")}: {formatPriceSimple(item.minBid)}
            </p>
          </div>

          {/* Description */}
          <p className="font-inter text-gray-300 text-sm leading-relaxed mt-5">
            {item.description}
          </p>

          {/* Specifications */}
          <div className="mt-6 border border-[#262626] rounded-lg overflow-hidden">
            <h3 className="font-oswald font-semibold text-xs uppercase tracking-wider text-white bg-[#1a1a1a] px-4 py-3 border-b border-[#262626]">
              {t("auction.specifications")}
            </h3>
            <div className="divide-y divide-[#262626]">
              {item.specifications.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between px-4 py-2.5"
                >
                  <span className="font-inter text-xs text-gray-400">
                    {spec.label}
                  </span>
                  <span className="font-inter text-xs text-white">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bid Input */}
          <div className="mt-6 p-5 bg-[#111111] border border-orange-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Hammer size={18} className="text-orange-500" />
              <h3 className="font-oswald font-bold text-sm uppercase text-white">
                {t("auction.placeYourBid")}
              </h3>
            </div>

            {bidSuccess && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-sm flex items-center gap-2">
                <Trophy size={16} className="text-green-500" />
                <span className="font-inter text-sm text-green-400">
                  {t("auction.bidSuccess")}
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="font-inter text-xs text-gray-500 mb-1 block">
                  {t("auction.bidAmount")} ({t("auction.minNextBid")}: {formatPriceSimple(minNextBid)})
                </label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder={minNextBid.toString()}
                  min={minNextBid}
                  className="w-full bg-[#030303] border border-[#262626] rounded-sm px-4 py-3 font-oswald text-lg text-white placeholder:text-gray-600 focus:border-orange-500 focus:outline-none"
                />
              </div>
              <button
                onClick={handleBid}
                disabled={!bidAmount || parseFloat(bidAmount) < minNextBid}
                className="btn-primary self-end disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Gavel size={16} />
                {t("auction.submitBid")}
              </button>
            </div>
          </div>

          {/* Bid History */}
          <div className="mt-6">
            <h3 className="font-oswald font-semibold text-xs uppercase tracking-wider text-white mb-3">
              {t("auction.bidHistory")}
            </h3>
            <div className="space-y-2">
              {bidHistory.map((bid, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-[#111111] border border-[#262626] rounded-sm"
                >
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-orange-500" />
                    <span className="font-oswald text-sm text-white">
                      {formatPriceSimple(bid.amount)}
                    </span>
                  </div>
                  <span className="font-inter text-xs text-gray-500">
                    {bid.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Auction Page ─────────── */
export default function AuctionPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const item = auctionItems.find((a) => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="min-h-screen pt-[100px] md:pt-[116px] pb-16 px-5 lg:px-20 bg-[#030303]">
      {item ? (
        <AuctionDetail item={item} />
      ) : (
        <>
          {/* Auction Listing */}
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Gavel size={28} className="text-orange-500" />
                <h1 className="font-oswald font-bold uppercase text-white text-3xl md:text-4xl tracking-wide">
                  {t("auction.heading")}
                </h1>
              </div>
              <p className="font-inter text-gray-400 text-base max-w-2xl mx-auto">
                {t("auction.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctionItems.map((item) => (
                <AuctionCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
