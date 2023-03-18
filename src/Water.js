import * as THREE from 'three';
import Refractor from './lib/Refractor';
import WaterRefractionShader from './lib/WaterRefractionShader';

import vertexShader from './shaders/tint.vert';
import fragmentShader from './shaders/tint.frag';

import { water } from './assets';
import utils from './utils';

export default class Water {
  constructor() {
    this.refractionGeometry = new THREE.PlaneGeometry(20, 20);
    const options = {
      // color: 0x999999,
      color: 0x666666,
      textureWidth: 1024,
      textureHeight: 1024,
      shader: WaterRefractionShader,
    };
    this.refraction = new Refractor(this.refractionGeometry, options);

    const dudvMap = new THREE.TextureLoader().load(water);
    dudvMap.wrapS = THREE.RepeatWrapping;
    dudvMap.wrapT = THREE.RepeatWrapping;
    this.uniforms.tDudv.value = dudvMap;

    this.tintGeometry = new THREE.CircleGeometry(10, 15);
    this.tintMaterial = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.FrontSide,
      transparent: true,
    });
    this.tintSurface = new THREE.Mesh(this.tintGeometry, this.tintMaterial);

    this.pivot = new THREE.Group();
    this.pivot.add(this.refraction);
    this.pivot.add(this.tintSurface);

    this.refraction.position.z = 0.0;
    this.tintSurface.position.z = -0.01
    this.pivot.position.set(0, 0, 0);
    this.pivot.rotation.x -= utils.toRadians(90);
  }

  get position() {
    return this.pivot.position;
  }

  get uniforms() {
    return this.refraction.material.uniforms;
  }

  update(time) {
    this.uniforms.time.value = time;
  }
}
