import i18n from "i18next";

export function formatPrice(price: number): string {
  const lang = i18n.language;
  if (lang === "ro") return `${price.toFixed(2)} LEI`;
  return `EUR ${price.toFixed(2)}`;
}

export function formatPriceSimple(price: number): string {
  const lang = i18n.language;
  if (lang === "ro") return `${price} LEI`;
  return `EUR ${price}`;
}
