import * as THREE from 'three';
import gsap, { Power3 } from 'gsap'

import { SketchManager } from './SketchManager';

import utils from './utils';
import Water from './Water';
import RealityPiece from './RealityPiece';
import DreamPiece from './DreamPiece';
import Lights from './Lights';
import Petals from './Petals';

export class Sketch extends SketchManager {
  constructor(canvas) {
    super(canvas);
    this.clock = new THREE.Clock();
    this.lights = new Lights();
    this.water = new Water();
    this.realityPiece = new RealityPiece();
    this.dreamPiece = new DreamPiece();
    this.petals = new Petals();
  }
  init() {
    document.addEventListener('mousemove', e => this.offsetCamera(e), false);
    this.disableOrbitControls();
    this.setCameraPos(0, 1.5, -4);
    this.lookAt(0, 0, 0);

    this.scene.add(this.lights.directional);
    this.scene.add(this.lights.spot);

    // this.scene.add(this.realityPiece.pivot);
    // this.scene.add(this.dreamPiece.pivot);
    this.scene.add(this.water.pivot);
    this.scene.add(this.petals.pivot);
  }
  offsetCamera(e) {
    this.updateMousePosition(e);
    const centerCoord = { x: 0, y: 0, z: 0 };
    const degrees = utils.clamp(-40, 40, this.mouse.x * 0.1);
    const angle = utils.toRadians(degrees);
    const { x, z } = this.getCircleCoord(centerCoord, 4, angle);
    const posY = utils.clamp(1, 5.0, this.mouse.y * 0.01);

    gsap.timeline()
      .to(this.camera.position, {
        x,
        y: posY,
        z: -z,
        delay: 0.2,
        ease: Power3.easeOut,
        onUpdate: () => {
          this.lookAt(0, 0, 0);
        }
      })
  }
  getCircleCoord(centerCoord, radius, angle) {
    return {
      x: centerCoord.x + radius * Math.sin(angle),
      y: 0.5,
      z: centerCoord.y + radius * Math.cos(angle),
    }
  }

  draw() {
    this.renderer.render(this.scene, this.camera);

    const time = this.clock.getElapsedTime();
    this.water.update(time);
    this.petals.update(time);

    requestAnimationFrame(() => this.draw());
  }
}

/**
 * material
 * https://dustinpfister.github.io/2018/04/30/threejs-materials/
 *
 * colors
 * https://codepen.io/mnmxmx/pen/BdjdMz
 *
 *
 */
