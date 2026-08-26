"use client";

import { normalizeAboutLocation } from "@/lib/aboutContent";

/**
 * Location zoom animation adapted from naseralnoman.vercel.app
 * (world → country → city). Target comes from dashboard About → location.
 */
export default function LocationMapAnimation({ location, className = "" }) {
  const loc = normalizeAboutLocation(location);
  const countryLabel = loc.country.toUpperCase();
  const cityLabel = loc.city.toUpperCase();
  const showOutline = loc.showCountryOutline;

  return (
    <a
      href={loc.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`about-loc-map group block overflow-hidden rounded-xl focus-visible:outline-none ${className}`}
      aria-label={`Open ${loc.city}, ${loc.country} on Google Maps`}
      data-show-pin={showOutline ? "false" : "true"}
      style={{
        "--loc-x": `${loc.mapX}%`,
        "--loc-y": `${loc.mapY}%`,
      }}
    >
      <div className="loc-viewport">
        <div className="loc-scene">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="loc-world"
            src="/maps/world-map.svg"
            alt=""
            width={950}
            height={500}
          />
          {showOutline ? (
            <div className="loc-bd-holder">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="loc-bd-vector"
                src="/maps/bangladesh-outline.svg"
                alt=""
              />
            </div>
          ) : null}
        </div>
        <div className="loc-hud" aria-hidden="true">
          <span
            className="loc-pin"
            style={{ left: "var(--loc-x)", top: "var(--loc-y)" }}
          >
            <svg viewBox="0 0 24 32" width="20" height="27">
              <path d="M12 1 C6.5 1 3 6.2 3 11.4 C3 19 12 31 12 31 S21 19 21 11.4 C21 6.2 17.5 1 12 1 Z" />
              <circle cx="12" cy="11.5" r="3.2" />
            </svg>
          </span>
          <p className="loc-caption">
            <span className="loc-stage loc-stage-world">WORLD</span>
            <span className="loc-stage loc-stage-bd">{countryLabel}</span>
            <span className="loc-stage loc-stage-dhaka">{cityLabel}</span>
          </p>
        </div>
      </div>
    </a>
  );
}
