const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Babylon.js için gerekli, ancak dikkatli kullanın
      contextIsolation: false, // Güvenlik için ileride kapatılabilir
    },
  });

  // Yerel index.html dosyasını yükle
  win.loadFile(path.join(__dirname, '../build/index.html'));
  // DevTools'u aç (hata ayıklama için)
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

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