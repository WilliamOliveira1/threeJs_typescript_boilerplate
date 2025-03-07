import * as THREE from 'three'
import { ColorsList } from '../public/enums';

export class SceneHelper {
    three: typeof THREE | undefined;

    constructor () {
        this.three = THREE;
    }

    /**
     * add color to the scene background
     * @param scene scene to add background color
     * @param colorList enum color value
     */
    addBackgroundColor(scene: THREE.Scene, colorList: ColorsList): void {
        scene.background = new THREE.Color(colorList)
    }

    /**
     * add image to the scene background
     * @param scene scene to add background image
     * @param path path to image file
     */
    addBackgroundFromPath(scene: THREE.Scene, path: string): void {
        scene.background = new THREE.TextureLoader().load(path)
    }

    /**
     * add cube map to the scene background
     * @param scene scene to add cube map
     * @param path path to cube map file
     * @param cubeArray array of cube map images
     */
    addBackgroundFromCubeMapPath(scene: THREE.Scene, path: string, cubeArray: string[]): void {
        scene.background = new THREE.CubeTextureLoader().setPath(path).load(cubeArray)
    }
}
