import renderer from "../engine/basic/Renderer.js"
import machine from "../engine/basic/Machine.js"
import scene from "../engine/basic/Scene.js";
import cube from "../engine/object/Box.js";
import ocean from "../engine/object/Ocean.js";
import land from "../engine/object/Land";
import camera from "../engine/basic/Camera.js";
import MasterScene from "../engine/scenes/MasterScene.js";
import directionalLight, { ambientLight, helper, hemiLight } from "../engine/basic/Light.js";
import resize from "../engine/basic/Resize.js";
import maw from "../characters/Maw/Maw.js";
import CharacterController from "../engine/controllers/CharacterController.js"
import settings from '../characters/Maw/Settings.js'
import settingsErica from '../characters/Erika/Settings.js'
import cameraController from "../engine/controllers/camera/CameraController.js";
import keyListener from "../engine/basic/KeyListener.js";
import eventBus from "../engine/basic/EventBus.js";
import sounds from "../audio/Audios.js";
import ContextMenu from '../engine/ui/ContextMenu.js'
import displayContextMenuGame from "./DisplayContextMenuGame.js";
import gamePlay from "./GamePlay.js";
import displacementCamController from "../engine/controllers/camera/DisplacementCamController.js";
import gamePlay2 from "./GamePlay2.js";
import erika from "../characters/Erika/Erika.js";
import NPC from "./NPC.js";
import directionWSSpaceController from "../engine/controllers/DirectionWSSpaceController.js";

class Scene3 extends MasterScene {
    constructor(instancename) {
        super(instancename)
        this.mesh = null
        this.bow = null
        this.callback = () => {
            renderer.render(scene, camera);
            if (this.bow) {
                this.bow.rotation.z += 0.001
            }
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
            displacementCamController.run(0)
            if (this.mesh) {
                camera.lookAt(this.mesh.position)
            }

        }

        let contextMenu = new ContextMenu(displayContextMenuGame)
        contextMenu.open()
    }
    open() {
        sounds.setAsLoop('walk')
        sounds.setRelativeVolume('walk', .3)
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
        cube.position.z = 14
        cube.position.x = .5
        let cube2 = cube.clone()
        scene.add(cube2)
        cube2.position.y = 0
        cube2.position.z = 14
        cube2.position.x = -.5
        erika.getObject().then(mesh => {
            this.mesh = mesh
            scene.add(mesh)
            this.characterControllerErika = new CharacterController(settingsErica, directionWSSpaceController)
            this.characterControllerErika.setMesh(mesh)
            this.characterControllerErika.start()
            displacementCamController.setSpeed(10)
            displacementCamController.setTarget(mesh)
            displacementCamController.start()
            cameraController.start(mesh)
        })

        scene.add(land);

        maw.getObject().then(mesh => {
            this.mesh2 = mesh
            scene.add(mesh)
            this.mesh2.position.z = 1
            this.npc = new NPC(this.mesh2)
            this.npc.start()
        })
    }
    close() {
        this.characterController.stop()
        machine.removeCallback(this.callback);
        machine.pause();
        resize.close()
        scene.remove(directionalLight)
        scene.remove(ambientLight)
        scene.remove(hemiLight)
        scene.remove(cube)
        this.npc.close()
    }
}

let demo = new Scene3()
export default demo