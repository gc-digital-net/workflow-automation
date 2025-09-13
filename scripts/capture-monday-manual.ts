import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function captureManualLogin() {
  console.log('🚀 Monday.com Screenshot Capture - Manual Login\n');
  console.log('This script will:\n');
  console.log('1. Open Monday.com in a browser');
  console.log('2. Wait for you to log in manually');
  console.log('3. Then capture all the screenshots we need\n');
  
  const screenshotDir = path.join(process.cwd(), 'public', 'tools', 'monday-com');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Launch browser
  const browser = await puppeteer.launch({
    headless: false, // Need to see the browser
    defaultViewport: {
      width: 1440,
      height: 900
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    console.log('📝 STEP 1: Opening Monday.com...\n');
    await page.goto('https://monday.com', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    console.log('📝 STEP 2: Please log in manually');
    console.log('   - Click "Log in" button');
    console.log('   - Use Google sign-in with cetanoel@gmail.com');
    console.log('   - Or use email/password\n');
    
    await question('Press ENTER after you have successfully logged in and can see your workspace... ');
    
    console.log('\n✅ Great! Starting screenshot capture...\n');
    
    // Wait a bit for everything to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // List of screenshots to capture
    const screenshots = [
      {
        name: 'monday-workspace-main.png',
        description: 'Main workspace view',
        url: null, // Stay on current page
        wait: 2000
      },
      {
        name: 'monday-board-colorful.png', 
        description: 'Board with status columns',
        instruction: 'Please click on any board to open it',
        needsUserAction: true,
        wait: 3000
      },
      {
        name: 'monday-timeline-view.png',
        description: 'Timeline/Gantt view',
        instruction: 'Please switch to Timeline view (if available)',
        needsUserAction: true,
        wait: 3000
      },
      {
        name: 'monday-kanban-view.png',
        description: 'Kanban view',
        instruction: 'Please switch to Kanban view (if available)',
        needsUserAction: true,
        wait: 3000
      },
      {
        name: 'monday-table-view.png',
        description: 'Table/Main view',
        instruction: 'Please switch back to Main Table view',
        needsUserAction: true,
        wait: 3000
      },
      {
        name: 'monday-integrations-page.png',
        description: 'Integrations',
        url: 'https://monday.com/integrations',
        wait: 5000
      },
      {
        name: 'monday-automations-page.png',
        description: 'Automations',
        url: 'https://monday.com/automations',
        wait: 5000
      },
      {
        name: 'monday-apps-marketplace.png',
        description: 'Apps marketplace',
        url: 'https://monday.com/marketplace',
        wait: 5000
      }
    ];

    // Capture each screenshot
    for (const screenshot of screenshots) {
      console.log(`\n📸 Capturing: ${screenshot.description}`);
      
      // Navigate if URL provided
      if (screenshot.url) {
        console.log(`   Navigating to ${screenshot.url}...`);
        await page.goto(screenshot.url, { 
          waitUntil: 'networkidle2',
          timeout: 30000 
        });
      }
      
      // If user action needed, prompt them
      if (screenshot.needsUserAction && screenshot.instruction) {
        await question(`   ACTION NEEDED: ${screenshot.instruction}\n   Press ENTER when ready... `);
      }
      
      // Wait for content to load
      await new Promise(resolve => setTimeout(resolve, screenshot.wait));
      
      // Take screenshot
      const screenshotPath = path.join(screenshotDir, screenshot.name);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false
      });
      
      console.log(`   ✅ Saved: ${screenshot.name}`);
    }

    // Additional manual screenshots
    console.log('\n\n📝 OPTIONAL: Additional screenshots you can capture manually:');
    console.log('1. Create an automation - then press ENTER');
    console.log('2. Open workload view - then press ENTER');
    console.log('3. Open a form - then press ENTER');
    console.log('4. Open dashboards - then press ENTER\n');
    
    const captureMore = await question('Do you want to capture more screenshots? (y/n): ');
    
    if (captureMore.toLowerCase() === 'y') {
      let moreScreenshots = true;
      let counter = 1;
      
      while (moreScreenshots) {
        await question('\nSet up the view you want to capture and press ENTER... ');
        
        const filename = `monday-custom-${counter}.png`;
        const screenshotPath = path.join(screenshotDir, filename);
        await page.screenshot({
          path: screenshotPath,
          fullPage: false
        });
        
        console.log(`✅ Saved: ${filename}`);
        counter++;
        
        const another = await question('Capture another? (y/n): ');
        moreScreenshots = another.toLowerCase() === 'y';
      }
    }

    console.log('\n\n✨ Screenshot capture complete!');
    console.log(`📁 Screenshots saved to: ${screenshotDir}\n`);
    
    // List all screenshots
    const files = fs.readdirSync(screenshotDir);
    console.log('📸 All captured screenshots:');
    files.forEach(file => {
      if (file.endsWith('.png')) {
        const stats = fs.statSync(path.join(screenshotDir, file));
        const size = (stats.size / 1024).toFixed(2);
        console.log(`   - ${file} (${size} KB)`);
      }
    });

    console.log('\n✅ All done! You can close the browser window.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    rl.close();
    // Don't auto-close browser so user can close when ready
  }
}

// Run the script
captureManualLogin().catch(console.error);