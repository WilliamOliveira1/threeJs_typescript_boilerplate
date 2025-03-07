import './style.css'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GuiHelper } from './guiHelper';
import { SceneHelper } from './sceneHelper';
import { ColorsList } from '../public/enums';

export class Main {
  setScene = {
    sceneA: () => {
      this.activeScene = this.scene1
    },
    sceneB: () => {
      this.activeScene = this.scene2
    },
  }

  three: typeof THREE = THREE;
  camera: THREE.PerspectiveCamera | undefined;
  camera1: THREE.OrthographicCamera | undefined;
  scene1: THREE.Scene | undefined;
  scene2: THREE.Scene | undefined;
  activeScene: THREE.Scene | undefined;
  renderer: THREE.WebGLRenderer | undefined;
  stats: Stats | undefined;

  constructor(private sceneHelper: SceneHelper, private guiHelper: GuiHelper) {
    this.guiHelper = new GuiHelper();    
    this.createScene();
    this.createCamera();    
    this.createRenderer();
    this.resizeRendererToDisplaySize();
    this.createWireframeCube();     
    this.addStats();    
    this.addGuiForCamera();
    this.animate();
    this.addSceneBackground();
    this.addGuiForScenes();    
  }

  resizeRendererToDisplaySize(): void {    
    window.addEventListener('resize', () => {
      if (!this.renderer || !this.camera1) return;
      // this.camera.aspect = window.innerWidth / window.innerHeight;
      // this.camera.updateProjectionMatrix();
      this.camera1.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    })
  }

  createScene(): void {
    this.scene1 = new this.three.Scene();
    this.scene2 = new this.three.Scene();
    this.activeScene = this.scene1;  
  }

  createCamera(): void {
    // this.camera  = new this.three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // this.camera.position.set(0, 2, 3);   
    this.camera1 = new this.three.OrthographicCamera(-6, 6, 4, -4, -5, 10)
    this.camera1.position.set(1, 1, 1)
    this.camera1.lookAt(0, 0.5, 0)
  }  

  createRenderer(): void {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    this.renderer = new this.three.WebGLRenderer({canvas: canvas, antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  addMeshToScene(element: THREE.Mesh): void {
    this.activeScene?.add(element);
    this.activeScene?.add(new this.three.GridHelper());
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
    if (!this.renderer || !this.activeScene || !this.camera1 || !this.stats) return;
    // this.stats.begin();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // this.stats.end();
    // this.camera.lookAt(0, 0.5, 0);
    requestAnimationFrame(this.animate.bind(this));
    // this.renderer.render(this.activeScene, this.camera);
    this.renderer.render(this.activeScene, this.camera1);
    this.stats.update();
  }

  addGuiForCamera(): void {
    if (!this.camera1) return;
    // this.guiHelper?.addMeshGuiVectorFolder(this.camera, 'Camera', ['z'], 0, 5);
    // this.guiHelper?.addGuiPerspectiveCameraFolder(this.camera, 'Camera');
    this.guiHelper?.addGuiCameraOrthographicFolder(this.camera1, 'Camera');
  }

  addGuiForScenes(): void {
    this.guiHelper?.addGuiScene(this.setScene, 'sceneA', 'Scene A')
    this.guiHelper?.addGuiScene(this.setScene, 'sceneB', 'Scene B')
  }

  addSceneBackground(): void {
    if (!this.scene2 || !this.scene1) return;
    debugger;
    const path = 'https://sbcode.net/img/grid.png';    
    this.sceneHelper?.addBackgroundFromPath(this.scene2, path);
    this.sceneHelper?.addBackgroundColor(this.scene1, ColorsList.black);
  }
}

const sceneHelper = new SceneHelper();
const guiHelper = new GuiHelper();

new Main(sceneHelper, guiHelper);