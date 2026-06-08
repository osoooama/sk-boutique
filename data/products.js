const PRODUCTS = [
  {
    id: "prod-pearl-set",
    title: "طقم اللؤلؤ المخملي الفاخر",
    englishTitle: "Luxury Velvet Pearl Set",
    description: "طقم قطعتين نسائي أنيق وعصري — مشغول بحرفية عالية من قماش المخمل الناعم الممتاز. يتكون من قميص طويل الأكمام مزين بحبات اللؤلؤ اللامعة على الياقة والجيوب مع حزام خصر عريض وبنطال متناسق بقصة مريحة. نخيط كل قطعة بعناية فائقة لنقدم لك إطلالة راقية تعكس ذوقك المتميز.",
    englishDescription: "A refined two-piece set crafted from premium soft velvet with meticulous attention to detail. Features a long-sleeve top adorned with lustrous pearl embellishments on the collar and pockets, complemented by a wide waist belt and matching tailored trousers. Every piece is carefully constructed for a sophisticated look that reflects your distinguished taste.",
    category: "sets",
    price: 15,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "عنابي ملكي", englishName: "Royal Burgundy", value: "#800020", image: "/assets/sk_boutique977-photo-DKANChnMMkq-20250523_194235_500481283.jpg", surcharge: 1.5 }
    ],
    details: "قماش مخمل ناعم عالي الجودة • تطريز دقيق بحبات اللؤلؤ البراقة • طقم كامل قطعتين بقصة عصرية • حزام خصر عريض متناسق • مشغول بحرفية ودقة عالية.",
    englishDetails: "Premium quality soft velvet fabric • Precisely embroidered with shiny pearl beads • Complete two-piece set with modern cut • Matching wide waist belt • Crafted with precision and care.",
    shipping: "شحن سريع لجميع محافظات المملكة — 24-48 ساعة. نخلي مسؤوليتنا تجاه كل قطعة نبيعها.",
    englishShipping: "Fast shipping to all Jordanian governates — 24-48 hours. We stand behind every piece we sell."
  },
  {
    id: "prod-wrap-set",
    title: "طقم الغزال الكلاسيكي بلفة جانبية",
    englishTitle: "Elegant Side-Wrap Trousers Set",
    description: "طقم قطعتين أنيق مشغول من قماش ناعم عالي الجودة مقاوم للتجعد. يتميز بلوزة بتصميم اللفة الجانبية مع حزام خصر قابل للتعديل وأزرار كريستالية براقة على الأكمام. يأتي مع بنطال واسع بقصة انسيابية مريحة. دقة الحرفية في كل تفصيلة تجعل هذا الطقم خياراً مثالياً للمرأة العصرية.",
    englishDescription: "An elegant two-piece set crafted from premium wrinkle-resistant fabric with a soft, fluid drape. Features a side-wrap blouse with an adjustable waist tie and sparkling crystal buttons on the sleeves, paired with comfortable wide-leg trousers. Precision craftsmanship in every detail makes this set a perfect choice for the modern woman.",
    category: "sets",
    price: 14,
    sizes: ["S", "M", "L"],
    colors: [
      { name: "أزرق بترولي", englishName: "Petroleum Blue", value: "#4a6b82", image: "/assets/sk_boutique977-thumbnail-DQKeCZDDAsC-20251023_223213_571049654.jpg", surcharge: 0 },
      { name: "أسود ملكي", englishName: "Royal Black", value: "#0d0d0d", image: "/assets/sk_boutique977-thumbnail-DQKfmC0jODi-20251023_224554_569566349.jpg", surcharge: 1.5 }
    ],
    details: "قماش ناعم منسدل مقاوم للتجعد • أزرار كريستالية لامعة • تصميم بلفة جانبية مع حزام قابل للتعديل • طقم قطعتين كامل • مشغول بحرفية عالية.",
    englishDetails: "Soft, drapeable wrinkle-resistant fabric • Sparkling crystal buttons • Side-wrap design with adjustable belt • Complete two-piece set • High craftsmanship.",
    shipping: "شحن سريع ومؤمن لجميع المحافظات الأردنية. إمكانية قياس المنتج عند الاستلام.",
    englishShipping: "Fast, secure shipping to all Jordanian governates. Fitting available upon delivery."
  },
  {
    id: "prod-belted-blazer",
    title: "بليزر الحزام المخملي الكلاسيكي",
    englishTitle: "Classic Belted Wrap Blazer",
    description: "بليزر رسمي فاخر مشغول بدقة متناهية من قماش متوسط الوزن عالي الجودة مقاوم للتجعد. يأتي بقصة Wrap عصرية مع ياقات عريضة مبطنة وحزام خصر عريض منفصل يربط بشكل فيونكة أنيقة. عنايتنا بتفاصيل الخياطة وجودة الخامات تجعل هذا البليزر قطعة أساسية في خزانة أي امرأة محترفة.",
    englishDescription: "A luxurious formal blazer meticulously crafted from premium mid-weight wrinkle-resistant fabric. Features a modern wrap silhouette with fully-lined wide lapels and a detachable wide waist tie that bows elegantly. Our attention to stitching detail and material quality makes this blazer an essential piece for any professional woman.",
    category: "outerwear",
    price: 15,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "بني داكن", englishName: "Dark Brown", value: "#3d2314", image: "/assets/sk_boutique977-photo-DYsrFPZsvLJ-20260524_013125_706198458.jpg", surcharge: 1.0 }
    ],
    details: "قماش متوسط الوزن عالي الجودة مقاوم للتجعد • حزام خصر عريض منفصل قابل للربط • تصميم Wrap عصري • ياقات عريضة مبطنة بدقة • مشغول بحرفية عالية.",
    englishDetails: "Premium mid-weight wrinkle-resistant fabric • Detachable wide waist tie • Modern wrap design • Precisely lined wide lapels • High-quality craftsmanship.",
    shipping: "توصيل خلال 24 ساعة عمان والزرقاء، 48 ساعة باقي المحافظات. نوفر مقاسك بدقة.",
    englishShipping: "Delivery within 24h Amman & Zarqa, 48h other governates. We ensure accurate sizing."
  },
  {
    id: "prod-satin-blouse",
    title: "بلوزة الساتان الفاخرة بربطة الخصر",
    englishTitle: "Luxury Satin Mock-Neck Blouse",
    description: "بلوزة أنيقة مشغولة من قماش الساتان الإيطالي الفاخر بنسبة 100%. تتميز بياقة مرتفعة دائرية مزمومة بدقة مع سحاب خلفي خفي، وأكمام طويلة منفوخة تضيق عند المعصم بأساور مرنة. حزام خصر يربط بشكل فيونكة أنثوية. نستخدم أفضل الخامات المستوردة ونعنى بأدق تفاصيل الخياطة لنقدم لك قطعة بجودة تنافس الماركات العالمية.",
    englishDescription: "An elegant blouse crafted from 100% premium Italian satin silk. Features a precisely gathered high mock neck with a concealed back zipper, long puff sleeves tapering at elastic cuffs, and a waist tie that bows for a feminine finish. We use the finest imported materials and attend to every stitching detail to deliver quality that rivals international brands.",
    category: "blouses",
    price: 12,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "بيج شامبين", englishName: "Champagne Beige", value: "#e5d3b3", image: "/assets/sk_boutique977-thumbnail-DYpsZawMGWi-20260522_214524_706237541.jpg", surcharge: 0 },
      { name: "أسود ملكي", englishName: "Royal Black", value: "#121212", image: "/assets/sk_boutique977-thumbnail-DYposBJsCwF-20260522_211341_703559149.jpg", surcharge: 2.0 },
      { name: "أزرق ملكي", englishName: "Royal Blue", value: "#0038a8", image: "/assets/sk_boutique977-thumbnail-DYpsmnEMJA--20260522_214717_704427197.jpg", surcharge: 1.5 },
      { name: "أبيض لؤلؤي", englishName: "Pearl White", value: "#fdfdfd", image: "/assets/sk_boutique977-thumbnail-DYpwc68sOWc-20260522_222040_704653143.jpg", surcharge: 1.0 }
    ],
    details: "ساتان إيطالي فاخر 100% • ياقة مرتفعة مزمومة مع سحاب خلفي خفي • أربطة خصر متناسقة • أكمام منفوخة بأساور مرنة • خياطة متقنة بأعلى معايير الجودة.",
    englishDetails: "100% premium Italian satin silk • Gathered high collar with hidden back zip • Matching waist ties • Puff sleeves with elastic cuffs • Precision stitching with the highest quality standards.",
    shipping: "توصيل مجاني سريع لجميع المحافظات. الدفع عند الاستلام متاح.",
    englishShipping: "Free fast shipping to all governates. Cash on delivery available."
  },
  {
    id: "prod-side-tie-blouse",
    title: "قميص الكلاسيك بربطة جانبية وسلاسل",
    englishTitle: "Side-Tie Classic Wrap Shirt",
    description: "قميص كلاسيكي أنيق مشغول من قماش الكريب الخفيف والناعم عالي الجودة. يتميز بأزرار أمامية كاملة وأكمام واسعة انسيابية، مع أربطة جانبية مزدوجة قابلة للتعديل عند الخصر لتمنحك ملاءمة مثالية وقصة عصرية. دقة الخياطة وجودة الخامة تخوّلان هذا القميص للتناسب مع البناطيل والتنانير بكل أناقة.",
    englishDescription: "An elegant classic shirt crafted from lightweight, soft premium crepe fabric. Features full front buttons and wide flowing sleeves with double adjustable side ties at the waist for a perfect fit and a modern silhouette. Precision stitching and material quality allow this shirt to pair beautifully with both trousers and skirts.",
    category: "blouses",
    price: 10,
    sizes: ["S", "M", "L"],
    colors: [
      { name: "بني شوكولاتة", englishName: "Chocolate Brown", value: "#5c4033", image: "/assets/sk_boutique977-thumbnail-DXhVfNNDObL-20260424_192008_674506967.jpg", surcharge: 0 },
      { name: "عنابي ملكي", englishName: "Royal Burgundy", value: "#800020", image: "/assets/sk_boutique977-thumbnail-DXhY4GyjJn8-20260424_194941_672357180.jpg", surcharge: 2.0 },
      { name: "بيج كلاسيكي", englishName: "Classic Beige", value: "#e1d8c3", image: "/assets/sk_boutique977-thumbnail-DYpcx1FsCrl-20260522_192848_706629160.jpg", surcharge: 1.0 }
    ],
    details: "قماش كريب خفيف وناعم عالي الجودة • أربطة خصر جانبية مزدوجة قابلة للتعديل • قصة انسيابية مريحة • أزرار أمامية مخفية • خياطة متقنة.",
    englishDetails: "High-quality lightweight soft crepe fabric • Double adjustable side waist ties • Relaxed flowing fit • Concealed front buttons • Precision stitching.",
    shipping: "توصيل لجميع محافظات الأردن. إرجاع واستبدال مجاني خلال 7 أيام.",
    englishShipping: "Delivery to all Jordanian governates. Free returns and exchanges within 7 days."
  }
];

export const CATEGORIES = ["all", "sets", "outerwear", "blouses"];

export const CITIES_AR = ["عمان", "إربد", "الزرقاء", "العقبة", "البلقاء", "مادبا", "الكرك", "معان", "المفرق", "جرش", "عجلون", "الطفيلة"];
export const CITIES_EN = ["Amman", "Irbid", "Zarqa", "Aqaba", "Balqa", "Madaba", "Karak", "Ma'an", "Mafraq", "Jerash", "Ajloun", "Tafilah"];

export default PRODUCTS;
