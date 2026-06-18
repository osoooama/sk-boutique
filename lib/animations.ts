import type { Variants } from "framer-motion";

const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768;

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: IS_MOBILE ? 20 : 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: IS_MOBILE ? 0.35 : 0.5,
      delay: i * (IS_MOBILE ? 0.04 : 0.08),
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const fadeLeftVariant: Variants = {
  hidden: { opacity: 0, x: IS_MOBILE ? -20 : -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: IS_MOBILE ? 0.35 : 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: IS_MOBILE ? 0.04 : 0.08,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: IS_MOBILE ? 0.06 : 0.1,
    },
  },
};

export const perfumeCardVariant: Variants = {
  hidden: { opacity: 0, y: IS_MOBILE ? 20 : 40, rotateZ: IS_MOBILE ? 0 : -3 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    rotateZ: 0,
    transition: {
      duration: IS_MOBILE ? 0.35 : 0.5,
      delay: i * (IS_MOBILE ? 0.06 : 0.12),
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const feedbackCardVariant: Variants = {
  hidden: { opacity: 0, y: IS_MOBILE ? 10 : 20, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: IS_MOBILE ? 0.25 : 0.35,
      delay: i * 0.05,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const featureCardVariant: Variants = {
  hidden: { opacity: 0, y: IS_MOBILE ? 15 : 30, scale: IS_MOBILE ? 1 : 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: i * (IS_MOBILE ? 0.05 : 0.1),
    },
  }),
};

export const footerSectionVariant: Variants = {
  hidden: { opacity: 0, y: IS_MOBILE ? 15 : 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: IS_MOBILE ? 0.3 : 0.45,
      delay: i * (IS_MOBILE ? 0.05 : 0.1),
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};
