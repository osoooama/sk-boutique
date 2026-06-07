"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getProductPrice, getDiscountRate, generateConfetti } from "@/lib/utils";
import PRODUCTS from "@/data/products";
import TRANSLATIONS from "@/data/translations";

import ConfettiOverlay from "@/components/ConfettiOverlay";
import ToastNotifications from "@/components/ToastNotifications";
import WelcomeSplash from "@/components/WelcomeSplash";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesStrip from "@/components/FeaturesStrip";
import VideoSection from "@/components/VideoSection";
import CatalogSection from "@/components/CatalogSection";
import AboutSection from "@/components/AboutSection";
import FeedbackSection from "@/components/FeedbackSection";
import CartDrawer from "@/components/CartDrawer";
import ProductModal from "@/components/ProductModal";
import CheckoutModal from "@/components/CheckoutModal";
import MobileSearch from "@/components/MobileSearch";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import InstagramFAB from "@/components/InstagramFAB";
import BackToTop from "@/components/BackToTop";
import SizeGuideModal from "@/components/SizeGuideModal";
import ProductSkeleton from "@/components/ProductSkeleton";

let toastIdCounter = 0;

export default function Home() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isThemeDark, setIsThemeDark] = useState(true);
  const [isEnglish, setIsEnglish] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sk_lang") === "en";
    }
    return false;
  });
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoInput, setPromoInput] = useState("");
  const [toasts, setToasts] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState([]);
  const [cartWobble, setCartWobble] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [feedbackPage, setFeedbackPage] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const searchInputRef = useRef(null);

  const anyModalOpen = cartOpen || checkoutOpen || selectedProduct || sizeGuideOpen || mobileSearchOpen;

  useEffect(() => {
    if (anyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [anyModalOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const lang = isEnglish ? "en" : "ar";
    localStorage.setItem("sk_lang", lang);
    document.documentElement.dir = isEnglish ? "ltr" : "rtl";
    document.documentElement.lang = lang;
  }, [isEnglish]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedCart = localStorage.getItem("sk_cart");
        if (savedCart) setCart(JSON.parse(savedCart));

        const savedWishlist = localStorage.getItem("sk_wishlist");
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

        const hasVisited = localStorage.getItem("sk_has_visited");
        if (!hasVisited) setWelcomeVisible(true);

        const savedPromo = localStorage.getItem("sk_promo");
        if (savedPromo) setAppliedPromo(savedPromo);

        const savedTheme = localStorage.getItem("sk_theme") || "dark";
        setIsThemeDark(savedTheme === "dark");
        document.body.classList.toggle("dark-theme", savedTheme === "dark");
        document.body.classList.toggle("light-theme", savedTheme !== "dark");
      } catch (e) {
        // Silently handle JSON parse errors for corrupted localStorage
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setProductsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const t = useCallback((key) => {
    return TRANSLATIONS[isEnglish ? "en" : "ar"][key] || key;
  }, [isEnglish]);

  const addToast = useCallback((message, type = "info") => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsThemeDark((prev) => {
      const next = !prev;
      localStorage.setItem("sk_theme", next ? "dark" : "light");
      document.body.classList.toggle("dark-theme", next);
      document.body.classList.toggle("light-theme", !next);
      addToast(
        isEnglish
          ? next ? "Switched to luxurious Dark mode" : "Switched to elegant Light mode"
          : next ? "تم التحويل لمظهر الداكن الفاخر" : "تم التحويل للمظهر المضيء",
        "info"
      );
      return next;
    });
  }, [isEnglish, addToast]);

  const toggleWishlist = useCallback((e, id) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem("sk_wishlist", JSON.stringify(updated));
      addToast(
        isEnglish
          ? exists ? "Removed from wishlist" : "Added to wishlist"
          : exists ? "تمت إزالة القطعة من المفضلة" : "تمت إضافة القطعة للمفضلة لديك",
        exists ? "info" : "success"
      );
      return updated;
    });
  }, [isEnglish, addToast]);

  const applyPromoCode = useCallback((codeToApply, overrideInput) => {
    const code = codeToApply || overrideInput?.trim() || "";
    if (!code) return;
    const rate = getDiscountRate(code);
    if (rate > 0) {
      const codeUpper = code.toUpperCase();
      setAppliedPromo(codeUpper);
      localStorage.setItem("sk_promo", codeUpper);
      addToast(
        isEnglish ? "Discount code applied successfully — 10% off!" : "تم تطبيق رمز الخصم بنجاح بنسبة 10%!",
        "success"
      );
      setPromoInput("");
    } else {
      addToast(isEnglish ? "Sorry, this promo code is invalid" : "عذراً، رمز الخصم هذا غير صحيح أو غير مفعل حالياً", "danger");
    }
  }, [isEnglish, addToast]);

  const triggerConfetti = useCallback(() => {
    const particles = generateConfetti(80);
    setConfettiParticles(particles);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setConfettiParticles([]);
    }, 5000);
  }, []);

  const handleNewsletterSubscribe = useCallback((email) => {
    addToast(
      isEnglish
        ? "You have subscribed to our newsletter! Stay tuned for exclusive offers."
        : "تم اشتراكك في نشرتنا البريدية! ترقبي العروض الحصرية.",
      "success"
    );
  }, [isEnglish, addToast]);

  const addToCart = useCallback((productId, size, colorName, image, quantity = 1) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === productId && item.size === size && item.color === colorName
      );
      let updated;
      if (existingIndex > -1) {
        updated = [...prev];
        updated[existingIndex].quantity += quantity;
      } else {
        updated = [
          ...prev,
          {
            id: productId,
            title: product.title,
            price: getProductPrice(product, size, colorName),
            image: image || product.colors[0].image,
            size,
            color: colorName,
            quantity
          }
        ];
      }
      localStorage.setItem("sk_cart", JSON.stringify(updated));
      return updated;
    });

    addToast(
      isEnglish
        ? `Added "${isEnglish ? product.englishTitle : product.title}" to shopping bag`
        : `تمت إضافة "${product.title}" إلى حقيبة التسوق`,
      "success"
    );
    setCartWobble(true);
    setTimeout(() => setCartWobble(false), 600);
  }, [isEnglish, addToast]);

  const changeQty = useCallback((index, delta) => {
    setCart((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index].quantity += delta;
        if (updated[index].quantity <= 0) {
          addToast(isEnglish ? `Removed from bag` : `تمت إزالة القطعة من السلة`, "info");
          updated.splice(index, 1);
        }
      }
      localStorage.setItem("sk_cart", JSON.stringify(updated));
      return updated;
    });
  }, [isEnglish, addToast]);

  const removeCartItem = useCallback((index) => {
    setCart((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        addToast(isEnglish ? `Removed from bag` : `تمت إزالة القطعة من حقيبة التسوق`, "info");
        updated.splice(index, 1);
      }
      localStorage.setItem("sk_cart", JSON.stringify(updated));
      return updated;
    });
  }, [isEnglish, addToast]);

  const openProductDetails = useCallback((prod) => {
    setSelectedProduct(prod);
  }, []);

  const handleOrderSuccess = useCallback((orderId, paymentMethod) => {
    setCart([]);
    localStorage.removeItem("sk_cart");
    localStorage.removeItem("sk_promo");
    setAppliedPromo(null);
    addToast(
      isEnglish
        ? "Thank you for shopping! Your order has been placed and the agent will contact you shortly."
        : "شكراً لتسوقك! تم تسجيل طلبك وسيتواصل معك المندوب قريباً لتسليمه",
      "success"
    );
  }, [isEnglish, addToast]);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountRate = appliedPromo ? getDiscountRate(appliedPromo) : 0;
  const cartDiscountAmount = cartSubtotal * discountRate;
  const cartTotalPrice = cartSubtotal - cartDiscountAmount;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`min-h-screen ${isThemeDark ? "dark-theme" : "light-theme"}`}>
      <div className="bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 border-b border-gold/20 text-center py-1.5 text-[10px] md:text-xs text-gold/60 font-medium tracking-wide">
        <i className="fas fa-sparkles text-[9px] mr-1" /> {isEnglish ? "🇯🇴 Jordanian craftsmanship · European quality 🇪🇺" : "🇯🇴 صناعة أردنية · جودة أوروبية 🇪🇺"}
      </div>
      <ConfettiOverlay particles={showConfetti ? confettiParticles : []} />

      <WelcomeSplash
        visible={welcomeVisible}
        isEnglish={isEnglish}
        onEnter={() => {
          setWelcomeVisible(false);
          localStorage.setItem("sk_has_visited", "true");
          addToast(isEnglish ? "Welcome to Sara Krishan Store!" : "أهلاً بك في متجر سارة كريشان!", "success");
        }}
      />

      <ToastNotifications toasts={toasts} />

      <Navbar
        isEnglish={isEnglish}
        isThemeDark={isThemeDark}
        searchQuery={searchQuery}
        cartCount={cartCount}
        cartWobble={cartWobble}
        wishlistCount={wishlist.length}
        onToggleTheme={toggleTheme}
        onToggleLang={() => setIsEnglish(!isEnglish)}
        onSearchChange={setSearchQuery}
        onCartOpen={() => setCartOpen(true)}
        onSizeGuideOpen={() => setSizeGuideOpen(true)}
        onWishlistOpen={() => {}}
        searchInputRef={searchInputRef}
      />

      <HeroSection
        isEnglish={isEnglish}
        onApplyPromo={applyPromoCode}
      />

      <div data-reveal className="opacity-0"><FeaturesStrip isEnglish={isEnglish} /></div>

      <div data-reveal className="opacity-0"><VideoSection
        isEnglish={isEnglish}
        onApplyPromo={applyPromoCode}
      /></div>

      <div data-reveal className="opacity-0">
        {productsLoading ? <ProductSkeleton count={4} /> : <CatalogSection
          isEnglish={isEnglish}
          wishlist={wishlist}
          searchQuery={searchQuery}
          activeCategory={activeCategory}
          sortBy={sortBy}
          onSetActiveCategory={setActiveCategory}
          onSetSortBy={setSortBy}
          onSearchChange={setSearchQuery}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
          onOpenDetails={openProductDetails}
        />}
      </div>

      <div data-reveal className="opacity-0"><AboutSection isEnglish={isEnglish} /></div>

      <div data-reveal className="opacity-0"><FeedbackSection
        isEnglish={isEnglish}
        feedbackPage={feedbackPage}
        onSetFeedbackPage={setFeedbackPage}
      /></div>

      <CartDrawer
        isOpen={cartOpen}
        isEnglish={isEnglish}
        cart={cart}
        promoInput={promoInput}
        appliedPromo={appliedPromo}
        cartSubtotal={cartSubtotal}
        cartDiscountAmount={cartDiscountAmount}
        cartTotalPrice={cartTotalPrice}
        cartCount={cartCount}
        onClose={() => setCartOpen(false)}
        onSetPromoInput={setPromoInput}
        onApplyPromo={() => applyPromoCode(null, promoInput)}
        onChangeQty={changeQty}
        onRemoveItem={removeCartItem}
        onProceedCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <ProductModal
        product={selectedProduct}
        isEnglish={isEnglish}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        isEnglish={isEnglish}
        cartTotalPrice={cartTotalPrice}
        onClose={() => setCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
        onTriggerConfetti={triggerConfetti}
      />

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        isEnglish={isEnglish}
        onClose={() => setSizeGuideOpen(false)}
      />

      <MobileSearch
          isOpen={mobileSearchOpen}
          isEnglish={isEnglish}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClose={() => {
          setMobileSearchOpen(false);
          setSearchQuery("");
        }}
      />

      <BottomNav
        isEnglish={isEnglish}
        isThemeDark={isThemeDark}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onToggleTheme={toggleTheme}
        onMobileSearchOpen={() => setMobileSearchOpen(true)}
      />

      <Footer isEnglish={isEnglish} onNewsletterSubscribe={handleNewsletterSubscribe} />

      <BackToTop />

      <InstagramFAB />
    </div>
  );
}
