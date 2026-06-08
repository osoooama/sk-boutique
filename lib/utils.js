export const getProductPrice = (product, size, colorObjOrName) => {
  if (!product) return 0;
  let basePrice = product.price;

  let sizeSurcharge = 0;
  if (size === "M") sizeSurcharge = 1;
  else if (size === "L") sizeSurcharge = 2;
  else if (size === "XL") sizeSurcharge = 3;
  else if (size === "XXL") sizeSurcharge = 4;

  let colorSurcharge = 0;
  if (colorObjOrName) {
    const colorName = typeof colorObjOrName === "string" ? colorObjOrName : colorObjOrName.name;
    const colorOption = product.colors.find((c) => c.name === colorName || c.englishName === colorName);
    if (colorOption && typeof colorOption.surcharge === "number") {
      colorSurcharge = colorOption.surcharge;
    }
  }

  return basePrice + sizeSurcharge + colorSurcharge;
};

export const getSizeSurchargeText = (size, isEnglish) => {
  if (size === "M") return isEnglish ? "(+1 JD)" : "(+1 د.أ)";
  if (size === "L") return isEnglish ? "(+2 JD)" : "(+2 د.أ)";
  if (size === "XL") return isEnglish ? "(+3 JD)" : "(+3 د.أ)";
  if (size === "XXL") return isEnglish ? "(+4 JD)" : "(+4 د.أ)";
  return "";
};

export const getColorSurchargeText = (color, isEnglish) => {
  if (color && color.surcharge > 0) {
    return isEnglish ? `(+${color.surcharge} JD)` : `(+${color.surcharge} د.أ)`;
  }
  return "";
};

export const getCategoryLabel = (cat, isEnglish) => {
  const labels = isEnglish
    ? { sets: "Luxury Sets", outerwear: "Jackets & Blazers", blouses: "Blouses & Shirts" }
    : { sets: "أطقم فاخرة", outerwear: "جاكيتات وبليزر", blouses: "بلوزات وقمصان" };
  return labels[cat] || cat;
};

export const getDiscountRate = (code) => {
  const uppercaseCode = code.toUpperCase();
  if (uppercaseCode === "NASHAMA") return 0.15;
  if (["JORDAN", "SK10", "WELCOME10"].includes(uppercaseCode)) return 0.10;
  return 0;
};

export const generateOrderId = () => "SK-JO-" + Math.floor(Math.random() * 90000 + 10000);

export const generateConfetti = (count = 80) => {
  const colors = ["#cfa850", "#ffffff", "#cc0000", "#e5c06a", "#30d158", "#3777bc"];
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: Math.random() * 2 + 1.5,
    bg: colors[Math.floor(Math.random() * colors.length)]
  }));
};

export const formatCardNumber = (val) => {
  const digits = val.replace(/\D/g, "");
  let formatted = "";
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += " ";
    formatted += digits[i];
  }
  return formatted.slice(0, 19);
};

export const formatCardExpiry = (val) => {
  const digits = val.replace(/\D/g, "");
  if (digits.length >= 2) {
    return digits.slice(0, 2) + "/" + digits.slice(2, 4);
  }
  return digits;
};

export const detectCardType = (num) => {
  const firstDigit = num.replace(/\D/g, "")[0];
  if (firstDigit === "4") return "visa";
  if (firstDigit === "5") return "mastercard";
  return "generic";
};
