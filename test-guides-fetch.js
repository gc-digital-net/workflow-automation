const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'x1zu4x72',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

// This is the exact query from guides.ts
const guidesQuery = `
  *[_type == "topSoftware"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "author": author->{
      name,
      image,
      bio
    },
    "categories": categories[]->{
      _id,
      title,
      slug
    },
    featuredImage,
    "itemCount": count(listItems)
  }
`;

async function testGuidesQuery() {
  try {
    console.log('Testing guides query...');
    const guides = await client.fetch(guidesQuery);
    console.log('Guides fetched:', JSON.stringify(guides, null, 2));
  } catch (error) {
    console.error('Error fetching guides:', error);
  }
}

testGuidesQuery();
