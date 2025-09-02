import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';

// Free screenshot API services (choose one)
const SCREENSHOT_APIS = {
  // Option 1: Screenshot Machine (free tier available)
  screenshotMachine: (url: string) => 
    `https://api.screenshotmachine.com?key=YOUR_KEY&url=${encodeURIComponent(url)}&dimension=1440x900`,
  
  // Option 2: Page2Images (free tier)
  page2images: (url: string) =>
    `https://api.page2images.com/directlink?p2i_key=YOUR_KEY&p2i_url=${encodeURIComponent(url)}`,
  
  // Option 3: Microlink (generous free tier)
  microlink: async (url: string) => {
    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true`);
    const data = await response.json();
    return data.data.screenshot.url;
  },
  
  // Option 4: Urlbox.io (free trial)
  urlbox: (url: string) =>
    `https://api.urlbox.io/v1/YOUR_KEY/png?url=${encodeURIComponent(url)}&width=1440&height=900`
};

async function captureWithAPI() {
  console.log('📸 Using Screenshot API (no login required!)\n');
  
  const screenshotDir = path.join(process.cwd(), 'public', 'tools', 'monday-com');
  
  // URLs that show Monday.com interface
  const urls = [
    {
      url: 'https://monday.com/lp/mp/project-management',
      filename: 'monday-api-pm-board.png',
      description: 'Project management board'
    },
    {
      url: 'https://monday.com/lang/en/gantt',
      filename: 'monday-api-gantt.png',
      description: 'Gantt timeline view'
    },
    {
      url: 'https://monday.com/lang/en/kanban',
      filename: 'monday-api-kanban.png',
      description: 'Kanban board'
    },
    {
      url: 'https://monday.com/lang/en/automations',
      filename: 'monday-api-automations.png',
      description: 'Automation builder'
    }
  ];

  console.log('Using Microlink API (free, no key needed)...\n');

  for (const config of urls) {
    try {
      console.log(`📸 Capturing: ${config.description}`);
      
      // Using Microlink (free, no API key needed)
      const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(config.url)}&screenshot=true&viewport.width=1440&viewport.height=900`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.status === 'success' && data.data.screenshot) {
        // Download the screenshot
        const imageResponse = await fetch(data.data.screenshot.url);
        const buffer = await imageResponse.buffer();
        
        // Save to file
        const filepath = path.join(screenshotDir, config.filename);
        fs.writeFileSync(filepath, buffer);
        
        console.log(`   ✅ Saved: ${config.filename}`);
      } else {
        console.log(`   ❌ API error: ${data.message || 'Unknown error'}`);
      }
      
      // Rate limiting - wait between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);
    }
  }
  
  console.log('\n✨ API screenshots complete!');
}

// Note about API services
console.log('📝 Screenshot API Options:\n');
console.log('1. Microlink.io - Free tier, no signup required');
console.log('2. Screenshot Machine - Free tier with signup');
console.log('3. Urlbox.io - Free trial, high quality');
console.log('4. Page2Images - Free tier available\n');
console.log('Starting with Microlink (no signup needed)...\n');

captureWithAPI().catch(console.error);