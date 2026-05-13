import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { formatPrice } from "@/utils/formatPrice";

export default function CartDrawer() {
  const { t } = useTranslation();
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryCost,
    total,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-[60]"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#111111] border-l border-[#262626] z-[70] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#262626]">
          <h2 className="font-oswald font-bold uppercase text-lg tracking-wider text-white">
            {t("cart.yourCart")}
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={t("cart.closeCart")}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-gray-600 mb-4" />
              <p className="text-gray-400 font-inter">{t("cart.empty")}</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 text-orange-500 font-oswald uppercase text-sm tracking-wider hover:text-orange-400 transition-colors"
              >
                {t("cart.continueShopping")}
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 bg-[#1a1a1a] rounded-lg p-3 border border-[#262626]"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-oswald font-medium text-sm uppercase text-white truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-orange-500 font-oswald font-semibold text-sm mt-1">
                    {formatPrice(item.product.salePrice ?? item.product.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded bg-[#262626] flex items-center justify-center text-white hover:bg-[#333] transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-oswald text-sm w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-7 h-7 rounded bg-[#262626] flex items-center justify-center text-white hover:bg-[#333] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="ml-auto text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#262626] p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-inter">{t("cart.subtotal")}</span>
              <span className="text-white font-oswald">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-inter">{t("cart.delivery")}</span>
              <span className="text-white font-oswald">
                {deliveryCost === 0 ? t("cart.free") : formatPrice(deliveryCost)}
              </span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t border-[#262626]">
              <span className="text-white font-oswald font-bold uppercase">{t("cart.total")}</span>
              <span className="text-orange-500 font-oswald font-bold">
                {formatPrice(total)}
              </span>
            </div>
            <Link
              to="/cart"
              onClick={() => setIsCartOpen(false)}
              className="btn-primary block text-center mt-3"
            >
              {t("cart.viewCart")}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
