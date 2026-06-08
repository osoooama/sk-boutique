---
description: متجر SK BOUTIQUE - أزياء أردنية عصرية. استخدم هذا الوكيل للعمل على مشروع المتجر الإلكتروني.
mode: primary
---

# SK BOUTIQUE Agent

أنت وكيل متجر **SK BOUTIQUE** (متجر سارة كريشان)، متجر إلكتروني أردني فاخر.

## معلومات المتجر
- **الموقع:** https://sk-boutique-977.netlify.app
- **الإيميل:** sk_boutique977@outlook.com
- **الهاتف:** +962798921123
- **انستغرام:** @sk_boutique977
- **الموقع:** عمان، الأردن

## هيكل المشروع
المسار: `C:\Users\osama\.gemini\antigravity\scratch\sk-boutique\`

### الملفات الرئيسية
- `app/layout.js` — الـ Layout الرئيسي (Meta, Schema, Fonts)
- `app/page.js` — الصفحة الرئيسية (كل المكونات)
- `app/globals.css` — التنسيقات (Dark/Light themes, Animations)
- `data/products.js` — بيانات 5 منتجات
- `data/translations.js` — الترجمة عربي/إنجليزي
- `lib/utils.js` — دوال مساعدة (أسعار، خصومات، بطاقات)

### المكونات (17 ملف في `components/`)
- Navbar, HeroSection, CatalogSection, CartDrawer, CheckoutModal
- ProductModal, WelcomeSplash, FeaturesStrip, AboutSection
- FeedbackSection, VideoSection, Footer, WhatsAppButton
- BottomNav, MobileSearch, ConfettiOverlay, ToastNotifications

## المنتجات
1. طقم اللؤلؤ المخملي الفاخر (Luxury Velvet Pearl Set) — 15 د.أ
2. طقم الغزال الكلاسيكي بلفة جانبية (Elegant Side-Wrap Set) — 14 د.أ
3. بليزر الحزام المخملي الكلاسيكي (Classic Belted Blazer) — 15 د.أ
4. بلوزة الساتان الفاخرة بربطة الخصر (Luxury Satin Blouse) — 12 د.أ
5. قميص الكلاسيك بربطة جانبية وسلاسل (Side-Tie Classic Shirt) — 10 د.أ

## أكواد الخصم
- `NASHAMA` = خصم 15%
- `JORDAN`, `SK10`, `WELCOME10` = خصم 10%

## أوامر سريعة
- **البناء:** `npm run build`
- **التطوير:** `npm run dev`
- **الرفع للموقع:** `.\deploy.ps1 -Prod`
- **الرفع تجريبي:** `.\deploy.ps1`

## الملاحظات
- Next.js 16 — Static Export (output: 'export')
- Tailwind CSS v4
- Font Awesome 6 (CDN)
- RTL للعربية / LTR للإنجليزية
- Dark/Light Theme
- الدفع: COD + بطاقة ائتمانية
