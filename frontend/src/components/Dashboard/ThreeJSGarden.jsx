// ThreeJSGarden.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeJSGarden = ({ seeds, sun, water }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Add a simple ground plane
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Add a seed
    const seedGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const seedMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const seed = new THREE.Mesh(seedGeometry, seedMaterial);
    seed.position.y = 0.1;
    scene.add(seed);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffffff, 1, 100);
    sunLight.position.set(5, 5, 5);
    scene.add(sunLight);

    // Add sun effect (only if sun state is true)
    if (sun) {
      const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
      const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
      sunMesh.position.set(0, 3, 0);
      scene.add(sunMesh);
    }

    // Add water effect (only if water state is true)
    if (water) {
      const waterGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 32);
      const waterMaterial = new THREE.MeshBasicMaterial({ color: 0x1e90ff });
      const waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
      waterMesh.position.set(0, 0.5, 0);
      scene.add(waterMesh);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Seed growing logic
      if (seeds) {
        seed.scale.y += 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, [seeds, sun, water]);

  return <div ref={mountRef} style={{ width: "100%", height: "400px" }} />;
};

export default ThreeJSGarden;
