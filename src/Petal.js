import * as THREE from 'three';
import fragmentShader from './shaders/petal.frag';
import vertexShader from './shaders/petal.vert';
import utils from './utils';

export default class Petal {
  constructor() {
    this.alphaVelocity = 0.15;
    this.endY = utils.randomFloatBetween(-0.5, -0.1);
    this.start = {
      x: utils.randomFloatBetween(-3.2, 0),
      y: utils.randomFloatBetween(1.5, 2.8),
      z: utils.randomFloatBetween(-2, 2),
    }
    this.positionVelocity = {
      x: utils.randomFloatBetween(0.003, 0.02),
      y: utils.randomFloatBetween(0.005, 0.02),
      z: utils.randomFloatBetween(0.008, 0.02),
    }
    this.rotationVelocity = {
      x: utils.randomFloatBetween(0.01, 0.05),
      y: utils.randomFloatBetween(0.01, 0.05),
      z: utils.randomFloatBetween(0.01, 0.05),
    };

    const scale = utils.randomFloatBetween(0.00045, 0.0013);
    this.geometry = this.createPetalGeometry(scale);
    this.geometry.center();

    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: { value: [1.0, 0.75, 0.75] },
        uAlpha: { value: 1.0 },
      },
      side: THREE.DoubleSide,
    });

    this.pivot = new THREE.Mesh(this.geometry, this.material);

    this.position.set(
      this.start.x,
      utils.randomFloatBetween(this.endY + 0.1, this.start.y),
      this.start.z,
    );
  }

  get position() {
    return this.pivot.position;
  }

  get rotation() {
    return this.pivot.rotation;
  }

  get uniforms() {
    return this.material.uniforms;
  }

  get uAlpha() {
    return this.material.uniforms.uAlpha;
  }

  createPetalGeometry(size = 1) {
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(50, 100, -50, 100, 0, 0);

    const extrudeSettings = {
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 15,
      bevelThickness: 0.5
    };
    const geometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
    geometry.scale(size, size, size);

    return geometry;
  }

  remapAlpha(min, max) {
    return utils.remap(min, max, 0, 1, this.position.y);
  }

  update(time) {
    this.rotation.x += this.rotationVelocity.x;
    this.rotation.y += this.rotationVelocity.y;
    this.rotation.z += this.rotationVelocity.z;

    if (this.position.y <= this.endY) {
      this.position.y = this.start.y;
      this.position.x = this.start.x;
      this.position.z = this.start.z;
    } else {
      this.position.y -= this.positionVelocity.y;
      this.position.x += this.positionVelocity.x;
      this.position.z += this.positionVelocity.z;
    }

    if (this.position.y <= this.endY + 0.1) {
      this.uAlpha.value = Math.max(0, this.uAlpha.value - this.alphaVelocity);
    }

    if (this.position.y >= this.start.y - 0.1) {
      this.uAlpha.value = Math.min(1, this.uAlpha.value + this.alphaVelocity);
    }
  }
}
