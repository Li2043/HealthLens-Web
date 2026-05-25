# Content Audit — HealthLens V1.2

**Project:** HealthLens — International Student Wellbeing Navigator  
**Audit version:** V1.2  
**Date:** May 2026

---

## Scope

Audit of page positioning, source quality, link text, topic labels, limitations and professional advice boundaries across all public pages and JSON-driven content.

Web-readable summary: [audit-report.html](../audit-report.html)

---

## Page-level checks

For each page, verify:

| Criterion | Expected |
|-----------|----------|
| Page purpose clear | Stated in hero or intro |
| Target audience clear | International students in the UK |
| Main user need clear | Topic or task-oriented |
| Headings descriptive | One h1; logical h2/h3 |
| Links descriptive | No “click here” |
| Source labels visible | On resource and guide cards |
| Last checked visible | Where JSON metadata exists |
| Limitation note present | High-risk and home pages |
| No professional advice overclaiming | Signposting only |

### Page status summary

| Page | Purpose | Boundaries | Status |
|------|---------|------------|--------|
| index.html | Home / navigator | Disclaimer present | Needs review |
| resources.html | Resource library | Support note present | Needs review |
| search.html | Global search | Limitation note | Needs review |
| guides.html | Health tips | Project note labels | Needs review |
| Topic hub pages (×6) | Topic signposting | Per-topic disclaimers | Needs review |
| about.html | About + source policy | Full limitations | Pass |
| case-study.html | Portfolio case study | Clear student project framing | Pass |

---

## Source governance checks

| Check | Status | Notes |
|-------|--------|-------|
| Official sources correctly labelled | Needs review | NHS, GOV.UK, universities, Bristol SU |
| Expert sources correctly labelled | Needs review | UKCISA, Shelter, MoneyHelper, Samaritans |
| Student-facing resources correctly labelled | Needs review | Societies, volunteering |
| Commercial platforms correctly labelled | Needs review | Save the Student references in tips |
| Last checked wording consistent | Pass | V1.1 — “Last checked” not “last updated” |
| No “last updated” confusion for external sources | Pass | Explained on About / Source Policy |

---

## Risk boundary checks

Confirm no page provides:

| Risk | Status |
|------|--------|
| Medical diagnosis | Pass (signposting only) |
| Treatment recommendation | Pass |
| Legal advice | Pass |
| Financial advice | Pass |
| Immigration advice | Pass (signposts to UKCISA/GOV.UK) |
| Emergency response / triage | Pass (999 / NHS 111 signposting only) |
| Product recommendation | Pass |
| Affiliate content | Pass |

Re-verify after any content change.

---

## Issues found

| Issue | Page | Severity | Fix | Status |
|-------|------|----------|-----|--------|
| Full page-by-page manual audit pending | All | Medium | Complete checklist above | Not tested yet |
| User testing not conducted | All | Low | Document in case study limitations | Open |

---

## Content decisions

Documented design rationale for portfolio and audit review:

### International Student Wellbeing Navigator

The main positioning reflects the full student-life scope (study, wellbeing, housing, money, community) rather than a narrow “health app” that could imply medical advice.

### Health & Healthcare vs Mental Wellbeing

Healthcare routes (GP, NHS 111, pharmacy) and mental wellbeing support (stress, loneliness, urgent mental health) are separated because users search for different topics and need different official pathways.

### Discounts under Money & Everyday Spending

Student discounts and commercial platforms are grouped under money topics with **Commercial information** / **Commercial platform** labels — not presented as financial advice.

### Sport under Community & Sport

Sport and activities are framed as belonging and community connection, not clinical wellbeing treatment.

### Care Options as signposting only

The Care Options Guide on the health topic page explains UK service routes without symptom input, assessment or recommendations.

---

## Related documentation

- [Accessibility audit](./accessibility-audit.md)
- [Manual test plan](./manual-test-plan.md)
- [Case study](../case-study.html)
- [Source policy](../about.html#source-policy)
