import SectionHeader from "@/components/portfolio/SectionHeader";
import AnimatedProjects from "@/components/portfolio/AnimatedProjects";
import {
  getVisibleProjectsItems,
  normalizeProjectsContent,
} from "@/lib/projectsContent";

export default function ProjectsSection({ content }) {
  const { title, subtitle } = normalizeProjectsContent(content);
  const items = getVisibleProjectsItems(content);

  if (!items.length) return null;

  return (
    <section className="space-y-5 scroll-mt-[30px]" id="projects">
      <div>
        <SectionHeader>{title}</SectionHeader>
        {subtitle ? (
          <p className="mt-2 text-sm text-on-surface-variant">{subtitle}</p>
        ) : null}
      </div>
      <AnimatedProjects projects={items} autoplay />
    </section>
  );
}
