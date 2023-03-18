import * as THREE from 'three';
import Petal from './Petal';

export default class Petals {
  constructor() {
    this.numPetals = 12;
    this.petals = [];

    this.pivot = new THREE.Group();

    this.createPetals();
  }

  createPetals() {
    for(let i = 0; i < this.numPetals; i ++) {
      const petal = new Petal();

      this.petals.push(petal);
      this.pivot.add(petal.pivot);
    }
  }

  update(time) {
    this.petals.forEach(petal => petal.update(time));
  }

}
