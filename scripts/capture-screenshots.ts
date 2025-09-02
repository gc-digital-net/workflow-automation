import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

interface ScreenshotConfig {
  url: string;
  filename: string;
  selector?: string;
  fullPage?: boolean;
  waitFor?: number;
  actions?: () => Promise<void>;
}

async function captureScreenshots() {
  console.log('🚀 Starting screenshot capture for Monday.com...\n');
  
  // Create screenshots directory
  const screenshotDir = path.join(process.cwd(), 'public', 'tools', 'monday-com');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
    console.log(`📁 Created directory: ${screenshotDir}`);
  }

  // Launch browser
  const browser = await puppeteer.launch({
    headless: false, // Set to true for production
    defaultViewport: {
      width: 1440,
      height: 900
    }
  });

  const page = await browser.newPage();
  
  // Set up console logging
  page.on('console', msg => console.log('Browser log:', msg.text()));

  // Screenshots to capture
  const screenshots: ScreenshotConfig[] = [
    {
      url: 'https://monday.com',
      filename: 'monday-homepage.png',
      fullPage: false,
      waitFor: 3000
    },
    {
      url: 'https://monday.com/templates',
      filename: 'monday-templates.png',
      selector: '.templates-gallery',
      waitFor: 3000
    },
    {
      url: 'https://monday.com/pricing',
      filename: 'monday-pricing.png',
      selector: '.pricing-table',
      waitFor: 3000
    },
    {
      url: 'https://monday.com/features',
      filename: 'monday-features.png',
      fullPage: false,
      waitFor: 3000
    },
    {
      url: 'https://monday.com/integrations',
      filename: 'monday-integrations.png',
      selector: '.integrations-grid',
      waitFor: 3000
    },
    {
      url: 'https://support.monday.com/hc/en-us/articles/115005310945-Getting-started-Boards',
      filename: 'monday-board-example.png',
      fullPage: false,
      waitFor: 3000
    },
    {
      url: 'https://monday.com/features/automations',
      filename: 'monday-automations.png',
      fullPage: false,
      waitFor: 3000
    },
    {
      url: 'https://monday.com/features/views',
      filename: 'monday-views.png',
      fullPage: false,
      waitFor: 3000
    }
  ];

  // Capture each screenshot
  for (const config of screenshots) {
    try {
      console.log(`📸 Capturing: ${config.filename}`);
      
      // Navigate to URL
      await page.goto(config.url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      // Wait for content to load
      if (config.waitFor) {
        await new Promise(resolve => setTimeout(resolve, config.waitFor));
      }
      
      // Wait for selector if specified
      if (config.selector) {
        try {
          await page.waitForSelector(config.selector, { timeout: 5000 });
        } catch (e) {
          console.log(`  ⚠️  Selector not found: ${config.selector}, capturing full viewport`);
        }
      }
      
      // Execute any custom actions
      if (config.actions) {
        await config.actions();
      }
      
      // Take screenshot
      const screenshotPath = path.join(screenshotDir, config.filename);
      
      if (config.selector && await page.$(config.selector)) {
        // Screenshot specific element
        const element = await page.$(config.selector);
        await element?.screenshot({ 
          path: screenshotPath,
          type: 'png'
        });
      } else {
        // Screenshot page or viewport
        await page.screenshot({
          path: screenshotPath,
          fullPage: config.fullPage || false,
          type: 'png'
        });
      }
      
      console.log(`  ✅ Saved: ${config.filename}`);
      
    } catch (error) {
      console.error(`  ❌ Failed to capture ${config.filename}:`, error);
    }
  }

  // Try to capture a demo board (this might require login)
  console.log('\n📋 Attempting to capture demo board...');
  try {
    await page.goto('https://view.monday.com/1526931971-d851b8c2e86d88a0dfef7f0d982a1d0a?r=use1', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const demoScreenshotPath = path.join(screenshotDir, 'monday-demo-board.png');
    await page.screenshot({
      path: demoScreenshotPath,
      fullPage: false,
      type: 'png'
    });
    console.log('  ✅ Captured demo board');
    
  } catch (error) {
    console.log('  ℹ️  Could not capture demo board (might require login)');
  }

  // Close browser
  await browser.close();
  
  console.log('\n✨ Screenshot capture complete!');
  console.log(`📁 Screenshots saved to: ${screenshotDir}`);
  
  // List captured files
  const files = fs.readdirSync(screenshotDir);
  console.log('\n📸 Captured files:');
  files.forEach(file => {
    if (file.endsWith('.png')) {
      const stats = fs.statSync(path.join(screenshotDir, file));
      const size = (stats.size / 1024).toFixed(2);
      console.log(`  - ${file} (${size} KB)`);
    }
  });
}

// Additional function to capture authenticated screenshots
async function captureAuthenticatedScreenshots() {
  console.log('\n🔐 For authenticated screenshots (actual boards, automation builder, etc.):');
  console.log('1. Sign up for a free Monday.com trial at https://monday.com');
  console.log('2. Create a sample project with tasks');
  console.log('3. Take screenshots of:');
  console.log('   - Main workspace dashboard');
  console.log('   - Board with colorful status columns');
  console.log('   - Timeline/Gantt view');
  console.log('   - Kanban view');
  console.log('   - Automation recipe builder');
  console.log('   - Workload view');
  console.log('   - Mobile app (from phone)');
  console.log('\n💡 Tip: Use Monday\'s template gallery to quickly create realistic boards');
}

// Run the capture
captureScreenshots()
  .then(() => {
    captureAuthenticatedScreenshots();
  })
  .catch(error => {
    console.error('❌ Screenshot capture failed:', error);
    process.exit(1);
  });