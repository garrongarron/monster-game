import eventBus from "../engine/basic/EventBus"

class GamePlay {
    constructor() {
        this.messages = [
            "Press W"
        ]
        this.messageContainer = document.createElement('div')
        this.messageContainer.classList.add('message-container')
        document.body.appendChild(this.messageContainer)

    }
    open() {
        this.showMessage()
    }
    showMessage() {
        this.messageContainer.innerText = this.messages.shift()
        eventBus.suscribe('keyListener', (arr) => {
            if (arr[0] == 87 && arr[1] == true) {
                setTimeout(() => {
                    this.messageContainer.innerText = ''
                }, 2000);
            }

        })

    }
    close() {

    }
}
let gamePlay = new GamePlay()
export default gamePlay