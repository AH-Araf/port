import { normalizeAboutVisibility } from "@/lib/aboutContent";
import LocationMapAnimation from "@/components/portfolio/LocationMapAnimation";

export default function AboutSection({ content }) {
  const { summary, interests, location, visibility: visibilityRaw } = content;
  const visibility = normalizeAboutVisibility(visibilityRaw);
  const showSummary = visibility.summary;
  const showInterests = visibility.interests && Array.isArray(interests) && interests.length > 0;
  const showMap = visibility.map;

  if (!showSummary && !showInterests && !showMap) {
    return null;
  }

  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-stretch">
      {showSummary ? (
        <div
          className={
            /* height:0 + min-height:100% → row height comes from the right column only */
            "flex flex-col overflow-auto rounded-xl border border-border bg-surface-container-low p-4 transition-colors group hover:border-primary/50 sm:p-5 md:h-0 md:min-h-full"
          }
        >
          <h3 className="mb-1.5 shrink-0 text-[15px] font-semibold text-on-surface">
            Summary
          </h3>
          <p className="text-[13px] leading-snug text-on-surface-variant">{summary}</p>
        </div>
      ) : (
        <div className="hidden md:block md:h-0 md:min-h-full" aria-hidden />
      )}

      <div className="flex min-h-0 flex-col gap-3">
        {showInterests ? (
          <div className="flex shrink-0 flex-col rounded-xl border border-border bg-surface-container-low p-4 transition-colors group hover:border-primary/50 sm:p-5">
            <h3 className="mb-1.5 text-[15px] font-semibold text-on-surface">Interests</h3>
            <ul className="space-y-1.5 text-xs text-on-surface-variant">
              {interests.map((interest) => (
                <li key={interest} className="flex items-center gap-2">
                  <span className="text-primary">▹</span> {interest}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {showMap ? (
          <LocationMapAnimation
            location={location}
            className="min-h-[150px] w-full flex-1"
          />
        ) : null}
      </div>
    </section>
  );
}
