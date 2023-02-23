import * as THREE from 'three'


const stars = []
const starCount = 1000;
const starSize = 1;
const screenSizes = [window.innerWidth, window.innerHeight]

function randStarPosition(){
    return {
        x: (screenSizes[0] * (Math.random() - 0.5))/screenSizes[0] * 2000,
        y: (screenSizes[1] * (Math.random() - 0.5))/screenSizes[1] * 1500,
        z: -1000 * Math.random() - 1000,
    }
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, screenSizes[0] / screenSizes[1], 1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( screenSizes[0], screenSizes[1] );
document.body.appendChild( renderer.domElement );

for(let i = 0; i< starCount; i++){
    const geometry = new THREE.SphereGeometry( starSize );
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(randStarPosition().x, randStarPosition().y, Math.random() * -1000);
    scene.add( cube );
    stars.push(cube)
}

camera.position.z = 5;

let time = Date.now();

function animate() {
    requestAnimationFrame( animate );

    const currTime = Date.now();
    const DeltaTime = currTime - time;
    time = currTime;


    for(let i = 0; i < stars.length; i++){
        stars[i].position.z += 1 * DeltaTime;
        if(stars[i].position.z > camera.position.z){
            stars[i].position.z = randStarPosition().z;
        } 
    }
    
    renderer.render( scene, camera );
};

animate();