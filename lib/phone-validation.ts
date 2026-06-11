export const validateJordanPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-]/g, "");
  const patterns = [
    /^07[789]\d{7}$/,
    /^\+9627[789]\d{7}$/,
    /^009627[789]\d{7}$/,
    /^9627[789]\d{7}$/,
  ];
  return patterns.some((pattern) => pattern.test(cleaned));
};

export const formatJordanPhone = (phone: string): string => {
  const cleaned = phone.replace(/[\s\-\+]/g, "");
  if (cleaned.startsWith("00962")) return "0" + cleaned.slice(5);
  if (cleaned.startsWith("962")) return "0" + cleaned.slice(3);
  return cleaned;
};

export const phoneErrorMessage = (phone: string): string | null => {
  if (!phone) return "رقم الهاتف مطلوب";
  const cleaned = phone.replace(/[\s\-]/g, "");
  if (cleaned.length < 10) return "رقم الهاتف قصير جداً";
  if (!validateJordanPhone(cleaned)) return "أدخل رقم أردني صحيح (077/078/079)";
  return null;
};
