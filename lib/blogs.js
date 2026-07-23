const API_BASE_URL = "https://api.sustainableshine.com.au/api";

/**
 * Fetch all blog posts from the paginated API.
 * Follows `next` links so posts beyond the first page are included.
 */
export async function fetchAllBlogs({ revalidate = 60 } = {}) {
  const allBlogs = [];
  let url = `${API_BASE_URL}/blog/`;

  while (url) {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate, tags: ["blogs"] },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const pageResults = data.results || (Array.isArray(data) ? data : []);
    allBlogs.push(...pageResults);
    url = data.next || null;
  }

  return allBlogs;
}

export async function fetchPublishedBlogs(options) {
  const blogs = await fetchAllBlogs(options);
  return blogs.filter((blog) => blog.status === "published");
}

/**
 * Published blogs tagged to a specific suburb slug.
 * Empty/missing suburb values are treated as general (not city-specific).
 */
export async function fetchPublishedBlogsBySuburb(suburbSlug, options) {
  if (!suburbSlug) return [];

  const slug = String(suburbSlug).toLowerCase();
  const blogs = await fetchPublishedBlogs(options);

  return blogs.filter(
    (blog) => blog.suburb && String(blog.suburb).toLowerCase() === slug,
  );
}
