// Simple suburb data - just add name and postcode
// All SEO content is auto-generated
const suburbsData = [
  // CBD & Eastern Suburbs
  { name: "Sydney CBD", postcode: "2000" },
  { name: "Bondi", postcode: "2026" },
  { name: "Bondi Junction", postcode: "2022" },
  { name: "Double Bay", postcode: "2028" },
  { name: "Rose Bay", postcode: "2029" },
  { name: "Vaucluse", postcode: "2030" },
  { name: "Woollahra", postcode: "2025" },
  { name: "Paddington", postcode: "2021" },
  { name: "Randwick", postcode: "2031" },
  { name: "Coogee", postcode: "2034" },
  { name: "Potts Point", postcode: "2011" },
  { name: "Surry Hills", postcode: "2010" },
  { name: "Darlinghurst", postcode: "2010" },
  { name: "Kings Cross", postcode: "2011" },
  { name: "Redfern", postcode: "2016" },
  { name: "Waterloo", postcode: "2017" },
  { name: "Alexandria", postcode: "2015" },
  { name: "Zetland", postcode: "2017" },
  { name: "Green Square", postcode: "2018" },
  { name: "Mascot", postcode: "2020" },

  // Inner West
  { name: "Newtown", postcode: "2042" },
  { name: "Marrickville", postcode: "2204" },
  { name: "Balmain", postcode: "2041" },
  { name: "Rozelle", postcode: "2039" },
  { name: "Leichhardt", postcode: "2040" },
  { name: "Annandale", postcode: "2038" },
  { name: "Glebe", postcode: "2037" },
  { name: "Pyrmont", postcode: "2009" },
  { name: "Ultimo", postcode: "2007" },
  { name: "Chippendale", postcode: "2008" },
  { name: "Camperdown", postcode: "2050" },
  { name: "Erskineville", postcode: "2043" },
  { name: "Summer Hill", postcode: "2130" },
  { name: "Dulwich Hill", postcode: "2203" },
  { name: "Stanmore", postcode: "2048" },
  { name: "Burwood", postcode: "2134" },
  { name: "Strathfield", postcode: "2135" },
  { name: "Ashfield", postcode: "2131" },
  { name: "Concord", postcode: "2137" },
  { name: "Concord West", postcode: "2138" },
  { name: "Rhodes", postcode: "2138" },
  { name: "Meadowbank", postcode: "2114" },
  { name: "Gladesville", postcode: "2111" },
  { name: "Hunters Hill", postcode: "2110" },
  { name: "Abbotsford", postcode: "2046" },
  { name: "Drummoyne", postcode: "2047" },
  { name: "Five Dock", postcode: "2046" },
  { name: "Homebush", postcode: "2140" },
  { name: "Lidcombe", postcode: "2141" },
  { name: "Olympic Park", postcode: "2127" },
  { name: "Auburn", postcode: "2144" },

  // North Shore
  { name: "North Sydney", postcode: "2060" },
  { name: "Chatswood", postcode: "2067" },
  { name: "Chatswood West", postcode: "2067" },
  { name: "Mosman", postcode: "2088" },
  { name: "Neutral Bay", postcode: "2089" },
  { name: "Crows Nest", postcode: "2065" },
  { name: "St Leonards", postcode: "2065" },
  { name: "Lane Cove", postcode: "2066" },
  { name: "Lane Cove North", postcode: "2066" },
  { name: "Lane Cove West", postcode: "2066" },
  { name: "Artarmon", postcode: "2064" },
  { name: "Willoughby", postcode: "2068" },
  { name: "Balgowlah", postcode: "2093" },
  { name: "Frenchs Forest", postcode: "2086" },

  // Northern Beaches
  { name: "Manly", postcode: "2095" },
  { name: "Manly Vale", postcode: "2093" },
  { name: "Dee Why", postcode: "2099" },
  { name: "Brookvale", postcode: "2100" },
  { name: "Freshwater", postcode: "2096" },
  { name: "Curl Curl", postcode: "2096" },
  { name: "Mona Vale", postcode: "2103" },
  { name: "Narrabeen", postcode: "2101" },
  { name: "Collaroy", postcode: "2097" },
  { name: "Palm Beach", postcode: "2108" },

  // North West
  { name: "Ryde", postcode: "2112" },
  { name: "Macquarie Park", postcode: "2113" },
  { name: "Epping", postcode: "2121" },
  { name: "Hornsby", postcode: "2077" },
  { name: "Wahroonga", postcode: "2076" },
  { name: "Castle Hill", postcode: "2154" },
  { name: "Baulkham Hills", postcode: "2153" },
  { name: "Kellyville", postcode: "2155" },
  { name: "Rouse Hill", postcode: "2155" },
  { name: "Blacktown", postcode: "2148" },
  { name: "Mount Druitt", postcode: "2770" },
  { name: "Penrith", postcode: "2750" },

  // South West
  { name: "Liverpool", postcode: "2170" },
  { name: "Bankstown", postcode: "2200" },

  // South & Sutherland Shire
  { name: "Hurstville", postcode: "2220" },
  { name: "Kogarah", postcode: "2217" },
  { name: "Rockdale", postcode: "2216" },
  { name: "Sutherland", postcode: "2232" },
  { name: "Miranda", postcode: "2228" },
  { name: "Caringbah", postcode: "2229" },
  { name: "Cronulla", postcode: "2230" },
  { name: "Gymea", postcode: "2227" },
  { name: "Engadine", postcode: "2233" },
  { name: "Parramatta", postcode: "2150" },
];

// Auto-generate suburb slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// Auto-generate meta title
function generateMetaTitle(name) {
  return `Professional House Cleaning Services in ${name} - Book Today!`;
}

// Auto-generate meta description
function generateMetaDescription(name) {
  return `Looking for professional house cleaning services in ${name}? Sustainable Shine offers spotless, eco-friendly home cleaning at great prices. Call now!`;
}

// Auto-generate keywords
function generateKeywords(name) {
  return `cleaning services ${name}, ${name} cleaners, eco-friendly cleaning ${name}, house cleaning ${name}, deep cleaning ${name}, end-of-lease cleaning ${name}`;
}

// Build the suburbs object with auto-generated content
export const sydneySuburbs = suburbsData.reduce((acc, suburb) => {
  const slug = generateSlug(suburb.name);
  acc[slug] = {
    name: suburb.name,
    fullName: `${suburb.name}, Sydney`,
    postcode: suburb.postcode,
    description: generateMetaDescription(suburb.name),
    metaTitle: generateMetaTitle(suburb.name),
    metaDescription: generateMetaDescription(suburb.name),
    keywords: generateKeywords(suburb.name),
  };
  return acc;
}, {});

// Get suburb data by slug
export function getSuburbData(slug) {
  return sydneySuburbs[slug] || null;
}

// Get all suburb slugs for static generation
export function getAllSuburbSlugs() {
  return Object.keys(sydneySuburbs);
}

// Check if a suburb exists
export function isValidSuburb(slug) {
  return slug in sydneySuburbs;
}

// Get all suburbs as array (useful for sitemaps, etc.)
export function getAllSuburbs() {
  return Object.entries(sydneySuburbs).map(([slug, data]) => ({
    slug,
    ...data,
  }));
}
