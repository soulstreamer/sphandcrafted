import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CountdownTimer from "@/components/CountdownTimer";
import { products, categories } from "@/data/products";
import { formatPriceSimple } from "@/utils/formatPrice";

export default function ShopPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [sortBy, setSortBy] = useState("featured");


  const filteredProducts = useMemo(() => {
    let result =
      categoryParam === "all"
        ? products
        : products.filter((p) => p.categorySlug === categoryParam);

    switch (sortBy) {
      case "price-low":
        result = [...result].sort(
          (a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
        );
        break;
      case "price-high":
        result = [...result].sort(
          (a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
        );
        break;
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return result;
  }, [categoryParam, sortBy]);

  const activeCategory = categories.find((c) => c.slug === categoryParam);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-[100px] md:pt-[116px] pb-16 px-5 lg:px-20 bg-[#030303]">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-oswald font-bold uppercase text-white text-3xl md:text-4xl tracking-wide">
            {activeCategory ? activeCategory.name : t("shop.headingAll")}
          </h1>
          <p className="font-inter text-gray-400 text-sm mt-2">
            {t("shop.count", { count: filteredProducts.length })}
            {activeCategory ? ` ${t("shop.in", { category: activeCategory.name })}` : ""}
          </p>
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <span className="font-inter text-sm text-gray-400">{t("shop.sort")}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#111111] border border-[#262626] rounded-sm px-3 py-2 font-inter text-sm text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="featured">{t("shop.sortFeatured")}</option>
              <option value="price-low">{t("shop.sortLow")}</option>
              <option value="price-high">{t("shop.sortHigh")}</option>
              <option value="name">{t("shop.sortName")}</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-[#262626]">
          <button
            onClick={() => setSearchParams({})}
            className={`font-oswald text-xs uppercase tracking-wider px-4 py-2 rounded-sm border transition-colors ${
              categoryParam === "all"
                ? "bg-orange-500 border-orange-500 text-white"
                : "bg-[#111111] border-[#262626] text-gray-400 hover:border-orange-500 hover:text-white"
            }`}
          >
            {t("shop.filterAll")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSearchParams({ category: cat.slug })}
              className={`font-oswald text-xs uppercase tracking-wider px-4 py-2 rounded-sm border transition-colors ${
                categoryParam === cat.slug
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "bg-[#111111] border-[#262626] text-gray-400 hover:border-orange-500 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-inter text-gray-400 text-lg">
              {t("shop.noProducts")}
            </p>
            <button
              onClick={() => setSearchParams({})}
              className="btn-primary mt-4"
            >
              {t("shop.viewAll")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <Link
                to={`/product/${product.slug}`}
                key={product.id}
                className="bg-[#111111] border border-[#262626] rounded-lg overflow-hidden group hover:border-orange-500/50 transition-all duration-300"
              >
                {/* Product image with tabletop exhibition effect */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                    loading="lazy"
                  />
                  {product.isSale && (
                    <span className="absolute top-3 left-3 bg-orange-500 text-white font-oswald font-medium text-[10px] uppercase px-2 py-1 rounded-sm">
                      {t("shop.sale")}
                    </span>
                  )}
                  {product.featured && !product.isSale && (
                    <span className="absolute top-3 left-3 bg-white/10 backdrop-blur text-white font-oswald font-medium text-[10px] uppercase px-2 py-1 rounded-sm border border-white/20">
                      {t("shop.featured")}
                    </span>
                  )}
                  {product.isSale && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-black/60 backdrop-blur rounded-sm px-2 py-1.5">
                        <CountdownTimer compact />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-[#262626]">
                  <p className="font-inter text-[11px] uppercase tracking-wider text-gray-500">
                    {product.category}
                  </p>
                  <h3 className="font-oswald font-medium text-sm uppercase text-white mt-1 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    {product.salePrice ? (
                      <>
                        <span className="font-inter text-sm text-gray-500 line-through">
                          {formatPriceSimple(product.price)}
                        </span>
                        <span className="font-oswald font-semibold text-base text-orange-500">
                          {formatPriceSimple(product.salePrice!)}
                        </span>
                      </>
                    ) : (
                      <span className="font-oswald font-semibold text-base text-orange-500">
                        {formatPriceSimple(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
