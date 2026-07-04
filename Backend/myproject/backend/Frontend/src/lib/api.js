import { useQuery } from "@tanstack/react-query";
import { CROPS } from "./agrolens-data";

const BACKEND_BASE = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

function normalizeCropDetailId(id) {
  if (id == null) {
    return id;
  }
  if (typeof id === "object") {
    return id.name ?? id.backendId ?? id.id;
  }
  return id;
}

function isValidCropDetailId(id) {
  const normalized = normalizeCropDetailId(id);
  return normalized != null && normalized !== "";
}

async function fetchCropDetail(id, zone) {
  const cropId = normalizeCropDetailId(id);
  const url = `${BACKEND_BASE}/api/crops/${encodeURIComponent(cropId)}/detail/?zone=${encodeURIComponent(zone)}`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to fetch crop detail: ${res.status} ${txt}`);
  }
  const json = await res.json();
  // backend wraps payload in { success, message, data }
  return json.data ? json.data : json;
}

export function useCropDetail(id, zone) {
  return useQuery({
    queryKey: ["cropDetail", normalizeCropDetailId(id), zone],
    queryFn: () => fetchCropDetail(id, zone),
    enabled: !!zone && isValidCropDetailId(id),
    staleTime: 1000 * 60,
    // keep previous data while refetching
    keepPreviousData: true,
    onError: () => {
      /* swallow — components can fallback to static */
    },
  });
}

export function getStaticCrop(id) {
  return CROPS.find((c) => c.id === id) ?? null;
}

async function fetchCropList() {
  const url = `${BACKEND_BASE}/api/crops/`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to fetch crop list: ${res.status} ${txt}`);
  }
  return res.json();
}

export function useCropList() {
  return useQuery({
    queryKey: ["cropList"],
    queryFn: fetchCropList,
    staleTime: 1000 * 60 * 10,
    onError: () => {},
  });
}

async function fetchCropIntelligence(zone) {
  const url = `${BACKEND_BASE}/api/intelligence/?zone=${encodeURIComponent(zone)}`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to fetch crop intelligence: ${res.status} ${txt}`);
  }
  const json = await res.json();
  return json.data ? json.data : json;
}

export function useCropIntelligence(zone) {
  return useQuery({
    queryKey: ["cropIntelligence", zone],
    queryFn: () => fetchCropIntelligence(zone),
    enabled: !!zone,
    staleTime: 1000 * 60 * 5,
    onError: () => {},
  });
}
