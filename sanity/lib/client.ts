import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { sanityConfig } from '../config';

// Use hardcoded values for build time
export const projectId = sanityConfig.projectId;
export const dataset = sanityConfig.dataset;
export const apiVersion = sanityConfig.apiVersion;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: sanityConfig.useCdn,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}