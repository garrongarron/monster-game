import sounds from '../audio/Audios.js'
import eventBus from '../engine/basic/EventBus.js'
import machine from '../engine/basic/Machine.js'
import Animator from '../engine/characters/Animator.js'
class NPC {
    constructor(npc) {
        this.npc = npc
        this.animator = new Animator(npc)
        this.t = null
        this.flag = false
        this.messages = [
            "Press Space to Shoot",
            "Death isn't the end",
            "Who is the monster now?",
        ]
        this.messageContainer = document.querySelector('.message-container')
        if (!this.messageContainer) {
            this.messageContainer = document.createElement('div')
            this.messageContainer.classList.add('message-container')
            document.body.appendChild(this.messageContainer)
        }
    }
    showMessage(time) {
        console.log(this.messages);
        this.messageContainer.innerText = this.messages.shift()
        setTimeout(() => {
            this.messageContainer.innerText = ''
        }, 1000 * time);
    }
    start() {
        this.animator.start()
        machine.addCallback(() => {
            if (this.flag) return
            this.npc.position.z += 0.03
        })
        setTimeout(() => {
            this.showMessage(5)
        }, 1000 * 15);
        setTimeout(() => {
            this.showMessage(4)
        }, 1000 * 25);
        setTimeout(() => {
            this.showMessage(50)
        }, 1000 * 31);
        this.again()
        eventBus.suscribe('keyListener', (arr) => {
            if (arr[0] == 32 && arr[1] == true) {
                sounds.stop('walk', true)
                setTimeout(() => {
                    this.animator.action(45, 1, false)
                    sounds.stop('walk', true)
                    setTimeout(() => {
                        this.animator.stop()
                    }, 2900);
                    clearTimeout(this.t)
                    this.flag = true
                }, 1200);
            }
        })
    }
    again() {
        this.flag = !this.flag
        if (this.flag) {
            this.animator.action(8, 1, false)
            sounds.stop('walk', true)
        } else {
            sounds.play('walk')
            this.animator.action(25, 1, false)
        }
        this.t = setTimeout(() => {
            this.again()
        }, 1000 * (1 + Math.random() * 3));
    }
    stop() {
        this.animator.stop()
        clearTimeout(this.t)
    }
}

export default NPC