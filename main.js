const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { getGtoSuggestion } = require('./core/gto_logic.js');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 850,
        minWidth: 600,
        minHeight: 700,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile('index.html');

    // Set default zoom to 125% (1.25) for better visibility
    mainWindow.webContents.setZoomLevel(0.25);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

ipcMain.handle('get-gto-suggestion', (event, position, hand, gameState) => {
    try {
        const suggestion = getGtoSuggestion(position, hand, gameState);
        return suggestion;
    } catch (error) {
        console.error('Error in get-gto-suggestion:', error);
        return { 
            error: 'Error processing suggestion. Please check your input.',
            action: 'Error',
            amount: 'N/A'
        };
    }
});

ipcMain.handle('get-hand-history', (event) => {
    return { success: true };
});
