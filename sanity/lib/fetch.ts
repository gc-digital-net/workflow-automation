import { groq } from 'next-sanity';
import { client } from './client';
import {
  postsQuery,
  postBySlugQuery,
  postsByCategoryQuery,
  softwareQuery,
  softwareBySlugQuery,
  softwareByCategoryQuery,
  topSoftwareQuery,
  listiclesQuery,
  listicleBySlugQuery,
  categoriesQuery,
  categoryBySlugQuery,
  authorsQuery,
  authorBySlugQuery,
  searchQuery,
  homepageDataQuery,
  sitemapQuery,
} from './queries';
import { cache } from 'react';

// Cache the fetch functions to prevent unnecessary re-fetches
export const revalidate = 60; // Revalidate every 60 seconds

// Post fetchers
export const getPosts = cache(async () => {
  try {
    const posts = await client.fetch(postsQuery);
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
});

export const getPostBySlug = cache(async (slug: string) => {
  try {
    const post = await client.fetch(postBySlugQuery, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
});

export const getPostsByCategory = cache(async (categoryId: string) => {
  try {
    const posts = await client.fetch(postsByCategoryQuery, { categoryId });
    return posts;
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
});

// Software fetchers
export const getSoftware = cache(async () => {
  try {
    const software = await client.fetch(softwareQuery);
    return software;
  } catch (error) {
    console.error('Error fetching software:', error);
    return [];
  }
});

export const getSoftwareBySlug = cache(async (slug: string) => {
  try {
    const software = await client.fetch(softwareBySlugQuery, { slug });
    return software;
  } catch (error) {
    console.error('Error fetching software by slug:', error);
    return null;
  }
});

export const getSoftwareByCategory = cache(async (categoryId: string) => {
  try {
    const software = await client.fetch(softwareByCategoryQuery, { categoryId });
    return software;
  } catch (error) {
    console.error('Error fetching software by category:', error);
    return [];
  }
});

export const getTopSoftware = cache(async () => {
  try {
    const software = await client.fetch(topSoftwareQuery);
    return software;
  } catch (error) {
    console.error('Error fetching top software:', error);
    return [];
  }
});

// Listicle fetchers
export const getListicles = cache(async () => {
  try {
    const listicles = await client.fetch(listiclesQuery);
    return listicles;
  } catch (error) {
    console.error('Error fetching listicles:', error);
    return [];
  }
});

export const getListicleBySlug = cache(async (slug: string) => {
  try {
    const listicle = await client.fetch(listicleBySlugQuery, { slug });
    return listicle;
  } catch (error) {
    console.error('Error fetching listicle by slug:', error);
    return null;
  }
});

// Category fetchers
export const getCategories = cache(async () => {
  try {
    const categories = await client.fetch(categoriesQuery);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
});

export const getCategoryBySlug = cache(async (slug: string) => {
  try {
    const category = await client.fetch(categoryBySlugQuery, { slug });
    return category;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
});

// Author fetchers
export const getAuthors = cache(async () => {
  try {
    const authors = await client.fetch(authorsQuery);
    return authors;
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
});

export const getAuthorBySlug = cache(async (slug: string) => {
  try {
    const author = await client.fetch(authorBySlugQuery, { slug });
    return author;
  } catch (error) {
    console.error('Error fetching author by slug:', error);
    return null;
  }
});

// Search fetcher
export const searchContent = cache(async (searchTerm: string) => {
  try {
    const results = await client.fetch(searchQuery, { 
      searchTerm: `*${searchTerm}*` 
    });
    return results;
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
});

// Homepage data fetcher
export const getHomepageData = cache(async () => {
  try {
    const data = await client.fetch(homepageDataQuery);
    return data;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      featuredSoftware: [],
      latestPosts: [],
      popularListicles: [],
      categories: [],
    };
  }
});

// Sitemap data fetcher
export const getSitemapData = cache(async () => {
  try {
    const data = await client.fetch(sitemapQuery);
    return data;
  } catch (error) {
    console.error('Error fetching sitemap data:', error);
    return {
      posts: [],
      software: [],
      listicles: [],
      categories: [],
    };
  }
});

// Helper function to get all slugs for static generation
export const getAllPostSlugs = cache(async () => {
  try {
    const slugs = await client.fetch(
      groq`*[_type == "post" && !(_id in path("drafts.**"))].slug.current`
    );
    return slugs;
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
});

export const getAllSoftwareSlugs = cache(async () => {
  try {
    const slugs = await client.fetch(
      groq`*[_type == "software" && !(_id in path("drafts.**"))].slug.current`
    );
    return slugs;
  } catch (error) {
    console.error('Error fetching software slugs:', error);
    return [];
  }
});

export const getAllListicleSlugs = cache(async () => {
  try {
    const slugs = await client.fetch(
      groq`*[_type == "listicle" && !(_id in path("drafts.**"))].slug.current`
    );
    return slugs;
  } catch (error) {
    console.error('Error fetching listicle slugs:', error);
    return [];
  }
});

export const getAllCategorySlugs = cache(async () => {
  try {
    const slugs = await client.fetch(
      groq`*[_type == "category" && !(_id in path("drafts.**"))].slug.current`
    );
    return slugs;
  } catch (error) {
    console.error('Error fetching category slugs:', error);
    return [];
  }
});