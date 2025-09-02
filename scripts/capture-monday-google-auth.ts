import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

async function captureWithGoogleAuth() {
  console.log('🚀 Starting Monday.com capture with Google authentication...\n');
  
  const screenshotDir = path.join(process.cwd(), 'public', 'tools', 'monday-com');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Launch browser in non-headless mode for Google auth
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1440,
      height: 900
    },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const page = await browser.newPage();
  
  // Set user agent to avoid detection
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  try {
    console.log('📧 Navigating to Monday.com login...');
    await page.goto('https://auth.monday.com/auth/login', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Wait for Google sign-in button and click it
    console.log('🔍 Looking for Google sign-in button...');
    await page.waitForSelector('[data-testid="google-button"], .login-with-google, button[aria-label*="Google"], a[href*="google"]', { 
      timeout: 10000 
    });
    
    // Try multiple possible selectors for Google button
    const googleButtonClicked = await page.evaluate(() => {
      const selectors = [
        '[data-testid="google-button"]',
        '.login-with-google',
        'button[aria-label*="Google"]',
        'a[href*="google"]',
        'button:has-text("Continue with Google")',
        'button:has-text("Sign in with Google")'
      ];
      
      for (const selector of selectors) {
        const button = document.querySelector(selector);
        if (button) {
          (button as HTMLElement).click();
          return true;
        }
      }
      return false;
    });

    if (!googleButtonClicked) {
      console.log('⚠️  Could not find Google button automatically');
      console.log('📝 Please click "Continue with Google" manually');
    }

    // Wait for Google auth page or Monday dashboard
    console.log('⏳ Waiting for Google authentication...');
    console.log('📝 Please complete the Google sign-in with cetanoel@gmail.com');
    console.log('   The browser will automatically continue once you\'re logged in.\n');

    // Wait for successful login - Monday.com dashboard should load
    await page.waitForFunction(
      () => window.location.href.includes('monday.com') && !window.location.href.includes('auth'),
      { timeout: 120000 } // 2 minutes to complete login
    );

    console.log('✅ Successfully logged in! Starting screenshot capture...\n');
    
    // Give the dashboard time to load
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Screenshots to capture
    const screenshots = [
      {
        name: 'monday-main-dashboard.png',
        description: 'Main workspace dashboard',
        action: async () => {
          // Already on dashboard
        }
      },
      {
        name: 'monday-board-view.png',
        description: 'Board with colorful status columns',
        action: async () => {
          // Try to click on first board
          const boardSelector = '.board-item, [data-testid="board-item"], .workspace-item';
          const board = await page.$(boardSelector);
          if (board) {
            await board.click();
            await new Promise(resolve => setTimeout(resolve, 3000));
          }
        }
      },
      {
        name: 'monday-timeline-view.png',
        description: 'Timeline/Gantt view',
        action: async () => {
          // Try to switch to timeline view
          const timelineBtn = await page.$('[aria-label*="Timeline"], [data-testid*="timeline"], .views-switcher button:has-text("Timeline")');
          if (timelineBtn) {
            await timelineBtn.click();
            await new Promise(resolve => setTimeout(resolve, 3000));
          }
        }
      },
      {
        name: 'monday-kanban-view.png',
        description: 'Kanban board view',
        action: async () => {
          const kanbanBtn = await page.$('[aria-label*="Kanban"], [data-testid*="kanban"], .views-switcher button:has-text("Kanban")');
          if (kanbanBtn) {
            await kanbanBtn.click();
            await new Promise(resolve => setTimeout(resolve, 3000));
          }
        }
      },
      {
        name: 'monday-integrations.png',
        description: 'Integration center',
        action: async () => {
          await page.goto('https://monday.com/integrations', { waitUntil: 'networkidle2' });
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      },
      {
        name: 'monday-automations.png',
        description: 'Automation center',
        action: async () => {
          await page.goto('https://monday.com/automations', { waitUntil: 'networkidle2' });
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      },
      {
        name: 'monday-templates-gallery.png',
        description: 'Templates gallery',
        action: async () => {
          await page.goto('https://monday.com/templates', { waitUntil: 'networkidle2' });
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }
    ];

    // Capture each screenshot
    for (const screenshot of screenshots) {
      try {
        console.log(`📸 Capturing: ${screenshot.name}`);
        console.log(`   ${screenshot.description}`);
        
        await screenshot.action();
        
        const screenshotPath = path.join(screenshotDir, screenshot.name);
        await page.screenshot({
          path: screenshotPath,
          fullPage: false
        });
        
        console.log(`   ✅ Saved successfully\n`);
      } catch (error) {
        console.log(`   ❌ Failed: ${error.message}\n`);
      }
    }

    console.log('✨ Screenshot capture complete!');
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

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    console.log('\n💡 You can close the browser window now.');
    // Keep browser open for manual inspection if needed
    // await browser.close();
  }
}

// Run the script
captureWithGoogleAuth().catch(console.error);