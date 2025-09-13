import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function captureWithPlaywright() {
  console.log('🎭 Using Playwright for screenshots (more reliable than Puppeteer)\n');
  
  const screenshotDir = path.join(process.cwd(), 'public', 'tools', 'monday-com');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Launch browser
  const browser = await chromium.launch({
    headless: false, // Set to true if you don't need to see it
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();

  try {
    // Capture public pages that show actual UI
    const screenshots = [
      {
        url: 'https://monday.com/lp/mp/project-management',
        filename: 'monday-pm-interface.png',
        description: 'Project management interface',
        waitForSelector: '.desktop-board-wrapper, .board-example, img[alt*="board"]'
      },
      {
        url: 'https://monday.com/lp/mp/marketing', 
        filename: 'monday-marketing-interface.png',
        description: 'Marketing board interface',
        waitForSelector: '.desktop-board-wrapper, .board-example, img[alt*="board"]'
      },
      {
        url: 'https://monday.com/lang/en/gantt',
        filename: 'monday-gantt-interface.png',
        description: 'Gantt/Timeline view',
        waitForSelector: 'img[alt*="gantt"], img[alt*="timeline"], .feature-image'
      },
      {
        url: 'https://monday.com/lang/en/kanban',
        filename: 'monday-kanban-interface.png',
        description: 'Kanban board view',
        waitForSelector: 'img[alt*="kanban"], .feature-image'
      },
      {
        url: 'https://monday.com/lang/en/automations',
        filename: 'monday-automation-interface.png',
        description: 'Automation builder',
        waitForSelector: 'img[alt*="automation"], .feature-image'
      },
      {
        url: 'https://monday.com/lang/en/dashboards',
        filename: 'monday-dashboard-interface.png',
        description: 'Dashboard view',
        waitForSelector: 'img[alt*="dashboard"], .feature-image'
      }
    ];

    for (const config of screenshots) {
      try {
        console.log(`📸 Capturing: ${config.description}`);
        
        await page.goto(config.url, { 
          waitUntil: 'networkidle',
          timeout: 30000 
        });

        // Wait for content
        if (config.waitForSelector) {
          try {
            await page.waitForSelector(config.waitForSelector, { timeout: 5000 });
          } catch (e) {
            console.log('   Selector not found, continuing anyway...');
          }
        }

        // Additional wait for animations
        await page.waitForTimeout(2000);

        // Take screenshot
        await page.screenshot({
          path: path.join(screenshotDir, config.filename),
          fullPage: false
        });

        console.log(`   ✅ Saved: ${config.filename}`);
      } catch (error) {
        console.log(`   ❌ Failed: ${error.message}`);
      }
    }

  } finally {
    await browser.close();
  }

  console.log('\n✨ Playwright capture complete!');
  console.log('📁 Screenshots saved to:', screenshotDir);
}

// Run it
captureWithPlaywright().catch(console.error);