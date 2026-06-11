import type { Product, ProductColor } from "./types";

const sharedSizes = ["S", "M", "L", "XL"];
const threeSizes = ["S", "M", "L"];

const velvetSetColors: ProductColor[] = [
  {
    name: "عنابي ملكي",
    englishName: "Royal Burgundy",
    hex: "#800020",
    images: [
      "/clothing/sk_boutique977-photo-DHgKbsmNsb7-20250322_160119_485626926.webp",
    ],
    surcharge: 1.5,
  },
  {
    name: "أسود عميق",
    englishName: "Deep Black",
    hex: "#0d0d0d",
    images: [
      "/clothing/sk_boutique977-photo-DHgrFOOs96l-20250322_204636_485743576.webp",
    ],
  },
];

const wrapSetColors: ProductColor[] = [
  {
    name: "أزرق بترولي",
    englishName: "Petroleum Blue",
    hex: "#4a6b82",
    images: [
      "/clothing/sk_boutique977-thumbnail-DQKeh-EjLQA-20251023_223639_567438507.webp",
    ],
  },
  {
    name: "أسود ملكي",
    englishName: "Royal Black",
    hex: "#0d0d0d",
    images: [
      "/clothing/sk_boutique977-thumbnail-DQKfmC0jODi-20251023_224554_569566349.webp",
    ],
    surcharge: 1.5,
  },
];

const blazerColors: ProductColor[] = [
  {
    name: "بني داكن",
    englishName: "Dark Brown",
    hex: "#3d2314",
    images: [
      "/clothing/sk_boutique977-photo-DYsrFPZsvLJ-20260524_013125_706198458.webp",
    ],
    surcharge: 1.0,
  },
];

const satinBlouseColors: ProductColor[] = [
  {
    name: "بيج شامبين",
    englishName: "Champagne Beige",
    hex: "#e5d3b3",
    images: [
      "/clothing/sk_boutique977-thumbnail-DYposBJsCwF-20260522_211341_703559149.webp",
    ],
  },
  {
    name: "أسود ملكي",
    englishName: "Royal Black",
    hex: "#121212",
    images: [
      "/clothing/sk_boutique977-thumbnail-DYpsmnEMJA--20260522_214717_704427197.webp",
    ],
    surcharge: 2.0,
  },
  {
    name: "أبيض لؤلؤي",
    englishName: "Pearl White",
    hex: "#fdfdfd",
    images: [
      "/clothing/sk_boutique977-thumbnail-DYpwc68sOWc-20260522_222040_704653143.webp",
    ],
    surcharge: 1.0,
  },
];

const sideTieColors: ProductColor[] = [
  {
    name: "بني شوكولاتة",
    englishName: "Chocolate Brown",
    hex: "#5c4033",
    images: [
      "/clothing/sk_boutique977-thumbnail-DXhVfNNDObL-20260424_192008_674506967.webp",
    ],
  },
  {
    name: "عنابي ملكي",
    englishName: "Royal Burgundy",
    hex: "#800020",
    images: [
      "/clothing/sk_boutique977-thumbnail-DXhY4GyjJn8-20260424_194941_672357180.webp",
      "/clothing/sk_boutique977-thumbnail-DXhXRfejHth-20260424_193611_672347469.webp",
    ],
    surcharge: 2.0,
  },
  {
    name: "بيج كلاسيكي",
    englishName: "Classic Beige",
    hex: "#e1d8c3",
    images: [
      "/clothing/sk_boutique977-thumbnail-DYpcx1FsCrl-20260522_192848_706629160.webp",
    ],
    surcharge: 1.0,
  },
];

const dressColors: ProductColor[] = [
  {
    name: "كحلي",
    englishName: "Navy Blue",
    hex: "#1a2744",
    images: [
      "/clothing/sk_boutique977-photo-DMdcVqDs9oL-20250723_211701_523124697.webp",
    ],
  },
];

const blazerSetColors: ProductColor[] = [
  {
    name: "رمادي داكن",
    englishName: "Charcoal",
    hex: "#2c2c30",
    images: [
      "/clothing/sk_boutique977-photo-DNOLea3MMcE-20250811_193226_530569642.webp",
    ],
  },
];

const topSetColors: ProductColor[] = [
  {
    name: "أزرق ياقوتي",
    englishName: "Sapphire Blue",
    hex: "#0f52ba",
    images: [
      "/clothing/sk_boutique977-photo-DPmVJN7jICH-20251009_214130_561922161.webp",
    ],
  },
];

export const products: Product[] = [
  {
    id: "luxury-velvet-set",
    title: "طقم اللؤلؤ المخملي الفاخر",
    englishTitle: "Luxury Velvet Pearl Set",
    description:
      "طقم أنيق من المخمل الفاخر مع تفاصيل لؤلؤية مطرزة يدوياً. تصميم أوروبي يبرز أناقتك في المناسبات الخاصة.",
    englishDescription:
      "An elegant luxury velvet set with hand-embroidered pearl details. A European design that highlights your elegance on special occasions.",
    category: "sets",
    basePrice: 15,
    sizes: sharedSizes,
    colors: velvetSetColors,
    details:
      "خامة مخمل فاخرة مع تفاصيل لؤلؤية مطرزة يدوياً. قماش ناعم ومريح مع بطانة داخلية من الحرير.",
    englishDetails:
      "Premium velvet fabric with hand-embroidered pearl details. Soft and comfortable fabric with silk inner lining.",
    shipping: "توصيل مجاني داخل عمان. 2-3 أيام عمل لباقي المدن.",
    englishShipping: "Free delivery in Amman. 2-3 business days to other cities.",
    inStock: true,
    createdAt: "2025-03-22",
  },
  {
    id: "elegant-wrap-set",
    title: "طقم الغزال الكلاسيكي بلفة جانبية",
    englishTitle: "Elegant Side-Wrap Trousers Set",
    description:
      "طقم أنيق بلفة جانبية عصرية مع بنطال واسع. تصميم يجمع بين الأناقة الكلاسيكية والعصرية.",
    englishDescription:
      "An elegant set with a modern side-wrap and wide-leg trousers. A design that combines classic and contemporary elegance.",
    category: "sets",
    basePrice: 14,
    sizes: threeSizes,
    colors: wrapSetColors,
    details:
      "قماش كريب ناعم مع لفافة جانبية وحزام خصر. يتكون من جاكيت قصير وبنطال واسع.",
    englishDetails:
      "Soft crepe fabric with side-wrap and waist belt. Consists of a short jacket and wide-leg trousers.",
    shipping: "توصيل مجاني داخل عمان. 2-3 أيام عمل لباقي المدن.",
    englishShipping: "Free delivery in Amman. 2-3 business days to other cities.",
    inStock: true,
    createdAt: "2025-10-23",
  },
  {
    id: "belted-wrap-blazer",
    title: "بليزر الحزام المخملي الكلاسيكي",
    englishTitle: "Classic Belted Wrap Blazer",
    description:
      "بليزر كلاسيكي بحزام مخملي أنيق. تصميم أوروبي عصري يناسب جميع الأوقات.",
    englishDescription:
      "A classic blazer with an elegant velvet belt. A modern European design suitable for all occasions.",
    category: "outerwear",
    basePrice: 15,
    sizes: sharedSizes,
    colors: blazerColors,
    details:
      "بليزر من المخمل الفاخر مع حزام خصر مخملي. جيوب عملية وتفصيل أوروبي دقيق.",
    englishDetails:
      "Luxury velvet blazer with a velvet waist belt. Practical pockets and precise European tailoring.",
    shipping: "توصيل مجاني داخل عمان. 2-3 أيام عمل لباقي المدن.",
    englishShipping: "Free delivery in Amman. 2-3 business days to other cities.",
    inStock: true,
    createdAt: "2026-05-24",
  },
  {
    id: "satin-mockneck-blouse",
    title: "بلوزة الساتان الفاخرة بربطة الخصر",
    englishTitle: "Luxury Satin Mock-Neck Blouse",
    description:
      "بلوزة ساتان فاخرة مع رقبة عالية وربطة خصر أنيقة. موديل عصري يناسب جميع الأوقات.",
    englishDescription:
      "A luxurious satin blouse with a mock neck and elegant waist tie. A modern style suitable for all occasions.",
    category: "blouses",
    basePrice: 12,
    sizes: sharedSizes,
    colors: satinBlouseColors,
    details:
      "ساتان إيطالي فاخر مع رقبة عالية (Mock Neck) وربطة خصر حريرية. قماش لامع ناعم الملمس.",
    englishDetails:
      "Premium Italian satin with a mock neck and silk waist tie. Shiny, soft-to-the-touch fabric.",
    shipping: "توصيل مجاني داخل عمان. 2-3 أيام عمل لباقي المدن.",
    englishShipping: "Free delivery in Amman. 2-3 business days to other cities.",
    inStock: true,
    createdAt: "2026-05-22",
  },
  {
    id: "side-tie-wrap-shirt",
    title: "قميص الكلاسيك بربطة جانبية وسلاسل",
    englishTitle: "Side-Tie Classic Wrap Shirt",
    description:
      "قميص كلاسيكي بتصميم ربطة جانبية مع تفاصيل سلاسل أنيقة. موديل عصري فريد من نوعه.",
    englishDescription:
      "A classic shirt with a side-tie design and elegant chain details. A unique modern style.",
    category: "blouses",
    basePrice: 10,
    sizes: threeSizes,
    colors: sideTieColors,
    details:
      "قماش قطني ناعم مع ربطة جانبية وسلاسل ذهبية أنيقة. أكمام طويلة بياقة كلاسيكية.",
    englishDetails:
      "Soft cotton fabric with side-tie and elegant gold chains. Long sleeves with classic collar.",
    shipping: "توصيل مجاني داخل عمان. 2-3 أيام عمل لباقي المدن.",
    englishShipping: "Free delivery in Amman. 2-3 business days to other cities.",
    inStock: true,
    createdAt: "2026-04-24",
  },
  {
    id: "floral-evening-dress",
    title: "فستان سهرة أنيق بتصميم عصري",
    englishTitle: "Elegant Modern Evening Dress",
    description:
      "فستان سهرة أنيق بتصميم عصري وجذاب. مناسب للمناسبات الخاصة والسهرات الراقية.",
    englishDescription:
      "An elegant modern evening dress with an attractive design. Perfect for special occasions and upscale parties.",
    category: "sets",
    basePrice: 18,
    sizes: threeSizes,
    colors: dressColors,
    details:
      "قماش كريب ناعم مع تفاصيل دانتيل أنيقة. فستان طويل بتصميم عصري جذاب.",
    englishDetails:
      "Soft crepe fabric with elegant lace details. Long dress with an attractive modern design.",
    shipping: "توصيل مجاني داخل عمان. 2-3 أيام عمل لباقي المدن.",
    englishShipping: "Free delivery in Amman. 2-3 business days to other cities.",
    inStock: true,
    createdAt: "2025-07-23",
  },
  {
    id: "classic-blazer-set",
    title: "طقم بليزر وتنورة رسمي",
    englishTitle: "Classic Blazer & Skirt Set",
    description:
      "طقم رسمي أنيق يتكون من بليزر كلاسيكي وتنورة راقية. تصميم أوروبي للمناسبات الرسمية.",
    englishDescription:
      "An elegant formal set consisting of a classic blazer and a sophisticated skirt. European design for formal occasions.",
    category: "sets",
    basePrice: 20,
    sizes: threeSizes,
    colors: blazerSetColors,
    details:
      "قماش تويد فاخر مع بطانة حريرية. يتكون من بليزر وتنورة ملفوفة أنيقة.",
    englishDetails:
      "Premium tweed fabric with silk lining. Consists of a blazer and an elegant wrap skirt.",
    shipping: "توصيل مجاني داخل عمان. 2-3 أيام عمل لباقي المدن.",
    englishShipping: "Free delivery in Amman. 2-3 business days to other cities.",
    inStock: true,
    createdAt: "2025-08-11",
  },
  {
    id: "printed-top-set",
    title: "طوق أنيق بموديلات متنوعة",
    englishTitle: "Stylish Printed Top Set",
    description:
      "طوق أنيق ومريح بموديلات وألوان متنوعة. مناسب لإطلالة عصرية جذابة.",
    englishDescription:
      "A stylish and comfortable top in various models and colors. Perfect for a modern, attractive look.",
    category: "blouses",
    basePrice: 8,
    sizes: threeSizes,
    colors: topSetColors,
    details:
      "خامة ناعمة ومريحة مع قصة عصرية. مثالي للارتداء اليومي مع تصاميم أنيقة.",
    englishDetails:
      "Soft and comfortable material with a modern cut. Perfect for daily wear with elegant designs.",
    shipping: "توصيل مجاني داخل عمان. 2-3 أيام عمل لباقي المدن.",
    englishShipping: "Free delivery in Amman. 2-3 business days to other cities.",
    inStock: true,
    createdAt: "2025-10-09",
  },
];
