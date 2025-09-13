import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

interface ScreenshotConfig {
  url?: string;
  filename: string;
  selector?: string;
  fullPage?: boolean;
  waitFor?: number;
  scrollTo?: string; // Selector to scroll to before screenshot
  scrollOffset?: number; // Offset from top when scrolling
  clickElement?: string; // Element to click before screenshot
  actions?: (page: any) => Promise<void>; // Custom actions
  description?: string;
}

async function captureAuthenticatedScreenshots() {
  console.log('🚀 Starting authenticated Monday.com screenshot capture...\n');
  console.log('📝 Please have your Monday.com credentials ready.\n');
  
  // Create screenshots directory
  const screenshotDir = path.join(process.cwd(), 'public', 'tools', 'monday-com');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Launch browser in non-headless mode for login
  const browser = await puppeteer.launch({
    headless: false, // Need to see the login process
    defaultViewport: {
      width: 1440,
      height: 900
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  console.log('🔐 MANUAL LOGIN REQUIRED:');
  console.log('1. The browser will open Monday.com login page');
  console.log('2. Please log in manually');
  console.log('3. Once logged in, press Enter in this terminal to continue...\n');
  
  // Navigate to Monday.com login
  await page.goto('https://auth.monday.com/auth/login', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });
  
  // Wait for user to log in manually
  await new Promise((resolve) => {
    process.stdin.once('data', resolve);
    console.log('⏳ Waiting for you to log in and press Enter...');
  });
  
  console.log('\n✅ Great! Starting screenshot capture...\n');

  // Screenshots to capture after login
  const authenticatedScreenshots: ScreenshotConfig[] = [
    {
      filename: 'monday-workspace-dashboard.png',
      description: 'Main workspace dashboard',
      fullPage: false,
      waitFor: 3000,
      actions: async (page) => {
        // Navigate to main workspace
        await page.goto('https://monday.com/', { waitUntil: 'networkidle2' });
      }
    },
    {
      filename: 'monday-board-colorful.png',
      description: 'Board with colorful status columns',
      waitFor: 5000,
      actions: async (page) => {
        // Try to find and click on a board
        try {
          await page.waitForSelector('[data-testid="board-item"]', { timeout: 5000 });
          await page.click('[data-testid="board-item"]:first-child');
        } catch (e) {
          console.log('  ℹ️  Could not find board automatically');
        }
      }
    },
    {
      filename: 'monday-timeline-view.png',
      description: 'Timeline/Gantt view',
      waitFor: 3000,
      clickElement: '[data-testid="views-switcher-button-Timeline"]',
      actions: async (page) => {
        // Try to switch to Timeline view
        try {
          const timelineBtn = await page.$('[aria-label*="Timeline"]');
          if (timelineBtn) await timelineBtn.click();
        } catch (e) {
          console.log('  ℹ️  Timeline view not available');
        }
      }
    },
    {
      filename: 'monday-kanban-view.png',
      description: 'Kanban board view',
      waitFor: 3000,
      actions: async (page) => {
        try {
          const kanbanBtn = await page.$('[aria-label*="Kanban"]');
          if (kanbanBtn) await kanbanBtn.click();
        } catch (e) {
          console.log('  ℹ️  Kanban view not available');
        }
      }
    },
    {
      filename: 'monday-automation-center.png',
      description: 'Automation center',
      waitFor: 5000,
      actions: async (page) => {
        await page.goto('https://monday.com/automations', { waitUntil: 'networkidle2' });
      }
    },
    {
      filename: 'monday-integrations-center.png',
      description: 'Integration center with apps',
      waitFor: 5000,
      actions: async (page) => {
        await page.goto('https://monday.com/integrations', { waitUntil: 'networkidle2' });
      }
    },
    {
      filename: 'monday-workload-view.png',
      description: 'Workload/resource view',
      waitFor: 3000,
      actions: async (page) => {
        try {
          const workloadBtn = await page.$('[aria-label*="Workload"]');
          if (workloadBtn) await workloadBtn.click();
        } catch (e) {
          console.log('  ℹ️  Workload view not available');
        }
      }
    }
  ];

  // Capture each screenshot
  for (const config of authenticatedScreenshots) {
    try {
      console.log(`📸 Capturing: ${config.filename}`);
      if (config.description) {
        console.log(`   ${config.description}`);
      }
      
      // Execute custom actions if provided
      if (config.actions) {
        await config.actions(page);
      }
      
      // Wait for content to load
      if (config.waitFor) {
        await new Promise(resolve => setTimeout(resolve, config.waitFor));
      }
      
      // Click element if specified
      if (config.clickElement) {
        try {
          await page.waitForSelector(config.clickElement, { timeout: 5000 });
          await page.click(config.clickElement);
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (e) {
          console.log(`  ⚠️  Could not click: ${config.clickElement}`);
        }
      }
      
      // Scroll to element if specified
      if (config.scrollTo) {
        try {
          await page.waitForSelector(config.scrollTo, { timeout: 5000 });
          await page.evaluate((selector, offset) => {
            const element = document.querySelector(selector);
            if (element) {
              const top = element.getBoundingClientRect().top + window.scrollY - (offset || 100);
              window.scrollTo({ top, behavior: 'smooth' });
            }
          }, config.scrollTo, config.scrollOffset);
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (e) {
          console.log(`  ⚠️  Could not scroll to: ${config.scrollTo}`);
        }
      }
      
      // Take screenshot
      const screenshotPath = path.join(screenshotDir, config.filename);
      
      if (config.selector) {
        try {
          await page.waitForSelector(config.selector, { timeout: 5000 });
          const element = await page.$(config.selector);
          if (element) {
            await element.screenshot({ 
              path: screenshotPath,
              type: 'png'
            });
          }
        } catch (e) {
          console.log(`  ⚠️  Selector not found, capturing viewport`);
          await page.screenshot({
            path: screenshotPath,
            fullPage: config.fullPage || false,
            type: 'png'
          });
        }
      } else {
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

  console.log('\n📋 Capturing public pages with better scrolling...\n');

  // Public pages that need better scrolling
  const publicPagesWithScroll: ScreenshotConfig[] = [
    {
      url: 'https://monday.com/pricing',
      filename: 'monday-pricing-full.png',
      description: 'Complete pricing table',
      fullPage: true, // Capture full page
      waitFor: 5000
    },
    {
      url: 'https://monday.com/features',
      filename: 'monday-features-automation.png',
      description: 'Automation section',
      scrollTo: '[data-testid="automation-section"], #automation, .automation-section',
      waitFor: 3000
    },
    {
      url: 'https://monday.com/features',
      filename: 'monday-features-views.png',
      description: 'Views section',
      scrollTo: '[data-testid="views-section"], #views, .views-section',
      waitFor: 3000
    },
    {
      url: 'https://monday.com/features',
      filename: 'monday-features-integrations.png',
      description: 'Integrations section',
      scrollTo: '[data-testid="integrations-section"], #integrations, .integrations-section',
      waitFor: 3000
    },
    {
      url: 'https://monday.com/templates',
      filename: 'monday-templates-full.png',
      description: 'Full templates gallery',
      fullPage: true,
      waitFor: 5000
    }
  ];

  // Capture public pages with scrolling
  for (const config of publicPagesWithScroll) {
    try {
      console.log(`📸 Capturing: ${config.filename}`);
      if (config.description) {
        console.log(`   ${config.description}`);
      }
      
      if (config.url) {
        await page.goto(config.url, { 
          waitUntil: 'networkidle2',
          timeout: 30000 
        });
      }
      
      // Wait for content
      if (config.waitFor) {
        await new Promise(resolve => setTimeout(resolve, config.waitFor));
      }
      
      // Scroll to section if needed
      if (config.scrollTo) {
        const selectors = config.scrollTo.split(',').map(s => s.trim());
        let scrolled = false;
        
        for (const selector of selectors) {
          try {
            const element = await page.$(selector);
            if (element) {
              await page.evaluate((sel) => {
                const el = document.querySelector(sel);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }, selector);
              await new Promise(resolve => setTimeout(resolve, 2000));
              scrolled = true;
              break;
            }
          } catch (e) {
            // Try next selector
          }
        }
        
        if (!scrolled) {
          console.log(`  ⚠️  Could not find section to scroll to`);
        }
      }
      
      // Take screenshot
      const screenshotPath = path.join(screenshotDir, config.filename);
      await page.screenshot({
        path: screenshotPath,
        fullPage: config.fullPage || false,
        type: 'png'
      });
      
      console.log(`  ✅ Saved: ${config.filename}`);
      
    } catch (error) {
      console.error(`  ❌ Failed to capture ${config.filename}:`, error);
    }
  }

  // Don't close browser automatically - let user close it
  console.log('\n✨ Screenshot capture complete!');
  console.log(`📁 Screenshots saved to: ${screenshotDir}`);
  console.log('\n💡 You can now close the browser window.');
  
  // List captured files
  const files = fs.readdirSync(screenshotDir);
  console.log('\n📸 All captured files:');
  files.forEach(file => {
    if (file.endsWith('.png')) {
      const stats = fs.statSync(path.join(screenshotDir, file));
      const size = (stats.size / 1024).toFixed(2);
      console.log(`  - ${file} (${size} KB)`);
    }
  });
  
  console.log('\n🎯 Tips for better screenshots:');
  console.log('- Create a demo project with sample data');
  console.log('- Use Monday\'s templates for realistic boards');
  console.log('- Set up some automations to show in screenshots');
  console.log('- Add team members to show collaboration features');
  
  process.exit(0);
}

// Run the capture
captureAuthenticatedScreenshots().catch(error => {
  console.error('❌ Screenshot capture failed:', error);
  process.exit(1);
});