const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    // Burada React'ten erişilmesini istediğiniz fonksiyonları expose edebilirsiniz.
    sendDataToMain: (data) => {
        // Main process'e veri göndermek için bir yol ekleyebilirsiniz.
    }
});
