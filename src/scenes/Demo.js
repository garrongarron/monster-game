import renderer from "../../src/engine/basic/Renderer.js"
import machine from "../../src/engine/basic/Machine.js"
import scene from "../../src/engine/basic/Scene.js";
import cube from "../../src/engine/object/Box.js";
import ocean from "../../src/engine/object/Ocean.js";
import camera from "../../src/engine/basic/Camera.js";
import MasterScene from "../../src/engine/scenes/MasterScene.js";
import directionalLight, { ambientLight, helper, hemiLight } from "../../src/engine/basic/Light.js";
import resize from "../../src/engine/basic/Resize.js";
import maw from "../characters/Maw/Maw.js";
import CharacterController from "../../src/engine/controllers/CharacterController.js"
import settings from '../characters/Maw/Settings.js'
import cameraController from "../../src/engine/controllers/camera/CameraController.js";
import keyListener from "../engine/basic/KeyListener.js";
import eventBus from "../engine/basic/EventBus.js";
import sounds from "../audio/Audios.js";
import ContextMenu from '../engine/ui/ContextMenu.js'
import displayContextMenuGame from "./DisplayContextMenuGame.js";

class Demo extends MasterScene {
    constructor(instancename) {
        super(instancename)
        this.mesh = null
        this.callback = () => {
            renderer.render(scene, camera);
            if (this.mesh) {
                directionalLight.position.x = this.mesh.position.x
                directionalLight.position.y = this.mesh.position.y + 2
                directionalLight.position.z = this.mesh.position.z
                directionalLight.target.position.set(
                    this.mesh.position.x - 2,
                    this.mesh.position.y,
                    this.mesh.position.z - 2);
                directionalLight.target.updateMatrixWorld();
            }
        }

        let contextMenu = new ContextMenu(displayContextMenuGame)
        contextMenu.open()
    }
    open() {
        machine.addCallback(this.callback);
        machine.on();
        keyListener.start()
        resize.open(renderer)
        scene.add(directionalLight)
            // scene.add(helper)
        scene.add(ambientLight)
        scene.add(hemiLight);
        scene.add(cube)
        cube.position.y = 0
        maw.getObject()
            .then(mesh => {
                this.mesh = mesh
                cameraController.start(mesh)
                scene.add(mesh)
                let characterController = new CharacterController(settings)
                characterController.setMesh(mesh)
                characterController.start()
            })
        scene.add(ocean)
        eventBus.suscribe('keyListener', (arr) => {
            if (arr[0] == 87 || arr[0] == 83) {
                (arr[1] == true) ? sounds.play('walk'): sounds.stop('walk', true)
            }
        })
    }
    close() {
        characterController.stop()
        machine.removeCallback(this.callback);
        machine.off();
        resize.close()
        scene.remove(directionalLight)
        scene.remove(ambientLight)
        scene.remove(hemiLight)
        scene.remove(cube)
    }
}

let demo = new Demo()
export default demo