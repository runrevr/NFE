import { gsap, motionOK } from "./motion";

/**
 * Draws the Ramsey Rd section on first scroll-in: trench excavates, shield
 * lowers, pipe sets, dimensions ink themselves, LF counter ticks to 4,400+.
 *
 * The markup is already the finished drawing — everything below only runs
 * when motion is allowed.
 */
if (motionOK) {
  const section = document.querySelector("#plan-sheet-ramsey");

  if (section) {
    const TRENCH_TOP = 150;
    const TRENCH_DEPTH = 300;
    const BEDDING_WIDTH = 256;

    const strokes = "#ps-grade path, #ps-trench path, #ps-dims path";
    const labels = "#ps-labels text";
    const lf = section.querySelector<SVGTextElement>("#ps-lf");
    const counter = { value: 0 };

    gsap.set(strokes, { drawSVG: "0%" });
    gsap.set("#ps-callouts path", { drawSVG: "0%" });
    gsap.set("#ps-excavation-mask", { attr: { y: TRENCH_TOP, height: 0 } });
    gsap.set("#ps-bedding-mask", { attr: { width: 0 } });
    gsap.set("#ps-shield", { y: -190, opacity: 0 });
    gsap.set("#ps-pipe", { y: -230, opacity: 0 });
    gsap.set(labels, { opacity: 0 });
    if (lf) {
      gsap.set(lf, { opacity: 0 });
      lf.textContent = "0 LF";
    }

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 62%", once: true },
      defaults: { ease: "power2.inOut" },
    });

    tl.to("#ps-grade path", { drawSVG: "100%", duration: 0.6 })
      .to("#ps-trench path", { drawSVG: "100%", duration: 0.8 }, "-=0.25")
      .to(
        "#ps-excavation-mask",
        { attr: { height: TRENCH_DEPTH }, duration: 0.9 },
        "-=0.5",
      )
      .to("#ps-shield", {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      })
      .to("#ps-bedding-mask", {
        attr: { width: BEDDING_WIDTH },
        duration: 0.45,
      })
      .to("#ps-pipe", {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "bounce.out",
      })
      .to("#ps-dims path", { drawSVG: "100%", duration: 0.5, stagger: 0.08 })
      .to(
        "#ps-callouts path",
        { drawSVG: "100%", duration: 0.45, stagger: 0.1 },
        "<",
      )
      .to(labels, { opacity: 1, duration: 0.25, stagger: 0.07 }, "-=0.35");

    if (lf) {
      tl.to(lf, { opacity: 1, duration: 0.2 }, "-=0.5").to(
        counter,
        {
          value: 4400,
          duration: 1.3,
          ease: "power1.out",
          snap: { value: 20 },
          onUpdate: () => {
            const shown = Math.round(counter.value).toLocaleString("en-US");
            lf.textContent =
              counter.value >= 4400 ? `${shown}+ LF` : `${shown} LF`;
          },
        },
        "-=0.2",
      );
    }
  }
}
