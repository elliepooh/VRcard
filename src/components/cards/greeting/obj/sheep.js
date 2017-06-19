import {
  Group,
  Mesh,
  IcosahedronGeometry,
  BoxGeometry,
  CylinderGeometry,
  MeshStandardMaterial,
  FlatShading,
} from 'three';

export default class Sheep {
  constructor(container) {
    this.container = container;

    this.group = new Group();
    this.group.scale.set(0.6, 0.6, 0.6);

    this.color = '#CDAAFD';
    this.vAngle = 0;
    this.draw();

    this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.container.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.container.addEventListener('touchstart', this.onMouseDown.bind(this));
    this.container.addEventListener('touchend', this.onMouseUp.bind(this));
  }
  draw() {
    this.drawSheep();
    this.drawCloud();
    this.drawSky();
  }
  drawSheep() {
    this.sheep = new Group();
    this.sheep.position.y = 40;
    this.group.add(this.sheep);

    const woolMaterial = new MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      shading: FlatShading,
    });
    const skinMaterial = new MeshStandardMaterial({
      color: 0xffaf8b,
      roughness: 1,
      shading: FlatShading,
    });
    const darkMaterial = new MeshStandardMaterial({
      color: 0x4b4553,
      roughness: 1,
      shading: FlatShading,
    });

    // draw body
    const bodyGeometry = new IcosahedronGeometry(170, 0);
    const body = new Mesh(bodyGeometry, woolMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    this.sheep.add(body);

    // draw head
    const head = new Group();
    head.position.set(0, 65, 160);
    head.rotation.x = -0.35;
    this.sheep.add(head);

    const foreheadGeometry = new BoxGeometry(70, 60, 70);
    const forehead = new Mesh(foreheadGeometry, skinMaterial);
    forehead.castShadow = true;
    forehead.receiveShadow = true;
    forehead.position.y = -15;
    head.add(forehead);

    const faceGeometry = new CylinderGeometry(50, 15, 40, 4, 1);
    const face = new Mesh(faceGeometry, skinMaterial);
    face.castShadow = true;
    face.receiveShadow = true;
    face.position.y = -65;
    face.rotation.y = 0.78;
    head.add(face);

    const woolGeometry = new BoxGeometry(84, 46, 90);
    const wool = new Mesh(woolGeometry, woolMaterial);
    wool.position.set(0, 12, 7);
    wool.rotation.x = 0.35;
    head.add(wool);

    const rightEyeGeometry = new CylinderGeometry(8, 10, 6, 6);
    const rightEye = new Mesh(rightEyeGeometry, darkMaterial);
    rightEye.castShadow = true;
    rightEye.receiveShadow = true;
    rightEye.position.set(35, -48, 33);
    rightEye.rotation.set(2.28, 0, -0.78);
    head.add(rightEye);

    const leftEye = rightEye.clone();
    leftEye.position.x = -rightEye.position.x;
    leftEye.rotation.z = -rightEye.rotation.z;
    head.add(leftEye);

    const rightEarGeometry = new BoxGeometry(12, 50, 30);
    rightEarGeometry.translate(0, -25, 0);
    this.rightEar = new Mesh(rightEarGeometry, skinMaterial);
    this.rightEar.castShadow = true;
    this.rightEar.receiveShadow = true;
    this.rightEar.position.set(35, -12, -7);
    this.rightEar.rotation.set(0.35, 0, 0.87);
    head.add(this.rightEar);

    this.leftEar = this.rightEar.clone();
    this.leftEar.position.x = -this.rightEar.position.x;
    this.leftEar.rotation.z = -this.rightEar.rotation.z;
    head.add(this.leftEar);

    // draw legs
    const legGeometry = new CylinderGeometry(30, 15, 100, 4);
    legGeometry.translate(0, -50, 0);
    this.frontRightLeg = new Mesh(legGeometry, darkMaterial);
    this.frontRightLeg.castShadow = true;
    this.frontRightLeg.receiveShadow = true;
    this.frontRightLeg.position.set(70, -80, 50);
    this.frontRightLeg.rotation.x = 0.2;
    this.sheep.add(this.frontRightLeg);

    this.frontLeftLeg = this.frontRightLeg.clone();
    this.frontLeftLeg.position.x = -this.frontRightLeg.position.x;
    this.frontLeftLeg.rotation.z = -this.frontRightLeg.rotation.z;
    this.sheep.add(this.frontLeftLeg);

    this.backRightLeg = this.frontRightLeg.clone();
    this.backRightLeg.position.z = -this.frontRightLeg.position.z;
    this.backRightLeg.rotation.x = -this.frontRightLeg.rotation.x;
    this.sheep.add(this.backRightLeg);

    this.backLeftLeg = this.frontLeftLeg.clone();
    this.backLeftLeg.position.z = -this.frontLeftLeg.position.z;
    this.backLeftLeg.rotation.x = -this.frontLeftLeg.rotation.x;
    this.sheep.add(this.backLeftLeg);
  }
  drawCloud() {
    this.cloud = new Group();
    this.cloud.position.y = -200;
    this.cloud.scale.set(1.5, 1.5, 1.5);
    this.group.add(this.cloud);

    const material = new MeshStandardMaterial({
      color: 0xacb3fb,
      roughness: 1,
      shading: FlatShading,
    });
    const partGeometry = new IcosahedronGeometry(100, 0);

    this.upperPart = new Mesh(partGeometry, material);
    this.upperPart.castShadow = true;
    this.upperPart.receiveShadow = true;
    this.cloud.add(this.upperPart);

    this.leftPart = this.upperPart.clone();
    this.leftPart.position.set(-120, -30, 0);
    this.leftPart.scale.set(0.8, 0.8, 0.8);
    this.cloud.add(this.leftPart);

    this.rightPart = this.leftPart.clone();
    this.rightPart.position.x = -this.leftPart.position.x;
    this.cloud.add(this.rightPart);

    this.frontPart = this.leftPart.clone();
    this.frontPart.position.set(0, -40, 90);
    this.frontPart.scale.set(0.7, 0.7, 0.7);
    this.cloud.add(this.frontPart);

    this.backPart = this.frontPart.clone();
    this.backPart.position.z = -this.frontPart.position.z;
    this.cloud.add(this.backPart);
  }
  drawSky() {
    this.sky = new Group();
    this.group.add(this.sky);

    const colors = [0xF8007E, 0xFFC363, 0xDDD7FE, 0xFFFFFF, 0xEFD2DA];

    for (let i = 0; i < 20; i += 1) {
      const geometry = new IcosahedronGeometry(40, 0);
      const material = new MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 1,
        shading: FlatShading,
      });
      const mesh = new Mesh(geometry, material);

      mesh.position.set((Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000);
      this.sky.add(mesh);
    }
  }
  jump(speed) {
    this.vAngle += speed;
    this.sheep.position.y = (Math.sin(this.vAngle) * 100) + 138;

    const legRotation = ((Math.sin(this.vAngle) * Math.PI) / 6) + 0.4;

    this.frontRightLeg.rotation.z = legRotation;
    this.backRightLeg.rotation.z = legRotation;
    this.frontLeftLeg.rotation.z = -legRotation;
    this.backLeftLeg.rotation.z = -legRotation;

    const earRotation = legRotation + 0.9;

    this.rightEar.rotation.z = earRotation;
    this.leftEar.rotation.z = -earRotation;
  }
  jumpOnMouseDown(mouseDown) {
    if (mouseDown) {
      this.jump(0.04);
    } else {
      if (this.sheep.position.y <= 40) return;
      this.jump(0.08);
    }
  }
  cloudBend() {
    this.upperPart.position.y = -Math.cos(this.vAngle) * 12;
    this.leftPart.position.y = (-Math.cos(this.vAngle) * 10) - 30;
    this.rightPart.position.y = (-Math.cos(this.vAngle) * 10) - 30;
    this.frontPart.position.y = (-Math.cos(this.vAngle) * 8) - 30;
    this.backPart.position.y = (-Math.cos(this.vAngle) * 8) - 30;
  }
  animate() {
    this.jumpOnMouseDown(this.mouseDown);
    if (this.sheep.position.y > 40) this.cloudBend();

    this.sky.rotation.x += 0.001;
    this.sky.rotation.y -= 0.004;
  }
  onMouseDown() {
    event.preventDefault();
    this.mouseDown = true;
  }
  onMouseUp() {
    event.preventDefault();
    this.mouseDown = false;
  }
}
