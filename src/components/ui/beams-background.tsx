"use client";

import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface BeamsBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
    const angle = -35 + Math.random() * 10;
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 180 + Math.random() * 220,   // very wide beams
        length: height * 2.5,
        angle,
        speed: 0.3 + Math.random() * 0.5,   // slow drift
        opacity: 0.22 + Math.random() * 0.18, // visible but elegant
        hue: 22 + Math.random() * 16,        // orange–amber
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.012,
    };
}

export function BeamsBackground({ className, children, intensity = "medium" }: BeamsBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);

    const opacityMap = { subtle: 0.5, medium: 0.75, strong: 1 };

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const w = container.offsetWidth;
            const h = container.offsetHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.scale(dpr, dpr);
            beamsRef.current = Array.from({ length: 5 }, () => createBeam(w, h));
        };

        updateSize();
        const ro = new ResizeObserver(updateSize);
        ro.observe(container);

        function resetBeam(beam: Beam, index: number, total: number, w: number, h: number) {
            const col = index % 4;
            const spacing = w / 4;
            beam.y = h + 120;
            beam.x = col * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.6;
            beam.width = 180 + Math.random() * 200;
            beam.speed = 0.3 + Math.random() * 0.4;
            beam.hue = 22 + (index * 16) / total;
            beam.opacity = 0.22 + Math.random() * 0.18;
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam, w: number, h: number) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            const op = beam.opacity * (0.85 + Math.sin(beam.pulse) * 0.15) * opacityMap[intensity];
            const g = ctx.createLinearGradient(0, 0, 0, beam.length);
            g.addColorStop(0,   `hsla(${beam.hue}, 90%, 55%, 0)`);
            g.addColorStop(0.15,`hsla(${beam.hue}, 90%, 55%, ${op * 0.4})`);
            g.addColorStop(0.4, `hsla(${beam.hue}, 90%, 55%, ${op})`);
            g.addColorStop(0.6, `hsla(${beam.hue}, 90%, 55%, ${op})`);
            g.addColorStop(0.85,`hsla(${beam.hue}, 90%, 55%, ${op * 0.4})`);
            g.addColorStop(1,   `hsla(${beam.hue}, 90%, 55%, 0)`);

            ctx.fillStyle = g;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        function animate() {
            if (!canvas || !ctx) return;
            const dpr = window.devicePixelRatio || 1;
            const w = canvas.width / dpr;
            const h = canvas.height / dpr;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Heavy blur so beams are smooth diffuse light, not sharp streaks
            ctx.filter = "blur(38px)";

            const total = beamsRef.current.length;
            beamsRef.current.forEach((beam, i) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;
                if (beam.y + beam.length < -120) resetBeam(beam, i, total, w, h);
                drawBeam(ctx, beam, w, h);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            ro.disconnect();
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [intensity]);

    return (
        <div ref={containerRef} className={cn("relative w-full overflow-hidden bg-black", className)}>
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
}
