// Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a Sphere (Earth)
const geometry = new THREE.SphereGeometry(1, 64, 64); // Radius, widthSegments, heightSegments
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('textures/earth.jpg'); // Use appropriate path
const material = new THREE.MeshStandardMaterial({ map: earthTexture });
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Add Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Camera Position
camera.position.z = 2;

// Rotation and Zoom Logic
// let desiredRotationX = 0;
// let desiredRotationY = 0;
// let isMouseDown = false;
// let mouseX = 0;
// let mouseY = 0;
// document.addEventListener('mousemove', rotate, false);
// document.addEventListener('wheel', zoom, false);


// function rotate(event) {
//     const deltaX = event.movementX || event.mozMovementX || 0;
//     const deltaY = event.movementY || event.mozMovementY || 0;

//     // Adjust rotation accordingly
//     desiredRotationX += deltaY * 0.005;
//     desiredRotationY += deltaX * 0.005;
// }

// function zoom(event) {
//     camera.position.z += event.deltaY * 0.01;
//     camera.position.z = Math.max(2, Math.min(10, camera.position.z));
// }

// // Animation Loop
// function animate() {
//     requestAnimationFrame(animate);
//     earth.rotation.y += (desiredRotationY - earth.rotation.y) * 0.1;
//     earth.rotation.x += (desiredRotationX - earth.rotation.x) * 0.1;
//     renderer.render(scene, camera);
// }
// animate();

// Rotation and Zoom Logic (updated)
let isDragging = false;
let posX = 0;
let posY = 0;
let desiredRotationY = 0;
let desiredRotationX = 0;
document.addEventListener('mousedown', mouseClick, false);
document.addEventListener('mouseup', mouseRelease, false);
document.addEventListener('mousemove', mouseMove, false);

function mouseClick(event) {
    isDragging = true;
    posX = event.clientX;
    posY = event.clientY;
}

function mouseRelease(event) {
    isDragging = false;
    desiredRotationX = earth.rotation.x;
    desiredRotationY = earth.rotation.y;
}

function mouseMove(event) {
    if (isDragging) {
        const deltaX = event.clientX - posX;
        const deltaY = event.clientY - posY;
        if (deltaX !== 0 || deltaY !== 0) {
            desiredRotationY += deltaX * 0.001;
            desiredRotationX += deltaY * 0.001;
        } 
        posX = event.client.x;
        posY = event.client.y; 
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += (desiredRotationY - earth.rotation.y) * 0.01;
    earth.rotation.x += (desiredRotationX - earth.rotation.x) * 0.01;
    renderer.render(scene, camera);
}
animate();

// Rotation and Zoom Logic (pt. 3)
// let isDragging = false;
// let prevMousePos = {x: 0, y: 0};
// let desiredRotation = {x: 0, y: 0}

// renderer.domElement.addEventListener('mouseClicked', (event) => {
//     isDragging = true;
//     prevMousePos.x = event.clientX;
//     prevMousePos.y = event.clientY;
// });

// renderer.domElement.addEventListener('mouseReleased', (event) => {
//     isDragging = false;
// });

// renderer.domElement.addEventListener('mouseMove', (event) => {
//     if (isDragging) {
//         const deltaX = event.clientX - prevMousePos.x;
//         const deltaY = event.clientY - prevMousePos.y;

//         earth.rotation.y += deltaX * 0.005;
//         earth.rotation.x += deltaY * 0.005;

//         prevMousePos.x = event.clientX;
//         prevMousePos.y = event.clientY;
//     }
// });

// renderer.domElement.addEventListener('mouseLeave', (event) => {
//     isDragging = false;
// });

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
// animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});