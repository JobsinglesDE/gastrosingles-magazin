'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getKochkursUrl } from '@/lib/kochkurs-cities';

export interface NearbyCity {
  slug: string;
  name: string;
  bundeslandName: string;
  lat: number;
  lng: number;
}

interface Props {
  cities: NearbyCity[];
  /** Slug der aktuellen Spoke-Seite (wird nie als "nearby" hervorgehoben) */
  currentSlug?: string;
  title?: string;
}

function haversine(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(s));
}

/**
 * SSR rendert ALLE Städte in der übergebenen Reihenfolge (SEO-sicher, ohne JS
 * vollständig sichtbar). Der Client ermittelt per navigator.geolocation die
 * nächste Stadt, hebt sie hervor und sortiert sie nach vorne — reines UX-Re-Ordering,
 * kein SEO-kritischer Inhalt wird clientseitig erzeugt.
 */
export function KochkurseNearby({ cities, currentSlug, title = 'Kochkurse für Singles in deiner Nähe' }: Props) {
  const [nearestSlug, setNearestSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let best: { slug: string; dist: number } | null = null;
        for (const c of cities) {
          if (c.slug === currentSlug) continue;
          const dist = haversine(latitude, longitude, c.lat, c.lng);
          if (!best || dist < best.dist) best = { slug: c.slug, dist };
        }
        if (best) setNearestSlug(best.slug);
      },
      () => {},
      { timeout: 8000, maximumAge: 600000 }
    );
  }, [cities, currentSlug]);

  const ordered = nearestSlug
    ? [...cities].sort((a, b) => (a.slug === nearestSlug ? -1 : b.slug === nearestSlug ? 1 : 0))
    : cities;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">{title}</h2>
      <p className="text-foreground/70 mb-8 leading-relaxed">
        Wähle deine Stadt – oder erlaube den Standortzugriff, dann markieren wir den nächsten Kochkurs-Treffpunkt für dich.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {ordered.map((c) => {
          const isNearest = c.slug === nearestSlug;
          return (
            <Link
              key={c.slug}
              href={getKochkursUrl(c.slug)}
              className={`block px-4 py-3 rounded-lg border transition-colors ${
                isNearest
                  ? 'bg-brand-orange/10 border-brand-orange'
                  : 'bg-surface border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5'
              }`}
            >
              <div className="text-base font-bold text-foreground">{c.name}</div>
              <div className="text-xs text-foreground/50 mt-1">
                {isNearest ? '📍 In deiner Nähe' : c.bundeslandName}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
