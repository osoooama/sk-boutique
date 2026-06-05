"use client";

import { useState } from "react";
import Image from "next/image";
import { getProductPrice, getSizeSurchargeText, getColorSurchargeText, getCategoryLabel } from "@/lib/utils";

export default function ProductModal({ product, isEnglish, onClose, onAddToCart }) {
  const [modalActiveSize, setModalActiveSize] = useState(product ? product.sizes[0] : "");
  const [modalActiveColor, setModalActiveColor] = useState(product ? product.colors[0] : null);
  const [modalQty, setModalQty] = useState(1);
  const [modalActiveTab, setModalActiveTab] = useState("details");

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-3xl overflow-hidden shadow-2xl animate-slide-up flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-y-visible">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] text-[var(--text-primary)] flex items-center justify-center transition z-10">
          <i className="fas fa-times" />
        </button>

        <div className="md:w-1/2 aspect-[4/5] md:aspect-auto relative bg-zinc-900 p-6 flex items-center justify-center">
          <Image
            src={modalActiveColor ? modalActiveColor.image : product.colors[0].image}
            alt={isEnglish ? product.englishTitle : product.title}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
          />
        </div>

        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] bg-gold/10 text-gold px-3 py-1 rounded-full border border-gold/15 font-semibold">
              {getCategoryLabel(product.category, isEnglish)}
            </span>
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)] font-cairo">
              {isEnglish ? product.englishTitle : product.title}
            </h2>
            <div className="text-xl font-bold text-gold">
              {getProductPrice(product, modalActiveSize, modalActiveColor)} {isEnglish ? "JD" : "د.أ"}
            </div>
            <p className="text-[var(--text-muted)] text-xs font-light leading-relaxed">
              {isEnglish ? product.englishDescription : product.description}
            </p>

            <div className="space-y-2">
              <div className="text-xs text-[var(--text-muted)] font-medium">
                {isEnglish ? "Available Size:" : "المقاس المتوفر:"}
                {getSizeSurchargeText(modalActiveSize, isEnglish) && (
                  <span className="text-gold text-[10px] font-bold mr-1">{getSizeSurchargeText(modalActiveSize, isEnglish)}</span>
                )}
              </div>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setModalActiveSize(size)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition flex items-center justify-center border ${
                      modalActiveSize === size
                        ? "bg-gold border-gold text-black shadow shadow-gold/10"
                        : "bg-[var(--bg-subtle)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-[var(--text-muted)] font-medium">{isEnglish ? "Color:" : "اللون:"}</div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setModalActiveColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition ${
                      modalActiveColor?.name === color.name
                        ? "border-gold scale-110 shadow-lg shadow-gold/10"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={isEnglish ? color.englishName : color.name}
                  />
                ))}
              </div>
              <span className="text-[10px] text-[var(--text-dim)] font-medium block">
                {isEnglish ? "Selected:" : "اللون المحدد:"} {modalActiveColor ? (isEnglish ? modalActiveColor.englishName : modalActiveColor.name) : (isEnglish ? product.colors[0].englishName : product.colors[0].name)}
                {modalActiveColor && modalActiveColor.surcharge > 0 && (
                  <span className="text-gold font-bold mr-1"> ({getColorSurchargeText(modalActiveColor, isEnglish)})</span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-3 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2">
                <button onClick={() => setModalQty((prev) => Math.max(1, prev - 1))} className="w-7 h-7 rounded-md bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] text-[var(--text-muted)] flex items-center justify-center text-xs">
                  <i className="fas fa-minus" />
                </button>
                <span className="text-sm font-bold text-[var(--text-primary)] w-6 text-center font-mono">{modalQty}</span>
                <button onClick={() => setModalQty((prev) => prev + 1)} className="w-7 h-7 rounded-md bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] text-[var(--text-muted)] flex items-center justify-center text-xs">
                  <i className="fas fa-plus" />
                </button>
              </div>

              <button
                onClick={() => {
                  onAddToCart(
                    product.id,
                    modalActiveSize,
                    modalActiveColor?.name || product.colors[0].name,
                    modalActiveColor?.image || product.colors[0].image,
                    modalQty
                  );
                  onClose();
                }}
                className="flex-1 py-3.5 bg-gold hover:bg-gold/90 text-black font-bold rounded-xl text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow active:scale-[0.97]"
              >
                {isEnglish ? "Add to Cart" : "أضف إلى السلة"} <i className="fas fa-shopping-bag text-[10px]" />
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
            <div className="flex border-b border-[var(--border-subtle)]">
              <button
                onClick={() => setModalActiveTab("details")}
                className={`pb-2.5 text-xs font-semibold border-b-2 transition duration-300 pl-4 ${
                  modalActiveTab === "details" ? "border-gold text-gold" : "border-transparent text-[var(--text-dim)] hover:text-[var(--text-primary)]"
                }`}
              >
                {isEnglish ? "Features & Materials" : "الميزات والخامات"}
              </button>
              <button
                onClick={() => setModalActiveTab("shipping")}
                className={`pb-2.5 text-xs font-semibold border-b-2 transition duration-300 ${
                  modalActiveTab === "shipping" ? "border-gold text-gold" : "border-transparent text-[var(--text-dim)] hover:text-[var(--text-primary)]"
                }`}
              >
                {isEnglish ? "Local Shipping & Exchange" : "توصيل واستبدال محلي"}
              </button>
            </div>

            <div className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
              {modalActiveTab === "details" ? (
                <p className="whitespace-pre-line">{isEnglish ? product.englishDetails : product.details}</p>
              ) : (
                <p>{isEnglish ? product.englishShipping : product.shipping}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
