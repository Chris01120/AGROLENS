import { createContext, useContext, useEffect, useMemo, useState, } from "react";
import { REGIONS, CROPS } from "./agrolens-data";
const Ctx = createContext(null);
const KEY = "agrolens-state-v1";
function computeSeason() {
    const m = new Date().getMonth(); // 0..11
    if (m >= 4 && m <= 9)
        return "Rainy";
    if (m === 3)
        return "Early Rains";
    if (m === 10 || m === 11 || m === 0)
        return "Harmattan";
    return "Dry";
}
export function AgroLensProvider({ children }) {
    const [regionId, setRegionId] = useState(REGIONS[0].id);
    const [cropId, setCropIdState] = useState(CROPS[0].id);
    const [cropOverride, setCropOverride] = useState(null);
    const [zoneOverride, setZoneOverride] = useState(null);
    const [recent, setRecent] = useState([CROPS[0].id]);
    useEffect(() => {
        try {
            const raw = localStorage.getItem(KEY);
            if (raw) {
                const s = JSON.parse(raw);
                if (s.regionId)
                    setRegionId(s.regionId);
                if (s.cropId !== undefined)
                    setCropIdState(s.cropId);
                if (s.zoneOverride !== undefined)
                    setZoneOverride(s.zoneOverride);
                if (Array.isArray(s.recent))
                    setRecent(s.recent);
            }
        }
        catch { }
    }, []);
    useEffect(() => {
        try {
            localStorage.setItem(KEY, JSON.stringify({ regionId, cropId, zoneOverride, recent }));
        }
        catch { }
    }, [regionId, cropId, zoneOverride, recent]);
    const setCropId = (id, override = null) => {
        setCropIdState(id);
        setCropOverride(override);
        if (id)
            setRecent((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 5));
    };
    const value = useMemo(() => ({ regionId, cropId, cropOverride, zoneOverride, recent, setRegionId, setCropId, setZoneOverride }), [regionId, cropId, cropOverride, zoneOverride, recent]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useAgroLens() {
    const ctx = useContext(Ctx);
    if (!ctx)
        throw new Error("useAgroLens must be inside AgroLensProvider");
    return ctx;
}
export function useDerivedAgroLens() {
    const s = useAgroLens();
    const baseRegion = REGIONS.find((r) => r.id === s.regionId) ?? REGIONS[0];
    const liveSeason = computeSeason();
    const region = {
        ...baseRegion,
        season: liveSeason,
        primaryZone: s.zoneOverride ?? baseRegion.primaryZone,
    };
    const crop = s.cropId
        ? CROPS.find((c) => c.id === s.cropId) ?? s.cropOverride ?? null
        : null;
    return { ...s, region, crop, liveSeason };
}
