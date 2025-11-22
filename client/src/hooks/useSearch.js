import { useEffect } from "react";

export default function useSearch({ inputRef, setSearchParams, navigate, query }) {
  // Helper to get the current location search string (without leading '?')
  const currentSearchString = () => (window.location.search ? window.location.search.slice(1) : "");

  // When `query` changes (or on mount), sync the input value into search params.
  useEffect(() => {
    const inputElement = inputRef?.current;
    if (!inputElement) return;

    const value = inputElement.value?.trim() ?? "";
    const next = new URLSearchParams(window.location.search);
    if (value) next.set("query", value);
    else next.delete("query");

    // Avoid unnecessary updates/navigations by comparing strings
    if (next.toString() === currentSearchString()) return;

    if (typeof setSearchParams === "function") {
      setSearchParams(next);
      return;
    }

    if (typeof navigate === "function") {
      const dest = next.toString() ? `${window.location.pathname}?${next.toString()}` : window.location.pathname;
      navigate(dest, { replace: true });
    }
  // Only re-run when the external `query` value changes or when inputRef reference changes
  }, [query, inputRef, setSearchParams, navigate]);

  // Keep the URL/search in sync when the input's value changes.
  useEffect(() => {
    const el = inputRef?.current;
    if (!el) return;

    const sync = () => {
      const value = el.value ?? "";
      const next = new URLSearchParams(window.location.search);
      if (value) next.set("query", value);
      else next.delete("query");

      const nextString = next.toString();
      if (nextString === currentSearchString()) return; // already matching

      if (typeof setSearchParams === "function") {
        setSearchParams(next);
        return;
      }

      if (typeof navigate === "function") {
        const dest = nextString ? `${window.location.pathname}?${nextString}` : window.location.pathname;
        navigate(dest, { replace: true });
      }
    };

    // Run once to sync current value, then attach listener for changes
    sync();
    el.addEventListener("input", sync);
    return () => el.removeEventListener("input", sync);
  }, [inputRef, setSearchParams, navigate]);
}
