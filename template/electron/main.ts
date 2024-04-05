import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    // titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'default',
    backgroundColor: 'white',
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // Load your file
    await mainWindow.loadFile('dist/index.html');
  }
  mainWindow.setAlwaysOnTop(false);
};

app.on('ready', async () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate([]));
  await createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});
