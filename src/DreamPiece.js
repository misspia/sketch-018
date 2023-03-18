import * as THREE from 'three';

import dreamVert from './shaders/dream.vert';
import dreamFrag from './shaders/dream.frag';

export default class DreamPiece {
  constructor() {
    this.geometry = new THREE.BoxGeometry(0.8, 1.7, 0.8);
    // this.geometry = new THREE.BoxGeometry(0.5, 1.0, 0.5);
    // this.geometry = new THREE.SphereGeometry(0.5, 32, 32);

    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        time: { type: 'f', value: 0.9 },
      },
      fragmentShader: dreamFrag,
      vertexShader: dreamVert,
    });
    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.pivot.rotation.x += 180 * Math.PI / 180;
    this.pivot.rotation.y -= 90 * Math.PI / 180;
    this.pivot.position.set(0, -1.2, 0);
    // this.pivot.position.set(0, -0.75, 0);
  }

  get position() {
    return this.pivot.position;
  }
}
