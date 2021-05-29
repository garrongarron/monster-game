import * as THREE from 'three';

const boxWidth = .1;
const boxHeight = 10;
const boxDepth = .1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

const material = new THREE.MeshStandardMaterial({ color: 0xFFD700 });

const ocean = new THREE.Mesh(geometry, material);
ocean.position.y = -.05
ocean.castShadow = true;
ocean.receiveShadow = true;

export default ocean