"use client";

import { useState, useEffect } from "react";

interface CurrencyRates {
  rates: Record<string, number>;
  loading: boolean;
  lastUpdated: Date | null;
}

const STORAGE_KEY = "sk_currency_rates";
const CACHE_TTL = 60 * 60 * 1000;

const FALLBACK_RATES: Record<string, number> = {
  USD: 1.41,
  EUR: 1.30,
  GBP: 1.11,
  SAR: 5.29,
  AED: 5.18,
  TRY: 45.2,
  EGP: 68.5,
};

export function useCurrencyRates(): CurrencyRates {
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Date.now() - parsed.timestamp < CACHE_TTL) {
            if (!cancelled) {
              setRates(parsed.rates);
              setLastUpdated(new Date(parsed.timestamp));
              setLoading(false);
              return;
            }
          }
        }
      } catch { /* ignore */ }

      try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/JOD");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();

        if (!cancelled) {
          const newRates = { ...FALLBACK_RATES };
          for (const code of Object.keys(FALLBACK_RATES)) {
            if (data.rates[code]) newRates[code] = data.rates[code];
          }
          setRates(newRates);
          setLastUpdated(new Date());
          setLoading(false);

          try {
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({ rates: newRates, timestamp: Date.now() })
            );
          } catch { /* ignore */ }
        }
      } catch {
        if (!cancelled) {
          setRates(FALLBACK_RATES);
          setLastUpdated(null);
          setLoading(false);
        }
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  return { rates, loading, lastUpdated };
}
