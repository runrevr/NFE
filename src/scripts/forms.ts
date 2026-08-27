/**
 * Form submission without a backend.
 *
 * This is a static site with no form service configured yet. The pages used to
 * post to a placeholder Formspree ID, which was the worst of both worlds:
 * formspree.io is a live host, so a submission left the site and failed there
 * rather than failing loudly here. An estimator sending a bid invitation at 9pm
 * would have seen a submit button behave normally and heard nothing back.
 *
 * Until NFE has a real endpoint, every form composes a pre-filled email
 * instead. It is not elegant, but it actually delivers, and the visitor can see
 * exactly what is being sent before it goes.
 *
 * Swap in the real endpoint by setting `action` on the form and deleting the
 * `data-mailto-form` attribute — this script then leaves it alone.
 */

/** Turns a form into "subject" + a readable plain-text body of its fields. */
function compose(form: HTMLFormElement): { subject: string; body: string } {
  const subject =
    form.dataset.mailtoSubject || `Website enquiry — ${document.title}`;

  const lines: string[] = [];

  for (const element of Array.from(form.elements)) {
    const field = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    if (!field.name || field.type === "hidden" || field.type === "submit") continue;

    // Honeypot: if a bot filled it, say nothing useful.
    if (field.name === "_gotcha") continue;

    const label =
      form.querySelector<HTMLLabelElement>(`label[for="${field.id}"]`)
        ?.textContent?.replace(/\s+/g, " ").trim() ?? field.name;

    if (field.type === "file") {
      const files = (field as HTMLInputElement).files;
      lines.push(
        files && files.length
          ? `${label}: ${files[0].name} — please attach this file to the email before sending.`
          : `${label}: (none attached)`,
      );
      continue;
    }

    const value = field.value.trim();
    if (value) lines.push(`${label}: ${value}`);
  }

  return { subject, body: lines.join("\n") };
}

export function wireMailtoForms(): void {
  const forms = document.querySelectorAll<HTMLFormElement>("[data-mailto-form]");

  for (const form of Array.from(forms)) {
    form.addEventListener("submit", (event) => {
      // Let the browser run its own required/type validation first.
      if (!form.checkValidity()) return;

      event.preventDefault();

      const to = form.dataset.mailtoForm;
      if (!to) return;

      const { subject, body } = compose(form);
      const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      const status = form.querySelector<HTMLElement>("[data-form-status]");
      if (status) {
        status.textContent =
          "Opening your email app with these details filled in. Send it and it reaches us.";
        status.hidden = false;
      }

      window.location.href = href;
    });
  }
}
