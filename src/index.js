import './style.scss'
import SceneHandler from './engine/scenes/SceneHandler.js';
import sceneList from './scenes/SceneList.js'


let scenehandler = new SceneHandler(sceneList)
scenehandler.goTo(sceneList.landing)