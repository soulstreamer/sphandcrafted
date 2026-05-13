import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  Plus,
  Minus,
  Check,
  Truck,
  Shield,
  RotateCcw,
  Star,
} from "lucide-react";
import { getProductBySlug, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice, formatPriceSimple } from "@/utils/formatPrice";

export default function ProductPage() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = getProductBySlug(slug || "");

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setQuantity(1);
    setAdded(false);
    setSelectedImage(0);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 px-5 text-center bg-[#030303]">
        <h1 className="font-oswald font-bold text-2xl text-white uppercase">
          {t("product.notFound")}
        </h1>
        <p className="text-gray-400 mt-2 font-inter">
          {t("product.notFoundDesc")}
        </p>
        <Link to="/shop" className="btn-primary mt-6 inline-block">
          {t("product.backToShop")}
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Related products from same category
  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const deliveryTotal =
    ((product.salePrice ?? product.price) * quantity) >= 200
      ? 0
      : 15;

  const isRo = i18n.language === "ro";

  return (
    <div className="min-h-screen pt-[100px] md:pt-[116px] pb-16 px-5 lg:px-20 bg-[#030303]">
      <div className="max-w-[1280px] mx-auto">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 font-oswald text-xs uppercase tracking-wider text-gray-400 hover:text-orange-500 transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          {t("product.back")}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border border-[#262626]">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
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
                      alt={`${product.name} view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="font-inter text-xs uppercase tracking-wider text-gray-500">
              {product.category}
            </p>
            <h1 className="font-oswald font-bold text-2xl md:text-3xl uppercase text-white mt-2 tracking-wide">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className="text-orange-500"
                  fill="currentColor"
                />
              ))}
              <span className="font-inter text-xs text-gray-500 ml-1">
                {t("product.reviews", { count: 12 })}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-4">
              {product.salePrice ? (
                <>
                  <span className="font-oswald font-bold text-2xl text-orange-500">
                    {formatPriceSimple(product.salePrice)}
                  </span>
                  <span className="font-inter text-lg text-gray-500 line-through">
                    {formatPriceSimple(product.price)}
                  </span>
                  <span className="bg-orange-500/20 text-orange-500 font-oswald text-xs uppercase px-2 py-1 rounded-sm">
                    {isRo
                      ? `SAVE ${(product.price - product.salePrice).toFixed(2)} LEI`
                      : `SAVE EUR ${(product.price - product.salePrice).toFixed(2)}`}
                  </span>
                </>
              ) : (
                <span className="font-oswald font-bold text-2xl text-orange-500">
                  {formatPriceSimple(product.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="font-inter text-gray-300 text-sm leading-relaxed mt-5">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="mt-6 border border-[#262626] rounded-lg overflow-hidden">
              <h3 className="font-oswald font-semibold text-xs uppercase tracking-wider text-white bg-[#1a1a1a] px-4 py-3 border-b border-[#262626]">
                {t("product.specifications")}
              </h3>
              <div className="divide-y divide-[#262626]">
                {product.specifications.map((spec) => (
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

            {/* Delivery Info */}
            <div className="mt-5 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Truck size={16} className="text-orange-500" />
                <span className="font-inter text-xs">
                  {t("product.delivery", { days: product.deliveryDays })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Shield size={16} className="text-orange-500" />
                <span className="font-inter text-xs">{t("product.lifetimeWarranty")}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <RotateCcw size={16} className="text-orange-500" />
                <span className="font-inter text-xs">{t("product.returns")}</span>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center bg-[#111111] border border-[#262626] rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-orange-500 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-oswald text-sm text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-orange-500 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 btn-primary text-center flex items-center justify-center gap-2 ${
                  added ? "bg-green-600 hover:bg-green-600" : ""
                }`}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    {t("product.addedToCart")}
                  </>
                ) : (
                  `${t("product.addToCart")} - ${formatPrice(
                    (product.salePrice ?? product.price) * quantity + deliveryTotal
                  )}`
                )}
              </button>
            </div>

            {deliveryTotal > 0 && quantity * (product.salePrice ?? product.price) < 200 && (
              <p className="font-inter text-xs text-gray-500 mt-3">
                {t("product.freeShippingMore", {
                  amount: (200 - quantity * (product.salePrice ?? product.price)).toFixed(2),
                })}
              </p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-oswald font-bold text-xl uppercase text-white tracking-wide mb-8">
              {t("product.youMayAlsoLike")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <Link
                  to={`/product/${p.slug}`}
                  key={p.id}
                  className="bg-[#111111] border border-[#262626] rounded-lg overflow-hidden group hover:border-orange-500/50 transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 border-t border-[#262626]">
                    <h3 className="font-oswald font-medium text-xs uppercase text-white truncate">
                      {p.name}
                    </h3>
                    <p className="font-oswald font-semibold text-sm text-orange-500 mt-1">
                      {formatPriceSimple(p.salePrice ?? p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
