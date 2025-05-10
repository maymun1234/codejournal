import * as BABYLON from '@babylonjs/core';

// Babylon.js sahnesi oluşturulacak
const canvas = document.getElementById('renderCanvas'); // HTML'deki canvas elemanı
const engine = new BABYLON.Engine(canvas, true);

const scene = new BABYLON.Scene(engine);

// Kamera ekle
const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Basit bir küre ekle
const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 1}, scene);
sphere.position.y = 1;

// Işık ekle
const light = new BABYLON.HemisphericLight("light1", BABYLON.Vector3.Up(), scene);

// Render döngüsü
engine.runRenderLoop(() => {
    scene.render();
});

// Ekran boyutları değişirse boyutlandırmayı yap
window.addEventListener('resize', () => {
    engine.resize();
});
