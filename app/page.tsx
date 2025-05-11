"use client";

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const MoonSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const moonRef = useRef<THREE.Mesh | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111827);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
    const moonMaterial = new THREE.MeshPhongMaterial({
      color: 0xf0f0f0,
      emissive: 0x888888,
      specular: 0xffffff,
      shininess: 30,
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);

    const craters = new THREE.Group();
    for (let i = 0; i < 50; i++) {
      const craterGeometry = new THREE.SphereGeometry(
        Math.random() * 0.2 + 0.05,
        16,
        16
      );
      const craterMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
      const crater = new THREE.Mesh(craterGeometry, craterMaterial);

      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = 1;
      crater.position.set(
        radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(theta)
      );
      craters.add(crater);
    }
    moon.add(craters);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    controlsRef.current = controls;
    moonRef.current = moon;

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);

      if (
        !sceneRef.current ||
        !cameraRef.current ||
        !rendererRef.current ||
        !controlsRef.current ||
        !moonRef.current
      ) {
        return;
      }

      controlsRef.current.update();

      moonRef.current.rotation.y += 0.001;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !moonRef.current) return;
    const deltaMove = {
      x: event.clientX - mousePosition.x,
      y: event.clientY - mousePosition.y,
    };
    moonRef.current.rotation.y += deltaMove.x * 0.01;
    moonRef.current.rotation.x += deltaMove.y * 0.01;
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
    if (!cameraRef.current) return;
    const delta = event.deltaY > 0 ? 0.1 : -0.1;
    const distance = cameraRef.current.position.distanceTo(
      moonRef.current.position
    );
    cameraRef.current.position.normalize().multiplyScalar(distance + delta);
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="w-full h-screen bg-gray-900">
      <MoonSimulation />
    </div>
  );
};

export default HomePage;
