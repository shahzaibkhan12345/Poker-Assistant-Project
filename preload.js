// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getGtoSuggestion: (position, hand, spot) => 
    ipcRenderer.invoke('get-gto-suggestion', position, hand, spot),
  getHandHistory: () => ipcRenderer.invoke('get-hand-history'),
});