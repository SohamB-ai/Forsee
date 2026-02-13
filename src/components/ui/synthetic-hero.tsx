"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// Note: SplitText is a premium GSAP plugin. 
// If it's not available, you might need to use a standard GSAP animation or include the file.
// import { SplitText } from "gsap/SplitText"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// GSAP plugin handling
if (typeof window !== "undefined") {
    try {
        // @ts-ignore - SplitText might not be available
        import("gsap/SplitText").then(({ SplitText }) => {
            gsap.registerPlugin(SplitText, useGSAP);
        }).catch(() => {
            gsap.registerPlugin(useGSAP);
        });
    } catch (e) {
        gsap.registerPlugin(useGSAP);
    }
}

interface ShaderPlaneProps {
    vertexShader: string;
    fragmentShader: string;
    uniforms: { [key: string]: { value: unknown } };
}

const ShaderPlane = ({
    vertexShader,
    fragmentShader,
    uniforms,
}: ShaderPlaneProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size } = useThree();

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
            material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.FrontSide}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
};

export const syntheticVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const syntheticFragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_resolution;

  void main() {
    vec2 res = max(u_resolution.xy, vec2(1.0));
    vec2 p = (vUv - 0.5) * 6.0;
    p.x *= res.x / res.y;
    
    float t = u_time * 0.4;
    float c = 0.0;
    
    c += sin(p.x * 2.0 + t);
    c += sin(p.y * 1.5 + t * 0.5);
    c += sin((p.x + p.y) * 1.8 + t);
    
    vec2 p2 = p * 1.2;
    c += sin(length(p2) * 3.0 + t);
    c += sin(p2.x * 1.5 - p2.y * 1.2 + t * 0.6);
    
    c = 0.5 + 0.5 * sin(c + t);
    c = pow(c, 1.5);

    vec3 deepPurple = vec3(0.2, 0.05, 0.4);
    vec3 brightMagenta = vec3(0.9, 0.1, 0.8);
    vec3 electricBlue = vec3(0.0, 0.7, 1.0);
    
    vec3 color = mix(deepPurple, brightMagenta, c);
    color = mix(color, electricBlue, pow(c, 4.0) * 0.6);
    
    float v = smoothstep(4.0, 1.0, length(p));
    color *= v;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

interface HeroProps {
    title: string;
    description: string;
    badgeText?: string;
    badgeLabel?: string;
    ctaButtons?: Array<{ text: string; href?: string; primary?: boolean }>;
    microDetails?: Array<string>;
}

const SyntheticHero = ({
    title = "An experiment in light, motion, and the quiet chaos between.",
    description = "Experience a new dimension of interaction — fluid, tactile, and alive. Designed for creators who see beauty in motion.",
    badgeText = "React Three Fiber",
    badgeLabel = "Experience",
    ctaButtons = [
        { text: "Explore the Canvas", href: "#explore", primary: true },
        { text: "Learn More", href: "#learn-more" },
    ],
    microDetails = [
        "Immersive shader landscapes",
        "Hand-tuned motion easing",
        "Responsive, tactile feedback",
    ],
}: HeroProps) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const badgeWrapperRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const ctaRef = useRef<HTMLDivElement | null>(null);
    const microRef = useRef<HTMLUListElement | null>(null);

    const shaderUniforms = useMemo(
        () => ({
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector3(1, 1, 1) },
        }),
        [],
    );

    useGSAP(
        () => {
            if (!headingRef.current) return;

            // Fallback animation if SplitText is not available
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            if (badgeWrapperRef.current) {
                gsap.set(badgeWrapperRef.current, { autoAlpha: 0, y: -8 });
                tl.to(
                    badgeWrapperRef.current,
                    { autoAlpha: 1, y: 0, duration: 0.5 },
                    0,
                );
            }

            gsap.set(headingRef.current, { autoAlpha: 0, y: 20, filter: "blur(10px)" });
            tl.to(headingRef.current, {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1,
            }, 0.2);

            if (paragraphRef.current) {
                gsap.set(paragraphRef.current, { autoAlpha: 0, y: 8 });
                tl.to(
                    paragraphRef.current,
                    { autoAlpha: 1, y: 0, duration: 0.5 },
                    "-=0.55",
                );
            }

            if (ctaRef.current) {
                gsap.set(ctaRef.current, { autoAlpha: 0, y: 8 });
                tl.to(
                    ctaRef.current,
                    { autoAlpha: 1, y: 0, duration: 0.5 },
                    "-=0.35",
                );
            }

            const microItems = microRef.current
                ? Array.from(microRef.current.querySelectorAll("li"))
                : [];
            if (microItems.length > 0) {
                gsap.set(microItems, { autoAlpha: 0, y: 6 });
                tl.to(
                    microItems,
                    { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 },
                    "-=0.25",
                );
            }
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="relative flex items-center justify-center min-h-screen overflow-hidden"
        >
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <ShaderPlane
                        vertexShader={syntheticVertexShader}
                        fragmentShader={syntheticFragmentShader}
                        uniforms={shaderUniforms}
                    />
                </Canvas>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6">
                <div ref={badgeWrapperRef}>
                    <Badge className="mb-6 bg-white/10 hover:bg-white/15 text-emerald-300 backdrop-blur-md border border-white/20 uppercase tracking-wider font-medium flex items-center gap-2 px-4 py-1.5">
                        <span className="text-[10px] font-light tracking-[0.18em] text-emerald-100/80">
                            {badgeLabel}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-emerald-200/60" />
                        <span className="text-xs font-light tracking-tight text-emerald-200">
                            {badgeText}
                        </span>
                    </Badge>
                </div>

                <h1
                    ref={headingRef}
                    className="text-5xl md:text-7xl max-w-4xl font-light tracking-tight text-white mb-4"
                >
                    {title}
                </h1>

                <p
                    ref={paragraphRef}
                    className="text-emerald-50/80 text-lg max-w-2xl mx-auto mb-10 font-light"
                >
                    {description}
                </p>

                <div
                    ref={ctaRef}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    {ctaButtons.map((button, index) => {
                        const isPrimary = button.primary ?? index === 0;
                        const classes = isPrimary
                            ? "px-8 py-3 rounded-xl text-base font-medium backdrop-blur-lg bg-emerald-400/80 hover:bg-emerald-300/80 shadow-lg transition-all cursor-pointer"
                            : "px-8 py-3 rounded-xl text-base font-medium border-white/30 text-white hover:bg-white/10 backdrop-blur-lg transition-all cursor-pointer";

                        if (button.href) {
                            return (
                                <Button
                                    key={index}
                                    variant={isPrimary ? undefined : "outline"}
                                    className={classes}
                                    asChild
                                >
                                    <a href={button.href}>{button.text}</a>
                                </Button>
                            );
                        }

                        return (
                            <Button
                                key={index}
                                variant={isPrimary ? undefined : "outline"}
                                className={classes}
                            >
                                {button.text}
                            </Button>
                        );
                    })}
                </div>

                {microDetails.length > 0 && (
                    <ul
                        ref={microRef}
                        className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-light tracking-tight text-emerald-100/70"
                    >
                        {microDetails.map((detail, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-emerald-200/60" />
                                {detail}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default SyntheticHero;
