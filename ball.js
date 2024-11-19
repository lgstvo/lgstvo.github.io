const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(100, 100);
document.getElementById("sphere-container").appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(3, 12, 12);
const wireframeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const glowMaterial = new THREE.ShaderMaterial({
  uniforms: {
    viewVector: { type: "v3", value: camera.position },
  },
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      gl_FragColor = vec4(0.0, 1.0, 1.0, 0.6) * intensity;
    }
  `,
  blending: THREE.AdditiveBlending,
  transparent: true,
});

const sphere = new THREE.Mesh(geometry, wireframeMaterial);
scene.add(sphere);

const glowSphere = new THREE.Mesh(geometry, glowMaterial);
glowSphere.scale.set(1.1, 1.1, 1.1);
scene.add(glowSphere);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.002;
    glowSphere.rotation.y += 0.002;

    renderer.render(scene, camera);
}
animate();