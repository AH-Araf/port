/** Gallery section content — public portfolio only (Supabase `portfolio_settings` key `gallery`). */

export const GALLERY_SETTINGS_KEY = "gallery";

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `gal-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Seed / fallback when Supabase has no gallery row yet. */
export const DEFAULT_GALLERY_CONTENT = {
  title: "Gallery",
  items: [
    {
      id: "gal-devfest",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDGuYpex1AaA1tpiolhBgalyVsUkE5bQ6RAi28cqU2s5W-NvLolh2WOnhsMzZX7XXSfDbfFjzBn2UZwu5hzCDkU_SNKMMnljWhYvf0bguI8a999zYx8Lv9mDUVlVRiZ7gPnyvX-8oY6hBK9QuVGWMUGywG8any5gXmsIFcmUoDVaYvQW2TK_STVndixa9DlzvI4VlgYBs1yvkL-0kdMwEUvpWUdQ81-V1KYJBmqQ7OM5Bq3fXJoKsNoxp7bRK9gpjUd4jKX0GfLvAk",
      imageAlt: "Speaking at a developer conference",
      title: "DevFest Keynote",
      subtitle: "Google Developer Groups",
      description:
        "Keynote on building resilient frontend systems and shipping fast with modern tooling.",
      wide: true,
      visible: true,
    },
    {
      id: "gal-hackathon",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBzAdWw8w4WeYUFLyG1hKC_HyYjqN07r2fYLlsDjY7yDWxupaKUSPTHj_PX75goZkVek6SRxkRkOuHnrhTopnW_G13xBq4g1uHMMRIlXvdLXDaKxjf1Zts-N7QbBOt4FTGX7e0JMl9h70XpJjecuoZMTpJD2ZPpLKiZGHKOhejEcZImTJr9akNt70OtmyxaIFHSQAvGlUqewe7XApbvOZFoXAxTXkD9l_umG0r0dh29ONGGfJIVlbeD3l5aF6o783vyEIToVUZF5P0",
      imageAlt: "Team hackathon session",
      title: "Hackathon Night",
      subtitle: "48-hour build",
      description:
        "Late-night prototyping with the team — shipping a working demo before sunrise.",
      wide: false,
      visible: true,
    },
    {
      id: "gal-workshop",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDGuYpex1AaA1tpiolhBgalyVsUkE5bQ6RAi28cqU2s5W-NvLolh2WOnhsMzZX7XXSfDbfFjzBn2UZwu5hzCDkU_SNKMMnljWhYvf0bguI8a999zYx8Lv9mDUVlVRiZ7gPnyvX-8oY6hBK9QuVGWMUGywG8any5gXmsIFcmUoDVaYvQW2TK_STVndixa9DlzvI4VlgYBs1yvkL-0kdMwEUvpWUdQ81-V1KYJBmqQ7OM5Bq3fXJoKsNoxp7bRK9gpjUd4jKX0GfLvAk",
      imageAlt: "Workshop whiteboard session",
      title: "System Design Workshop",
      subtitle: "Hands-on session",
      description:
        "Whiteboard deep-dive on scaling APIs, caching, and failure modes for students.",
      wide: false,
      visible: true,
    },
    {
      id: "gal-buetpc",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBzAdWw8w4WeYUFLyG1hKC_HyYjqN07r2fYLlsDjY7yDWxupaKUSPTHj_PX75goZkVek6SRxkRkOuHnrhTopnW_G13xBq4g1uHMMRIlXvdLXDaKxjf1Zts-N7QbBOt4FTGX7e0JMl9h70XpJjecuoZMTpJD2ZPpLKiZGHKOhejEcZImTJr9akNt70OtmyxaIFHSQAvGlUqewe7XApbvOZFoXAxTXkD9l_umG0r0dh29ONGGfJIVlbeD3l5aF6o783vyEIToVUZF5P0",
      imageAlt: "Campus programming club meetup",
      title: "BuetPC Weekly Meetup",
      subtitle: "Campus community",
      description:
        "Weekly problem-solving and peer learning with the programming club.",
      wide: false,
      visible: true,
    },
    {
      id: "gal-github",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBzAdWw8w4WeYUFLyG1hKC_HyYjqN07r2fYLlsDjY7yDWxupaKUSPTHj_PX75goZkVek6SRxkRkOuHnrhTopnW_G13xBq4g1uHMMRIlXvdLXDaKxjf1Zts-N7QbBOt4FTGX7e0JMl9h70XpJjecuoZMTpJD2ZPpLKiZGHKOhejEcZImTJr9akNt70OtmyxaIFHSQAvGlUqewe7XApbvOZFoXAxTXkD9l_umG0r0dh29ONGGfJIVlbeD3l5aF6o783vyEIToVUZF5P0",
      imageAlt: "Open source contributor event",
      title: "GitHub Satellite",
      subtitle: "Open source",
      description:
        "Meeting maintainers and sharing contributions across the ecosystem.",
      wide: true,
      visible: true,
    },
  ],
};

export function normalizeGalleryItem(input, index = 0) {
  const raw = input && typeof input === "object" ? input : {};
  const legacyCaption = String(raw.caption ?? "").trim();
  const title =
    String(raw.title ?? "").trim() || legacyCaption;

  return {
    id: String(raw.id ?? "").trim() || createId(),
    imageUrl: String(raw.imageUrl ?? raw.src ?? "").trim(),
    imageAlt: String(raw.imageAlt ?? raw.alt ?? "").trim(),
    title,
    subtitle: String(raw.subtitle ?? "").trim(),
    description: String(raw.description ?? "").trim(),
    // Kept for older consumers / search aliases
    caption: title,
    wide: Boolean(raw.wide),
    visible: raw.visible !== false,
  };
}

export function normalizeGalleryContent(input) {
  let raw = input;
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      raw = {};
    }
  }

  const itemsRaw = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.items)
      ? raw.items
      : DEFAULT_GALLERY_CONTENT.items;

  const titleRaw =
    !Array.isArray(raw) && raw && typeof raw === "object" ? raw.title : undefined;

  const items = itemsRaw
    .map((item, i) => normalizeGalleryItem(item, i))
    .filter(
      (item) =>
        item.imageUrl ||
        item.title ||
        item.subtitle ||
        item.description ||
        item.imageAlt
    );

  return {
    title:
      String(titleRaw ?? DEFAULT_GALLERY_CONTENT.title).trim() ||
      DEFAULT_GALLERY_CONTENT.title,
    items: items.length
      ? items
      : DEFAULT_GALLERY_CONTENT.items.map((item, i) => normalizeGalleryItem(item, i)),
  };
}

export function getVisibleGalleryItems(content) {
  return normalizeGalleryContent(content).items.filter((item) => item.visible);
}

export function gallerySearchLines(content) {
  const { title } = normalizeGalleryContent(content);
  return [
    title,
    ...getVisibleGalleryItems(content).flatMap((item) => [
      item.title,
      item.subtitle,
      item.description,
      item.imageAlt,
    ]),
  ];
}

export function galleryForAiKnowledge(content) {
  const { title } = normalizeGalleryContent(content);
  return {
    title,
    items: getVisibleGalleryItems(content).map((item) => ({
      title: item.title,
      subtitle: item.subtitle || null,
      description: item.description || null,
      imageAlt: item.imageAlt || null,
      imageUrl: item.imageUrl || null,
      wide: item.wide,
    })),
  };
}

export function createEmptyGalleryItem() {
  return normalizeGalleryItem({
    id: createId(),
    imageUrl: "",
    imageAlt: "",
    title: "",
    subtitle: "",
    description: "",
    wide: false,
    visible: true,
  });
}
