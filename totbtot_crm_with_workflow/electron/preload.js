const { contextBridge } = require('electron')

// Expose minimal API if needed
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform
})