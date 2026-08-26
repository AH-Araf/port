import SectionHeader from "@/components/portfolio/SectionHeader";
import SkillChip from "@/components/portfolio/SkillChip";
import {
  getVisibleSkillsGroups,
  normalizeSkillsContent,
} from "@/lib/skillsContent";

export default function SkillsSection({ content }) {
  const { title } = normalizeSkillsContent(content);
  const groups = getVisibleSkillsGroups(content);

  if (!groups.length) return null;

  return (
    <section className="space-y-5 scroll-mt-[30px]" id="skills">
      <SectionHeader>{title}</SectionHeader>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="rounded-lg border border-border bg-surface-container p-4"
          >
            <p className="mb-3 text-[10px] uppercase tracking-tighter text-primary">
              {group.title}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <SkillChip key={`${group.id}-${item}`}>{item}</SkillChip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
