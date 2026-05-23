/**
 * HealthLens — Student Wellbeing & Support Hub
 * Version 0.6 — static HTML, CSS and JavaScript
 */

const RESOURCES_URL = "./data/resources.json";
const CARE_OPTIONS_URL = "./data/care-options.json";

const categoryLabels = {
  academic: "Academic",
  wellbeing: "Wellbeing",
  housing: "Housing",
  finance: "Finance",
  international: "International",
  community: "Community",
  urgent: "Urgent"
};

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
const themeToggle = document.getElementById("theme-toggle");
const careOptionsList = document.getElementById("care-options-list");
const careOptionsError = document.getElementById("care-options-error");

const THEME_STORAGE_KEY = "healthlens-theme";

function getHeaderOffset() {
  const header = document.querySelector(".site-header");
  return header ? header.offsetHeight : 0;
}

function scrollToElement(element) {
  if (!element) {
    return;
  }

  const top =
    element.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: "smooth"
  });
}

function initInPageLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.hasAttribute("data-category-jump")) {
        return;
      }

      const href = link.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      scrollToElement(target);
    });
  });
}

let supportResources = [];
let resourcesLoaded = false;
let loadFailed = false;
let activeCategory = "all";
let searchQuery = "";

let careOptions = [];
let careOptionsLoaded = false;
let careOptionsLoadFailed = false;

function getCategoryLabel(category) {
  return categoryLabels[category] || category;
}

function normalizeResource(resource) {
  return {
    ...resource,
    categoryLabel: getCategoryLabel(resource.category)
  };
}

function getUrgencyClass(urgency) {
  return `urgency-badge--${urgency.toLowerCase()}`;
}

function getCategoryIcon(category) {
  return categoryIcons[category] || categoryIcons.community;
}

function renderListItems(items) {
  return items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
}

function createCareOptionCard(option) {
  const article = document.createElement("article");
  const isEmergency = option.id === "emergency";
  const linkAriaLabel = `${option.linkText} (${option.sourceLabel}, opens official page in new tab)`;

  article.className = isEmergency
    ? "care-option-card care-option-card--emergency"
    : "care-option-card";
  article.dataset.id = option.id;

  article.innerHTML = `
    <span class="care-option-card__category">${escapeHtml(option.category)}</span>
    <h3 class="care-option-card__title">${escapeHtml(option.title)}</h3>
    <p class="care-option-card__summary">${escapeHtml(option.summary)}</p>
    <div class="care-option-card__lists">
      <div class="care-option-card__list-block">
        <strong>Suitable for</strong>
        <ul>${renderListItems(option.suitableFor)}</ul>
      </div>
      <div class="care-option-card__list-block care-option-card__list-block--not">
        <strong>Not suitable for</strong>
        <ul>${renderListItems(option.notSuitableFor)}</ul>
      </div>
    </div>
    <p class="care-option-card__safety" role="note">
      <strong>Safety note:</strong> ${escapeHtml(option.safetyNote)}
    </p>
    <a
      class="care-option-card__link"
      href="${escapeHtml(option.sourceUrl)}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${escapeHtml(linkAriaLabel)}"
    >
      <span>${escapeHtml(option.linkText)}</span>
      <span class="care-option-card__link-icon" aria-hidden="true">↗</span>
      <span class="care-option-card__link-note">Opens official page in new tab</span>
    </a>
  `;

  return article;
}

function showCareOptionsError(message) {
  if (!careOptionsList || !careOptionsError) {
    return;
  }

  careOptionsList.innerHTML = "";
  careOptionsError.textContent = message;
  careOptionsError.hidden = false;
}

function renderCareOptions() {
  if (!careOptionsList) {
    return;
  }

  if (careOptionsLoadFailed) {
    return;
  }

  if (!careOptionsLoaded) {
    careOptionsList.innerHTML = "";
    const loadingMessage = document.createElement("p");
    loadingMessage.className = "care-options-loading";
    loadingMessage.textContent = "Loading care options…";
    careOptionsList.appendChild(loadingMessage);

    if (careOptionsError) {
      careOptionsError.hidden = true;
    }

    return;
  }

  careOptionsList.innerHTML = "";

  if (careOptionsError) {
    careOptionsError.hidden = true;
  }

  careOptions.forEach((option) => {
    careOptionsList.appendChild(createCareOptionCard(option));
  });
}

async function loadCareOptions() {
  renderCareOptions();

  try {
    const response = await fetch(CARE_OPTIONS_URL);

    if (!response.ok) {
      throw new Error(`Failed to load care options: ${response.status}`);
    }

    const data = await response.json();
    const options = Array.isArray(data) ? data : data.options;

    if (!Array.isArray(options) || options.length === 0) {
      throw new Error("Care options data is empty or invalid");
    }

    careOptions = options;
    careOptionsLoaded = true;
    careOptionsLoadFailed = false;
    renderCareOptions();
  } catch (error) {
    console.error("HealthLens: unable to load care options.", error);
    careOptionsLoadFailed = true;
    careOptionsLoaded = false;
    showCareOptionsError("Care options could not be loaded. Please try again later.");
  }
}

function escapeHtml(text) {
  return String(text)
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

function showLoadError() {
  loadFailed = true;
  resourcesLoaded = false;
  resourceGrid.innerHTML = "";

  const errorMessage = document.createElement("p");
  errorMessage.className = "resource-load-error";
  errorMessage.setAttribute("role", "alert");
  errorMessage.textContent = "Support resources could not be loaded. Please try again later.";
  resourceGrid.appendChild(errorMessage);

  noResults.hidden = true;

  if (resultsCount) {
    resultsCount.textContent = "Support resources unavailable";
  }

  resultsStatus.textContent = "Support resources could not be loaded.";
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

function renderSupportResources() {
  if (loadFailed) {
    return;
  }

  if (!resourcesLoaded) {
    resourceGrid.innerHTML = "";
    const loadingMessage = document.createElement("p");
    loadingMessage.className = "resource-loading";
    loadingMessage.textContent = "Loading support resources…";
    resourceGrid.appendChild(loadingMessage);

    if (resultsCount) {
      resultsCount.textContent = "Loading support resources…";
    }

    return;
  }

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

async function loadSupportResources() {
  renderSupportResources();

  try {
    const response = await fetch(RESOURCES_URL);

    if (!response.ok) {
      throw new Error(`Failed to load resources: ${response.status}`);
    }

    const data = await response.json();
    const resources = Array.isArray(data) ? data : data.resources;

    if (!Array.isArray(resources) || resources.length === 0) {
      throw new Error("Resources data is empty or invalid");
    }

    supportResources = resources.map(normalizeResource);
    resourcesLoaded = true;
    loadFailed = false;
    renderSupportResources();
  } catch (error) {
    console.error("HealthLens: unable to load support resources.", error);
    showLoadError();
  }
}

function setActiveFilter(button) {
  filterButtons.forEach((btn) => {
    const isActive = btn === button;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  activeCategory = button.dataset.category;
  renderSupportResources();
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
  renderSupportResources();
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

    requestAnimationFrame(() => {
      scrollToElement(document.getElementById("resource-grid"));
    });
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

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch (error) {
    console.warn("HealthLens: theme preference could not be read.", error);
  }

  return getSystemTheme();
}

function updateThemeToggle(theme) {
  if (!themeToggle) {
    return;
  }

  const isDark = theme === "dark";
  const lightIcon = themeToggle.querySelector(".theme-toggle__icon--light");
  const darkIcon = themeToggle.querySelector(".theme-toggle__icon--dark");
  const text = themeToggle.querySelector(".theme-toggle__text");

  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );

  if (lightIcon) {
    lightIcon.hidden = isDark;
  }

  if (darkIcon) {
    darkIcon.hidden = !isDark;
  }

  if (text) {
    text.textContent = isDark ? "Light mode" : "Dark mode";
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeToggle(theme);
}

function initThemeToggle() {
  if (!themeToggle) {
    return;
  }

  const currentTheme =
    document.documentElement.getAttribute("data-theme") || getStoredTheme();
  applyTheme(currentTheme);

  themeToggle.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
      console.warn("HealthLens: theme preference could not be saved.", error);
    }

    applyTheme(nextTheme);
  });
}

initThemeToggle();
initInPageLinks();
loadSupportResources();
loadCareOptions();
