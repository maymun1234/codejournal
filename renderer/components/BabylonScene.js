import React, { useEffect } from 'react';
import * as BABYLON from '@babylonjs/core';

const BabylonScene = () => {
  useEffect(() => {
    // Canvas elementini al
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);

    const scene = new BABYLON.Scene(engine);
    
    // Kamera ekle
    const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Bir ışık kaynağı ekle
    const light = new BABYLON.HemisphericLight("light1", BABYLON.Vector3.Up(), scene);

    // Bir küre ekle
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 1}, scene);
    sphere.position.y = 1;

    // Render döngüsü
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Ekran boyutları değişirse yeniden boyutlandır
    window.addEventListener('resize', () => {
      engine.resize();
    });

    return () => {
      engine.dispose(); // Temizlik yap
    };
  }, []);

  return <canvas id="renderCanvas" style={{ width: '100%', height: '100%' }} />;
};

export default BabylonScene;
