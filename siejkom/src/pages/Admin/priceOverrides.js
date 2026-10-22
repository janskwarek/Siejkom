const STORAGE_KEY = "siejkom-price-overrides";

export function loadPriceOverrides() {
  if (typeof window === "undefined") return {};

  try {
    const savedPrices = window.localStorage.getItem(STORAGE_KEY);
    if (!savedPrices) return {};

    const parsedPrices = JSON.parse(savedPrices);
    if (!parsedPrices || typeof parsedPrices !== "object" || Array.isArray(parsedPrices)) {
      throw new Error("Invalid saved price data");
    }

    return parsedPrices;
  } catch (error) {
    console.error("Nie udało się odczytać zmian cennika.", error);
    return {};
  }
}

export function savePriceOverrides(prices) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prices));
}
