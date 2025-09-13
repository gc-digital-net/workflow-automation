import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

async function captureMondayDemoScreenshots() {
  console.log('🚀 Capturing Monday.com demo and marketing screenshots...\n');
  
  const screenshotDir = path.join(process.cwd(), 'public', 'tools', 'monday-com');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true, // Can run headless for these
    defaultViewport: {
      width: 1440,
      height: 900
    }
  });

  const page = await browser.newPage();

  // Monday.com has public demo boards and marketing pages with actual UI
  const demoScreenshots = [
    {
      url: 'https://monday.com/lp/mp/project-management',
      filename: 'monday-project-board-demo.png',
      description: 'Project management board demo',
      waitFor: 5000,
      selector: '.board-example, .demo-board, .product-screenshot'
    },
    {
      url: 'https://monday.com/lp/mp/marketing',
      filename: 'monday-marketing-board.png',
      description: 'Marketing campaign board',
      waitFor: 5000,
      selector: '.board-example, .demo-board, .product-screenshot'
    },
    {
      url: 'https://monday.com/lp/mp/crm',
      filename: 'monday-crm-board.png',
      description: 'CRM pipeline board',
      waitFor: 5000,
      selector: '.board-example, .demo-board, .product-screenshot'
    },
    {
      url: 'https://monday.com/lang/en/workdocs',
      filename: 'monday-workdocs.png',
      description: 'WorkDocs feature',
      waitFor: 5000
    },
    {
      url: 'https://monday.com/lang/en/dashboards',
      filename: 'monday-dashboards.png',
      description: 'Dashboard examples',
      waitFor: 5000
    },
    {
      url: 'https://monday.com/lang/en/gantt',
      filename: 'monday-gantt-timeline.png',
      description: 'Gantt/Timeline view',
      waitFor: 5000
    },
    {
      url: 'https://monday.com/lang/en/kanban',
      filename: 'monday-kanban-demo.png',
      description: 'Kanban board view',
      waitFor: 5000
    },
    {
      url: 'https://monday.com/lang/en/automations',
      filename: 'monday-automation-builder.png',
      description: 'Automation builder interface',
      waitFor: 5000
    }
  ];

  for (const config of demoScreenshots) {
    try {
      console.log(`📸 Capturing: ${config.filename}`);
      console.log(`   ${config.description}`);
      
      await page.goto(config.url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      await new Promise(resolve => setTimeout(resolve, config.waitFor || 3000));
      
      // Try to capture specific demo area or full page
      const screenshotPath = path.join(screenshotDir, config.filename);
      
      if (config.selector) {
        const selectors = config.selector.split(',').map(s => s.trim());
        let captured = false;
        
        for (const sel of selectors) {
          const element = await page.$(sel);
          if (element) {
            await element.screenshot({ path: screenshotPath });
            captured = true;
            break;
          }
        }
        
        if (!captured) {
          await page.screenshot({ path: screenshotPath, fullPage: false });
        }
      } else {
        await page.screenshot({ path: screenshotPath, fullPage: false });
      }
      
      console.log(`  ✅ Saved: ${config.filename}`);
      
    } catch (error) {
      console.error(`  ❌ Failed: ${error.message}`);
    }
  }

  await browser.close();
  
  console.log('\n✨ Demo screenshots captured!');
  console.log(`📁 Saved to: ${screenshotDir}`);
}

captureMondayDemoScreenshots().catch(console.error);