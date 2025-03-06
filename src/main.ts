import './style.css'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GuiHelper } from './guiHelper';

export class Main {
  three: typeof THREE = THREE;
  camera: THREE.PerspectiveCamera | undefined;
  scene: THREE.Scene | undefined;
  renderer: THREE.WebGLRenderer | undefined;
  guiHelper: GuiHelper | undefined;
  stats: Stats | undefined;

  constructor() {
    this.guiHelper = new GuiHelper();    
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.resizeRendererToDisplaySize();
    this.createWireframeCube();     
    this.addStats();    
    this.addGuiForCamera();
    this.animate();
  }

  resizeRendererToDisplaySize(): void {    
    window.addEventListener('resize', () => {
      if (!this.renderer || !this.camera) return;
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }

  createScene(): void {
    this.scene = new this.three.Scene();
  }

  createCamera(): void {
    this.camera  = new this.three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 1.5;
  }

  createRenderer(): void {
    this.renderer = new this.three.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  addMeshToScene(element: THREE.Mesh): void {
    this.scene?.add(element);
  }

  createWireframeCube(): THREE.Mesh {  
    const geometry = new this.three.BoxGeometry();
    const material = new this.three.MeshNormalMaterial({ wireframe: true });
    const wireframeCube = new this.three.Mesh(geometry, material);
    this.addMeshToScene(wireframeCube);
    this.guiHelper?.addMeshGuiElementFolder(wireframeCube, 'Cube', ['x', 'y', 'z'], 0, Math.PI * 2);
    return wireframeCube;
  }

  addStats(): void {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  animate(): void {
    if (!this.renderer || !this.scene || !this.camera || !this.stats) return;
    // this.stats.begin();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // this.stats.end();
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  }

  addGuiForCamera(): void {
    if (!this.camera) return;
    this.guiHelper?.addMeshGuiVectorFolder(this.camera, 'Camera', ['z'], 0, 5);
  }
}

new Main();