const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'x1zu4x72',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function testQueries() {
  try {
    // Test 1: Check if any topSoftware documents exist
    const topSoftwareCount = await client.fetch(`count(*[_type == "topSoftware"])`);
    console.log('TopSoftware documents count:', topSoftwareCount);

    // Test 2: Get all topSoftware documents
    const topSoftware = await client.fetch(`*[_type == "topSoftware"] { _id, title, slug }`);
    console.log('TopSoftware documents:', topSoftware);

    // Test 3: Check for bestOfGuide type (alternative name)
    const bestOfCount = await client.fetch(`count(*[_type == "bestOfGuide"])`);
    console.log('BestOfGuide documents count:', bestOfCount);

    // Test 4: Get all document types
    const types = await client.fetch(`array::unique(*[]._type)`);
    console.log('All document types in dataset:', types);

  } catch (error) {
    console.error('Error:', error);
  }
}

testQueries();
