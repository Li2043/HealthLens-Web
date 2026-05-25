# Manual Test Plan — HealthLens V1.2

**Project:** HealthLens — International Student Wellbeing Navigator  
**Plan version:** V1.2  
**Date:** May 2026

Use this plan before portfolio demos, job applications or major releases. Record results in [audit-report.html](../audit-report.html) and [accessibility-audit.md](./accessibility-audit.md).

---

## Browser and device checks

| Environment | Checks |
|-------------|--------|
| Chrome desktop | Full keyboard path below |
| Mobile responsive mode | 320px, 768px — nav, tables, cards |
| Print preview | Home, Resources, Search, Case Study |
| Dark mode | Toggle on each major page type |

**Local server required:** `py -m http.server 8888` then open `http://127.0.0.1:8888/`

---

## Keyboard-only path

1. Open home page (`index.html`)
2. Tab to **Skip to main content** — activate and confirm focus moves to main
3. Tab through header navigation — all links reachable with visible focus
4. Tab through home search — submit search for `GP`
5. On search results page — tab through filters and result links
6. Open **Resources** from nav
7. Tab to category filters — activate with Enter/Space
8. Tab through resource cards and external links
9. Open **Search** from nav
10. Search `deposit` — tab through type/topic filters and results
11. Open a topic page (e.g. Health & Healthcare)
12. Tab through health tip cards and quick links
13. Open **About** — tab to source policy section links
14. Open **Case Study** and **Audit Report** from footer
15. Confirm focus visible throughout (light and dark mode)

**Expected:** No keyboard traps; all interactive elements reachable.

---

## Search test queries

Run on `search.html` (and home search redirect):

| Query | Expected result types |
|-------|----------------------|
| gp | Health pages, resources, guides |
| pharmacy | Healthcare content |
| vitamin D | Health guide |
| stress | Mental wellbeing |
| deposit | Housing |
| budget | Money |
| discount | Money tips |
| community | Community topic |
| urgent | Urgent help resources |
| international | International essentials |

Also test URL parameters:

- `search.html?q=gp`
- `search.html?q=housing`
- `search.html?q=vitamin%20D`
- `search.html?q=budget&type=guide`
- `search.html?q=deposit&type=resource`

---

## Content safety test

Search the site (global search and browser find on key pages) for:

- diagnosis
- treatment
- triage
- medical advice
- legal advice
- financial advice
- immigration advice

**Expected:** These terms appear only in limitation, disclaimer or “does not provide…” contexts — not as service claims.

---

## Accessibility tool checks

1. **Lighthouse** — Home, Resources, Search — record Accessibility score
2. **axe DevTools** — Same pages — record issues and severity
3. Update [accessibility-audit.md](./accessibility-audit.md) with results

---

## Source metadata checks

On resource cards, guide cards and search results, confirm visible:

- Source type badge (text + styling)
- Source authority where applicable
- Last checked date (formatted, e.g. 25 May 2026)
- Urgent support label on urgent resources
- Commercial/platform wording where relevant

---

## Sign-off

| Role | Name | Date | Result |
|------|------|------|--------|
| Manual keyboard test | | | Pending |
| Content boundary review | | | Pending |
| Lighthouse / axe | | | Pending |

---

## Related documentation

- [Accessibility audit](./accessibility-audit.md)
- [Content audit](./content-audit.md)
- [Audit report](../audit-report.html)
- [Case study](../case-study.html)
