import Link from "next/link";
import { BreadcrumbSchema } from "@/components/schema-markup";
import Image from "next/image";

export const metadata = {
  title: "House Cleaning Service Areas Sydney | All Suburbs | Sustainable Shine",
  description:
    "Sustainable Shine provides professional house cleaning across all Sydney suburbs. Browse every suburb and service — general cleaning, deep cleaning & end of lease cleaning — all in one place.",
  keywords:
    "house cleaning Sydney suburbs, cleaning service areas Sydney, general cleaning, deep cleaning, end of lease cleaning, Sydney cleaners",
  alternates: {
    canonical: "https://sustainableshine.com.au/service-areas",
  },
  openGraph: {
    title: "House Cleaning Service Areas Sydney | Sustainable Shine",
    description:
      "Find professional cleaning services in your Sydney suburb. General, deep, and end of lease cleaning available across 100+ suburbs.",
    type: "website",
    locale: "en_AU",
    siteName: "Sustainable Shine",
    url: "https://sustainableshine.com.au/service-areas",
  },
};

// these SVG icons replace emojis — one per region, kept simple
const RegionIcons = {
  CBD: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  InnerWest: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  NorthShore: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Beaches: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 3v1m0 16v1M4.22 4.22l.707.707M18.36 18.36l.707.707M1 12h1m20 0h1M4.22 19.78l.707-.707M18.36 5.64l.707-.707M12 17a5 5 0 100-10 5 5 0 000 10z" />
    </svg>
  ),
  NorthWest: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  SouthWest: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  Sutherland: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

// ── Data ──────────────────────────────────────────────────────────────────────
const regions = [
  {
    name: "CBD & Eastern Suburbs",
    icon: RegionIcons.CBD,
    suburbs: [
      { name: "Sydney CBD", slug: "sydney-cbd" },
      { name: "Bondi", slug: "bondi" },
      { name: "Bondi Junction", slug: "bondi-junction" },
      { name: "Double Bay", slug: "double-bay" },
      { name: "Rose Bay", slug: "rose-bay" },
      { name: "Vaucluse", slug: "vaucluse" },
      { name: "Woollahra", slug: "woollahra" },
      { name: "Paddington", slug: "paddington" },
      { name: "Randwick", slug: "randwick" },
      { name: "Coogee", slug: "coogee" },
      { name: "Potts Point", slug: "potts-point" },
      { name: "Surry Hills", slug: "surry-hills" },
      { name: "Darlinghurst", slug: "darlinghurst" },
      { name: "Kings Cross", slug: "kings-cross" },
      { name: "Redfern", slug: "redfern" },
      { name: "Waterloo", slug: "waterloo" },
      { name: "Alexandria", slug: "alexandria" },
      { name: "Zetland", slug: "zetland" },
      { name: "Green Square", slug: "green-square" },
      { name: "Mascot", slug: "mascot" },
    ],
  },
  {
    name: "Inner West",
    icon: RegionIcons.InnerWest,
    suburbs: [
      { name: "Newtown", slug: "newtown" },
      { name: "Marrickville", slug: "marrickville" },
      { name: "Balmain", slug: "balmain" },
      { name: "Rozelle", slug: "rozelle" },
      { name: "Leichhardt", slug: "leichhardt" },
      { name: "Annandale", slug: "annandale" },
      { name: "Glebe", slug: "glebe" },
      { name: "Pyrmont", slug: "pyrmont" },
      { name: "Ultimo", slug: "ultimo" },
      { name: "Chippendale", slug: "chippendale" },
      { name: "Camperdown", slug: "camperdown" },
      { name: "Erskineville", slug: "erskineville" },
      { name: "Summer Hill", slug: "summer-hill" },
      { name: "Dulwich Hill", slug: "dulwich-hill" },
      { name: "Stanmore", slug: "stanmore" },
      { name: "Burwood", slug: "burwood" },
      { name: "Strathfield", slug: "strathfield" },
      { name: "Ashfield", slug: "ashfield" },
      { name: "Concord", slug: "concord" },
      { name: "Concord West", slug: "concord-west" },
      { name: "Rhodes", slug: "rhodes" },
      { name: "Meadowbank", slug: "meadowbank" },
      { name: "Gladesville", slug: "gladesville" },
      { name: "Hunters Hill", slug: "hunters-hill" },
      { name: "Abbotsford", slug: "abbotsford" },
      { name: "Drummoyne", slug: "drummoyne" },
      { name: "Five Dock", slug: "five-dock" },
      { name: "Homebush", slug: "homebush" },
      { name: "Lidcombe", slug: "lidcombe" },
      { name: "Olympic Park", slug: "olympic-park" },
      { name: "Auburn", slug: "auburn" },
    ],
  },
  {
    name: "North Shore",
    icon: RegionIcons.NorthShore,
    suburbs: [
      { name: "North Sydney", slug: "north-sydney" },
      { name: "Chatswood", slug: "chatswood" },
      { name: "Chatswood West", slug: "chatswood-west" },
      { name: "Mosman", slug: "mosman" },
      { name: "Neutral Bay", slug: "neutral-bay" },
      { name: "Crows Nest", slug: "crows-nest" },
      { name: "St Leonards", slug: "st-leonards" },
      { name: "Lane Cove", slug: "lane-cove" },
      { name: "Lane Cove North", slug: "lane-cove-north" },
      { name: "Lane Cove West", slug: "lane-cove-west" },
      { name: "Artarmon", slug: "artarmon" },
      { name: "Willoughby", slug: "willoughby" },
      { name: "Balgowlah", slug: "balgowlah" },
      { name: "Frenchs Forest", slug: "frenchs-forest" },
    ],
  },
  {
    name: "Northern Beaches",
    icon: RegionIcons.Beaches,
    suburbs: [
      { name: "Manly", slug: "manly" },
      { name: "Manly Vale", slug: "manly-vale" },
      { name: "Dee Why", slug: "dee-why" },
      { name: "Brookvale", slug: "brookvale" },
      { name: "Freshwater", slug: "freshwater" },
      { name: "Curl Curl", slug: "curl-curl" },
      { name: "Mona Vale", slug: "mona-vale" },
      { name: "Narrabeen", slug: "narrabeen" },
      { name: "Collaroy", slug: "collaroy" },
      { name: "Palm Beach", slug: "palm-beach" },
    ],
  },
  {
    name: "North West",
    icon: RegionIcons.NorthWest,
    suburbs: [
      { name: "Ryde", slug: "ryde" },
      { name: "Macquarie Park", slug: "macquarie-park" },
      { name: "Epping", slug: "epping" },
      { name: "Hornsby", slug: "hornsby" },
      { name: "Wahroonga", slug: "wahroonga" },
      { name: "Castle Hill", slug: "castle-hill" },
      { name: "Baulkham Hills", slug: "baulkham-hills" },
      { name: "Kellyville", slug: "kellyville" },
      { name: "Rouse Hill", slug: "rouse-hill" },
      { name: "Blacktown", slug: "blacktown" },
      { name: "Mount Druitt", slug: "mount-druitt" },
      { name: "Penrith", slug: "penrith" },
    ],
  },
  {
    name: "South West",
    icon: RegionIcons.SouthWest,
    suburbs: [
      { name: "Liverpool", slug: "liverpool" },
      { name: "Bankstown", slug: "bankstown" },
      { name: "Parramatta", slug: "parramatta" },
    ],
  },
  {
    name: "South & Sutherland Shire",
    icon: RegionIcons.Sutherland,
    suburbs: [
      { name: "Hurstville", slug: "hurstville" },
      { name: "Kogarah", slug: "kogarah" },
      { name: "Rockdale", slug: "rockdale" },
      { name: "Sutherland", slug: "sutherland" },
      { name: "Miranda", slug: "miranda" },
      { name: "Caringbah", slug: "caringbah" },
      { name: "Cronulla", slug: "cronulla" },
      { name: "Gymea", slug: "gymea" },
      { name: "Engadine", slug: "engadine" },
    ],
  },
];

// three service types — shared neutral style for a clean, professional look
const services = [
  { label: "General Cleaning", path: "general-clean" },
  { label: "Deep Cleaning", path: "deep-clean" },
  { label: "End of Lease", path: "end-of-lease-cleaning" },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ServiceAreasPage() {
  // count all suburbs across every region
  const totalSuburbs = regions.reduce((sum, r) => sum + r.suburbs.length, 0);

  const breadcrumbSchema = BreadcrumbSchema({
    items: [
      { name: "Home", url: "https://sustainableshine.com.au" },
      { name: "Service Areas", url: "https://sustainableshine.com.au/service-areas" },
    ],
  });

  return (
    <main className="min-h-screen bg-[#f8faf9]">

      {/* hero — two column: text left, photo right */}
      <section className="relative bg-gradient-to-br from-emerald-700 to-emerald-500 text-white pt-32 pb-28 overflow-hidden">
        {/* faint dot-grid texture in the background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* curved white cut at the bottom so it blends into page */}
        <div
          className="absolute -bottom-1 left-0 right-0 h-16 bg-[#f8faf9]"
          style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
        />

        <div className="container-custom relative z-10">
          {/* back link */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-100 hover:text-white text-sm font-medium mb-10 transition-colors group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          {/* two-column grid: text + hero image */}
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* left — headline, description, stats */}
            <div>
              <p className="text-emerald-200 text-sm font-semibold uppercase tracking-widest mb-4">
                Sydney-Wide Coverage
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight">
                Our Cleaning<br />Service Areas
              </h1>
              <p className="text-lg text-emerald-50 leading-relaxed mb-10">
                Professional house cleaning available across{" "}
                <strong className="text-white font-semibold">{totalSuburbs} Sydney suburbs</strong>.
                Find your suburb and choose your service.
              </p>

              {/* quick stats keep these honest and up to date */}
              <div className="flex flex-wrap gap-10">
                {[
                  { value: "3", label: "Services" },
                  { value: "500+", label: "Happy Clients" },
                  { value: "5 / 5", label: "Rating" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-emerald-200 text-xs mt-0.5 uppercase tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* right — hero photo with a soft frame */}
            <div className="hidden md:block relative">
              {/* subtle glow behind the image */}
              <div className="absolute inset-0 rounded-2xl bg-emerald-400 opacity-20 blur-2xl scale-95" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <Image
                  src="/hero2.jpeg"
                  alt="Professional house cleaning service in Sydney"
                  fill
                  className="object-cover"
                  priority
                />
                {/* dark gradient at the bottom so it doesn't feel too harsh */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Quick Jump ───────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container-custom">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {regions.map((region) => {
              const id = region.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-emerald-500">{region.icon}</span>
                  {region.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* all regions rendered in one loop — each section gets its own anchor id */}
      <div className="container-custom py-16 space-y-20">
        {regions.map((region) => {
          // slugify the region name for the anchor link
          const id = region.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <section key={id} id={id} className="scroll-mt-20">

              {/* Region header */}
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  {region.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    House Cleaning in {region.name}
                  </h2>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {region.suburbs.length} suburb{region.suburbs.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center justify-center min-w-[2.5rem] h-7 px-3 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
                  {region.suburbs.length}
                </span>
              </div>

              {/* Suburb cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {region.suburbs.map((suburb) => (
                  <div
                    key={suburb.slug}
                    className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group overflow-hidden"
                  >
                    {/* Card title — text itself is the link */}
                    <div className="px-4 pt-4 pb-3">
                      <h3 className="text-sm font-semibold leading-snug">
                        <Link
                          href={`/${suburb.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-900 hover:text-emerald-700 transition-colors"
                        >
                          House Cleaning in {suburb.name}
                        </Link>
                      </h3>
                    </div>

                    {/* Divider */}
                    <div className="mx-4 border-t border-gray-100" />

                    {/* Service links — single muted style */}
                    <div className="px-3 py-3 space-y-1.5">
                      {services.map((svc) => (
                        <Link
                          key={svc.path}
                          href={`/${svc.path}/${suburb.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 text-xs font-medium transition-all duration-150"
                        >
                          <span className="flex-1">{svc.label} in {suburb.name}</span>
                          <svg className="w-3 h-3 opacity-40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-200">
        <div className="container-custom py-20 text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Can't find your suburb?
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            We may still cover your area. Get in touch and we'll confirm availability for your location.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/booking"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3 rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-px text-sm"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:+61452422059"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold px-7 py-3 rounded-lg transition-all duration-200 text-sm"
            >
              Call +61 452 422 059
            </a>
          </div>
        </div>
      </section>

      {/* ── Structured Data ───────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </main>
  );
}
