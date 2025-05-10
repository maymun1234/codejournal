import * as BABYLON from '@babylonjs/core';

// Babylon.js sahnesi oluşturulacak
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true); // Elektron canvas'ını Babylon'a bağla

const scene = new BABYLON.Scene(engine);

// Kamera oluştur
const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Sahneye bir ışık kaynağı ekleyin
const light = new BABYLON.HemisphericLight("light1", BABYLON.Vector3.Up(), scene);

// Basit bir küre (sphere) ekleyin
const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 1}, scene);
sphere.position.y = 1;

// Render döngüsü
engine.runRenderLoop(() => {
    scene.render();
});

// Pencere yeniden boyutlandırıldığında motoru yeniden boyutlandır
window.addEventListener('resize', () => {
    engine.resize();
});

