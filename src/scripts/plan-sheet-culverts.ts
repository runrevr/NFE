import { gsap, motionOK } from "./motion";

/**
 * Draws the Lochsa US-12 corridor on first scroll-in: grade line inks, the
 * embankment builds left to right, the river runs, then every culvert tick
 * lights in sequence while the counter chases it.
 *
 * The count comes off the section's data attributes, which are rendered from
 * company.ts — no figure is written here.
 *
 * The markup is already the finished drawing; everything below only runs when
 * motion is allowed.
 */
if (motionOK) {
  const section = document.querySelector<HTMLElement>("#plan-sheet-culverts");

  if (section) {
    const FILL_WIDTH = 872;

    const total = Number(section.dataset.count ?? 0);
    const suffix = section.dataset.suffix ?? "";

    const ticks = section.querySelectorAll<SVGLineElement>(".pc-tick");
    const waves = section.querySelectorAll<SVGPathElement>(".pc-wave");
    // Dashed extension lines fade rather than draw: DrawSVG owns
    // stroke-dasharray while it runs and would leave them solid.
    const dims = section.querySelectorAll<SVGPathElement>(".pc-dim");
    const exts = section.querySelectorAll<SVGPathElement>(".pc-ext");
    const callouts =
      section.querySelectorAll<SVGPathElement>("#pc-callouts path");
    const labels = section.querySelectorAll<SVGElement>("#pc-labels > *");
    const grade = section.querySelector<SVGPathElement>("#pc-grade");
    const pavement = section.querySelector<SVGPathElement>("#pc-pavement");
    const mask = section.querySelector<SVGRectElement>("#pc-fill-mask");
    const readout = section.querySelector<SVGTextElement>("#pc-count");
    const counter = { value: 0 };

    if (grade) gsap.set(grade, { drawSVG: "0%" });
    if (pavement) gsap.set(pavement, { opacity: 0 });
    if (mask) gsap.set(mask, { attr: { width: 0 } });
    if (waves.length) gsap.set(waves, { drawSVG: "0%" });
    if (ticks.length) gsap.set(ticks, { drawSVG: "0%" });
    if (dims.length) gsap.set(dims, { drawSVG: "0%" });
    if (exts.length) gsap.set(exts, { opacity: 0 });
    if (callouts.length) gsap.set(callouts, { drawSVG: "0%" });
    if (labels.length) gsap.set(labels, { opacity: 0 });
    if (readout) {
      gsap.set(readout, { opacity: 0 });
      readout.textContent = `0${suffix}`;
    }

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 62%", once: true },
      defaults: { ease: "power2.inOut" },
    });

    if (grade) tl.to(grade, { drawSVG: "100%", duration: 0.9 });
    if (pavement) tl.to(pavement, { opacity: 1, duration: 0.4 }, "-=0.3");
    if (mask)
      tl.to(mask, { attr: { width: FILL_WIDTH }, duration: 0.8 }, "-=0.55");
    if (waves.length)
      tl.to(
        waves,
        { drawSVG: "100%", duration: 0.7, stagger: 0.12 },
        "-=0.45",
      );

    if (readout) tl.to(readout, { opacity: 1, duration: 0.2 }, "-=0.4");

    // One tick per crossing, lighting west to east.
    if (ticks.length) {
      const perTick = Math.min(0.024, 1.9 / ticks.length);
      tl.to(
        ticks,
        {
          drawSVG: "100%",
          duration: 0.28,
          ease: "power1.out",
          stagger: perTick,
        },
        "-=0.1",
      );

      if (readout && total > 0) {
        tl.to(
          counter,
          {
            value: total,
            duration: Math.max(0.9, perTick * ticks.length),
            ease: "none",
            snap: { value: 1 },
            onUpdate: () => {
              const shown = Math.round(counter.value).toLocaleString("en-US");
              readout.textContent =
                counter.value >= total ? `${shown}${suffix}` : shown;
            },
          },
          "<",
        );
      }
    }

    if (dims.length)
      tl.to(dims, { drawSVG: "100%", duration: 0.5, stagger: 0.08 }, "-=0.35");
    if (exts.length)
      tl.to(exts, { opacity: 1, duration: 0.3, stagger: 0.06 }, "<");
    if (callouts.length)
      tl.to(
        callouts,
        { drawSVG: "100%", duration: 0.45, stagger: 0.12 },
        "<",
      );
    if (labels.length)
      tl.to(labels, { opacity: 1, duration: 0.25, stagger: 0.07 }, "-=0.3");

    // Belt and braces, same reasoning as reveal() in motion.ts: if the ticker
    // never runs (background tab, throttled rAF) the drawing must not sit
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
