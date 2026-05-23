# HealthLens Accessibility Checklist

A practical review checklist for Version 0.5 of the HealthLens student support site.

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
- [ ] External support links are reachable by keyboard with visible focus
- [ ] Form fields follow a logical tab order
- [ ] Submit button is keyboard accessible
- [ ] Theme toggle in header is keyboard reachable and updates `aria-pressed`
- [ ] Mobile nav toggle works with keyboard and updates `aria-expanded`
- [ ] No keyboard traps in modals or overlays

---

## Clear Link Text

- [ ] External support links use specific text (not “click here”)
- [ ] Link text describes the destination (e.g. “View housing advice”, “Contact Samaritans”)
- [ ] External links indicate they open an official page in a new tab
- [ ] `aria-label` on external links includes the source organisation where helpful
- [ ] Focus indicators are visible on all links and buttons

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

---

## Official External Links

- [ ] Each support card links to one official Bristol SU, UoB, NHS, or Samaritans page
- [ ] External links use `target="_blank"` and `rel="noopener noreferrer"`
- [ ] Links are visually distinct from body text
- [ ] No unofficial blogs, social media, or commercial health sites are linked
- [ ] JSON load failure shows a clear, accessible error message

---

## Urgent Support Disclaimer

- [ ] Crisis banner includes 999 and NHS 111 guidance
- [ ] Support Finder includes signposting disclaimer near urgent resources:
  - “This student project signposts to official support services. It does not provide medical advice. If you or someone else is in immediate danger, call 999 or go to A&E.”
- [ ] Urgent cards are visually distinct but not alarmist
- [ ] Urgency is shown with text labels, not colour alone

---

## Non-Medical Wording

- [ ] Site does not offer diagnosis, prediction, or treatment advice
- [ ] Content uses “signposts to” rather than “provides support” where appropriate
- [ ] Hero includes disclaimer: “does not provide medical advice”
- [ ] FAQ explicitly states content is not medical advice
- [ ] Content does not imply affiliation with Bristol SU, UoB, NHS or Samaritans
- [ ] Footer reiterates “Not medical advice”
- [ ] No promises of outcomes or AI health claims

---

## Colour and Contrast

- [ ] Body text meets readable contrast against background
- [ ] Links and buttons have sufficient contrast in default and hover states
- [ ] Urgency badges (Low / Medium / High) remain readable
- [ ] Error text is clearly visible (not low-contrast grey)
- [ ] `:focus-visible` styles are distinct from hover styles

---

## Responsive Layout

- [ ] Layout works on mobile (~320px width)
- [ ] Layout works on tablet (~768px width)
- [ ] Layout works on desktop (1024px+)
- [ ] Resource cards reflow in a responsive grid
- [ ] Form fields span full width on small screens
- [ ] Touch targets on mobile nav and filter buttons are adequately sized

---

## Content Clarity

- [ ] Hero section explains the site purpose in plain English
- [ ] Support cards include title, category, description, urgency, next step, and official link
- [ ] Visible results count updates when filters change
- [ ] "No matching resources found" message appears when filters return nothing
- [ ] Search/filter results are announced via live region (`aria-live`)
- [ ] Print preview shows resource cards, official URLs, disclaimers, and accessibility statement
- [ ] Print view hides navigation, search, filters, and demo contact form
- [ ] System dark mode (if enabled) keeps text, links, and focus states readable

---

## Accessibility Testing Record

- [ ] Manual keyboard checklist completed (see [`accessibility-test-report.md`](accessibility-test-report.md))
- [ ] Lighthouse Accessibility score recorded in test report
- [ ] axe DevTools scan recorded in test report

---

## Known Limitations

- [ ] **No backend** — feedback form does not send or store data
- [ ] **Local server required** — JSON will not load when opening `index.html` directly
- [ ] **No automated a11y testing** — manual checklist only
- [ ] **Single page** — no separate pages for individual resources
- [ ] **English only** — no translation or localisation yet
- [ ] **Print stylesheet** — FAQ answers print expanded; controls hidden
- [ ] **Theme preference** — manual toggle; saved in `localStorage`

---

## Quick Test Script

Run all tests through a local server (`python -m http.server 8000`), not by double-clicking `index.html`.

1. Tab from page load — confirm skip link appears and jumps to main content
2. Confirm 12 support cards load from `data/resources.json`
3. Type `housing` in search — confirm housing card appears
4. Type `money` in search — confirm finance card appears
5. Type `urgent` in search — confirm urgent cards appear
6. Test every category filter button
7. Tab to external links — confirm focus is visible; open each official link
8. Open FAQ items with keyboard — confirm `aria-expanded` toggles
9. Submit empty form — confirm errors appear
10. Submit valid form with consent checked — confirm success message
11. Resize browser to mobile width — confirm nav toggle and layout work
12. Test print preview (Ctrl+P) — cards and URLs visible
13. Check browser console — confirm no errors on load

---

*Last updated: Version 0.5*
