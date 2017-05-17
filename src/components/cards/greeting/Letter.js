import * as THREE from 'three';
import Three from './Three';

/* eslint-disable no-param-reassign */
export default class Letter {
  constructor(container) {
    this.three = new Three({
      container,
      transparent: true,
      alpha: 0,
      cameraPositionX: 0,
      cameraPositionY: 0,
      cameraPositionZ: 10,
    });
    this.width = container.clientWidth;
    this.height = container.clientHeight;

    this.init();
  }
  init() {
    this.three.init();

    this.group = new THREE.Group();
    this.group.position.y = -1;
    this.three.scene.add(this.group);

    this.vAngle = 0;
    this.isOpen = false;

    this.addLights();
    this.draw();

    this.group.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }
  addLights() {
    const light = new THREE.HemisphereLight();
    this.three.scene.add(light);

    const directLight1 = new THREE.DirectionalLight();
    directLight1.castShadow = true;
    directLight1.position.set(-10, 5, 8);
    this.three.scene.add(directLight1);
  }
  draw() {
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1CB3DD,
      roughness: 1,
      shading: THREE.FlatShading,
    });
    const bodyGeometry = new THREE.BoxGeometry(8, 6, 2);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.group.add(body);

    const upperPartMaterial = new THREE.MeshStandardMaterial({
      color: 0xF4FCFF,
      roughness: 1,
      shading: THREE.FlatShading,
    });
    const upperPartShape = new THREE.Shape([
      new THREE.Vector2(-4, 0),
      new THREE.Vector2(4, 0),
      new THREE.Vector2(0, 4),
    ]);
    const upperPartGeometry = new THREE.ExtrudeGeometry(upperPartShape, {
      amount: 1,
      bevelSegments: 0,
      bevelSize: 0,
      bevelThickness: 0,
    });

    this.upperPart = new THREE.Mesh(upperPartGeometry, upperPartMaterial);
    this.upperPart.position.set(0, 3, 1);
    this.upperPart.rotation.z = Math.PI;
    this.upperPart.name = 'letterPart';
    this.group.add(this.upperPart);

    const partMaterial = new THREE.MeshStandardMaterial({
      color: 0xF24682,
      roughness: 1,
      shading: THREE.FlatShading,
    });

    const bottomPartShape = new THREE.Shape([
      new THREE.Vector2(-4, 0),
      new THREE.Vector2(4, 0),
      new THREE.Vector2(0, 3),
    ]);
    const bottomPartGeometry = new THREE.ExtrudeGeometry(bottomPartShape, {
      amount: 0.5,
      bevelSegments: 0,
      bevelSize: 0,
      bevelThickness: 0,
    });
    const bottomPart = new THREE.Mesh(bottomPartGeometry, partMaterial);
    bottomPart.position.set(0, -3, 1);
    this.group.add(bottomPart);

    const partShape = new THREE.Shape([
      new THREE.Vector2(-3, 0),
      new THREE.Vector2(3, 0),
      new THREE.Vector2(0, 4),
    ]);
    const partGeometry = new THREE.ExtrudeGeometry(partShape, {
      amount: 0.2,
      bevelSegments: 0,
      bevelSize: 0,
      bevelThickness: 0,
    });

    const rightPart = new THREE.Mesh(partGeometry, partMaterial);
    rightPart.position.set(-4, 0, 1);
    rightPart.rotation.z = -Math.PI / 2;
    this.group.add(rightPart);

    const leftPart = rightPart.clone();
    leftPart.position.x = -rightPart.position.x;
    leftPart.rotation.z = Math.PI / 2;
    this.group.add(leftPart);
  }
  open() {
    this.isOpen = true;
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    if (this.isOpen) {
      if (this.upperPart.rotation.x > -3) {
        this.vAngle += 0.001;
        this.upperPart.rotation.x -= Math.sin(this.vAngle);
      } else {
        this.vAngle = 0;
        this.isOpen = false;
      }
    } else if (this.upperPart.rotation.x < 0) {
      this.vAngle += 0.001;
      this.upperPart.rotation.x += Math.sin(this.vAngle);
    }

    this.three.render();
  }
}
