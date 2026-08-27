/**
 * Toggletips: hover is pure CSS, this adds tap and keyboard control.
 * Tooltip copy lives in the DOM, so it is readable without JS.
 */
const triggers = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-toggletip]"),
);

function close(trigger: HTMLButtonElement) {
  const panel = document.getElementById(
    trigger.getAttribute("aria-controls") ?? "",
  );
  trigger.setAttribute("aria-expanded", "false");
  panel?.classList.remove("is-open");
}

function closeAll(except?: HTMLButtonElement) {
  for (const trigger of triggers) {
    if (trigger !== except) close(trigger);
  }
}

for (const trigger of triggers) {
  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const panel = document.getElementById(
      trigger.getAttribute("aria-controls") ?? "",
    );
    if (!panel) return;

    const open = trigger.getAttribute("aria-expanded") === "true";
    closeAll(trigger);
    trigger.setAttribute("aria-expanded", String(!open));
    panel.classList.toggle("is-open", !open);
  });
}

document.addEventListener("click", () => closeAll());

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const open = triggers.find(
    (trigger) => trigger.getAttribute("aria-expanded") === "true",
  );
  if (!open) return;
  close(open);
  open.focus();
});
