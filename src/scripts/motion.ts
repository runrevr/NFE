import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

/**
 * Single global motion gate. Sampled once at load — after toggling
 * reduced-motion emulation in DevTools you must reload the page.
 *
 * Markup is always authored in its finished state; animations subtract
 * initial states only when this is true. That keeps reduced-motion, no-JS
 * and flash-of-hidden-content correct with one convention.
 */
export const motionOK = window.matchMedia(
  "(prefers-reduced-motion: no-preference)",
).matches;

/**
 * Standard section entrance — 250ms, once, per the blueprint's motion rules.
 *
 * A collection cannot be its own ScrollTrigger trigger, so the shared parent
 * drives one trigger and the children stagger off it.
 */
export function reveal(targets: Element | NodeListOf<Element>, stagger = 0) {
  if (!motionOK) return;

  const els = gsap.utils.toArray<Element>(targets);
  if (!els.length) return;

  const trigger = els[0].parentElement ?? els[0];
  let played = false;

  const show = () => {
    if (played) return;
    played = true;
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.28,
      ease: "power2.out",
      stagger,
      overwrite: "auto",
    });
  };

  // Only hide once a live trigger exists, so a failure here can never leave
  // a section stranded at opacity 0.
  ScrollTrigger.create({ trigger, start: "top 88%", once: true, onEnter: show });
  gsap.set(els, { opacity: 0, y: 16 });

  // Belt and braces. gsap.set is synchronous, so this still rescues the
  // content if the animation ticker itself never runs (background tab,
  // throttled rAF) rather than depending on the thing that just failed.
  window.setTimeout(() => {
    if (played) return;
    played = true;
    gsap.set(els, { opacity: 1, y: 0 });
  }, 4000);
}

/** Fonts and images settle after first paint; keep trigger positions honest. */
if (motionOK) {
  window.addEventListener("load", () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger };
