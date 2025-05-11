window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('renderCanvas');
    
    if (!canvas) {
      console.error("renderCanvas bulunamadı!");
      return;
    }
  
    // Babylon.js motoru ve sahnesi oluşturuluyor
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
  
    // Kamera ayarları
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
  
    // Işık kaynağı
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
  
    // Render döngüsü
    engine.runRenderLoop(() => {
      scene.render();
    });
  
    window.addEventListener('resize', () => {
      engine.resize();
    });
  
    // Electron IPC ile save işlemi
    if (window.electron && window.electron.ipcRenderer) {
      // Save işleminde OBJ verisini kaydet
      window.electron.ipcRenderer.on('request-save-obj', () => {
        const objData = OBJExport.OBJ(scene.meshes);  // OBJ formatında veriyi al
        window.electron.ipcRenderer.send('save-obj-data', objData);  // Electron'a gönder
      });
  
      // Open işlemi tetiklendiğinde sahneye yükleme
      window.electron.ipcRenderer.on('load-obj', (event, data) => {
        console.log("Yüklenecek OBJ verisi:", data);
  
        // Sahneye OBJ verisini yükle
        BABYLON.SceneLoader.ImportMesh(
          "",  // Mesh ismi (boş bırakılabilir)
          "",  // Dosya yolu (boş bırakılabilir, veriyi içerik olarak kullanacağız)
          data,  // Yüklemek için OBJ verisi
          scene,  // Sahne
          (meshes) => { 
            console.log("Model yüklendi:", meshes);
            // Modeli sahneye ortalayalım
            meshes.forEach(mesh => {
              mesh.position = new BABYLON.Vector3(0, 0, 0);
              mesh.scaling = new BABYLON.Vector3(1, 1, 1);  // Ölçeklendirme
            });
          }
        );
      });
    }
  });
  