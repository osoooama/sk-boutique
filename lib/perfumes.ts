import type { Perfume } from "./types";

export const perfumes: Perfume[] = [
  {
    id: "perf-vaya-rose",
    title: "عطر Vaya Rose",
    englishTitle: "Vaya Rose Perfume",
    description:
      "عطر يتميز بالثبات والفوحان والفرادة الأنثوية، وهو خيار مثالي للمرأة الواثقة.",
    englishDescription:
      "A distinctive perfume known for its longevity and feminine uniqueness, perfect for the confident woman.",
    image: "/perfumes/vaya-rose.webp",
    category: "perfume",
    basePrice: 0,
    volume: "50ml",
    inStock: true,
    notes: {
      top: ["كرامبولا", "فاوانيا", "منديرن"],
      middle: ["لوتس", "ورد"],
      base: ["عنبر", "خشب الصندل", "باتشولي"],
    },
    createdAt: "2024-01-01",
  },
  {
    id: "perf-berry-musk",
    title: "مسك التوت",
    englishTitle: "Berry Musk",
    description: "مسك برائحة التوت الشهية مع لمسات من التوت البري والعنب البري.",
    englishDescription: "Musk with a delightful berry aroma with hints of blueberries and cranberries.",
    image: "/perfumes/berry-musk.webp",
    category: "musk",
    basePrice: 0,
    volume: "30ml",
    inStock: true,
    createdAt: "2024-01-01",
  },
  {
    id: "perf-pomegranate-musk",
    title: "مسك الرمان",
    englishTitle: "Pomegranate Musk",
    description: "مسك الرمان الفاخر مع نفحات منعشة من الرمان الحلو والحامض.",
    englishDescription: "Luxurious pomegranate musk with refreshing sweet and tart pomegranate notes.",
    image: "/perfumes/pomegranate-musk.webp",
    category: "musk",
    basePrice: 0,
    volume: "30ml",
    inStock: true,
    createdAt: "2024-01-01",
  },
  {
    id: "perf-bride-musk",
    title: "مسك العروس",
    englishTitle: "Bride's Musk",
    description: "مسك العروس الفاخر — عطر أنثوي ناعم يناسب المناسبات الخاصة.",
    englishDescription: "The luxurious Bride's Musk — a soft feminine fragrance perfect for special occasions.",
    image: "/perfumes/brides-musk.webp",
    category: "musk",
    basePrice: 0,
    volume: "30ml",
    inStock: true,
    createdAt: "2024-01-01",
  },
  {
    id: "perf-rose-musk",
    title: "مسك الورد",
    englishTitle: "Rose Musk",
    description: "مسك الورد الفاخر — عطر كلاسيكي أنيق برائحة الورد الدمشقي.",
    englishDescription: "Premium rose musk — an elegant classic fragrance with Damask rose notes.",
    image: "/perfumes/rose-musk.webp",
    category: "musk",
    basePrice: 0,
    volume: "30ml",
    inStock: true,
    createdAt: "2024-01-01",
  },
  {
    id: "perf-berry-blend",
    title: "مخمرية برائحة التوت",
    englishTitle: "Berry Blend Perfume Oil",
    description: "مخمرية فاخرة برائحة التوت والعنب البري — مزيج غني وحلو.",
    englishDescription: "Premium perfume oil with blueberry and berry blend — a rich sweet combination.",
    image: "/perfumes/berry-blend.webp",
    category: "perfume",
    basePrice: 0,
    volume: "12ml",
    inStock: true,
    createdAt: "2024-01-01",
  },
  {
    id: "perf-bergamot-violet",
    title: "مخمريه البرغموت والفانيليا وأوراق البنفسج",
    englishTitle: "Bergamot Vanilla Violet Perfume Oil",
    description: "مخمرية فاخرة بمزيج البرغموت والفانيليا وأوراق البنفسج.",
    englishDescription: "Premium perfume oil with a blend of bergamot, vanilla, and violet leaves.",
    image: "/perfumes/bergamot-vanilla-violet.webp",
    category: "perfume",
    basePrice: 0,
    volume: "12ml",
    inStock: true,
    createdAt: "2024-01-01",
  },
  {
    id: "perf-vaya-samples",
    title: "عينات عطرية من SK",
    englishTitle: "SK Perfume Samples",
    description:
      "مجموعة عينات عطرية من SK — تقدروا تطلبوها لتجربوا الروائح كاملة قبل الشراء.",
    englishDescription:
      "SK perfume sample set — order to try the complete fragrance collection before purchasing.",
    image: "/perfumes/perfume-samples.webp",
    category: "sample",
    basePrice: 0,
    volume: "2ml",
    inStock: true,
    createdAt: "2024-01-01",
  },
];

export function getPerfumePrice(perfume: Perfume): number {
  switch (perfume.category) {
    case "musk":
      return 5;
    case "perfume":
      return perfume.volume === "50ml" ? 8 : 6;
    case "sample":
      return 3;
    default:
      return 0;
  }
}
