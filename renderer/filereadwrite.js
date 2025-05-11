const { dialog } = require('electron');
const fs = require('fs');
const path = require('path');

module.exports = {
  // Save File (Kaydet)
  saveFile: (content) => {
    dialog.showSaveDialog({
      title: 'Save OBJ File',
      defaultPath: path.join(__dirname, '../../'),
      filters: [{ name: 'OBJ Files', extensions: ['obj'] }],
    }).then((file) => {
      if (!file.canceled) {
        fs.writeFile(file.filePath.toString(), content, (err) => {
          if (err) {
            console.error("Dosya kaydedilirken bir hata oluştu:", err);
            return;
          }
          console.log('Dosya başarıyla kaydedildi!');
        });
      }
    }).catch((err) => {
      console.error("Kaydetme işlemi başarısız:", err);
    });
  },

  // Open File (Aç)
  openFile: () => {
    return dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'OBJ Files', extensions: ['obj'] }],
    }).then((file) => {
      if (!file.canceled) {
        const content = fs.readFileSync(file.filePaths[0], 'utf8');
        console.log("Dosya içeriği:", content);
        return content;
      }
    }).catch((err) => {
      console.error("Açma işlemi başarısız:", err);
    });
  },
};
