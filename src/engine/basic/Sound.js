class Sound {
    constructor(audioList) {
        this.audioList = audioList
        this.nodeList = {}
        Object.keys(this.audioList).map(name => {
            let audio = document.createElement('audio')
            audio.src = this.audioList[name]
            audio.volume = 1;
            audio._volume = 1;
            document.body.appendChild(audio)
            this.nodeList[name] = audio
        })
    }

    play(name) {
        this.nodeList[name].pause();
        this.nodeList[name].currentTime = 0;
        this.nodeList[name].play()
    }

    setVolume(sound, value) {
        this.nodeList[sound].volume = value;
    }

    updateGeneralVolumen(generalVolume) {
        Object.keys(this.audioList).map(name => {
            let audio = this.nodeList[name]
            audio.volume = audio._volume * generalVolume;
        })
    }

    setAsLoop(name) {
        this.nodeList[name].loop = true
    }

    stop(name) {
        this.nodeList[name].pause();
        this.nodeList[name].currentTime = 0;
    }

    stopAll(name) {
        Object.keys(this.audioList).map(name => {
            this.nodeList[name].pause();
            this.nodeList[name].currentTime = 0;
        })
    }
}
export default Sound