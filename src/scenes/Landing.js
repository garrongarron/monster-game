import MasterScene from "../engine/scenes/MasterScene";
import image from '../../src/images/Portada.png'
import sceneList from "./SceneList";
import cache from '../engine/basic/Cache'
import sounds from "../audio/Audios";


class Landing extends MasterScene {
    constructor(instancename) {
        super(instancename)
        this.landing = document.createElement('div')
        this.landing.classList.add('landing')
        this.landing.style.backgroundImage = `url(${image})`
        this.btn = document.createElement('div')
        this.btn.innerText = 'Play Now'
        this.btn.classList.add('play-now')
        this.landing.appendChild(this.btn)
        this.btn.addEventListener('click', () => {
            this.scenehandler.goTo(sceneList.demo)
        })
        this.samuGames = document.createElement('div')
        this.samuGames.innerHTML = "Samu Games"
        this.samuGames.classList.add('samu-games')
        this.landing.appendChild(this.samuGames)
        this.samuGames.addEventListener('click', () => {
            this.samuGames.classList.add('hide')
            sounds.setAsLoop('intro')
            sounds.play('intro')
        })

    }
    open(scenehandler) {
        this.scenehandler = scenehandler
        document.body.appendChild(this.landing)
    }
    close() {
        cache.appendChild(this.landing)
    }
}
let landing = new Landing()
export default landing