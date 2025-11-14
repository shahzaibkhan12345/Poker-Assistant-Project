// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getGtoSuggestion: (position, hand, gameState) => 
    ipcRenderer.invoke('get-gto-suggestion', position, hand, gameState),
  getHandHistory: () => ipcRenderer.invoke('get-hand-history'),
});