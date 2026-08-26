import SectionHeader from "@/components/portfolio/SectionHeader";
import GalleryCompareCard from "@/components/portfolio/GalleryCompareCard";
import {
  getVisibleGalleryItems,
  normalizeGalleryContent,
} from "@/lib/galleryContent";

export default function GallerySection({ content }) {
  const { title } = normalizeGalleryContent(content);
  const items = getVisibleGalleryItems(content);

  if (!items.length) return null;

  return (
    <section className="space-y-5 scroll-mt-[30px]" id="gallery">
      <SectionHeader>{title}</SectionHeader>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={item.wide ? "col-span-2 md:col-span-2" : ""}
          >
            <GalleryCompareCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
