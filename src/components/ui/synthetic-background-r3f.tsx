"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_resolution;

  void main() {
    vec2 res = max(u_resolution.xy, vec2(1.0));
    vec2 p = (gl_FragCoord.xy - 0.5 * res) / min(res.x, res.y);
    
    // Softer constant motion via plasma
    float t = u_time * 0.3;
    float c = 0.0;
    
    // Balanced sine layers for a gentle, liquid flow
    c += sin(p.x * 2.5 + t);
    c += sin(p.y * 1.8 + t * 0.4);
    c += sin((p.x + p.y) * 1.5 + t);
    
    vec2 p2 = p * 1.2;
    c += sin(length(p2) * 3.0 + t);
    c += sin(p2.x * 1.8 - p2.y * 1.5 + t * 0.6);
    
    // Normalize and soften the intensity
    c = 0.5 + 0.5 * sin(c + t);
    c = pow(c, 2.0); // Sharper falloff for softer edges

    // Light Purple / Lavender / Lilac Palette
    vec3 lavenderBase = vec3(0.12, 0.1, 0.25); // Deep muted purple base
    vec3 lilac = vec3(0.7, 0.6, 0.9);        // Soft light purple
    vec3 softViolet = vec3(0.5, 0.4, 0.85);   // Muted violet
    
    vec3 color = mix(lavenderBase, lilac, c * 0.7);
    color = mix(color, softViolet, pow(c, 3.0) * 0.4);
    
    // Soft Pulsing Vignette
    float r = length(p * 1.25);
    float vignette = smoothstep(1.5, 0.3, r);
    color *= vignette;
    
    // Further global brightness reduction
    color *= 0.8;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const ShaderPlane = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size } = useThree();

    // Use a ref for uniforms to avoid React re-render noise
    const uniformsRef = useRef({
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector3(size.width, size.height, 1.0) },
    });

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            uniformsRef.current.u_time.value = state.clock.elapsedTime;
            uniformsRef.current.u_resolution.value.set(size.width, size.height, 1.0);
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniformsRef.current}
                side={THREE.FrontSide}
                depthTest={false}
                depthWrite={false}
                transparent={true}
            />
        </mesh>
    );
};

export function SyntheticBackgroundR3F() {
    return (
        <div className="absolute inset-0 w-full h-full bg-black">
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
                <ShaderPlane />
            </Canvas>
        </div>
    );
}
