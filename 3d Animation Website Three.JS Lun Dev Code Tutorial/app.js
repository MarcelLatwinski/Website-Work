import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js"
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap'

const camera = new THREE.PerspectiveCamera(
    10, //Viewing Angle (Increasing helps see more)
    window.innerWidth / window.innerHeight, //Aspect - here i set it as large as the browser window
    0.1, //Near - Closest distance camera can see
    1000, //Far - farthest distance camera can see
);

camera.position.z = 13; //Away from z axis to see the whole scene

const scene = new THREE.Scene(); //Contains all the things related to scene - model, light
let bee;
let mixer; //to manage animation in threejs
const loader = new GLTFLoader();
loader.load('/demon_bee_full_texture.glb', //load parameter with three callback functions
    function (gltf) { //Run when model loading process is complete 
        bee = gltf.scene; //Take bee data and put it into scene
        scene.add(bee);

        mixer = new THREE.AnimationMixer(bee); // when model is loaded we initialise animation mixer with bee object
        mixer.clipAction(gltf.animations[0]).play(); //flying animation model -main naimtion to move
        //mixer.update(0.02);
        modelMove();
    },
    function (xhr) {}, //Continously run during the loading process to show viewer progress
    function (error) {} //Error reporting function
);
const renderer = new THREE.WebGLRenderer({alpha: true}); //Create canvas API tag in html to draw on the screen, alpha true makes canvas background transparent
renderer.setSize(window.innerWidth, window.innerHeight); //same size as browser window
document.getElementById('container3D').appendChild(renderer.domElement); //canvas into 3d container element

// light -ambient and directional
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3); //color and intensity 
scene.add(ambientLight); //evenly

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight); //direction - coordinate position of light


const reRender3D = () => { //request animation frame to continuously repeat the function which will render the bee even if its not loaded
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.02); //check if mixer has been initialised before asking to update
};
reRender3D();

let arrPositionModel = [
    {
        id: 'banner',
        position: {x: 0, y: -1, z: 0},
        rotation: {x: 0, y: 1.5, z: 0}
    },
    {
        id: "intro",
        position: { x: 1, y: -1, z: -5 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
    },
    {
        id: "description",
        position: { x: -1, y: -1, z: -5 },
        rotation: { x: 0, y: 0.5, z: 0 },
    },
    {
        id: "contact",
        position: { x: 0.8, y: -1, z: 0 },
        rotation: { x: 0.3, y: -0.5, z: 0 },
    },
];
const modelMove = () => {
    const sections = document.querySelectorAll('.section'); //Get all classes inside the html class section div
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect(); //Get current position information
        if (rect.top <= window.innerHeight / 3) { //If its current distance is less than 1/3 of the screen height then take the section as the current position
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex( //Now id is active, just use find index function to findi ts corresponding position in the position model array
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(bee.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(bee.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        })
    }
}
window.addEventListener('scroll', () => { //capture user scroll event
    if (bee) {
        modelMove();
    }
})
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})