import * as THREE from 'three';

export default class RealityPiece {
  constructor() {
    // this.geometry = this.createObeliskGeometry();
    this.geometry = new THREE.SphereGeometry(0.5, 32, 32);
    this.material = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.5,
      metalness: 1,
      emissive: 0x222222,
    });

    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.position.set(0, 1.0, 0);
  }

  get position() {
    return this.pivot.position;
  }

  createObeliskGeometry() {
    const baseTopRadius = 0.3;

    const baseGeometry = new THREE.CylinderGeometry(baseTopRadius, 0.45, 1.9, 4);
    baseGeometry.translate(0, 0.0, 0);

    const tipGeometry = new THREE.CylinderGeometry(0, baseTopRadius, 0.3, 4);
    tipGeometry.translate(0, 1.1, 0);

    const geometry = new THREE.Geometry();
    geometry.merge(baseGeometry);
    geometry.merge(tipGeometry);
    return geometry;
  }
}
