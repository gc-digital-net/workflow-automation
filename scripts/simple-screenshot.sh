#!/bin/bash

# Simple screenshot script using Mac's screencapture command
echo "📸 Monday.com Screenshot Helper"
echo "================================"
echo ""
echo "This script will help you take screenshots quickly."
echo ""
echo "1. First, open Monday.com in your browser and log in"
echo "2. Press Enter when ready..."
read

SCREENSHOT_DIR="public/tools/monday-com"

echo "Taking screenshot in 3 seconds... Set up your Monday.com board view!"
sleep 3
screencapture -i "$SCREENSHOT_DIR/monday-board-actual.png"
echo "✅ Saved: monday-board-actual.png"

echo ""
echo "Now switch to Timeline view and press Enter..."
read
echo "Taking screenshot in 3 seconds..."
sleep 3
screencapture -i "$SCREENSHOT_DIR/monday-timeline-actual.png"
echo "✅ Saved: monday-timeline-actual.png"

echo ""
echo "Now switch to Kanban view and press Enter..."
read
echo "Taking screenshot in 3 seconds..."
sleep 3
screencapture -i "$SCREENSHOT_DIR/monday-kanban-actual.png"
echo "✅ Saved: monday-kanban-actual.png"

echo ""
echo "Now open the Automation center and press Enter..."
read
echo "Taking screenshot in 3 seconds..."
sleep 3
screencapture -i "$SCREENSHOT_DIR/monday-automation-builder.png"
echo "✅ Saved: monday-automation-builder.png"

echo ""
echo "✨ All done! Screenshots saved to: $SCREENSHOT_DIR"
echo ""
ls -lah "$SCREENSHOT_DIR"/*.png | tail -4