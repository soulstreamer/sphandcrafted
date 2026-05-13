import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Minus, Plus, Trash2, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";

export default function CartPage() {
  const { t } = useTranslation();
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryCost,
    total,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-5 flex flex-col items-center justify-center bg-[#030303]">
        <ShoppingBag size={64} className="text-gray-600 mb-6" />
        <h1 className="font-oswald font-bold text-2xl uppercase text-white tracking-wide">
          {t("cart.emptyTitle")}
        </h1>
        <p className="font-inter text-gray-400 text-sm mt-2">
          {t("cart.emptyDesc")}
        </p>
        <Link to="/shop" className="btn-primary mt-8">
          {t("cart.startShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[100px] md:pt-[116px] pb-16 px-5 lg:px-20 bg-[#030303]">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="font-oswald font-bold text-2xl uppercase text-white tracking-wide mb-8">
          {t("cart.shoppingCart")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
              <span className="font-inter text-sm text-gray-400">
                {t("cart.items", { count: items.reduce((s, i) => s + i.quantity, 0) })}
              </span>
              <button
                onClick={clearCart}
                className="font-oswald text-xs uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors"
              >
                {t("cart.clearCart")}
              </button>
            </div>

            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 bg-[#111111] border border-[#262626] rounded-lg p-4"
              >
                <Link
                  to={`/product/${item.product.slug}`}
                  className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain p-2"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="font-oswald font-medium text-sm uppercase text-white hover:text-orange-500 transition-colors truncate block"
                  >
                    {item.product.name}
                  </Link>
                  <p className="font-oswald font-semibold text-orange-500 text-sm mt-1">
                    {formatPrice(item.product.salePrice ?? item.product.price)}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center bg-[#1a1a1a] border border-[#262626] rounded-sm">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center text-white hover:text-orange-500 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-oswald text-xs text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center text-white hover:text-orange-500 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-[#111111] border border-[#262626] rounded-lg p-6 h-fit">
            <h2 className="font-oswald font-bold text-sm uppercase tracking-wider text-white mb-6">
              {t("cart.orderSummary")}
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between font-inter text-sm">
                <span className="text-gray-400">{t("cart.subtotal")}</span>
                <span className="text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-inter text-sm">
                <span className="text-gray-400 flex items-center gap-1">
                  <Truck size={14} />
                  {t("cart.delivery")}
                </span>
                <span className="text-white">
                  {deliveryCost === 0 ? (
                    <span className="text-green-500">{t("cart.free")}</span>
                  ) : (
                    formatPrice(deliveryCost)
                  )}
                </span>
              </div>

              {deliveryCost > 0 && (
                <p className="font-inter text-xs text-gray-500">
                  {t("cart.freeShippingOver")}
                </p>
              )}

              <div className="border-t border-[#262626] pt-3 flex justify-between">
                <span className="font-oswald font-bold text-sm uppercase text-white">
                  {t("cart.total")}
                </span>
                <span className="font-oswald font-bold text-lg text-orange-500">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert("Checkout coming soon!")}
              className="btn-primary w-full text-center mt-6"
            >
              {t("cart.proceedToCheckout")}
            </button>

            <Link
              to="/shop"
              className="block text-center font-oswald text-xs uppercase tracking-wider text-gray-400 hover:text-orange-500 transition-colors mt-4"
            >
              {t("cart.continueShoppingLink")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
