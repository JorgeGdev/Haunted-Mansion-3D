import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// FOG

const fog = new THREE.Fog("#262837", 1, 15);

scene.fog = fog;

/**
 * Textures
 */

//door textures

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
doorAlphaTexture.colorSpace = THREE.SRGBColorSpace;
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
doorHeightTexture.colorSpace = THREE.SRGBColorSpace;
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
doorNormalTexture.colorSpace = THREE.SRGBColorSpace;
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
doorAmbientOcclusionTexture.colorSpace = THREE.SRGBColorSpace;
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
doorMetalnessTexture.colorSpace = THREE.SRGBColorSpace;
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
doorRoughnessTexture.colorSpace = THREE.SRGBColorSpace;

//bricks textures

const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
bricksColorTexture.colorSpace = THREE.SRGBColorSpace;
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
bricksAmbientOcclusionTexture.colorSpace = THREE.SRGBColorSpace;
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
bricksNormalTexture.colorSpace = THREE.SRGBColorSpace;
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);
bricksRoughnessTexture.colorSpace = THREE.SRGBColorSpace;

//grass textures

const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
grassColorTexture.colorSpace = THREE.SRGBColorSpace;
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
grassAmbientOcclusionTexture.colorSpace = THREE.SRGBColorSpace;
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
grassNormalTexture.colorSpace = THREE.SRGBColorSpace;
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);
grassRoughnessTexture.colorSpace = THREE.SRGBColorSpace;

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

//WINDOW TEXTURE

const window1ColorTexture = textureLoader.load("/textures/windows/window1.jpg");
window1ColorTexture.colorSpace = THREE.SRGBColorSpace;

const window2ColorTexture = textureLoader.load("/textures/windows/window2.png");
window2ColorTexture.colorSpace = THREE.SRGBColorSpace;

const window4ColorTexture = textureLoader.load("/textures/windows/window4.png");
window4ColorTexture.colorSpace = THREE.SRGBColorSpace;

const photo1ColorTexture = textureLoader.load("/textures/windows/image1.jpg");
photo1ColorTexture.colorSpace = THREE.SRGBColorSpace;

const window5ColorTexture = textureLoader.load("/textures/windows/window5.jpg");
window5ColorTexture.colorSpace = THREE.SRGBColorSpace;

const window7ColorTexture = textureLoader.load("/textures/windows/window7.jpg");
window7ColorTexture.colorSpace = THREE.SRGBColorSpace;

const window8ColorTexture = textureLoader.load("/textures/windows/window8.png");
window8ColorTexture.colorSpace = THREE.SRGBColorSpace;

const cylinderwindowTexture = textureLoader.load(
  "/textures/windows/window10.png"
);
cylinderwindowTexture.colorSpace = THREE.SRGBColorSpace;

const cylinderLightTexture = textureLoader.load("/textures/windows/light.jpg");
cylinderLightTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * House
 */
// GROUP

const house = new THREE.Group();

scene.add(house);

//WALLS ES UN CUBO

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    transparent: true,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
walls.position.y = 2.5 / 2;
house.add(walls);

//WALLS2 ES OTRO CUBO DEL SEGUNDO PISO

const walls2 = new THREE.Mesh(
  new THREE.BoxGeometry(3, 2.5, 3),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    transparent: true,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
walls2.position.y = 7.5 / 2;
walls2.position.z = -0.5;

house.add(walls2);

//ROOF ES UNA PIRAMIDE

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(2.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.rotation.y = Math.PI * 0.25;
roof.position.y = 5 + 0.5;
roof.position.z = -0.5;

house.add(roof);

//DOOR ES UN PLANE

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.25,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);

door.position.y = 1;
door.position.z = 2.001;

house.add(door);

//WINDOW1 ES UN PLANO

const window1 = new THREE.Mesh(
  new THREE.BoxGeometry(1.3, 2, 0.2),
  new THREE.MeshStandardMaterial({
    map: window1ColorTexture,
    transparent: true,
  })
);
window1.rotation.x = Math.PI * -1;
window1.position.z = -2.001;
window1.position.y = 2.5;

house.add(window1);

//WINDOW2 ES UN PLANO

const window2 = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1.7),
  new THREE.MeshStandardMaterial({
    map: window2ColorTexture,
    transparent: true,
  })
);
window2.rotation.x = Math.PI * -2;
window2.rotation.y = Math.PI * -0.5;
window2.position.x = -2.001;
window2.position.y = 1.5;
window2.position.z = -0.3;

house.add(window2);

//WINDOW4 ES UN PLANO VENTANA LATERAL

const window4 = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1.7),
  new THREE.MeshStandardMaterial({
    map: window4ColorTexture,
    transparent: true,
  })
);
window4.rotation.x = Math.PI * 2;
window4.rotation.y = Math.PI * 0.5;
window4.position.x = 2.01;
window4.position.y = 1.5;

house.add(window4);

//FOTO1 ES UN PLANO DEBAJO DE WINDOW 4

const photo1 = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1.2),
  new THREE.MeshStandardMaterial({
    map: photo1ColorTexture,
    transparent: true,
  })
);
photo1.rotation.x = Math.PI * 2;
photo1.rotation.y = Math.PI * 0.5;
photo1.position.x = 2.001;
photo1.position.y = 1.5;

house.add(photo1);

//WINDOW 5 SEGUNDO PISO FRENTE

const window5 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 0.2),
  new THREE.MeshStandardMaterial({
    map: window5ColorTexture,
    transparent: true,
  })
);

window5.position.y = 4;
window5.position.z = 1.001;
window5.position.x = -0.8;

house.add(window5);

//WINDOW 6 SEGUNDO PISO FRENTE

const window6 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 0.2),
  new THREE.MeshStandardMaterial({
    map: window5ColorTexture,
    transparent: true,
  })
);

window6.position.y = 4;
window6.position.z = 1.001;
window6.position.x = 0.8;

house.add(window6);

//WINDOW7 SEGUNDO PISO VENTANA LATERAL

const window7 = new THREE.Mesh(
  new THREE.BoxGeometry(1.3, 1.3, 0.2),
  new THREE.MeshStandardMaterial({
    map: window7ColorTexture,
    transparent: true,
  })
);
window7.rotation.x = Math.PI * 2;
window7.rotation.y = Math.PI * 0.5;
window7.position.x = 1.51;
window7.position.y = 4;
window7.position.z = -0.45;

house.add(window7);

//WINDOW8 ES UN PLANO JUNTO CON WINDOW 2

const window8 = new THREE.Mesh(
  new THREE.PlaneGeometry(1.2, 1.4),
  new THREE.MeshStandardMaterial({
    map: window8ColorTexture,
    transparent: true,
  })
);
window8.rotation.x = Math.PI * -2;
window8.rotation.y = Math.PI * -0.5;
window8.position.x = -1.5001;
window8.position.y = 4;
window8.position.z = -1.1;

house.add(window8);

//WINDOW9 ES UN PLANO JUNTO CON WINDOW 8

const window9 = new THREE.Mesh(
  new THREE.PlaneGeometry(1.2, 1.4),
  new THREE.MeshStandardMaterial({
    map: window8ColorTexture,
    transparent: true,
  })
);
window9.rotation.x = Math.PI * -2;
window9.rotation.y = Math.PI * -0.5;
window9.position.x = -1.501;
window9.position.y = 4;
window9.position.z = 0.2;

house.add(window9);

//CILINDRO1

const cylinder1 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.8, 0.8, 5, 19, 12),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    transparent: true,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
cylinder1.position.x = 2.2;
cylinder1.position.y = 2.5 / 2;
cylinder1.position.z = 1.8;
house.add(cylinder1);

//TECHO DEL CLINDRO 1

const roof2 = new THREE.Mesh(
  new THREE.ConeGeometry(1.2, 1.2, 19, 1),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof2.rotation.y = Math.PI * 0.25;
roof2.position.y = 3.8 + 0.5;
roof2.position.x = 2.2;
roof2.position.z = 1.8;

house.add(roof2);

//CILINDRO2

const cylinder2 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.8, 0.8, 5, 19, 12),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    transparent: true,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
cylinder2.position.x = -2.2;
cylinder2.position.y = 2.5 / 2;
cylinder2.position.z = 1.8;
house.add(cylinder2);

//TECHO DEL CLINDRO 1

const roof3 = new THREE.Mesh(
  new THREE.ConeGeometry(1.2, 1.2, 19, 1),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof3.rotation.y = Math.PI * 0.25;
roof3.position.y = 3.8 + 0.5;
roof3.position.x = -2.2;
roof3.position.z = 1.8;

house.add(roof3);

// VENTANA DENTRO DEL CILINDRO2

const cylinderwindow = new THREE.Mesh(
  new THREE.CylinderGeometry(0.6, 0.6, 3, 32, 1, false, 0, Math.PI),
  new THREE.MeshStandardMaterial({
    map: cylinderwindowTexture,
    transparent: true,
  })
);
cylinderwindow.position.x = -2.2;
cylinderwindow.position.y = 3.5 / 2;
cylinderwindow.position.z = 2.19;
cylinderwindow.rotation.y = -Math.PI * 2.5;

house.add(cylinderwindow);

const cylinderLight = new THREE.Mesh(
  new THREE.CylinderGeometry(0.6, 0.6, 2, 32, 1, false, 0, Math.PI),
  new THREE.MeshStandardMaterial({
    map: cylinderLightTexture,
    transparent: true,
  })
);
cylinderLight.position.x = -2.2;
cylinderLight.position.y = 2.8 / 2;
cylinderLight.position.z = 2.12;
cylinderLight.rotation.y = -Math.PI * 2.5;

house.add(cylinderLight);

// SEGUNDA VENTANA DENTRO DEL CILINDRO2

const cylinderwindow2 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.6, 0.6, 3, 32, 1, false, 0, Math.PI),
  new THREE.MeshStandardMaterial({
    map: cylinderwindowTexture,
    transparent: true,
  })
);
cylinderwindow2.position.x = 2.2;
cylinderwindow2.position.y = 3.5 / 2;
cylinderwindow2.position.z = 2.19;
cylinderwindow2.rotation.y = -Math.PI * 2.5;

house.add(cylinderwindow2);

const cylinderLight2 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.6, 0.6, 2, 32, 1, false, 0, Math.PI),
  new THREE.MeshStandardMaterial({
    map: cylinderLightTexture,
    transparent: true,
  })
);
cylinderLight2.position.x = 2.2;
cylinderLight2.position.y = 2.8 / 2;
cylinderLight2.position.z = 2.12;
cylinderLight2.rotation.y = -Math.PI * 2.5;

house.add(cylinderLight2);

//BUSHES

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

//GRAVES

const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 4 + Math.random() * 6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.3, z);
  grave.rotation.y = Math.random() - 0.5;
  grave.rotation.z = Math.random() - 0.5;
  grave.castShadow = true;
  graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    transparent: true,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.26);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

//DOOR LIGHTS

const doorLight = new THREE.PointLight("#ff7d46", 3, 7);
doorLight.position.set(0, 2.2, 2.7);

house.add(doorLight);

//GHOST

const ghost1 = new THREE.PointLight("#3b83bd", 6, 3);
//ghost1.position.x=3
const ghost2 = new THREE.PointLight("#f8f5e5", 6, 3);
//ghost2.position.z=3
const ghost3 = new THREE.PointLight("#f39f18", 6, 3);
//ghost3.position.x=-3

scene.add(ghost1, ghost2, ghost3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//SHADOWS

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

//MODIFICA EL BACKGROUND DEL ENTORNO
renderer.setClearColor("#262837");

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //ANIMATE GHOST

  const ghost1Angle = elapsedTime * 0.5;

  ghost1.position.x = Math.sin(ghost1Angle) * 4;
  ghost1.position.z = Math.cos(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.3;

  ghost2.position.x = Math.sin(ghost2Angle) * 5;
  ghost2.position.z = Math.cos(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = -elapsedTime * 0.18;

  ghost3.position.x =
    Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 1.5) + Math.sin(elapsedTime * 2.5);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
