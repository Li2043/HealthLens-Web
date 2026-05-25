# Accessibility Audit — HealthLens V1.2

**Project:** HealthLens — International Student Wellbeing Navigator  
**Audit version:** V1.2  
**Date:** May 2026  
**Status:** WCAG-informed review in progress — not formally certified

---

## Scope

Pages included in this audit:

- `index.html`
- `resources.html`
- `search.html`
- `guides.html`
- `international-essentials.html`
- `health-healthcare.html`
- `mental-wellbeing.html`
- `housing-bills.html`
- `money-spending.html`
- `community-activities-sport.html`
- `about.html`
- `case-study.html`
- `audit-report.html`

Web-readable summary: [audit-report.html](../audit-report.html)

---

## Standards referenced

- WCAG-informed manual review (not formal conformance claim)
- [W3C Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/)
- Manual keyboard testing
- Chrome Lighthouse (Accessibility category)
- axe DevTools browser extension

---

## Automated checks

| Tool | Result | Notes |
|------|--------|-------|
| **Lighthouse Accessibility** | _To be completed_ | Run on Home, Resources, Search via Chrome DevTools |
| **axe DevTools** | _To be completed_ | Record issues and fixes below when scanned |

### Issues found (automated)

| Issue | Page | Severity | Fix | Status |
|-------|------|----------|-----|--------|
| _Pending Lighthouse run_ | All | — | — | Not tested yet |

### Fixes made (automated)

| Fix | Version | Description |
|-----|---------|-------------|
| Live search status | V1.0 | `#search-status` with `role="status"` and `aria-live="polite"` |
| Source label text | V1.1 | Visible text badges — not colour-only |
| Skip link | V0.5+ | Skip to `#main-content` on all pages |

---

## Manual keyboard testing

| Check | Status | Notes |
|-------|--------|-------|
| Skip link works | Not tested yet | Tab from page load |
| Header nav reachable | Not tested yet | All nav links |
| Active page visible | Not tested yet | `aria-current="page"` |
| Search input reachable | Not tested yet | Home and `search.html` |
| Search filters usable | Not tested yet | Type and topic filters |
| Resource cards reachable | Not tested yet | Tab through links |
| Guide cards reachable | Not tested yet | Topic pages and guides |
| FAQ buttons usable | Not tested yet | If FAQ present on page |
| Forms usable | Not tested yet | Search submit, contact form if present |
| External links reachable | Not tested yet | Opens in new tab with descriptive text |
| Footer links reachable | Not tested yet | Including Case Study and Audit Report |
| Focus visible throughout | Not tested yet | Light and dark mode |

See [manual-test-plan.md](./manual-test-plan.md) for step-by-step paths.

---

## Visual and responsive checks

| Check | Status | Notes |
|-------|--------|-------|
| Mobile layout (320px+) | Not tested yet | Collapsible nav below 1100px |
| Desktop layout | Not tested yet | Global nav single row |
| Dark mode | Not tested yet | Manual contrast review |
| Print preview | Not tested yet | Case study, resources, search |
| Text size and spacing | Not tested yet | Readable body copy and badges |

---

## Known limitations

- This is **not** a formal WCAG audit or certification
- Not tested with screen reader users or real assistive technology users yet
- Not tested with real international student users yet
- Automated tools cannot verify content safety boundaries
- External link stability requires separate link-check review

---

## Related documentation

- [Content audit](./content-audit.md)
- [Manual test plan](./manual-test-plan.md)
- [Case study](../case-study.html)
- [Accessibility test report](../accessibility-test-report.md)
