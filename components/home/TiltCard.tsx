"use client";
import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    /** Max tilt in degrees */
    maxTilt?: number;
    /** Perspective in px */
    perspective?: number;
}

export function TiltCard({
    children,
    className = "",
    maxTilt = 12,
    perspective = 1000,
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);

    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(my, [0, 1], [maxTilt, -maxTilt]), {
        stiffness: 150,
        damping: 20,
    });
    const rotateY = useSpring(useTransform(mx, [0, 1], [-maxTilt, maxTilt]), {
        stiffness: 150,
        damping: 20,
    });

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width);
        my.set((e.clientY - rect.top) / rect.height);
    };

    const handleLeave = () => {
        mx.set(0.5);
        my.set(0.5);
        setHovering(false);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={handleLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                transformPerspective: perspective,
            }}
            className={`relative ${className}`}
        >
            {children}
            {/* Glare overlay */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
                style={{
                    background: useTransform(
                        [mx, my],
                        (latest) => {
                            const [x, y] = latest as number[];
                            return `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.25), transparent 60%)`;
                        }
                    ),
                    opacity: hovering ? 1 : 0,
                }}
            />
        </motion.div>
    );
}
