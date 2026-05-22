# HealthLens Accessibility Checklist

A practical review checklist for Version 0.1 of the HealthLens student support site. Use this when testing locally, before deployment, or when making future updates.

---

## Semantic Structure

- [ ] Page uses `lang="en"` on the `<html>` element
- [ ] Meaningful `<title>` and meta description are present
- [ ] Landmarks are used: `header`, `nav`, `main`, `section`, `footer`
- [ ] Support resources use `<article>` elements
- [ ] Heading hierarchy is logical (one `h1`, nested `h2`/`h3` without skipping levels)
- [ ] FAQ questions use `h3` inside accordion items
- [ ] Disclaimer and success messages use appropriate roles (`role="note"`, `role="status"`)
- [ ] Filter controls use a `<fieldset>` with `<legend>`

---

## Keyboard Access

- [ ] "Skip to main content" link is visible on keyboard focus
- [ ] All navigation links are reachable and activatable via Tab and Enter
- [ ] Category filter buttons work with keyboard (Tab + Enter/Space)
- [ ] FAQ accordion buttons expand/collapse with keyboard
- [ ] Only one FAQ panel is open at a time (or behaviour is predictable)
- [ ] Form fields follow a logical tab order
- [ ] Submit button is keyboard accessible
- [ ] Mobile nav toggle works with keyboard and updates `aria-expanded`
- [ ] No keyboard traps in modals or overlays (none used in V0.1)

---

## Forms and Labels

- [ ] Every input has a visible `<label>` with matching `for` / `id`
- [ ] Placeholders are supplementary, not the only label
- [ ] Required fields show validation errors when empty
- [ ] Email field validates format
- [ ] Message field enforces minimum length (10 characters)
- [ ] Consent checkbox is required and has a clear label
- [ ] Error messages are visible and use `role="alert"`
- [ ] Invalid fields use `aria-invalid="true"` and `aria-describedby` pointing to error text
- [ ] Success message appears on valid submission without sending data
- [ ] Focus moves to the first invalid field on failed submission
- [ ] Focus moves to success message on valid submission

---

## Colour and Contrast

- [ ] Body text meets readable contrast against background
- [ ] Links and buttons have sufficient contrast in default and hover states
- [ ] Urgency badges (Low / Medium / High) remain readable
- [ ] Error text is clearly visible (not low-contrast grey)
- [ ] Focus indicators are visible on all interactive elements
- [ ] `:focus-visible` styles are distinct from hover styles
- [ ] Information is not conveyed by colour alone (urgency includes text labels)

---

## Responsive Layout

- [ ] Layout works on mobile (~320px width)
- [ ] Layout works on tablet (~768px width)
- [ ] Layout works on desktop (1024px+)
- [ ] Text remains readable without horizontal scrolling
- [ ] Touch targets on mobile nav and filter buttons are adequately sized
- [ ] Resource cards reflow in a responsive grid
- [ ] Form fields span full width on small screens

---

## Content Clarity

- [ ] Hero section explains the site purpose in plain English
- [ ] Support cards include title, category, description, urgency, and next step
- [ ] "No matching resources found" message appears when filters return nothing
- [ ] Search/filter results are announced via live region (`aria-live`)
- [ ] FAQ answers are concise and actionable
- [ ] Contact section states the form is a demo
- [ ] Accessibility statement lists inclusive design practices used

---

## Medical Safety Wording

- [ ] Site does not offer diagnosis, prediction, or treatment advice
- [ ] Hero includes disclaimer: "does not provide medical advice"
- [ ] FAQ explicitly states content is not medical advice
- [ ] Consent checkbox references non-medical demo nature
- [ ] Urgent help card directs to 999 / NHS 111 / official helplines
- [ ] Wellbeing tips use self-reflection language, not clinical claims
- [ ] Footer reiterates "Not medical advice"

---

## Known Limitations

Document these when reviewing or presenting the project:

- [ ] **No backend** — contact form does not send or store data
- [ ] **Demo content** — resource descriptions are illustrative, not live university links
- [ ] **No automated a11y testing** — manual checklist only in V0.1
- [ ] **Single page** — no separate pages for individual resources
- [ ] **English only** — no translation or localisation yet
- [ ] **Filter state** — category selection is not persisted in URL or local storage
- [ ] **Limited screen reader testing** — recommend NVDA/VoiceOver testing before production use
- [ ] **No high-contrast theme** — relies on default colour palette meeting contrast targets

---

## Quick Test Script

1. Tab from page load — confirm skip link appears and jumps to main content
2. Tab through nav, filters, cards, FAQ, and form
3. Type "housing" in search — confirm cards filter correctly
4. Click "Urgent" filter — confirm only urgent card shows
5. Clear search and select "All" — confirm all 8 cards return
6. Open each FAQ item with keyboard — confirm `aria-expanded` toggles
7. Submit empty form — confirm errors appear and focus moves to first error
8. Submit valid form with consent checked — confirm success message
9. Resize browser to mobile width — confirm nav toggle and layout work
10. Enable "Reduce motion" in OS settings — confirm no problematic animation

---

*Last updated: Version 0.1*
