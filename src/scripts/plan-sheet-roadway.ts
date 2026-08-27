import { gsap, motionOK } from "./motion";

/**
 * Assembles the Sullivan Road typical section on first scroll-in, in the order
 * it gets built: subgrade, base, asphalt, lane assignment, curb/ADA, storm
 * structure, ITS conduit, signal — then the keynote bubbles pop on.
 *
 * The markup is already the assembled section; everything below only runs when
 * motion is allowed. Buried work rises from below, surface work drops in.
 */
if (motionOK) {
  const section = document.querySelector<HTMLElement>("#plan-sheet-roadway");

  if (section) {
    const layer = (id: string) => section.querySelector<SVGGElement>(id);

    const subgrade = layer("#pr-subgrade");
    const base = layer("#pr-base");
    const asphalt = layer("#pr-asphalt");
    const concrete = layer("#pr-concrete");
    const storm = layer("#pr-storm");
    const its = layer("#pr-its");
    const signal = layer("#pr-signal");

    const joints = section.querySelectorAll<SVGRectElement>(".pr-joint");
    const laneLabels =
      section.querySelectorAll<SVGTextElement>(".pr-lane-label");
    const leaders = section.querySelectorAll<SVGPathElement>(".pr-leader");
    const keys = section.querySelectorAll<SVGGElement>(".pr-key");
    const labels = section.querySelectorAll<SVGElement>("#pr-labels > *");
    const headline = section.querySelector<SVGTextElement>("#pr-value");

    /** Exploded start positions: negative drops in, positive rises up. */
    const stack: Array<[SVGGElement | null, number]> = [
      [subgrade, -96],
      [base, -76],
      [asphalt, -56],
      [concrete, -64],
      [storm, 84],
      [its, 64],
      [signal, -132],
    ];

    for (const [el, offset] of stack) {
      if (el) gsap.set(el, { y: offset, opacity: 0 });
    }
    if (joints.length) gsap.set(joints, { scaleX: 0, transformOrigin: "center" });
    if (laneLabels.length) gsap.set(laneLabels, { opacity: 0, y: -10 });
    if (leaders.length) gsap.set(leaders, { drawSVG: "0%" });
    if (keys.length) gsap.set(keys, { opacity: 0, scale: 0.5, transformOrigin: "center" });
    if (labels.length) gsap.set(labels, { opacity: 0 });
    if (headline) gsap.set(headline, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 62%", once: true },
      defaults: { ease: "power3.out" },
    });

    const settle = (el: SVGGElement | null, at?: string) => {
      if (!el) return;
      tl.to(el, { y: 0, opacity: 1, duration: 0.55 }, at);
    };

    settle(subgrade);
    settle(base, "-=0.32");
    settle(asphalt, "-=0.32");

    if (joints.length)
      tl.to(
        joints,
        { scaleX: 1, duration: 0.3, stagger: 0.07, ease: "power2.out" },
        "-=0.2",
      );
    if (laneLabels.length)
      tl.to(
        laneLabels,
        { opacity: 1, y: 0, duration: 0.28, stagger: 0.07 },
        "<",
      );

    settle(concrete, "-=0.15");
    settle(storm, "-=0.2");
    settle(its, "-=0.3");
    settle(signal, "-=0.2");

    if (leaders.length)
      tl.to(
        leaders,
        { drawSVG: "100%", duration: 0.4, stagger: 0.08, ease: "power2.inOut" },
        "-=0.2",
      );
    if (keys.length)
      tl.to(
        keys,
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.07, ease: "back.out(2)" },
        "<",
      );
    if (labels.length)
      tl.to(labels, { opacity: 1, duration: 0.25, stagger: 0.07 }, "-=0.2");
    if (headline) tl.to(headline, { opacity: 1, duration: 0.3 }, "-=0.35");

    // Belt and braces, same reasoning as reveal() in motion.ts: if the ticker
    // never runs (background tab, throttled rAF) the section must not sit
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
