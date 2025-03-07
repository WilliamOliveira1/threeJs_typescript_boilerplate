import { GUI } from 'dat.gui'
import * as THREE from 'three'

export class GuiHelper {
    gui: GUI | undefined;
    three: typeof THREE | undefined;

    constructor () {
        this.gui = new GUI();
        this.three = THREE;
    }

    /**
     * Add a gui for a 3d mesh object
     * @param element A 3d mesh object
     * @param elementName The name of the element
     * @param axis The axis to add to the gui
     * @param min The minimum value
     * @param max The maximum value 
     */
    addMeshGuiElementFolder(element: THREE.Mesh, elementName: string, axis: (keyof THREE.Euler)[], min: number, max: number): void {
        const elementFolder = this.gui?.addFolder(elementName);
        axis.forEach(elementAxis => {
            elementFolder?.add(element.rotation, elementAxis, min, max);
        });
        elementFolder?.open();
    }

    /**
     * Add a gui for a PerspectiveCamera
     * @param element a perspective camera
     * @param elementName the name of the element
     * @param axis The axis to add to the gui
     * @param min The minimum value
     * @param max The maximum value
     */
    addMeshGuiVectorFolder(element: THREE.PerspectiveCamera, elementName: string, axis: (keyof THREE.Vector3)[], min: number, max: number): void {
        const elementFolder = this.gui?.addFolder(elementName);
        axis.forEach(elementAxis => {
            elementFolder?.add(element.position, elementAxis, min, max);
        });
        elementFolder?.open();
    }

    /**
     * Add a gui for a scene switcher
     * @param sceneSwitcher obj to switch between scenes
     * @param propSceneName prop name of the scene
     * @param sceneName Scene name
     */
    addGuiScene(sceneSwitcher: { [key: string]: () => void }, propSceneName: string, sceneName: string): void {
        this.gui?.add(sceneSwitcher, propSceneName).name(sceneName)
    }

    /**
     * add a gui for perspective camera
     * @param camera Perspective camera
     * @param elementName camera name
     */
    addGuiPerspectiveCameraFolder(camera: THREE.PerspectiveCamera, elementName: string): void {
        if(!this.gui || !camera) return
        const cameraFolder = this.gui.addFolder(elementName);
        cameraFolder.add(camera.position, 'x', -10, 10);
        cameraFolder.add(camera.position, 'y', -10, 10);
        cameraFolder.add(camera.position, 'z', -10, 10);
        cameraFolder.add(camera, 'fov', 0, 180, 0.01).onChange(() => {
          camera.updateProjectionMatrix();
        })
        cameraFolder.add(camera, 'aspect', 0.00001, 10).onChange(() => {
          camera.updateProjectionMatrix();
        })
        cameraFolder.add(camera, 'near', 0.01, 10).onChange(() => {
          camera.updateProjectionMatrix();
        })
        cameraFolder.add(camera, 'far', 0.01, 10).onChange(() => {
          camera.updateProjectionMatrix();
        })
        cameraFolder.open();
    }   
    
    /**
     * add a gui for orthographic camera
     * @param camera Orthographic camera
     * @param elementName camera name
     */
    addGuiCameraOrthographicFolder(camera: THREE.OrthographicCamera, elementName: string): void {
        if(!this.gui || !camera) return
        const cameraFolder = this.gui.addFolder(elementName);
        cameraFolder.add(camera, 'left', -10, 0).onChange(() => {
            camera.updateProjectionMatrix();
        })
        cameraFolder.add(camera, 'right', 0, 10).onChange(() => {
            camera.updateProjectionMatrix();
        })
        cameraFolder.add(camera, 'top', 0, 10).onChange(() => {
            camera.updateProjectionMatrix();
        })
        cameraFolder.add(camera, 'bottom', -10, 0).onChange(() => {
            camera.updateProjectionMatrix();
        })
        cameraFolder.add(camera, 'near', -5, 5).onChange(() => {
            camera.updateProjectionMatrix();
        })
        cameraFolder.add(camera, 'far', 0, 10).onChange(() => {
            camera.updateProjectionMatrix();
        })
        cameraFolder.open();
    }
}
