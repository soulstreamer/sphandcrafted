import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_colorIntensity;

  #define PI 3.14159265359

  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec3 permute(vec3 x) {
    return mod289(((x * 34.0) + 1.0) * x);
  }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzw;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; i++) {
      v += a * snoise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  float nebula(vec2 uv, float t) {
    float n1 = fbm(uv * 2.0 + vec2(t * 0.05, t * 0.03));
    float n2 = fbm(uv * 1.5 - vec2(t * 0.04, t * 0.06));
    float n3 = fbm(uv * 3.0 + vec2(t * 0.03, -t * 0.02));
    float finalNoise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    return smoothstep(0.2, 0.8, finalNoise);
  }

  float starField(vec2 uv, float t) {
    vec2 grid = floor(uv * 80.0);
    float hash = fract(sin(dot(grid, vec2(12.9898, 78.233))) * 43758.5453);
    float star = step(0.98, hash);
    float twinkle = sin(t * 2.0 + hash * 100.0) * 0.5 + 0.5;
    return star * twinkle * 0.8;
  }

  float galaxy(vec2 uv, float t) {
    vec2 p = uv - vec2(0.5);
    float dist = length(p);
    float angle = atan(p.y, p.x);
    float spiral = sin(angle * 3.0 + dist * 10.0 - t * 0.2) * 0.5 + 0.5;
    float falloff = smoothstep(0.5, 0.0, dist);
    return spiral * falloff * 0.3;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;
    float t = u_time * 0.2;
    vec3 bgColor = vec3(0.02, 0.02, 0.05);
    float nebulaVal = nebula(uv, t);
    vec3 color1 = vec3(0.1, 0.2, 0.4);
    vec3 color2 = vec3(0.4, 0.1, 0.3);
    vec3 color3 = vec3(0.1, 0.4, 0.5);
    vec3 nebulaColor = mix(mix(color1, color2, nebulaVal), color3, nebulaVal * nebulaVal);
    float stars = starField(uv * 3.0, t);
    float galaxyVal = galaxy(vUv, t);
    vec3 color = bgColor;
    color += nebulaColor * 0.4 * u_colorIntensity;
    color += vec3(stars) * u_colorIntensity;
    color += vec3(0.8, 0.6, 0.4) * galaxyVal * u_colorIntensity;
    color += vec3(0.4, 0.6, 0.8) * galaxyVal * 0.5 * u_colorIntensity;
    color *= (1.0 - length(vUv - 0.5) * 1.2);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function NebulaShader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_colorIntensity: { value: 1.0 },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();

    const onMouseMove = (e: MouseEvent) => {
      material.uniforms.u_mouse.value.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.u_resolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.u_time.value = elapsedTime;
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
