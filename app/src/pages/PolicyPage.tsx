import { useTranslation } from "react-i18next";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface PolicyPageProps {
  type: "privacy" | "delivery" | "refund";
}

const policies = {
  privacy: {
    titleKey: "policy.privacy",
    content: [
      {
        heading: "1. Introduction",
        text: "SPHandcraft is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.",
      },
      {
        heading: "2. Information We Collect",
        text: "We collect personal information that you voluntarily provide to us when you register on our website, place an order, subscribe to our newsletter, or contact us. This may include your name, email address, phone number, shipping address, and payment information.",
      },
      {
        heading: "3. How We Use Your Information",
        text: "We use the information we collect to process your orders, communicate with you about your purchases, send promotional emails (if you have opted in), improve our website and services, and comply with legal obligations.",
      },
      {
        heading: "4. Information Sharing",
        text: "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, as long as they agree to keep this information confidential.",
      },
      {
        heading: "5. Data Security",
        text: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All transactions are processed through secure SSL encryption.",
      },
      {
        heading: "6. Cookies",
        text: "We use cookies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can choose to disable cookies through your browser settings.",
      },
      {
        heading: "7. Your Rights",
        text: "You have the right to access, correct, or delete your personal information. You may also opt out of receiving promotional communications from us at any time by clicking the unsubscribe link in our emails.",
      },
      {
        heading: "8. Contact Us",
        text: "If you have any questions about this Privacy Policy, please contact us at info@sphandcraft.com or call +40 721 557 015.",
      },
    ],
  },
  delivery: {
    titleKey: "policy.delivery",
    content: [
      {
        heading: "1. Shipping Methods",
        text: "We offer several shipping options to meet your needs. Standard shipping takes 3-5 business days within Romania. Express shipping (1-2 business days) is available for an additional fee. International shipping typically takes 7-14 business days depending on the destination.",
      },
      {
        heading: "2. Shipping Costs",
        text: "Standard delivery is EUR 15 for orders under EUR 200. Orders over EUR 200 qualify for FREE standard shipping. Express shipping costs EUR 25. International shipping rates vary by destination and will be calculated at checkout.",
      },
      {
        heading: "3. Order Processing",
        text: "Orders are processed within 1-2 business days. You will receive a confirmation email with tracking information once your order has been shipped. Please ensure your shipping address is correct as we cannot be responsible for orders shipped to incorrect addresses.",
      },
      {
        heading: "4. Delivery Times",
        text: "Delivery times are estimates and begin from the date of shipping, not the date of order. While we make every effort to meet these estimates, delays may occur due to customs, weather, or other circumstances beyond our control.",
      },
      {
        heading: "5. Returns Policy",
        text: "We accept returns within 30 days of delivery. Items must be unused, in their original packaging, and in the same condition as received. Custom or personalized items cannot be returned unless defective.",
      },
      {
        heading: "6. How to Return",
        text: "To initiate a return, please contact us at info@sphandcraft.com with your order number and reason for return. We will provide you with a return authorization and instructions. Return shipping costs are the responsibility of the customer unless the item is defective.",
      },
      {
        heading: "7. Refunds",
        text: "Once your return is received and inspected, we will send you an email notification. Refunds will be processed within 5-7 business days and will be credited to your original payment method. Shipping costs are non-refundable.",
      },
      {
        heading: "8. Damaged or Defective Items",
        text: "If you receive a damaged or defective item, please contact us immediately at +40 721 557 015 or info@sphandcraft.com. We will arrange for a replacement or full refund, including shipping costs.",
      },
    ],
  },
  refund: {
    titleKey: "policy.refund",
    content: [
      {
        heading: "1. Overview",
        text: "At SPHandcraft, we stand behind the quality of our products. If you are not completely satisfied with your purchase, we offer a straightforward return and refund process.",
      },
      {
        heading: "2. Eligibility for Returns",
        text: "To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging. Returns must be initiated within 30 days of the delivery date.",
      },
      {
        heading: "3. Non-Returnable Items",
        text: "The following items cannot be returned: custom or personalized orders, gift cards, items that have been used or damaged by the customer, and items returned more than 30 days after delivery.",
      },
      {
        heading: "4. Return Process",
        text: "Contact our customer service team at info@sphandcraft.com to request a Return Authorization Number (RAN). Package the item securely in its original packaging, include the RAN, and ship to the address provided by our team.",
      },
      {
        heading: "5. Refund Processing",
        text: "Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. Approved refunds are processed within 5-7 business days to your original payment method.",
      },
      {
        heading: "6. Partial Refunds",
        text: "Partial refunds may be granted for items that are returned with obvious signs of use, damaged packaging, or missing parts not due to our error.",
      },
      {
        heading: "7. Late or Missing Refunds",
        text: "If you have not received your refund after 10 business days, first check with your bank or credit card company. If you still have not received it, contact us at info@sphandcraft.com.",
      },
      {
        heading: "8. Exchanges",
        text: "We only replace items if they are defective or damaged. If you need to exchange an item for the same product, contact us at +40 721 557 015 and we will arrange the exchange at no additional cost.",
      },
    ],
  },
};

export default function PolicyPage({ type }: PolicyPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const policy = policies[type];

  return (
    <div className="min-h-screen pt-[100px] md:pt-[116px] pb-16 px-5 lg:px-20 bg-[#030303]">
      <div className="max-w-[800px] mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 font-oswald text-xs uppercase tracking-wider text-gray-400 hover:text-orange-500 transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          {t("policy.back")}
        </button>

        <h1 className="font-oswald font-bold text-2xl md:text-3xl uppercase text-white tracking-wide mb-10">
          {t(policy.titleKey)}
        </h1>

        <div className="space-y-8">
          {policy.content.map((section, i) => (
            <div key={i}>
              <h2 className="font-oswald font-semibold text-sm uppercase tracking-wider text-orange-500 mb-2">
                {section.heading}
              </h2>
              <p className="font-inter text-sm text-gray-300 leading-relaxed">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#262626]">
          <p className="font-inter text-xs text-gray-500">
            {t("policy.lastUpdated")} If you have any questions about our
            policies, please{" "}
            <Link
              to="/"
              onClick={() =>
                setTimeout(
                  () =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  100
                )
              }
              className="text-orange-500 hover:underline"
            >
              {t("policy.contactUs")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
