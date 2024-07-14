import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

// Necessary for __dirname to work in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });
  const filePath = path.join(__dirname, 'dist', 'index.html');
  console.log('Loading file:', filePath);
  win.loadFile(filePath)
    .then(() => {
      win.webContents.openDevTools(); // Open Developer Tools for debugging
    })
    .catch((err) => {
      console.error('Failed to load file:', err);
    });
  // win.loadFile('dist/index.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
