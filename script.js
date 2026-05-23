/**
 * HealthLens — Student Wellbeing & Support Hub
 * Version 0.2 — official support signposting links
 */

const supportResources = [
  {
    id: "academic-stress",
    title: "Academic Stress",
    category: "academic",
    categoryLabel: "Academic",
    description: "Support for coursework pressure, assessment concerns, extensions, academic appeals, or uncertainty about study progress.",
    urgency: "Medium",
    nextStep: "Read the academic advice options and contact the relevant support team early.",
    sourceLabel: "Bristol SU Academic Advice",
    sourceUrl: "https://www.bristolsu.org.uk/support-centre/academic-advice",
    linkText: "View academic advice"
  },
  {
    id: "university-academic-support",
    title: "University Academic Support",
    category: "academic",
    categoryLabel: "Academic",
    description: "University guidance for assessment support, exceptional circumstances, absence from teaching or exams, and academic integrity.",
    urgency: "Medium",
    nextStep: "Check the University's academic advice page for the right process.",
    sourceLabel: "University of Bristol Academic Advice",
    sourceUrl: "https://www.bristol.ac.uk/students/support/academic-advice/",
    linkText: "View University academic support"
  },
  {
    id: "mental-wellbeing",
    title: "Mental Wellbeing",
    category: "wellbeing",
    categoryLabel: "Wellbeing",
    description: "Support for students who are finding things difficult and want guidance, signposting, or a wellbeing appointment.",
    urgency: "Medium",
    nextStep: "Book a wellbeing appointment or read about the University's wellbeing services.",
    sourceLabel: "University of Bristol Wellbeing Appointment",
    sourceUrl: "https://www.bristol.ac.uk/students/support/managing-student-life/book-an-appointment/",
    linkText: "Book a wellbeing appointment"
  },
  {
    id: "health-welfare",
    title: "Health and Welfare",
    category: "wellbeing",
    categoryLabel: "Wellbeing",
    description: "Bristol SU guidance on health, welfare and student support, including routes to wellbeing advice.",
    urgency: "Medium",
    nextStep: "Check the SU Health & Welfare support page.",
    sourceLabel: "Bristol SU Health & Welfare",
    sourceUrl: "https://www.bristolsu.org.uk/support-centre/health-and-welfare",
    linkText: "View health and welfare support"
  },
  {
    id: "housing-concerns",
    title: "Housing Concerns",
    category: "housing",
    categoryLabel: "Housing",
    description: "Support for renting, housing problems, tenancy questions, or understanding rights and responsibilities as a student tenant.",
    urgency: "Medium",
    nextStep: "Contact Bristol SU Housing Advice for independent student housing support.",
    sourceLabel: "Bristol SU Housing Advice",
    sourceUrl: "https://www.bristolsu.org.uk/housing-advice",
    linkText: "View housing advice"
  },
  {
    id: "financial-worries",
    title: "Financial Worries",
    category: "finance",
    categoryLabel: "Finance",
    description: "Guidance for students worried about money, budgeting, cost of living, fees, or financial difficulty.",
    urgency: "Medium",
    nextStep: "Read the University's money advice and support options.",
    sourceLabel: "University of Bristol Money Advice",
    sourceUrl: "https://www.bristol.ac.uk/students/support/finances/advice/",
    linkText: "View money advice"
  },
  {
    id: "international-support",
    title: "International Student Support",
    category: "international",
    categoryLabel: "International",
    description: "Academic, personal and practical support for international students at the University of Bristol.",
    urgency: "Low",
    nextStep: "Explore international student support and relevant services.",
    sourceLabel: "University of Bristol International Student Support",
    sourceUrl: "https://www.bristol.ac.uk/international/why/support/",
    linkText: "View international support"
  },
  {
    id: "disability-support",
    title: "Disability Support",
    category: "wellbeing",
    categoryLabel: "Wellbeing",
    description: "Support for students with disabilities, learning differences, mental health conditions, or physical and sensory impairments.",
    urgency: "Medium",
    nextStep: "Read about disability support and study support plans.",
    sourceLabel: "University of Bristol Disability Support",
    sourceUrl: "https://www.bristol.ac.uk/students/support/disability-support/",
    linkText: "View disability support"
  },
  {
    id: "societies-belonging",
    title: "Societies and Belonging",
    category: "community",
    categoryLabel: "Community",
    description: "Find student groups, societies, networks and activities to build connection and belonging.",
    urgency: "Low",
    nextStep: "Browse Bristol SU groups and societies.",
    sourceLabel: "Bristol SU Groups",
    sourceUrl: "https://www.bristolsu.org.uk/groups",
    linkText: "Browse student groups"
  },
  {
    id: "volunteering-community",
    title: "Volunteering and Community",
    category: "community",
    categoryLabel: "Community",
    description: "Find volunteering opportunities and community impact activities through Bristol SU.",
    urgency: "Low",
    nextStep: "Explore volunteering opportunities and student community activities.",
    sourceLabel: "Bristol SU Volunteering",
    sourceUrl: "https://www.bristolsu.org.uk/community-impact",
    linkText: "Explore volunteering"
  },
  {
    id: "urgent-mental-health",
    title: "Urgent Mental Health Support",
    category: "urgent",
    categoryLabel: "Urgent",
    description: "If you need urgent mental health help but it is not an immediate emergency, NHS 111 can direct you to the right support.",
    urgency: "High",
    nextStep: "Use NHS 111 online or call 111. If you or someone else is in immediate danger, call 999 or go to A&E.",
    sourceLabel: "NHS urgent mental health help",
    sourceUrl: "https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/",
    linkText: "Get urgent NHS help"
  },
  {
    id: "someone-to-talk-to",
    title: "Someone to Talk To",
    category: "urgent",
    categoryLabel: "Urgent",
    description: "Samaritans offers confidential listening support for anyone who needs to talk.",
    urgency: "High",
    nextStep: "Call Samaritans free on 116 123 if you need someone to talk to.",
    sourceLabel: "Samaritans",
    sourceUrl: "https://www.samaritans.org/how-we-can-help/contact-samaritan/",
    linkText: "Contact Samaritans"
  }
];

const categoryIcons = {
  academic: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" stroke-width="2"/></svg>`,
  wellbeing: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" stroke="currentColor" stroke-width="2"/></svg>`,
  housing: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" stroke="currentColor" stroke-width="2"/><path d="M9 22V12h6v10" stroke="currentColor" stroke-width="2"/></svg>`,
  finance: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M2 10h20" stroke="currentColor" stroke-width="2"/></svg>`,
  international: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" stroke="currentColor" stroke-width="2"/></svg>`,
  community: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2"/></svg>`,
  urgent: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
};

const resourceGrid = document.getElementById("resource-grid");
const noResults = document.getElementById("no-results");
const resultsStatus = document.getElementById("results-status");
const resultsCount = document.getElementById("results-count");
const searchInput = document.getElementById("resource-search");
const filterButtons = document.querySelectorAll(".filter-btn");
const accordionTriggers = document.querySelectorAll(".accordion-trigger");
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.getElementById("site-nav");
const crisisJumpLink = document.querySelector("[data-category-jump]");

let activeCategory = "all";
let searchQuery = "";

function getUrgencyClass(urgency) {
  return `urgency-badge--${urgency.toLowerCase()}`;
}

function getCategoryIcon(category) {
  return categoryIcons[category] || categoryIcons.community;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function createResourceCard(resource) {
  const article = document.createElement("article");
  const isUrgent = resource.urgency.toLowerCase() === "high";
  const linkAriaLabel = `${resource.linkText} (${resource.sourceLabel}, opens official page in new tab)`;

  article.className = isUrgent
    ? "resource-card resource-card--urgent"
    : "resource-card";
  article.dataset.category = resource.category;
  article.dataset.id = resource.id;

  article.innerHTML = `
    <div class="resource-card__header">
      <span class="resource-card__icon">${getCategoryIcon(resource.category)}</span>
      <span class="category-pill category-pill--${resource.category}">${escapeHtml(resource.categoryLabel)}</span>
    </div>
    <h3 class="resource-card__title">${escapeHtml(resource.title)}</h3>
    <p class="resource-card__description">${escapeHtml(resource.description)}</p>
    <span class="urgency-badge ${getUrgencyClass(resource.urgency)}" aria-label="Urgency level: ${resource.urgency}">
      ${escapeHtml(resource.urgency)} urgency
    </span>
    <div class="resource-card__next-step">
      <strong>Suggested next step</strong>
      ${escapeHtml(resource.nextStep)}
    </div>
    <div class="resource-card__source">
      <strong>Official source</strong>
      <p>${escapeHtml(resource.sourceLabel)}</p>
    </div>
    <a
      class="resource-card__link"
      href="${escapeHtml(resource.sourceUrl)}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${escapeHtml(linkAriaLabel)}"
    >
      <span>${escapeHtml(resource.linkText)}</span>
      <span class="resource-card__link-icon" aria-hidden="true">↗</span>
      <span class="resource-card__link-note">Opens official page in new tab</span>
    </a>
  `;

  return article;
}

function resourceMatchesFilter(resource) {
  const matchesCategory =
    activeCategory === "all" || resource.category === activeCategory;

  const query = searchQuery.trim().toLowerCase();
  if (!query) {
    return matchesCategory;
  }

  const searchableText = [
    resource.title,
    resource.categoryLabel,
    resource.description,
    resource.urgency,
    resource.nextStep,
    resource.sourceLabel,
    resource.linkText
  ]
    .join(" ")
    .toLowerCase();

  return matchesCategory && searchableText.includes(query);
}

function renderResources() {
  const filtered = supportResources.filter(resourceMatchesFilter);
  const total = supportResources.length;

  resourceGrid.innerHTML = "";

  filtered.forEach((resource) => {
    resourceGrid.appendChild(createResourceCard(resource));
  });

  const hasResults = filtered.length > 0;
  noResults.hidden = hasResults;

  const countMessage = hasResults
    ? `Showing ${filtered.length} of ${total} resources`
    : "Showing 0 resources";

  const statusMessage = hasResults
    ? `${filtered.length} support resource${filtered.length === 1 ? "" : "s"} found.`
    : "No matching resources found.";

  if (resultsCount) {
    resultsCount.textContent = countMessage;
  }

  resultsStatus.textContent = statusMessage;
}

function setActiveFilter(button) {
  filterButtons.forEach((btn) => {
    const isActive = btn === button;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  activeCategory = button.dataset.category;
  renderResources();
}

function activateCategoryFilter(category) {
  const targetButton = Array.from(filterButtons).find(
    (button) => button.dataset.category === category
  );

  if (targetButton) {
    setActiveFilter(targetButton);
  }
}

searchInput.addEventListener("input", (event) => {
  searchQuery = event.target.value;
  renderResources();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveFilter(button);
  });
});

if (crisisJumpLink) {
  crisisJumpLink.addEventListener("click", (event) => {
    const category = crisisJumpLink.dataset.categoryJump;
    if (!category) {
      return;
    }

    event.preventDefault();
    activateCategoryFilter(category);

    const supportFinder = document.getElementById("support-finder");
    if (supportFinder) {
      supportFinder.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

function closeAccordionItem(trigger) {
  trigger.setAttribute("aria-expanded", "false");
  const panel = document.getElementById(trigger.getAttribute("aria-controls"));
  panel.hidden = true;
}

function openAccordionItem(trigger) {
  trigger.setAttribute("aria-expanded", "true");
  const panel = document.getElementById(trigger.getAttribute("aria-controls"));
  panel.hidden = false;
}

function toggleAccordion(trigger) {
  const isExpanded = trigger.getAttribute("aria-expanded") === "true";

  accordionTriggers.forEach((otherTrigger) => {
    if (otherTrigger !== trigger) {
      closeAccordionItem(otherTrigger);
    }
  });

  if (isExpanded) {
    closeAccordionItem(trigger);
  } else {
    openAccordionItem(trigger);
  }
}

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    toggleAccordion(trigger);
  });
});

const formFields = {
  name: {
    input: document.getElementById("contact-name"),
    error: document.getElementById("contact-name-error"),
    validate: (value) => {
      if (!value.trim()) {
        return "Please enter your name.";
      }
      return "";
    }
  },
  email: {
    input: document.getElementById("contact-email"),
    error: document.getElementById("contact-email-error"),
    validate: (value) => {
      if (!value.trim()) {
        return "Please enter your email address.";
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value.trim())) {
        return "Please enter a valid email address.";
      }
      return "";
    }
  },
  topic: {
    input: document.getElementById("contact-topic"),
    error: document.getElementById("contact-topic-error"),
    validate: (value) => {
      if (!value) {
        return "Please select a topic.";
      }
      return "";
    }
  },
  message: {
    input: document.getElementById("contact-message"),
    error: document.getElementById("contact-message-error"),
    validate: (value) => {
      if (!value.trim()) {
        return "Please enter a message.";
      }
      if (value.trim().length < 10) {
        return "Your message must be at least 10 characters long.";
      }
      return "";
    }
  },
  consent: {
    input: document.getElementById("contact-consent"),
    error: document.getElementById("contact-consent-error"),
    validate: (checked) => {
      if (!checked) {
        return "You must confirm that you understand this demo does not provide medical advice.";
      }
      return "";
    }
  }
};

function setFieldError(field, message) {
  const wrapper = field.input.closest(".form-field");
  field.error.textContent = message;

  if (message) {
    wrapper.classList.add("has-error");
    field.input.setAttribute("aria-invalid", "true");
    field.input.setAttribute("aria-describedby", field.error.id);
  } else {
    wrapper.classList.remove("has-error");
    field.input.removeAttribute("aria-invalid");
    field.input.removeAttribute("aria-describedby");
  }
}

function validateForm() {
  let isValid = true;

  Object.values(formFields).forEach((field) => {
    const value =
      field.input.type === "checkbox"
        ? field.input.checked
        : field.input.value;

    const errorMessage = field.validate(value);
    setFieldError(field, errorMessage);

    if (errorMessage) {
      isValid = false;
    }
  });

  return isValid;
}

function clearFormErrors() {
  Object.values(formFields).forEach((field) => {
    setFieldError(field, "");
  });
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formSuccess.hidden = true;
  clearFormErrors();

  if (validateForm()) {
    formSuccess.hidden = false;
    contactForm.reset();
    formSuccess.focus();
  } else {
    const firstInvalid = contactForm.querySelector("[aria-invalid='true']");
    if (firstInvalid) {
      firstInvalid.focus();
    }
  }
});

Object.values(formFields).forEach((field) => {
  const eventType = field.input.type === "checkbox" ? "change" : "input";

  field.input.addEventListener(eventType, () => {
    const value =
      field.input.type === "checkbox"
        ? field.input.checked
        : field.input.value;

    const errorMessage = field.validate(value);
    if (!errorMessage) {
      setFieldError(field, "");
    }
  });
});

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

renderResources();
