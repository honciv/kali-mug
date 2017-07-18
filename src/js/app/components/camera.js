import * as THREE from 'three';

import Config from '../../data/config';

// Class that creates and updates the main camera
export default class Camera {
  constructor(renderer, scene) {
    const size = renderer.getSize();
    const width = size.width;
    const height = size.height;

    // Create and position a Perspective Camera
    this.threeCamera = new THREE.PerspectiveCamera(Config.camera.fov, width / height, Config.camera.near, Config.camera.far);
    this.threeCamera.position.set(Config.camera.posX, Config.camera.posY, Config.camera.posZ);

    this.threeCamera.lookAt(Config.controls.target.x, Config.controls.target.y, Config.controls.target.z);
    this.threeCamera.target = scene.position.clone();
    // Initial sizing
    this.updateSize(renderer);
    
    // Listeners
    window.addEventListener('resize', () => this.updateSize(renderer), false);
  }

  updateSize(renderer) {
    // Multiply by dpr in case it is retina device
    this.threeCamera.aspect = (renderer.domElement.width / renderer.domElement.height);

    // Always call updateProjectionMatrix on camera change
    this.threeCamera.updateProjectionMatrix();
  }
}
