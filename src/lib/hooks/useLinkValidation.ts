"use client";

import { useState, useEffect, useRef } from "react";

const CACHE_TTL = 5 * 60 * 1000;
const cache = new Map<string, { ok: boolean; timestamp: number }>();

function getCached(urls: string[]): { valid: string[]; pending: string[] } {
  const valid: string[] = [];
  const pending: string[] = [];
  const now = Date.now();

  for (const url of urls) {
    const entry = cache.get(url);
    if (entry && now - entry.timestamp < CACHE_TTL) {
      if (entry.ok) valid.push(url);
    } else {
      pending.push(url);
    }
  }

  return { valid, pending };
}

export function useLinkValidation(urls: string[]) {
  const [validLinks, setValidLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (urls.length === 0 || fetchedRef.current) return;

    const { valid, pending } = getCached(urls);

    if (pending.length === 0) {
      setValidLinks(valid);
      return;
    }

    setValidLinks(valid);
    setLoading(true);

    fetch("/api/validate-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls: pending }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusMap) {
          const now = Date.now();
          for (const [url, ok] of Object.entries(data.statusMap)) {
            cache.set(url, { ok: ok as boolean, timestamp: now });
          }

          const allValid = urls.filter((url) => {
            const entry = cache.get(url);
            return entry?.ok;
          });

          setValidLinks(allValid);
          fetchedRef.current = true;
        }
      })
      .catch(() => {
        setValidLinks(valid);
      })
      .finally(() => setLoading(false));
  }, [urls]);

  return { validLinks, loading };
}
