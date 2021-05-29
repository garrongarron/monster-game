import * as THREE from 'three';

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.castShadow = true; //default is false
sphere.receiveShadow = true; //default
sphere.position.y = 2


export default sphere