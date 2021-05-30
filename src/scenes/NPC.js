import sounds from '../audio/Audios.js'
import machine from '../engine/basic/Machine.js'
import Animator from '../engine/characters/Animator.js'
class NPC {
    constructor(npc) {
        this.npc = npc
        this.animator = new Animator(npc)
        this.t = null
        this.flag = false
    }
    start() {
        this.animator.start()
        machine.addCallback(() => {
            if (this.flag) return
            this.npc.position.z += 0.03
        })
        this.again()
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