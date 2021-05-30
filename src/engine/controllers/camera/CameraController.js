import * as THREE from 'three';
import mouse from '../../basic/Mouse.js'
import machine from '../../basic/Machine.js'
import camera from '../../basic/Camera.js'
import canvas from '../../basic/Canvas.js';
import { MathUtils } from 'three'


class CameraController {
    constructor() {
        this.interpolation = .8
        this.rotation = 0
        this.gap = 40
        this.rotationWithGap = 0
        this.radio = 2
        this.rotationSpeed = 50
        this.characterHeight = 1
        this.cameraAngle = 30
        this.target = null
        this.callback = null

        this.controller = () => {
            if (this.target) {
                let angleRotation =
                    (mouse.acumulated.x / this.rotationSpeed)
                this.rotation = -(angleRotation) *
                    Math.PI / 180
                this.rotationWithGap = -(angleRotation + this.gap) *
                    Math.PI / 180
                let rotationWithGap2 = -(angleRotation + this.gap / 2) *
                    Math.PI / 180

                let x = this.target.position.x -
                    Math.sin(this.rotation) *
                    this.radio;
                camera.position.x = THREE.MathUtils.lerp(
                    camera.position.x,
                    x,
                    this.interpolation)

                let z = this.target.position.z -
                    Math.cos(this.rotation) * this.radio;
                camera.position.z = THREE.MathUtils.lerp(
                    camera.position.z,
                    z,
                    this.interpolation)

                mouse.acumulated.y = MathUtils.clamp(mouse.acumulated.y, -380, 400)

                this.cameraAngle = mouse.acumulated.y / 400

                camera.position.y = this.characterHeight +
                    this.cameraAngle

                let opositeCamPosition = {
                    position: {
                        x: this.target.position.x +
                            Math.sin(this.rotationWithGap) *
                            this.radio,
                        z: this.target.position.z +
                            Math.cos(this.rotationWithGap) *
                            this.radio
                    }
                }
                camera.lookAt(
                        opositeCamPosition.position.x,
                        this.target.position.y - this.cameraAngle,
                        opositeCamPosition.position.z)
                    /* camera.lookAt(
                        this.target.position.x, 
                        this.target.position.y, 
                        this.target.position.z)
                    */
                    // displacementCamController.run(rotationWithGap2)
            }
        }
    }

    start(t) {
        mouse.setCanvas(canvas)
        mouse.start()
        this.target = t
        machine.addCallback(this.controller)
    }
    stop() {
        mouse.stop()
        machine.removeCallback(this.controller)
        this.target = null
        this.callback = null
    }

    moveCallback(callback) {
        this.callback = callback
    }
}

const cameraController = new CameraController()
export default cameraController