import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
    eyebrow?: string;
    /** Main title. Wrap a word in <em> for the italic gold accent. */
    title: ReactNode;
    subtitle?: ReactNode;
    align?: "left" | "center";
    /** Right-aligned slot (e.g. a "View all" link) for left-aligned headings */
    action?: ReactNode;
    as?: "h1" | "h2";
    tone?: "default" | "light";
    className?: string;
};

/** Editorial section header: eyebrow label, large serif title, short standfirst. */
export function SectionHeading({
    eyebrow,
    title,
    subtitle,
    align = "left",
    action,
    as: Tag = "h2",
    tone = "default",
    className = "",
}: Props) {
    const centered = align === "center";
    const light = tone === "light";
    return (
        <Reveal
            className={`mb-10 md:mb-14 flex flex-col gap-6 ${
                centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
            } ${className}`}
        >
            <div className={centered ? "max-w-3xl" : "max-w-2xl"}>
                {eyebrow && <span className={`eyebrow ${light ? "!text-gold-300" : ""}`}>{eyebrow}</span>}
                <Tag
                    className={`mt-4 font-display font-medium leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-6xl [&_em]:italic [&_em]:font-normal [&_em]:text-gold-sheen ${
                        light ? "text-ivory-50" : "text-ink-900 dark:text-ivory-50"
                    }`}
                >
                    {title}
                </Tag>
                {subtitle && (
                    <p
                        className={`mt-5 text-base md:text-lg leading-relaxed ${
                            light ? "text-ivory-100/75" : "text-ink-500 dark:text-ivory-200/70"
                        } ${centered ? "mx-auto max-w-2xl" : "max-w-xl"}`}
                    >
                        {subtitle}
                    </p>
                )}
            </div>
            {action && !centered && <div className="shrink-0">{action}</div>}
        </Reveal>
    );
}
