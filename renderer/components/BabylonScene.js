import React, { useEffect } from 'react';
import * as BABYLON from '@babylonjs/core';

const BabylonScene = () => {
    useEffect(() => {
        const canvas = document.getElementById('renderCanvas');
        const engine = new BABYLON.Engine(canvas, true);

        const scene = new BABYLON.Scene(engine);
        const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 1}, scene);
        sphere.position.y = 1;

        const light = new BABYLON.HemisphericLight("light1", BABYLON.Vector3.Up(), scene);

        engine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener('resize', () => {
            engine.resize();
        });

        // Cleanup when the component unmounts
        return () => {
            engine.dispose();
        };
    }, []);

    return <canvas id="renderCanvas" style={{ width: '100%', height: '100%' }} />;
};

export default BabylonScene;
