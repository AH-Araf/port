"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Image compare / reveal slider adapted from Aceternity Compare
 * https://ui.aceternity.com/components/compare
 *
 * Supports a second image OR custom `secondContent` (e.g. text panel).
 */
export function Compare({
  firstImage = "",
  secondImage = "",
  secondContent = null,
  className,
  firstImageClassName,
  secondImageClassname,
  secondContentClassName,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
}) {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const autoplayRef = useRef(null);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;
    const startTime = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress =
        (elapsedTime % (autoplayDuration * 2)) / autoplayDuration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;
      setSliderXPercent(percentage);
      autoplayRef.current = setTimeout(animate, 16);
    };
    animate();
  }, [autoplay, autoplayDuration]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  function mouseEnterHandler() {
    stopAutoplay();
  }

  function mouseLeaveHandler() {
    if (slideMode === "hover") {
      setSliderXPercent(initialSliderPercentage);
    }
    if (slideMode === "drag") {
      setIsDragging(false);
    }
    startAutoplay();
  }

  const handleStart = useCallback(() => {
    if (slideMode === "drag") setIsDragging(true);
  }, [slideMode]);

  const handleEnd = useCallback(() => {
    if (slideMode === "drag") setIsDragging(false);
  }, [slideMode]);

  const handleMove = useCallback(
    (clientX) => {
      if (!sliderRef.current) return;
      if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(0, Math.min(100, percent)));
        });
      }
    },
    [slideMode, isDragging]
  );

  return (
    <div
      ref={sliderRef}
      className={cn(
        "relative overflow-hidden select-none",
        className
      )}
      style={{
        cursor: slideMode === "drag" ? (isDragging ? "grabbing" : "grab") : "col-resize",
        touchAction: isDragging ? "none" : "pan-y",
      }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onTouchStart={(e) => {
        if (autoplay) return;
        handleStart();
        // Do not jump the slider on touch start — wait for move
      }}
      onTouchEnd={() => {
        if (!autoplay) handleEnd();
      }}
      onTouchMove={(e) => {
        if (autoplay || !isDragging) return;
        handleMove(e.touches[0].clientX);
      }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          className="absolute top-0 z-40 m-auto h-full w-px bg-gradient-to-b from-transparent from-[5%] via-primary to-transparent to-[95%]"
          style={{ left: `${sliderXPercent}%` }}
          transition={{ duration: 0 }}
        >
          <div className="absolute top-1/2 left-0 z-20 h-full w-36 -translate-y-1/2 bg-gradient-to-r from-primary/40 via-transparent to-transparent opacity-50 [mask-image:radial-gradient(100px_at_left,white,transparent)]" />
          <div className="absolute top-1/2 left-0 z-10 h-1/2 w-10 -translate-y-1/2 bg-gradient-to-r from-primary via-transparent to-transparent opacity-100 [mask-image:radial-gradient(50px_at_left,white,transparent)]" />
          {showHandlebar ? (
            <div className="absolute top-1/2 -right-2.5 z-30 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-md bg-white shadow-[0px_-1px_0px_0px_#FFFFFF40]">
              <span className="material-symbols-outlined !text-[14px] text-black">
                drag_indicator
              </span>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <AnimatePresence initial={false}>
          {firstImage ? (
            <motion.div
              className={cn(
                "absolute inset-0 z-20 h-full w-full shrink-0 select-none overflow-hidden rounded-2xl",
                firstImageClassName
              )}
              style={{
                clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
              }}
              transition={{ duration: 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={firstImage}
                className={cn(
                  "absolute inset-0 z-20 h-full w-full shrink-0 select-none rounded-2xl object-cover",
                  firstImageClassName
                )}
                draggable={false}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {secondContent ? (
          <div
            className={cn(
              "absolute inset-0 z-[19] flex h-full w-full select-none flex-col justify-end overflow-hidden rounded-2xl",
              secondContentClassName
            )}
          >
            {secondContent}
          </div>
        ) : secondImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <motion.img
            className={cn(
              "absolute top-0 left-0 z-[19] h-full w-full select-none rounded-2xl object-cover",
              secondImageClassname
            )}
            alt=""
            src={secondImage}
            draggable={false}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
