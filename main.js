// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { getGtoSuggestion } = require('./core/gto_logic'); 

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 650,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // Security: Keep Context Isolation ON and Node Integration OFF
      contextIsolation: true, 
      nodeIntegration: false,
    },
    titleBarStyle: 'hiddenInset'
  });

  mainWindow.loadFile('index.html');
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// --- IPC Handlers (The Secure Bridge) ---
let handHistory = [];

ipcMain.handle('get-gto-suggestion', async (event, position, hand, gameState) => {
  try {
    const suggestion = getGtoSuggestion(position, hand, gameState);
    
    // Log the hand for basic memory (before returning)
    handHistory.push({ 
      timestamp: Date.now(), 
      position, 
      hand, 
      gameState,
      result: suggestion 
    });
    
    // Keep only the last 20 hands
    if (handHistory.length > 20) {
      handHistory = handHistory.slice(-20);
    }

    // Return both suggestion and updated history
    return { 
      success: true, 
      data: suggestion,
      history: handHistory
    };
  } catch (error) {
    console.error('GTO Logic Error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-hand-history', () => {
  // Expose limited hand history to the renderer
  return { success: true, data: handHistory };
});