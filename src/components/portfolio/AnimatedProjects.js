"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

/** Matches frontend project image frame (Tailwind h-56 / max-w-[300px]). */
const FRAME_H = 224;
const FRAME_W = 300;

/**
 * Projects carousel adapted from Aceternity Animated Testimonials
 * https://ui.aceternity.com/components/animated-testimonials
 */
export default function AnimatedProjects({ projects = [], autoplay = true }) {
  const [active, setActive] = useState(0);
  const count = projects.length;

  const rotations = useMemo(
    () => projects.map(() => Math.floor(Math.random() * 13) - 6),
    // Recalculate only when project ids change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projects.map((p) => p.id).join("|")]
  );

  const handleNext = () => {
    setActive((prev) => (prev + 1) % count);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + count) % count);
  };

  useEffect(() => {
    if (!autoplay || count < 2) return undefined;
    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [autoplay, count]);

  useEffect(() => {
    if (active >= count) setActive(0);
  }, [active, count]);

  if (!count) return null;

  const current = projects[active] ?? projects[0];
  const tagsLabel = Array.isArray(current.tags) ? current.tags.join(" · ") : "";

  return (
    <div className="relative grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10 mt-16">
      <div className="flex justify-center px-5 sm:px-8 md:justify-start md:px-6">
        <div
          className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[300px]"
          style={{ height: FRAME_H, maxWidth: FRAME_W }}
        >
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: rotations[index] ?? 0,
                }}
                animate={{
                  opacity: index === active ? 1 : 0.7,
                  scale: index === active ? 1 : 0.95,
                  z: index === active ? 0 : -100,
                  rotate: index === active ? 0 : rotations[index] ?? 0,
                  zIndex: index === active ? 40 : count + 2 - index,
                  y: index === active ? [0, -24, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: rotations[index] ?? 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 origin-bottom"
              >
                {project.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt || project.title}
                    width={FRAME_W}
                    height={FRAME_H}
                    draggable={false}
                    className="h-full w-full rounded-xl border border-border object-cover object-center shadow-[0_12px_40px_rgb(0_0_0/0.35)]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-xl border border-border bg-surface-container-highest">
                    <span className="material-symbols-outlined text-[36px] text-on-surface-variant/50">
                      web_asset
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex w-full flex-col md:h-[224px]">
        <div className="min-h-0 flex-1 overflow-hidden">
          <motion.div
            key={current.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="truncate text-2xl font-bold leading-none text-on-surface">
              {current.title}
            </h3>
            <p className="mt-1 h-5 truncate text-sm leading-5 text-primary/90">
              {tagsLabel || "\u00a0"}
            </p>

            <motion.p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-on-surface-variant">
              {(current.description || "")
                .split(" ")
                .filter(Boolean)
                .map((word, index) => (
                  <motion.span
                    key={`${current.id}-w-${index}`}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
            </motion.p>

            {(current.liveUrl || current.codeUrl) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {current.liveUrl ? (
                  <a
                    href={current.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-btn portfolio-btn--ghost inline-flex items-center gap-1.5 border border-border bg-surface-container-low px-3 py-1.5 text-[12px] font-semibold text-on-surface"
                  >
                    <span className="material-symbols-outlined !text-[16px]">
                      link
                    </span>
                    Live
                  </a>
                ) : null}
                {current.codeUrl ? (
                  <a
                    href={current.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-btn portfolio-btn--ghost inline-flex items-center gap-1.5 border border-border bg-surface-container-low px-3 py-1.5 text-[12px] font-semibold text-on-surface"
                  >
                    <span className="material-symbols-outlined !text-[16px]">
                      code
                    </span>
                    Code
                  </a>
                ) : null}
              </div>
            )}
          </motion.div>
        </div>

        <div className="mt-5 flex shrink-0 items-center gap-3 md:mt-auto md:pt-3">
          <button
            type="button"
            onClick={handlePrev}
            className="group/button flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-container-high transition hover:border-primary/50 hover:bg-surface-container-highest"
            aria-label="Previous project"
          >
            <span className="material-symbols-outlined !text-[18px] text-on-surface-variant transition-transform duration-300 group-hover/button:-rotate-12">
              arrow_back
            </span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="group/button flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-container-high transition hover:border-primary/50 hover:bg-surface-container-highest"
            aria-label="Next project"
          >
            <span className="material-symbols-outlined !text-[18px] text-on-surface-variant transition-transform duration-300 group-hover/button:rotate-12">
              arrow_forward
            </span>
          </button>
          <span className="ml-1 font-label-mono text-[11px] text-on-surface-variant/70">
            {active + 1} / {count}
          </span>
        </div>
      </div>
    </div>
  );
}
