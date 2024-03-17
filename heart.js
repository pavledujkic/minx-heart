function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 28;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  const heartShape = new THREE.Shape();
  heartShape.moveTo(25, 25); // Scaled up the heart shape
  heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
  heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
  heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
  heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
  heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
  heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

  const extrudeSettings = {
    depth: 20,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1,
  };
  const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  material.transparent = false;
  material.opacity = 1;
  heartMesh = new THREE.Mesh(geometry, material);
  heartMesh.scale.set(0.1, 0.1, 0.1);
  heartMesh.rotation.x = Math.PI;

  const group = new THREE.Group();
  group.add(heartMesh);

  const loader = new THREE.FontLoader();
  loader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    function (font) {
      const textGeometry = new THREE.TextGeometry("Minx", {
        font: font,
        size: 50.0,
        height: 8,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      textMesh = new THREE.Mesh(textGeometry, textMaterial);

      textMesh.scale.set(0.1, 0.1, 0.1);
      textMesh.position.set(0, 10, 5);

      group.add(textMesh);
      group.position.set(0, 0, 0);

      scene.add(group);

      animate();
    }
  );

  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  window.addEventListener("resize", onWindowResize, false);
}

function animate() {
  requestAnimationFrame(animate);

  scene.children.forEach((child) => {
    if (child instanceof THREE.Group) {
      child.rotation.y += 0.01;
    }
  });

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
