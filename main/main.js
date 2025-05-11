const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const fileManager = require('../renderer/filereadwrite');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, '../build/index.html'));

  // 🔍 Doğru pencere referansı: win.webContents
  win.webContents.openDevTools(); // ✅ Doğru şekilde DevTools'u aç

}

// Menü şablonu
const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New",
        click: () => console.log("New File"),
      },
      {
        label: "Open",
        click: () => {
          fileManager.openFile().then((content) => {
            if (content) {
              // 🎯 Renderer sürecine içerik gönderiliyor
              win.webContents.send('load-obj', content);
            }
          });
        },
      },
      {
        label: "Save",
        click: () => {
          // 🎯 Renderer'dan OBJ verisi talep ediliyor
          win.webContents.send('request-save-obj');
        },
      },
      { type: "separator" },
      { label: "Exit", role: "quit" },
    ],
  },
];

// Menü oluşturma
const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

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

// 🎯 Renderer'dan gelen OBJ verisini yakala ve dosyaya kaydet
ipcMain.on('save-obj-data', (event, content) => {
  fileManager.saveFile(content);
});
