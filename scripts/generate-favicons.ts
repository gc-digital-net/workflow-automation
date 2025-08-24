import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

async function generateFavicons() {
  const logoPath = path.join(process.cwd(), 'public', 'logo', 'workflow automation logo.png')
  const publicDir = path.join(process.cwd(), 'public')
  
  try {
    // Read the logo
    const logoBuffer = fs.readFileSync(logoPath)
    
    // Generate favicon.ico (32x32)
    await sharp(logoBuffer)
      .resize(32, 32)
      .toFile(path.join(publicDir, 'favicon-32x32.png'))
    
    // Generate favicon-16x16.png
    await sharp(logoBuffer)
      .resize(16, 16)
      .toFile(path.join(publicDir, 'favicon-16x16.png'))
    
    // Generate apple-touch-icon.png (180x180)
    await sharp(logoBuffer)
      .resize(180, 180)
      .toFile(path.join(publicDir, 'apple-touch-icon.png'))
    
    // Generate android-chrome-192x192.png
    await sharp(logoBuffer)
      .resize(192, 192)
      .toFile(path.join(publicDir, 'android-chrome-192x192.png'))
    
    // Generate android-chrome-512x512.png
    await sharp(logoBuffer)
      .resize(512, 512)
      .toFile(path.join(publicDir, 'android-chrome-512x512.png'))
    
    console.log('✅ Favicons generated successfully!')
    console.log('Generated files:')
    console.log('- favicon-32x32.png')
    console.log('- favicon-16x16.png')
    console.log('- apple-touch-icon.png')
    console.log('- android-chrome-192x192.png')
    console.log('- android-chrome-512x512.png')
    
  } catch (error) {
    console.error('Error generating favicons:', error)
  }
}

generateFavicons()