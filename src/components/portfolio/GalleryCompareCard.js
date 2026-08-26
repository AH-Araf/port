"use client";

import { Compare } from "@/components/ui/Compare";

/**
 * Gallery tile: full image by default; drag the Aceternity-style slider
 * to reveal title / subtitle / description over the same image (30% dark).
 */
export default function GalleryCompareCard({ item }) {
  const tall = item.wide ? "h-44 md:h-52" : "h-36 md:h-44";

  return (
    <Compare
      firstImage={item.imageUrl}
      firstImageClassName="rounded-xl object-cover object-center"
      className={`w-full rounded-xl border border-border bg-surface-container-highest ${tall}`}
      initialSliderPercentage={100}
      slideMode="drag"
      autoplay={false}
      showHandlebar
      secondContent={
        <>
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full rounded-xl object-cover object-center opacity-25"
            />
          ) : null}
          <div className="absolute inset-0 rounded-xl bg-black/70" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
          <div className="relative z-10 flex h-full flex-col justify-end gap-1 p-3">
            {item.title ? (
              <h3 className="text-sm font-bold leading-tight text-white md:text-base">
                {item.title}
              </h3>
            ) : null}
            {item.subtitle ? (
              <p className="text-[11px] font-medium text-primary md:text-xs">
                {item.subtitle}
              </p>
            ) : null}
            {item.description ? (
              <p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-white/85 md:text-[12px]">
                {item.description}
              </p>
            ) : null}
            {!item.title && !item.subtitle && !item.description ? (
              <p className="text-[11px] text-white/60">No details</p>
            ) : null}
          </div>
        </>
      }
      secondContentClassName="rounded-xl p-0"
    />
  );
}
