import * as THREE from 'three';
import { useEffect, useRef } from "react";

function MyThree() {
  const refContainer = useRef(null);
  
  useEffect(() => {
    // === THREE.JS CODE START ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(1000,100,0);
    camera.lookAt(1000,100,0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Use ref as a mount point of the Three.js scene instead of the document.body
    if (refContainer.current) {
      refContainer.current.appendChild(renderer.domElement);
    }
    
    const geometry = new THREE.BoxGeometry(0.8, 4, 8);
    const material = new THREE.LineDashedMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    const lineMaterial = new THREE.LineBasicMaterial({color: 0x00f0ff});
    const points = [];
    points.push(new THREE.Vector3(0,-10,0));
    points.push(new THREE.Vector3(0,0,0));
    points.push(new THREE.Vector3(0,10,0));
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(cube);
    scene.add(line);
    
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 10;
    
    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.06;
      cube.rotation.y += 0.02;
      cube.rotation.z += 0.02;
      renderer.render(scene, camera);
    };
    animate();
    
    // Cleanup function to remove the renderer and scene on component unmount
    return () => {
      if (refContainer.current) {
        refContainer.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);
  
  return (
    <div ref={refContainer}></div>
  );
}

export default MyThree;
