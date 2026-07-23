import { getAllSuburbSlugs } from "@/data/suburbs";
import { fetchPublishedBlogs } from "@/lib/blogs";

async function fetchBlogPosts() {
  try {
    return await fetchPublishedBlogs({ revalidate: 60 });
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
    return [];
  }
}

export default async function sitemap() {
  const baseUrl = "https://sustainableshine.com.au";
  const currentDate = new Date().toISOString();

  // Get all suburb slugs
  const suburbSlugs = getAllSuburbSlugs();

  // Fetch all blog posts
  const blogPosts = await fetchBlogPosts();

  // Generate blog post URLs
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at || post.published_date || post.created_at || currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Generate suburb URLs (existing city pages)
  const suburbUrls = suburbSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Generate service suburb URLs - HIGHEST PRIORITY FOR SEO
  const serviceSuburbUrls = [];
  const services = [
    { path: 'end-of-lease-cleaning', priority: 0.95 },
    { path: 'deep-clean', priority: 0.9 },
    { path: 'general-clean', priority: 0.9 }
  ];
  
  services.forEach(service => {
    suburbSlugs.forEach(slug => {
      serviceSuburbUrls.push({
        url: `${baseUrl}/${service.path}/${slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly", // High priority for Google crawling
        priority: service.priority,
      });
    });
  });

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/service-areas`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/end-of-lease-cleaning`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/deep-clean`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/general-clean`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/our-work`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/checklist`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...mainPages, ...blogUrls, ...suburbUrls, ...serviceSuburbUrls];
}
