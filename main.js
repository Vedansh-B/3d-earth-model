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
    earth.rotation.y += (desiredRotationY - earth.rotation.y) * 0.005;
    earth.rotation.x += (desiredRotationX - earth.rotation.x) * 0.005;

    earth.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, earth.rotation.x));
    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});