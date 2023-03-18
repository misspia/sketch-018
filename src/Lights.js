import * as THREE from 'three';

export default class Lights {
  constructor() {
    this.directional = new THREE.DirectionalLight(0xffffff, 1.2);
    this.directional.position.set(-3, 5, -6);

    this.spot = new THREE.SpotLight(0xffffff, 0.9);
    this.spot.position.set(-3.0, 2, 2);
  }
}
