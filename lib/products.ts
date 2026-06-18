import type { Product, ProductColor } from "./types";

const sharedSizes = ["S", "M", "L", "XL"];
const threeSizes = ["S", "M", "L"];

const velvetSetColors: ProductColor[] = [
  {
    name: "بني كلاسيكي",
    englishName: "Classic Brown",
    hex: "#8B4513",
    images: [
      "/clothing/sk_boutique977-photo-DHgKbsmNsb7-20250322_160119_485626926.webp",
    ],
    surcharge: 1.5,
  },
  {
    name: "زهري لؤلؤي",
    englishName: "Pearl Pink",
    hex: "#FFB6C1",
    images: [
      "/clothing/sk_boutique977-photo-DHgrFOOs96l-20250322_204636_485743576.webp",
    ],
  },
];

const wrapSetColors: ProductColor[] = [
  {
    name: "أزرق بترولي",
    englishName: "Petroleum Blue",
    hex: "#4169E1",
    images: [
      "/clothing/sk_boutique977-thumbnail-DQKeh-EjLQA-20251023_223639_567438507.webp",
      "/clothing/sk_boutique977-thumbnail-DJrjkNxM6Rr-20250515_191546_497842882.webp",
    ],
  },
  {
    name: "أسود ملكي",
    englishName: "Royal Black",
    hex: "#1A1A1A",
    images: [
      "/clothing/sk_boutique977-thumbnail-DQKfmC0jODi-20251023_224554_569566349.webp",
    ],
    surcharge: 1.5,
  },
  {
    name: "رمادي داكن",
    englishName: "Charcoal Grey",
    hex: "#808080",
    images: [
      "/clothing/sk_boutique977-thumbnail-DQCsQDtjJF9-20251020_220359_568702593.webp",
    ],
  },
  {
    name: "بني شوكولاتة",
    englishName: "Chocolate Brown",
    hex: "#8B4513",
    images: [
      "/clothing/sk_boutique977-thumbnail-DQCtUnLDHuX-20251020_221157_567405318.webp",
    ],
  },
];

const blazerColors: ProductColor[] = [
  {
    name: "بني داكن",
    englishName: "Dark Brown",
    hex: "#8B4513",
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
    hex: "#D4B896",
    images: [
      "/clothing/sk_boutique977-thumbnail-DYposBJsCwF-20260522_211341_703559149.webp",
    ],
  },
  {
    name: "أسود ملكي",
    englishName: "Royal Black",
    hex: "#1A1A1A",
    images: [
      "/clothing/sk_boutique977-thumbnail-DYpsmnEMJA--20260522_214717_704427197.webp",
      "/clothing/sk_boutique977-thumbnail-DYpP0rfM1CN-20260522_173531_705374921.webp",
    ],
    surcharge: 2.0,
  },
  {
    name: "أبيض لؤلؤي",
    englishName: "Pearl White",
    hex: "#F5F5F5",
    images: [
      "/clothing/sk_boutique977-thumbnail-DYpwc68sOWc-20260522_222040_704653143.webp",
    ],
    surcharge: 1.0,
  },
  {
    name: "أزرق ياقوتي",
    englishName: "Sapphire Blue",
    hex: "#4169E1",
    images: [
      "/clothing/sk_boutique977-thumbnail-DYpCvLeMtXL-20260522_154123_703455572.webp",
    ],
  },
  {
    name: "أزرق سماوي",
    englishName: "Light Blue",
    hex: "#4169E1",
    images: [
      "/clothing/sk_boutique977-thumbnail-DYpcKsfMuPR-20260522_192333_705293588.webp",
    ],
  },
  {
    name: "وردي مغبر",
    englishName: "Dusty Rose",
    hex: "#FFB6C1",
    images: [
      "/clothing/sk_boutique977-thumbnail-DYpDy9NsFUg-20260522_155032_703009358.webp",
    ],
  },
];

const sideTieColors: ProductColor[] = [
  {
    name: "بني شوكولاتة",
    englishName: "Chocolate Brown",
    hex: "#8B4513",
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
      "/clothing/sk_boutique977-thumbnail-DXPbRR6DObQ-20260417_202411_670566012.webp",
    ],
    surcharge: 2.0,
  },
  {
    name: "بيج كلاسيكي",
    englishName: "Classic Beige",
    hex: "#D4B896",
    images: [
      "/clothing/sk_boutique977-thumbnail-DYpcx1FsCrl-20260522_192848_706629160.webp",
    ],
    surcharge: 1.0,
  },
  {
    name: "بنفسجي فاتح",
    englishName: "Lavender Mauve",
    hex: "#8C7380",
    images: [
      "/clothing/sk_boutique977-thumbnail-DXMzdUcjKHJ-20260416_200225_670642277.webp",
      "/clothing/sk_boutique977-thumbnail-DXhXRfejHth-20260424_193611_672347469.webp",
    ],
  },
  {
    name: "أزرق ياقوتي",
    englishName: "Sapphire Blue",
    hex: "#4169E1",
    images: [
      "/clothing/sk_boutique977-thumbnail-DXPay-JjCxX-20260417_202000_672357384.webp",
    ],
  },
  {
    name: "خمري داكن",
    englishName: "Dark Burgundy",
    hex: "#800020",
    images: [
      "/clothing/sk_boutique977-thumbnail-DYFjVQUsaY6-20260508_205337_695817335.webp",
    ],
  },
];

const dressColors: ProductColor[] = [
  {
    name: "عنابي ملكي",
    englishName: "Royal Burgundy",
    hex: "#800020",
    images: [
      "/clothing/sk_boutique977-photo-DMdcVqDs9oL-20250723_211701_523124697.webp",
    ],
  },
  {
    name: "كحلي أنيق",
    englishName: "Elegant Navy",
    hex: "#1B2A4A",
    images: [
      "/clothing/sk_boutique977-thumbnail-DKAaV66M1IH-20250523_213858_500083846.webp",
    ],
  },
];

const blazerSetColors: ProductColor[] = [
  {
    name: "أبيض لؤلؤي",
    englishName: "Pearl White",
    hex: "#F5F5F5",
    images: [
      "/clothing/sk_boutique977-photo-DNOLea3MMcE-20250811_193226_530569642.webp",
    ],
  },
  {
    name: "رمادي داكن",
    englishName: "Charcoal",
    hex: "#808080",
    images: [
      "/clothing/sk_boutique977-thumbnail-DPpBLl_jMJs-20251010_224643_563597840.webp",
    ],
  },
];

const topSetColors: ProductColor[] = [
  {
    name: "بيج لؤلؤي داكن",
    englishName: "Dark Pearl Beige",
    hex: "#D4B896",
    images: [
      "/clothing/sk_boutique977-photo-DPmVJN7jICH-20251009_214130_561922161.webp",
    ],
  },
  {
    name: "أسود ملكي",
    englishName: "Royal Black",
    hex: "#1A1A1A",
    images: [
      "/clothing/sk_boutique977-thumbnail-DPmYW7FDD4E-20251009_221050_560553149.webp",
    ],
  },
  {
    name: "رمادي كلاسيكي",
    englishName: "Classic Grey",
    hex: "#808080",
    images: [
      "/clothing/sk_boutique977-thumbnail-DPpBLl_jMJs-20251010_224643_563597840.webp",
    ],
  },
  {
    name: "خمري أنيق",
    englishName: "Elegant Burgundy",
    hex: "#800020",
    images: [
      "/clothing/sk_boutique977-thumbnail-DPyjt96jLX_-20251014_154051_563386864.webp",
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
    inStock: true,
    featured: true,
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
    inStock: true,
    featured: true,
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
    inStock: true,
    createdAt: "2025-10-09",
  },
];
