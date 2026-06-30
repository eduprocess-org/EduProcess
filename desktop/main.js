const { app, BrowserWindow, session, dialog } = require('electron');
const path = require('path');

require('dotenv').config({
  path: app.isPackaged
    ? path.join(process.resourcesPath, '.env')
    : path.join(__dirname, '.env')
});

const isDev =
  process.env.NODE_ENV === 'development' || !app.isPackaged;

function createWindow() {
  const startUrl = process.env.APP_URL;

  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    title: 'EduProcess',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      session: session.fromPartition('persist:eduprocess-session')
    }
  });

  win.loadURL(startUrl).catch((err) => {
    dialog.showErrorBox(
      'Load Error',
      err.message
    );
  });

  win.webContents.on(
    'did-fail-load',
    (event, errorCode, errorDescription) => {
      dialog.showErrorBox(
        'Load Error',
        `${errorDescription} (${errorCode})`
      );
    }
  );
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});