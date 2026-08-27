import { gsap, motionOK } from "./motion";

/**
 * Replays the Willow Creek swap on first scroll-in: banks and creek ink in,
 * the timber trestle draws member by member, dissolves back to the ghost
 * weight it is authored at, and the steel span assembles — abutments,
 * bearings, girder, stiffeners, deck panels, rail — before the span
 * dimension inks.
 *
 * The markup is already the finished sheet; everything below only runs when
 * motion is allowed. The ghosted trestle is authored at stroke-opacity 0.32,
 * so the dissolve simply returns it to the value already in the markup.
 */
if (motionOK) {
  const section = document.querySelector<HTMLElement>("#plan-sheet-bridge-swap");

  if (section) {
    const GHOST = 0.32;

    const ground = section.querySelector<SVGPathElement>("#pb-ground");
    const waves = section.querySelectorAll<SVGPathElement>(".pb-wave");
    const timberGroup = section.querySelector<SVGGElement>("#pb-timber");
    const timber =
      section.querySelectorAll<SVGPathElement>(".pb-timber-member");
    const abutments = section.querySelectorAll<SVGPathElement>(".pb-abutment");
    const bearings = section.querySelectorAll<SVGRectElement>(".pb-bearing");
    const girder = section.querySelectorAll<SVGRectElement>("#pb-girder rect");
    const stiffeners = section.querySelectorAll<SVGLineElement>(".pb-stiffener");
    const panels = section.querySelectorAll<SVGRectElement>(".pb-panel");
    const posts = section.querySelectorAll<SVGLineElement>(".pb-post");
    const topRail = section.querySelector<SVGLineElement>("#pb-toprail");
    // Dashed extension lines fade rather than draw: DrawSVG owns
    // stroke-dasharray while it runs and would leave them solid.
    const dims = section.querySelectorAll<SVGPathElement>(".pb-dim");
    const exts = section.querySelectorAll<SVGPathElement>(".pb-ext");
    const callouts =
      section.querySelectorAll<SVGPathElement>("#pb-callouts path");
    const labels = section.querySelectorAll<SVGElement>("#pb-labels > *");
    const headline = section.querySelector<SVGTextElement>("#pb-span");

    if (ground) gsap.set(ground, { drawSVG: "0%" });
    if (waves.length) gsap.set(waves, { drawSVG: "0%" });
    if (timber.length) gsap.set(timber, { drawSVG: "0%" });
    if (timberGroup)
      gsap.set(timberGroup, { attr: { "stroke-opacity": 0.85 } });
    if (abutments.length) gsap.set(abutments, { y: 60, opacity: 0 });
    if (bearings.length) gsap.set(bearings, { opacity: 0, scale: 0.4 });
    if (girder.length)
      gsap.set(girder, { scaleX: 0, transformOrigin: "left center" });
    if (stiffeners.length) gsap.set(stiffeners, { opacity: 0 });
    if (panels.length) gsap.set(panels, { y: -56, opacity: 0 });
    if (posts.length) gsap.set(posts, { drawSVG: "0%" });
    if (topRail) gsap.set(topRail, { drawSVG: "0%" });
    if (dims.length) gsap.set(dims, { drawSVG: "0%" });
    if (exts.length) gsap.set(exts, { opacity: 0 });
    if (callouts.length) gsap.set(callouts, { drawSVG: "0%" });
    if (labels.length) gsap.set(labels, { opacity: 0 });
    if (headline) gsap.set(headline, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 62%", once: true },
      defaults: { ease: "power2.inOut" },
    });

    if (ground) tl.to(ground, { drawSVG: "100%", duration: 0.7 });
    if (waves.length)
      tl.to(waves, { drawSVG: "100%", duration: 0.5, stagger: 0.1 }, "-=0.35");

    // The structure that was there.
    if (timber.length)
      tl.to(timber, {
        drawSVG: "100%",
        duration: 0.4,
        stagger: 0.028,
        ease: "power1.out",
      });

    // …and taken out.
    if (timberGroup)
      tl.to(timberGroup, {
        attr: { "stroke-opacity": GHOST },
        duration: 0.55,
        ease: "power2.out",
      });

    if (abutments.length)
      tl.to(abutments, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      });
    if (bearings.length)
      tl.to(
        bearings,
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.08 },
        "-=0.2",
      );
    if (girder.length)
      tl.to(girder, {
        scaleX: 1,
        duration: 0.75,
        stagger: 0.14,
        ease: "power2.out",
      });
    if (stiffeners.length)
      tl.to(
        stiffeners,
        { opacity: 1, duration: 0.2, stagger: 0.05 },
        "-=0.35",
      );
    if (panels.length)
      tl.to(panels, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.07,
        ease: "power3.out",
      });
    if (posts.length)
      tl.to(
        posts,
        { drawSVG: "100%", duration: 0.25, stagger: 0.04 },
        "-=0.25",
      );
    if (topRail) tl.to(topRail, { drawSVG: "100%", duration: 0.5 }, "-=0.15");

    if (dims.length)
      tl.to(dims, { drawSVG: "100%", duration: 0.5, stagger: 0.08 });
    if (exts.length)
      tl.to(exts, { opacity: 1, duration: 0.3, stagger: 0.06 }, "<");
    if (callouts.length)
      tl.to(callouts, { drawSVG: "100%", duration: 0.45, stagger: 0.1 }, "<");
    if (labels.length)
      tl.to(labels, { opacity: 1, duration: 0.25, stagger: 0.07 }, "-=0.3");
    if (headline) tl.to(headline, { opacity: 1, duration: 0.3 }, "-=0.4");

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
