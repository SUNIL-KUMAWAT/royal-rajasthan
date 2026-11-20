/**
 * Site-wide ambient lighting: slow-drifting gradient blobs behind all content,
 * plus a faint film grain. Pure CSS (no JS), sits behind everything.
 */
export function AmbientBackground() {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden grain">
            <div
                className="absolute -top-[20%] -left-[10%] h-[60vmax] w-[60vmax] rounded-full blur-3xl animate-aurora"
                style={{ background: "radial-gradient(circle at center, var(--aurora-1), transparent 65%)" }}
            />
            <div
                className="absolute top-[30%] -right-[15%] h-[55vmax] w-[55vmax] rounded-full blur-3xl animate-aurora-slow"
                style={{ background: "radial-gradient(circle at center, var(--aurora-2), transparent 65%)" }}
            />
            <div
                className="absolute -bottom-[25%] left-[20%] h-[50vmax] w-[50vmax] rounded-full blur-3xl animate-aurora"
                style={{ background: "radial-gradient(circle at center, var(--aurora-3), transparent 65%)" }}
            />
        </div>
    );
}
