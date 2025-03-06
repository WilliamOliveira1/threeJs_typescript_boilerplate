import { GUI } from 'dat.gui'
import * as THREE from 'three'

export class GuiHelper {
    gui: GUI | undefined;
    three: typeof THREE | undefined;

    constructor () {
        this.gui = new GUI();
        this.three = THREE;
    }

    addMeshGuiElementFolder(element: THREE.Mesh, elementName: string, axis: (keyof THREE.Euler)[], min: number, max: number): void {
        const elementFolder = this.gui?.addFolder(elementName);
        axis.forEach(elementAxis => {
            elementFolder?.add(element.rotation, elementAxis, min, max);
        });
        elementFolder?.open();
    }

    addMeshGuiVectorFolder(element: THREE.PerspectiveCamera, elementName: string, axis: (keyof THREE.Vector3)[], min: number, max: number): void {
        const elementFolder = this.gui?.addFolder(elementName);
        axis.forEach(elementAxis => {
            elementFolder?.add(element.position, elementAxis, min, max);
        });
        elementFolder?.open();
    }
}
