import { gsap, motionOK } from "./motion";

/**
 * Counters tick once. The markup already contains the final value, so
 * reduced-motion and no-JS visitors read the correct number immediately.
 */
if (motionOK) {
  const counters =
    document.querySelectorAll<HTMLElement>("[data-counter]");

  for (const el of counters) {
    const target = Number(el.dataset.value ?? 0);
    const prefix = el.dataset.prefix ?? "";
    const suffix = el.dataset.suffix ?? "";
    const proxy = { value: 0 };

    el.textContent = `${prefix}0${suffix}`;

    gsap.to(proxy, {
      value: target,
      duration: 1.4,
      ease: "power1.out",
      snap: { value: 1 },
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(proxy.value).toLocaleString("en-US")}${suffix}`;
      },
    });
  }
}
