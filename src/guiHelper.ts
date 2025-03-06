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
}
