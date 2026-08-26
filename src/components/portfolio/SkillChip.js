"use client";

import { useState } from "react";

/** Skill tag with Naser-style offset shadow + press (primary-colored). */
export default function SkillChip({ children }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="button"
      className={`skill-chip${pressed ? " is-pressed" : ""}`}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >
      {children}
    </button>
  );
}
