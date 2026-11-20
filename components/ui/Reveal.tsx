"use client";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
    /** Delay in seconds */
    delay?: number;
    /** Distance travelled upward while fading in */
    y?: number;
    as?: "div" | "section" | "li" | "article" | "header";
};

/** Fades + lifts its children into place the first time they scroll into view. */
export function Reveal({ delay = 0, y = 28, as = "div", children, ...rest }: RevealProps) {
    const Comp = motion[as] as typeof motion.div;
    return (
        <Comp
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE, delay }}
            {...rest}
        >
            {children}
        </Comp>
    );
}

const groupVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const revealItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** Staggers its `revealItem` children as the group scrolls into view. */
export function RevealGroup({ children, ...rest }: HTMLMotionProps<"div">) {
    return (
        <motion.div
            variants={groupVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            {...rest}
        >
            {children}
        </motion.div>
    );
}
