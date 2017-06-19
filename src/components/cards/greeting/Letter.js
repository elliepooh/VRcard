import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PCFSoftShadowMap,
  HemisphereLight,
  DirectionalLight,
  Mesh,
  Group,
  MeshStandardMaterial,
  BoxGeometry,
  Shape,
  Vector2,
  ExtrudeGeometry,
  FlatShading,
} from 'three';

/* eslint-disable no-param-reassign */
export default class Letter {
  constructor(container) {
    this.container = container;

    this.vAngle = 0;
    this.isOpen = false;

    this.init();
  }
  init() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 0, 10);
    this.camera.lookAt(this.scene.position);

    this.renderer = new WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onResize);

    this.addLights();
    this.draw();

    this.group.traverse((object) => {
      object.castShadow = true;
      object.receiveShadow = true;
    });
  }
  addLights() {
    const light = new HemisphereLight();
    this.scene.add(light);

    const directLight1 = new DirectionalLight();
    directLight1.castShadow = true;
    directLight1.position.set(-10, 5, 8);
    this.scene.add(directLight1);
  }
  draw() {
    this.group = new Group();
    this.group.position.y = -1;
    this.scene.add(this.group);

    const bodyMaterial = new MeshStandardMaterial({
      color: 0x1CB3DD,
      roughness: 1,
      shading: FlatShading,
    });
    const bodyGeometry = new BoxGeometry(8, 6, 2);
    const body = new Mesh(bodyGeometry, bodyMaterial);
    this.group.add(body);

    const upperPartMaterial = new MeshStandardMaterial({
      color: 0xF4FCFF,
      roughness: 1,
      shading: FlatShading,
    });
    const upperPartShape = new Shape([
      new Vector2(-4, 0),
      new Vector2(4, 0),
      new Vector2(0, 4),
    ]);
    const upperPartGeometry = new ExtrudeGeometry(upperPartShape, {
      amount: 1,
      bevelSegments: 0,
      bevelSize: 0,
      bevelThickness: 0,
    });

    this.upperPart = new Mesh(upperPartGeometry, upperPartMaterial);
    this.upperPart.position.set(0, 3, 1);
    this.upperPart.rotation.z = Math.PI;
    this.upperPart.name = 'letterPart';
    this.group.add(this.upperPart);

    const partMaterial = new MeshStandardMaterial({
      color: 0xF24682,
      roughness: 1,
      shading: FlatShading,
    });

    const bottomPartShape = new Shape([
      new Vector2(-4, 0),
      new Vector2(4, 0),
      new Vector2(0, 3),
    ]);
    const bottomPartGeometry = new ExtrudeGeometry(bottomPartShape, {
      amount: 0.5,
      bevelSegments: 0,
      bevelSize: 0,
      bevelThickness: 0,
    });
    const bottomPart = new Mesh(bottomPartGeometry, partMaterial);
    bottomPart.position.set(0, -3, 1);
    this.group.add(bottomPart);

    const partShape = new Shape([
      new Vector2(-3, 0),
      new Vector2(3, 0),
      new Vector2(0, 4),
    ]);
    const partGeometry = new ExtrudeGeometry(partShape, {
      amount: 0.2,
      bevelSegments: 0,
      bevelSize: 0,
      bevelThickness: 0,
    });

    const rightPart = new Mesh(partGeometry, partMaterial);
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

    this.renderer.render(this.scene, this.camera);
  }
}
