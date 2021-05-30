import * as THREE from 'three';

const boxWidth = 100;
const boxHeight = .1;
const boxDepth = 100;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

const material = new THREE.MeshStandardMaterial({ color: 0x641E16 });

const land = new THREE.Mesh(geometry, material);
land.position.y = -.05
land.castShadow = true;
land.receiveShadow = true;

export default land