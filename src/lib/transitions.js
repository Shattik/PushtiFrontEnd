/** @param {number} t */
function cubic_out(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}

export function fly(
    node,
    {
        delay = 0,
        duration = 400,
        easing = cubic_out,
        x = 0,
        y = 0,
        opacity = 0,
    } = {}
) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === "none" ? "" : style.transform;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
            transform: ${transform} translate(${(1 - t) * x}px, ${
            window.scrollY
        }px);
            opacity: ${target_opacity - od * u}`,
    };
}
