import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import PolicyPage from "./pages/PolicyPage";
import HowItsForged from "./pages/HowItsForged";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <ScrollToTop />
      <Header />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/privacy-policy" element={<PolicyPage type="privacy" />} />
        <Route path="/delivery-returns" element={<PolicyPage type="delivery" />} />
        <Route path="/refund-policy" element={<PolicyPage type="refund" />} />
        <Route path="/how-its-forged" element={<HowItsForged />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
