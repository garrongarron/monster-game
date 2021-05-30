import fadeHandler from "../engine/ui/FadeHandler"
import sceneHandlerObj from "./SceneHandlerObj"
import sceneList from "./SceneList"

class GamePlay2 {
    constructor() {
        this.mesh = null
        this.messages = [
            "Click to move the camera",
            "Everyone deserve a second chance",
            "A monster also was a kid",
            "Bus some people just hate ",
            "... and attack from behind",
            "Who is the mosnter?",
        ]
        this.messageContainer = document.querySelector('.message-container')
        if (!this.messageContainer) {
            this.messageContainer = document.createElement('div')
            this.messageContainer.classList.add('message-container')
            document.body.appendChild(this.messageContainer)
        }
        this.display = document.createElement('div')
        this.display.classList.add('display')
        document.body.appendChild(this.display)
    }
    open(mesh) {
        this.mesh = mesh
        setTimeout(() => {
            this.showMessage(4)
        }, 1000);
        setTimeout(() => {
            this.showMessage(6)
        }, 10000);
        setTimeout(() => {
            this.showMessage(6)
        }, 18000);
        setTimeout(() => {
            this.showMessage(6)
        }, 26000);
        setTimeout(() => {
            this.showMessage(6)
        }, 34000);
        setTimeout(() => {
            this.showMessage(8)
            setTimeout(() => {
                fadeHandler.fadeToBlack().then(a => {
                    sceneHandlerObj.get().goTo(sceneList.scene3)
                    fadeHandler.fadeFromBlack().then(a => {})
                })
            }, 6 * 1000);
        }, 42000);
    }
    showMessage(time) {
        console.log(this.messages);
        this.display.innerText = this.messages.shift()
        setTimeout(() => {
            this.display.innerText = ''
        }, 1000 * time);
    }
    stop() {

    }
}

const gamePlay2 = new GamePlay2()

export default gamePlay2