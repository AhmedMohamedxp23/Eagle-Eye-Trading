"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const GOLD = 0xf4c300;
const WHITE = 0xffffff;

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({
      canvas: cv,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const group = new THREE.Group();
    scene.add(group);

    // Outer geodesic wireframe sphere
    const outer = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.35, 2),
      new THREE.MeshBasicMaterial({
        color: WHITE,
        wireframe: true,
        transparent: true,
        opacity: 0.14,
      })
    );
    group.add(outer);

    // Inner gold geodesic wireframe, slightly offset rotation for depth
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.12, 1),
      new THREE.MeshBasicMaterial({
        color: GOLD,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      })
    );
    group.add(inner);

    // Equatorial ring
    const ringGeo = new THREE.RingGeometry(1.34, 1.345, 96);
    const ring = new THREE.Mesh(
      ringGeo,
      new THREE.MeshBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      })
    );
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    // Glowing core
    const coreGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 24, 24),
      new THREE.MeshBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0.16,
        depthWrite: false,
      })
    );
    group.add(coreGlow);
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 16, 16),
      new THREE.MeshBasicMaterial({ color: GOLD })
    );
    group.add(core);

    // Orbiting satellites, each on its own inclined ring
    const SAT_COUNT = 5;
    const satellites: { mesh: THREE.Mesh; speed: number; incline: number; radius: number; phase: number }[] = [];
    for (let i = 0; i < SAT_COUNT; i++) {
      const radius = 1.55 + i * 0.14;
      const incline = 0.5 + i * 0.32;
      const orbitCurve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
      const points = orbitCurve.getPoints(80).map((p) => new THREE.Vector3(p.x, 0, p.y));
      const orbitLine = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.1 })
      );
      orbitLine.rotation.x = incline;
      orbitLine.rotation.z = i * 0.5;
      group.add(orbitLine);

      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.026, 12, 12),
        new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.85 - i * 0.1 })
      );
      orbitLine.add(mesh);
      satellites.push({ mesh, speed: 0.35 - i * 0.04, incline, radius, phase: (i / SAT_COUNT) * Math.PI * 2 });
    }

    // Particle field — faint scattered network nodes
    const PARTICLES = 160;
    const positions = new Float32Array(PARTICLES * 3);
    for (let i = 0; i < PARTICLES; i++) {
      const r = 1.8 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeo,
      new THREE.PointsMaterial({
        color: WHITE,
        size: 0.02,
        transparent: true,
        opacity: 0.4,
        sizeAttenuation: true,
      })
    );
    scene.add(particles);

    group.rotation.x = -0.3;

    const resize = () => {
      const w = cv.clientWidth || 620;
      const h = cv.clientHeight || 520;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    const onPointerMove = (e: PointerEvent) => {
      const rect = cv.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove);

    let raf = 0;
    let t = 0;

    const render = () => {
      renderer.render(scene, camera);
    };

    if (reduced) {
      render();
    } else {
      const animate = () => {
        t += 1;
        group.rotation.y += 0.0022;
        group.rotation.x = -0.3 + Math.sin(t * 0.0015) * 0.05;

        for (const s of satellites) {
          const a = t * 0.006 * (s.speed * 3 + 0.3) + s.phase;
          s.mesh.position.set(Math.cos(a) * s.radius, 0, Math.sin(a) * s.radius);
        }

        const pulse = 1 + Math.sin(t * 0.03) * 0.08;
        coreGlow.scale.setScalar(pulse);

        particles.rotation.y += 0.00025;

        camera.position.x += (mouse.current.x * 0.35 - camera.position.x) * 0.03;
        camera.position.y += (-mouse.current.y * 0.25 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        render();
        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineLoop || obj instanceof THREE.Points) {
          obj.geometry?.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "620px",
        maxWidth: "60%",
        height: "100%",
        opacity: 0.9,
        pointerEvents: "none",
      }}
    />
  );
}
