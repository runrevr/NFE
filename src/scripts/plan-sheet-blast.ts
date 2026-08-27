import { gsap, motionOK } from "./motion";

/**
 * Fires the drill pattern on first scroll-in: free face inks, the holes get
 * collared row by row, the surface tie-in appears, then the pattern initiates
 * from the free face back — one hole at a time, in the DOM order the sheet
 * renders them, which is the firing order.
 *
 * The shock rings are decorative and authored at opacity 0 (they carry no
 * information), so nothing on this sheet depends on JS to be readable.
 *
 * The markup is already the finished drawing; everything below only runs when
 * motion is allowed.
 */
if (motionOK) {
  const section = document.querySelector<HTMLElement>("#plan-sheet-blast");

  if (section) {
    const face = section.querySelector<SVGPathElement>("#px-face-line");
    const faceTicks =
      section.querySelectorAll<SVGPathElement>(".px-face-tick");
    const holes = section.querySelectorAll<SVGGElement>(".px-hole");
    const dots = section.querySelectorAll<SVGCircleElement>(".px-dot");
    const rings = section.querySelectorAll<SVGCircleElement>(".px-ring");
    const ties = section.querySelectorAll<SVGPathElement>(".px-tie");
    const rows = section.querySelectorAll<SVGTextElement>(".px-row");
    const seq = section.querySelector<SVGPathElement>(".px-seq-line");
    const north = section.querySelector<SVGGElement>("#px-north");
    // Dashed extension lines fade rather than draw: DrawSVG owns
    // stroke-dasharray while it runs and would leave them solid.
    const dims = section.querySelectorAll<SVGPathElement>(".px-dim");
    const exts = section.querySelectorAll<SVGPathElement>(".px-ext");
    const labels = section.querySelectorAll<SVGElement>("#px-labels > *");

    if (face) gsap.set(face, { drawSVG: "0%" });
    if (faceTicks.length) gsap.set(faceTicks, { drawSVG: "0%" });
    if (holes.length)
      gsap.set(holes, { opacity: 0, scale: 0.35, transformOrigin: "center" });
    if (ties.length) gsap.set(ties, { opacity: 0 });
    if (rows.length) gsap.set(rows, { opacity: 0, x: -10 });
    if (seq) gsap.set(seq, { drawSVG: "0%" });
    if (north) gsap.set(north, { opacity: 0 });
    if (dims.length) gsap.set(dims, { drawSVG: "0%" });
    if (exts.length) gsap.set(exts, { opacity: 0 });
    if (labels.length) gsap.set(labels, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 62%", once: true },
      defaults: { ease: "power2.inOut" },
    });

    if (face) tl.to(face, { drawSVG: "100%", duration: 0.7 });
    if (faceTicks.length)
      tl.to(
        faceTicks,
        { drawSVG: "100%", duration: 0.25, stagger: 0.012 },
        "-=0.45",
      );

    if (holes.length)
      tl.to(
        holes,
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.016,
          ease: "back.out(1.8)",
        },
        "-=0.2",
      );

    if (ties.length)
      tl.to(ties, { opacity: 1, duration: 0.3, stagger: 0.04 }, "-=0.4");
    if (rows.length)
      tl.to(rows, { opacity: 1, x: 0, duration: 0.28, stagger: 0.07 }, "-=0.3");
    if (seq) tl.to(seq, { drawSVG: "100%", duration: 0.6 }, "-=0.3");
    if (north) tl.to(north, { opacity: 1, duration: 0.3 }, "<");
    if (dims.length)
      tl.to(dims, { drawSVG: "100%", duration: 0.45, stagger: 0.1 }, "-=0.35");
    if (exts.length)
      tl.to(exts, { opacity: 1, duration: 0.3, stagger: 0.05 }, "<");
    if (labels.length)
      tl.to(labels, { opacity: 1, duration: 0.25, stagger: 0.06 }, "-=0.25");

    // Initiation. Rings start visible only as each hole's own tween begins,
    // and every hole lands back on its authored state.
    if (rings.length)
      tl.fromTo(
        rings,
        { opacity: 0.85, scale: 1, transformOrigin: "center" },
        {
          opacity: 0,
          scale: 3.1,
          duration: 0.55,
          stagger: 0.045,
          ease: "power2.out",
          immediateRender: false,
        },
        "+=0.15",
      );

    if (dots.length)
      tl.to(
        dots,
        {
          scale: 2.1,
          duration: 0.11,
          stagger: 0.045,
          yoyo: true,
          repeat: 1,
          transformOrigin: "center",
          ease: "power1.inOut",
        },
        "<",
      );

    // Belt and braces, same reasoning as reveal() in motion.ts: if the ticker
    // never runs (background tab, throttled rAF) the pattern must not sit
    // stranded at opacity 0. IntersectionObserver and setTimeout do not depend
    // on the thing that just failed.
    const rescue = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      rescue.disconnect();
      window.setTimeout(() => {
        if (tl.progress() < 1) tl.progress(1);
      }, 10000);
    });
    rescue.observe(section);
  }
}
