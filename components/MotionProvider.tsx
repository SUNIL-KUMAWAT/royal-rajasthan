"use client";

import { MotionConfig } from "framer-motion";

/**
 * Site-wide animation settings.
 * reducedMotion="user": visitors who enabled "reduce motion" in their OS get no transform/scale animations.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
