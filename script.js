/**
 * HealthLens — International Student Wellbeing Navigator
 * Version 1.2 — multi-page static HTML, CSS and JavaScript
 */

const RESOURCES_URL = "./data/resources.json";
const CARE_OPTIONS_URL = "./data/care-options.json";
const ARTICLES_URL = "./data/articles.json";
const TOPICS_URL = "./data/topics.json";

const MAX_SEARCH_RESULTS = 20;

const resourceCategoryToTopicFilter = {
  academic: "academic",
  "physical-wellbeing": "health-healthcare",
  "mental-wellbeing": "mental-wellbeing",
  housing: "housing-bills",
  money: "money-spending",
  "international-life": "international-essentials",
  community: "community-activities-sport",
  "urgent-help": "urgent-help"
};

const searchTypePriority = {
  guide: 0,
  resource: 1,
  page: 2
};

const categoryLabels = {
  academic: "Academic",
  "physical-wellbeing": "Physical Wellbeing",
  "mental-wellbeing": "Mental Wellbeing",
  housing: "Housing",
  money: "Money",
  "international-life": "International Life",
  community: "Community",
  "urgent-help": "Urgent Help"
};

const categoryIcons = {
  academic: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" stroke-width="2"/></svg>`,
  "physical-wellbeing": `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  "mental-wellbeing": `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" stroke="currentColor" stroke-width="2"/></svg>`,
  housing: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" stroke="currentColor" stroke-width="2"/><path d="M9 22V12h6v10" stroke="currentColor" stroke-width="2"/></svg>`,
  money: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M2 10h20" stroke="currentColor" stroke-width="2"/></svg>`,
  "international-life": `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" stroke="currentColor" stroke-width="2"/></svg>`,
  community: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2"/></svg>`,
  "urgent-help": `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
};

const THEME_STORAGE_KEY = "healthlens-theme";

const resourceGrid = document.getElementById("resource-grid");
const featuredResourcesGrid = document.getElementById("featured-resources");
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
const crisisJumpLinks = document.querySelectorAll("[data-category-jump]");
const themeToggle = document.getElementById("theme-toggle");
const careOptionsList = document.getElementById("care-options-list");
const careOptionsError = document.getElementById("care-options-error");

let supportResources = [];
let resourcesLoaded = false;
let loadFailed = false;
let activeCategory = "all";
let searchQuery = "";

let careOptions = [];
let careOptionsLoaded = false;
let careOptionsLoadFailed = false;

let articles = [];
let articlesLoaded = false;
let articlesLoadFailed = false;
let activeGuideTopic = "all";
let guideSearchQuery = "";

let searchIndexItems = [];
let searchIndexLoaded = false;
let searchIndexErrors = [];
let activeSearchType = "all";
let activeSearchTopic = "all";

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
      if (!href || href === "#" || href.includes("#") && href.indexOf("#") > 0) {
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

function getCategoryLabel(category) {
  return categoryLabels[category] || category;
}

function normalizeResource(resource) {
  return {
    ...resource,
    ...normaliseSourceMetadata(resource),
    categoryLabel: getCategoryLabel(resource.category)
  };
}

function getUrgencyClass(urgency) {
  return `urgency-badge--${urgency.toLowerCase()}`;
}

function getCategoryIcon(category) {
  return categoryIcons[category] || categoryIcons.community;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderListItems(items) {
  return items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
}

function formatDateForDisplay(isoDate) {
  if (!isoDate) {
    return "Not checked";
  }

  let normalized = String(isoDate).trim();
  if (/^\d{4}-\d{2}$/.test(normalized)) {
    normalized = `${normalized}-01`;
  }

  const date = new Date(`${normalized}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "Not checked";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function getSourceTypeClass(sourceType) {
  const typeMap = {
    "Official source": "official",
    "Expert source": "expert",
    "Student-facing resource": "student",
    "Commercial platform": "commercial",
    "Project note": "project",
    "Site page": "site"
  };

  return typeMap[sourceType] || "project";
}

function normaliseSourceMetadata(item) {
  return {
    sourceType: item.sourceType || "Official source",
    sourceAuthority: item.sourceAuthority || "",
    audience: item.audience || "All students",
    region: item.region || "UK",
    riskLevel: item.riskLevel || "General information",
    lastChecked: item.lastChecked || "",
    reviewFrequency: item.reviewFrequency || "",
    sourceNote: item.sourceNote || "",
    readTime: item.readTime || ""
  };
}

function renderSourceMetadata(item, options = {}) {
  const meta = normaliseSourceMetadata(item);
  const typeClass = getSourceTypeClass(meta.sourceType);
  const parts = [];

  if (meta.riskLevel === "Urgent support") {
    parts.push(
      `<span class="risk-label risk-label--urgent">${escapeHtml(meta.riskLevel)}</span>`
    );
  }

  parts.push(
    `<span class="source-label source-label--${typeClass}">${escapeHtml(meta.sourceType)}</span>`
  );

  if (options.showRisk && meta.riskLevel && meta.riskLevel !== "Urgent support") {
    parts.push(`<span class="risk-label">${escapeHtml(meta.riskLevel)}</span>`);
  }

  if (meta.sourceAuthority) {
    parts.push(
      `<span class="source-meta__item">${escapeHtml(meta.sourceAuthority)}</span>`
    );
  }

  if (options.showAudience && meta.audience) {
    parts.push(
      `<span class="source-meta__item">${escapeHtml(meta.audience)}</span>`
    );
  }

  if (options.showRegion && meta.region) {
    parts.push(`<span class="source-meta__item">${escapeHtml(meta.region)}</span>`);
  }

  if (options.showReadTime && meta.readTime) {
    parts.push(`<span class="source-meta__item">${escapeHtml(meta.readTime)}</span>`);
  }

  if (meta.sourceType === "Commercial platform") {
    parts.push(
      `<span class="source-meta__item">Check terms before using</span>`
    );
  }

  parts.push(
    `<span class="last-checked">Last checked: ${escapeHtml(formatDateForDisplay(meta.lastChecked))}</span>`
  );

  const separator = '<span class="source-meta__sep" aria-hidden="true"> · </span>';
  const inner = parts.join(separator);

  if (options.compact) {
    return `<p class="source-meta source-meta--compact">${inner}</p>`;
  }

  return `<div class="source-meta">${inner}</div>`;
}

function createResourceCard(resource) {
  const article = document.createElement("article");
  const isUrgent = resource.urgency.toLowerCase() === "high";
  const linkAriaLabel = `${resource.linkText} (${resource.sourceLabel}, opens official page in new tab)`;
  const meta = normaliseSourceMetadata(resource);
  const sourceNoteBlock = meta.sourceNote
    ? `<p class="resource-card__source-note" role="note">${escapeHtml(meta.sourceNote)}</p>`
    : "";

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
    ${renderSourceMetadata(resource, { showRisk: true, compact: true })}
    <span class="urgency-badge ${getUrgencyClass(resource.urgency)}" aria-label="Urgency level: ${resource.urgency}">
      ${escapeHtml(resource.urgency)} urgency
    </span>
    <div class="resource-card__next-step">
      <strong>Suggested next step</strong>
      ${escapeHtml(resource.nextStep)}
    </div>
    <div class="resource-card__source">
      <strong>Linked source</strong>
      <p>${escapeHtml(resource.sourceLabel)}</p>
    </div>
    ${sourceNoteBlock}
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

function showLoadError() {
  if (!resourceGrid) {
    return;
  }

  loadFailed = true;
  resourcesLoaded = false;
  resourceGrid.innerHTML = "";

  const errorMessage = document.createElement("p");
  errorMessage.className = "resource-load-error";
  errorMessage.setAttribute("role", "alert");
  errorMessage.textContent = "Support resources could not be loaded. Please try again later.";
  resourceGrid.appendChild(errorMessage);

  if (noResults) {
    noResults.hidden = true;
  }

  if (resultsCount) {
    resultsCount.textContent = "Support resources unavailable";
  }

  if (resultsStatus) {
    resultsStatus.textContent = "Support resources could not be loaded.";
  }
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
    resource.linkText,
    resource.sourceType,
    resource.audience
  ]
    .join(" ")
    .toLowerCase();

  return matchesCategory && searchableText.includes(query);
}

function renderSupportResources() {
  if (!resourceGrid || loadFailed) {
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

  if (noResults) {
    noResults.hidden = filtered.length > 0;
  }

  const countMessage = filtered.length > 0
    ? `Showing ${filtered.length} of ${total} resources`
    : "Showing 0 resources";

  const statusMessage = filtered.length > 0
    ? `${filtered.length} support resource${filtered.length === 1 ? "" : "s"} found.`
    : "No matching resources found.";

  if (resultsCount) {
    resultsCount.textContent = countMessage;
  }

  if (resultsStatus) {
    resultsStatus.textContent = statusMessage;
  }
}

function renderFeaturedResources() {
  if (!featuredResourcesGrid || !resourcesLoaded || loadFailed) {
    return;
  }

  const featuredIds = (featuredResourcesGrid.dataset.featuredIds || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  let featured = supportResources;
  if (featuredIds.length > 0) {
    featured = featuredIds
      .map((id) => supportResources.find((resource) => resource.id === id))
      .filter(Boolean);
  } else {
    featured = supportResources.slice(0, 4);
  }

  featuredResourcesGrid.innerHTML = "";
  featured.forEach((resource) => {
    featuredResourcesGrid.appendChild(createResourceCard(resource));
  });
}

async function fetchSupportResources() {
  if (resourcesLoaded || loadFailed) {
    return supportResources;
  }

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
  return supportResources;
}

async function loadSupportResources() {
  if (!resourceGrid && !featuredResourcesGrid) {
    return;
  }

  if (resourceGrid) {
    renderSupportResources();
  }

  if (featuredResourcesGrid) {
    featuredResourcesGrid.innerHTML = "";
    const loadingMessage = document.createElement("p");
    loadingMessage.className = "resource-loading";
    loadingMessage.textContent = "Loading featured resources…";
    featuredResourcesGrid.appendChild(loadingMessage);
  }

  try {
    await fetchSupportResources();
    applyInitialCategoryFromUrl();
    renderSupportResources();
    renderFeaturedResources();
  } catch (error) {
    console.error("HealthLens: unable to load support resources.", error);
    if (featuredResourcesGrid) {
      featuredResourcesGrid.innerHTML = "";
      const errorMessage = document.createElement("p");
      errorMessage.className = "resource-load-error";
      errorMessage.setAttribute("role", "alert");
      errorMessage.textContent = "Featured resources could not be loaded.";
      featuredResourcesGrid.appendChild(errorMessage);
    }
    showLoadError();
  }
}

function applyInitialCategoryFromUrl() {
  if (!resourceGrid || filterButtons.length === 0) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  if (category && category !== "all") {
    activateCategoryFilter(category);
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

function initSupportFinder() {
  if (!resourceGrid) {
    return;
  }

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      searchQuery = event.target.value;
      renderSupportResources();
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveFilter(button);
    });
  });

  crisisJumpLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const category = link.dataset.categoryJump;
      if (!category) {
        return;
      }

      if (resourceGrid) {
        event.preventDefault();
        activateCategoryFilter(category);
        requestAnimationFrame(() => {
          scrollToElement(resourceGrid);
        });
      }
    });
  });

  loadSupportResources();
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
  if (!careOptionsList || careOptionsLoadFailed) {
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

function initCareOptions() {
  if (!careOptionsList) {
    return;
  }

  loadCareOptions();
}

async function loadCareOptions() {
  if (!careOptionsList) {
    return;
  }

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

function closeAccordionItem(trigger) {
  trigger.setAttribute("aria-expanded", "false");
  const panel = document.getElementById(trigger.getAttribute("aria-controls"));
  if (panel) {
    panel.hidden = true;
  }
}

function openAccordionItem(trigger) {
  trigger.setAttribute("aria-expanded", "true");
  const panel = document.getElementById(trigger.getAttribute("aria-controls"));
  if (panel) {
    panel.hidden = false;
  }
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

function initAccordion() {
  if (accordionTriggers.length === 0) {
    return;
  }

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      toggleAccordion(trigger);
    });
  });
}

function initContactForm() {
  if (!contactForm) {
    return;
  }

  const formFields = {
    name: {
      input: document.getElementById("contact-name"),
      error: document.getElementById("contact-name-error"),
      validate: (value) => (value.trim() ? "" : "Please enter your name.")
    },
    email: {
      input: document.getElementById("contact-email"),
      error: document.getElementById("contact-email-error"),
      validate: (value) => {
        if (!value.trim()) {
          return "Please enter your email address.";
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value.trim()) ? "" : "Please enter a valid email address.";
      }
    },
    topic: {
      input: document.getElementById("contact-topic"),
      error: document.getElementById("contact-topic-error"),
      validate: (value) => (value ? "" : "Please select a topic.")
    },
    message: {
      input: document.getElementById("contact-message"),
      error: document.getElementById("contact-message-error"),
      validate: (value) => {
        if (!value.trim()) {
          return "Please enter a message.";
        }
        return value.trim().length < 10
          ? "Your message must be at least 10 characters long."
          : "";
      }
    },
    consent: {
      input: document.getElementById("contact-consent"),
      error: document.getElementById("contact-consent-error"),
      validate: (checked) =>
        checked
          ? ""
          : "You must confirm that you understand this demo provides signposting only and does not provide professional advice."
    }
  };

  function setFieldError(field, message) {
    if (!field.input || !field.error) {
      return;
    }

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
    if (formSuccess) {
      formSuccess.hidden = true;
    }
    clearFormErrors();

    if (validateForm()) {
      if (formSuccess) {
        formSuccess.hidden = false;
        formSuccess.focus();
      }
      contactForm.reset();
    } else {
      const firstInvalid = contactForm.querySelector("[aria-invalid='true']");
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });

  Object.values(formFields).forEach((field) => {
    if (!field.input) {
      return;
    }

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
}

function initMobileNav() {
  if (!navToggle || !siteNav) {
    return;
  }

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

function initFeaturedResourcesOnly() {
  if (!featuredResourcesGrid || resourceGrid) {
    return;
  }

  loadSupportResources();
}

function filterArticlesByTopic(topicSlug, articlesList) {
  if (!topicSlug || topicSlug === "all") {
    return articlesList;
  }

  return articlesList.filter((article) => article.topicSlug === topicSlug);
}

function articleMatchesGuideSearch(article, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return true;
  }

  const searchableText = [
    article.title,
    article.summary,
    article.whyItMatters,
    article.topic,
    article.audience,
    article.sourceType,
    article.riskLevel,
    ...(article.keyPoints || [])
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

function createGuideCard(article, options = {}) {
  const maxKeyPoints = options.maxKeyPoints ?? 3;
  const showReadGuideLink = options.showReadGuideLink ?? false;
  const showWhyItMatters = options.showWhyItMatters ?? true;
  const keyPoints = (article.keyPoints || []).slice(0, maxKeyPoints);
  const meta = normaliseSourceMetadata(article);
  const sourceNoteBlock = meta.sourceNote
    ? `<p class="guide-card__source-note" role="note">${escapeHtml(meta.sourceNote)}</p>`
    : "";

  const articleEl = document.createElement("article");
  articleEl.className = "guide-card";
  articleEl.id = article.id;
  articleEl.dataset.topic = article.topicSlug;

  const sourceLinks = (article.sources || [])
    .map((source) => {
      const linkLabel = `${source.label} (opens in new tab)`;
      return `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(linkLabel)}">${escapeHtml(source.label)}</a></li>`;
    })
    .join("");

  const readGuideLink = showReadGuideLink
    ? `<a class="guide-card__read-link" href="./guides.html#${escapeHtml(article.id)}">Read health tip: ${escapeHtml(article.title)}</a>`
    : "";

  const whyItMatters = showWhyItMatters
    ? `<p class="guide-card__why"><strong>Why it matters:</strong> ${escapeHtml(article.whyItMatters)}</p>`
    : "";

  articleEl.innerHTML = `
    <header class="guide-card__header">
      <span class="guide-badge guide-badge--topic">${escapeHtml(article.topic)}</span>
      <h3 class="guide-card__title">${escapeHtml(article.title)}</h3>
    </header>
    <p class="guide-card__summary">${escapeHtml(article.summary)}</p>
    ${whyItMatters}
    ${renderSourceMetadata(article, {
      showAudience: true,
      showReadTime: true,
      showRisk: true,
      compact: true
    })}
    <div class="guide-key-points">
      <strong>Key points</strong>
      <ul>${renderListItems(keyPoints)}</ul>
    </div>
    <div class="guide-sources">
      <strong>Official and expert sources</strong>
      <ul>${sourceLinks}</ul>
    </div>
    ${sourceNoteBlock}
    <p class="guide-card__disclaimer" role="note">
      <strong>Signposting only.</strong> This health tip summarises trusted sources and does not provide medical, legal, financial or immigration advice. Check the original source for current information.
    </p>
    ${readGuideLink}
  `;

  return articleEl;
}

function renderGuideCards(articlesToRender, container, options = {}) {
  if (!container) {
    return;
  }

  container.innerHTML = "";

  if (!articlesToRender.length) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "guide-empty-state";
    emptyMessage.textContent =
      options.emptyMessage ||
      "No health tips are available for this topic yet.";
    container.appendChild(emptyMessage);
    return;
  }

  articlesToRender.forEach((article) => {
    container.appendChild(createGuideCard(article, options));
  });
}

async function loadArticles() {
  if (articlesLoaded) {
    return articles;
  }

  if (articlesLoadFailed) {
    return [];
  }

  try {
    const response = await fetch(ARTICLES_URL);

    if (!response.ok) {
      throw new Error(`Failed to load articles: ${response.status}`);
    }

    const data = await response.json();
    const articleList = Array.isArray(data) ? data : data.articles;

    if (!Array.isArray(articleList)) {
      throw new Error("Articles data is invalid");
    }

    articles = articleList;
    articlesLoaded = true;
    articlesLoadFailed = false;
    return articles;
  } catch (error) {
    console.error("HealthLens: unable to load health tips.", error);
    articlesLoadFailed = true;
    articlesLoaded = false;
    return [];
  }
}

async function renderFeaturedGuidesForPage() {
  const guideContainers = document.querySelectorAll("[data-guides-container]");
  if (!guideContainers.length) {
    return;
  }

  guideContainers.forEach((container) => {
    container.innerHTML = "";
    const loadingMessage = document.createElement("p");
    loadingMessage.className = "guide-loading";
    loadingMessage.textContent = "Loading health tips…";
    container.appendChild(loadingMessage);
  });

  const loadedArticles = await loadArticles();

  guideContainers.forEach((container) => {
    const topicSlug = container.dataset.topic || "all";

    if (articlesLoadFailed) {
      container.innerHTML = "";
      const errorMessage = document.createElement("p");
      errorMessage.className = "guide-empty-state";
      errorMessage.setAttribute("role", "alert");
      errorMessage.textContent = "Health tips could not be loaded. Please try again later.";
      container.appendChild(errorMessage);
      return;
    }

    const filtered = filterArticlesByTopic(topicSlug, loadedArticles);
    renderGuideCards(filtered, container, {
      showReadGuideLink: true,
      maxKeyPoints: 3,
      showWhyItMatters: false
    });
  });
}

function renderGuidesLibrary() {
  const guidesGrid = document.querySelector("[data-guides-all]");
  const guidesCount = document.getElementById("guides-count");
  const guidesStatus = document.getElementById("guides-status");

  if (!guidesGrid || !articlesLoaded) {
    return;
  }

  if (articlesLoadFailed) {
    guidesGrid.innerHTML = "";
    const errorMessage = document.createElement("p");
    errorMessage.className = "guide-empty-state";
    errorMessage.setAttribute("role", "alert");
    errorMessage.textContent = "Health tips could not be loaded. Please try again later.";
    guidesGrid.appendChild(errorMessage);

    if (guidesCount) {
      guidesCount.textContent = "Health tips unavailable";
    }

    if (guidesStatus) {
      guidesStatus.textContent = "Health tips could not be loaded.";
    }

    return;
  }

  let filtered = filterArticlesByTopic(activeGuideTopic, articles);
  filtered = filtered.filter((article) =>
    articleMatchesGuideSearch(article, guideSearchQuery)
  );

  renderGuideCards(filtered, guidesGrid, {
    showReadGuideLink: false,
    maxKeyPoints: 3,
    showWhyItMatters: true,
    emptyMessage: "No health tips match your search. Try a different topic or search term."
  });

  const total = articles.length;
  const countMessage = filtered.length > 0
    ? `Showing ${filtered.length} of ${total} health tips`
    : "Showing 0 health tips";

  const statusMessage = filtered.length > 0
    ? `${filtered.length} health tip${filtered.length === 1 ? "" : "s"} found.`
    : "No matching health tips found.";

  if (guidesCount) {
    guidesCount.textContent = countMessage;
  }

  if (guidesStatus) {
    guidesStatus.textContent = statusMessage;
  }
}

function setActiveGuideFilter(button) {
  const filterButtons = document.querySelectorAll(".guide-filter-btn");
  filterButtons.forEach((btn) => {
    const isActive = btn === button;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  activeGuideTopic = button.dataset.topic;
  renderGuidesLibrary();
}

async function initGuidesPage() {
  const guidesGrid = document.querySelector("[data-guides-all]");
  if (!guidesGrid) {
    return;
  }

  const filterButtons = document.querySelectorAll(".guide-filter-btn");
  const guideSearchInput = document.getElementById("guide-search");

  guidesGrid.innerHTML = "";
  const loadingMessage = document.createElement("p");
  loadingMessage.className = "guide-loading";
  loadingMessage.textContent = "Loading health tips…";
  guidesGrid.appendChild(loadingMessage);

  await loadArticles();
  renderGuidesLibrary();

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveGuideFilter(button);
    });
  });

  if (guideSearchInput) {
    guideSearchInput.addEventListener("input", (event) => {
      guideSearchQuery = event.target.value;
      renderGuidesLibrary();
    });
  }

  const hashId = window.location.hash.replace("#", "");
  if (hashId) {
    const targetGuide = document.getElementById(hashId);
    if (targetGuide) {
      scrollToElement(targetGuide);
    }
  }
}

async function initGuides() {
  const guideContainers = document.querySelector("[data-guides-container]");
  const guidesPage = document.querySelector("[data-guides-all]");

  if (!guideContainers && !guidesPage) {
    return;
  }

  if (guideContainers) {
    await renderFeaturedGuidesForPage();
  }

  if (guidesPage) {
    await initGuidesPage();
  }
}

function normaliseTopicPages(topics) {
  if (!Array.isArray(topics)) {
    return [];
  }

  return topics.map((topic) => {
    const meta = normaliseSourceMetadata(topic);

    return {
      id: topic.id,
      type: "page",
      title: topic.title,
      summary: topic.summary,
      topic: topic.topic,
      category: topic.topic,
      audience: meta.audience,
      sourceType: topic.sourceType || "Site page",
      sourceAuthority: meta.sourceAuthority,
      region: meta.region,
      riskLevel: meta.riskLevel,
      lastChecked: meta.lastChecked,
      reviewFrequency: meta.reviewFrequency,
      sourceNote: meta.sourceNote,
      url: topic.url,
      keywords: [
        ...(Array.isArray(topic.keywords) ? topic.keywords : []),
        meta.sourceType,
        meta.sourceAuthority,
        meta.riskLevel,
        formatDateForDisplay(meta.lastChecked)
      ].filter(Boolean),
      topicFilterKey: topic.id,
      meta: {
        sourceLabels: meta.sourceAuthority ? [meta.sourceAuthority] : []
      }
    };
  });
}

function normaliseResources(resources) {
  if (!Array.isArray(resources)) {
    return [];
  }

  return resources.map((resource) => {
    const categoryLabel = getCategoryLabel(resource.category);
    const meta = normaliseSourceMetadata(resource);
    const keywords = [
      resource.title,
      categoryLabel,
      resource.category,
      resource.description,
      resource.sourceLabel,
      meta.sourceType,
      meta.sourceAuthority,
      meta.audience,
      meta.region,
      meta.riskLevel,
      meta.sourceNote,
      resource.nextStep,
      resource.linkText,
      formatDateForDisplay(meta.lastChecked),
      "last checked"
    ].filter(Boolean);

    return {
      id: resource.id,
      type: "resource",
      title: resource.title,
      summary: resource.description || resource.summary || "",
      topic: categoryLabel,
      category: categoryLabel,
      audience: meta.audience,
      sourceType: meta.sourceType,
      sourceAuthority: meta.sourceAuthority,
      region: meta.region,
      riskLevel: meta.riskLevel,
      sourceNote: meta.sourceNote,
      url: resource.sourceUrl,
      keywords,
      lastChecked: meta.lastChecked,
      topicFilterKey:
        resourceCategoryToTopicFilter[resource.category] || resource.category,
      meta: {
        sourceLabels: resource.sourceLabel ? [resource.sourceLabel] : [],
        linkText: resource.linkText || "Open official resource",
        isExternal: true
      }
    };
  });
}

function normaliseArticles(articlesList) {
  if (!Array.isArray(articlesList)) {
    return [];
  }

  return articlesList.map((article) => {
    const sourceLabels = (article.sources || []).map((source) => source.label);
    const meta = normaliseSourceMetadata(article);
    const keywords = [
      article.title,
      article.topic,
      meta.audience,
      article.summary,
      article.whyItMatters,
      meta.sourceType,
      meta.sourceAuthority,
      meta.region,
      meta.riskLevel,
      meta.sourceNote,
      article.readTime,
      formatDateForDisplay(meta.lastChecked),
      "last checked",
      ...(article.keyPoints || []),
      ...sourceLabels
    ].filter(Boolean);

    return {
      id: article.id,
      type: "guide",
      title: article.title,
      summary: article.summary,
      topic: article.topic,
      category: article.topic,
      audience: meta.audience,
      sourceType: meta.sourceType,
      sourceAuthority: meta.sourceAuthority,
      region: meta.region,
      riskLevel: meta.riskLevel,
      sourceNote: meta.sourceNote,
      readTime: meta.readTime,
      url: `./guides.html#${article.id}`,
      keywords,
      lastChecked: meta.lastChecked,
      topicFilterKey: article.topicSlug,
      meta: {
        sourceLabels,
        isExternal: false
      }
    };
  });
}

async function loadSearchIndex() {
  if (searchIndexLoaded) {
    return searchIndexItems;
  }

  searchIndexErrors = [];
  const items = [];

  const loaders = [
    fetch(TOPICS_URL)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`topics.json (${response.status})`);
        }
        const data = await response.json();
        const topics = Array.isArray(data) ? data : data.topics;
        items.push(...normaliseTopicPages(topics));
      })
      .catch((error) => {
        searchIndexErrors.push("Topic pages could not be loaded.");
        console.error("HealthLens: unable to load topics for search.", error);
      }),
    fetch(RESOURCES_URL)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`resources.json (${response.status})`);
        }
        const data = await response.json();
        const resources = Array.isArray(data) ? data : data.resources;
        items.push(...normaliseResources(resources));
      })
      .catch((error) => {
        searchIndexErrors.push("Support resources could not be loaded.");
        console.error("HealthLens: unable to load resources for search.", error);
      }),
    fetch(ARTICLES_URL)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`articles.json (${response.status})`);
        }
        const data = await response.json();
        const articlesList = Array.isArray(data) ? data : data.articles;
        items.push(...normaliseArticles(articlesList));
      })
      .catch((error) => {
        searchIndexErrors.push("Health tips could not be loaded.");
        console.error("HealthLens: unable to load articles for search.", error);
      })
  ];

  await Promise.all(loaders);
  searchIndexItems = items;
  searchIndexLoaded = true;
  return searchIndexItems;
}

function buildSearchIndex() {
  return searchIndexItems;
}

function tokenizeSearchQuery(query) {
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

function scoreSearchItem(item, queryTokens, rawQuery) {
  const raw = rawQuery.trim().toLowerCase();
  if (!raw && queryTokens.length === 0) {
    return 1;
  }

  const title = (item.title || "").toLowerCase();
  const summary = (item.summary || "").toLowerCase();
  const topic = (item.topic || "").toLowerCase();
  const category = (item.category || "").toLowerCase();
  const audience = (item.audience || "").toLowerCase();
  const sourceType = (item.sourceType || "").toLowerCase();
  const sourceAuthority = (item.sourceAuthority || "").toLowerCase();
  const riskLevel = (item.riskLevel || "").toLowerCase();
  const sourceNote = (item.sourceNote || "").toLowerCase();
  const keywords = (item.keywords || []).join(" ").toLowerCase();
  const sourceLabels = (item.meta?.sourceLabels || []).join(" ").toLowerCase();
  const lastCheckedDisplay = formatDateForDisplay(item.lastChecked).toLowerCase();

  let score = 0;

  if (raw && title === raw) {
    score += 80;
  }

  if (raw && title.includes(raw)) {
    score += 50;
  }

  if (raw && summary.includes(raw)) {
    score += 10;
  }

  if (raw && (topic.includes(raw) || category.includes(raw))) {
    score += 30;
  }

  if (raw && keywords.includes(raw)) {
    score += 20;
  }

  if (raw && sourceLabels.includes(raw)) {
    score += 8;
  }

  if (raw && sourceAuthority.includes(raw)) {
    score += 20;
  }

  if (raw && (sourceType.includes(raw) || riskLevel.includes(raw) || lastCheckedDisplay.includes(raw))) {
    score += 10;
  }

  queryTokens.forEach((token) => {
    if (title.includes(token)) {
      score += 25;
    }

    if (topic.includes(token) || category.includes(token)) {
      score += 30;
    }

    if (keywords.includes(token)) {
      score += 20;
    }

    if (summary.includes(token)) {
      score += 10;
    }

    if (sourceLabels.includes(token)) {
      score += 8;
    }

    if (audience.includes(token)) {
      score += 5;
    }

    if (sourceType.includes(token)) {
      score += 5;
    }

    if (sourceAuthority.includes(token)) {
      score += 20;
    }

    if (riskLevel.includes(token)) {
      score += 10;
    }

    if (lastCheckedDisplay.includes(token) || sourceNote.includes(token)) {
      score += 5;
    }
  });

  return score;
}

function searchIndex(items, query, typeFilter, topicFilter) {
  const queryTokens = tokenizeSearchQuery(query);
  const hasQuery = query.trim().length > 0;
  const hasTypeFilter = typeFilter && typeFilter !== "all";
  const hasTopicFilter = topicFilter && topicFilter !== "all";

  if (!hasQuery && !hasTypeFilter && !hasTopicFilter) {
    return [];
  }

  let filtered = items;

  if (hasTypeFilter) {
    filtered = filtered.filter((item) => item.type === typeFilter);
  }

  if (hasTopicFilter) {
    filtered = filtered.filter(
      (item) => item.topicFilterKey === topicFilter
    );
  }

  if (!hasQuery) {
    return filtered
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  const scored = filtered
    .map((item) => ({
      item,
      score: scoreSearchItem(item, queryTokens, query)
    }))
    .filter((entry) => entry.score > 0);

  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    const typeDiff =
      (searchTypePriority[a.item.type] ?? 9) -
      (searchTypePriority[b.item.type] ?? 9);

    if (typeDiff !== 0) {
      return typeDiff;
    }

    if (
      a.item.type === "page" &&
      a.item.title.toLowerCase() === query.trim().toLowerCase()
    ) {
      return -1;
    }

    if (
      b.item.type === "page" &&
      b.item.title.toLowerCase() === query.trim().toLowerCase()
    ) {
      return 1;
    }

    return a.item.title.localeCompare(b.item.title);
  });

  return scored.map((entry) => entry.item);
}

function getSearchResultTypeLabel(type) {
  if (type === "page") {
    return "Page";
  }

  if (type === "resource") {
    return "Resource";
  }

  if (type === "guide") {
    return "Guide";
  }

  return type;
}

function getSearchResultLink(item) {
  if (item.type === "page") {
    return {
      text: "Open topic page",
      ariaLabel: `Open topic page: ${item.title}`
    };
  }

  if (item.type === "resource") {
    return {
      text: "Open official or expert resource",
      ariaLabel: `${item.meta?.linkText || "Open official or expert resource"} (${item.meta?.sourceLabels?.[0] || item.title}, opens in new tab)`
    };
  }

  return {
    text: "Read health tip summary",
    ariaLabel: `Read health tip summary: ${item.title}`
  };
}

function createSearchResultCard(item) {
  const article = document.createElement("article");
  const linkInfo = getSearchResultLink(item);
  const isExternal = Boolean(item.meta?.isExternal);
  const typeClass = item.type;

  article.className = "search-result-card";
  article.dataset.type = item.type;

  article.innerHTML = `
    <header class="search-result-card__header">
      <span class="result-type-badge result-type-badge--${typeClass}">${escapeHtml(getSearchResultTypeLabel(item.type))}</span>
      <h2 class="search-result-card__title">${escapeHtml(item.title)}</h2>
    </header>
    <p class="search-result-card__summary">${escapeHtml(item.summary)}</p>
    <p class="search-meta search-meta__topic"><strong>Topic:</strong> ${escapeHtml(item.topic || item.category || "General")}</p>
    ${renderSourceMetadata(item, { showRisk: true, compact: true })}
    <a
      class="search-result-card__link"
      href="${escapeHtml(item.url)}"
      ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""}
      aria-label="${escapeHtml(linkInfo.ariaLabel)}"
    >
      ${escapeHtml(linkInfo.text)}${isExternal ? " (opens in new tab)" : ""}
    </a>
  `;

  return article;
}

function renderSearchResults(results, totalCount) {
  const resultsContainer = document.getElementById("search-results");
  const emptyState = document.getElementById("search-empty-state");

  if (!resultsContainer) {
    return;
  }

  resultsContainer.innerHTML = "";

  if (searchIndexErrors.length > 0) {
    searchIndexErrors.forEach((message) => {
      const errorMessage = document.createElement("p");
      errorMessage.className = "search-empty-state";
      errorMessage.setAttribute("role", "alert");
      errorMessage.textContent = message;
      resultsContainer.appendChild(errorMessage);
    });
  }

  if (results.length === 0) {
    if (emptyState) {
      emptyState.hidden = false;
    }
    return;
  }

  if (emptyState) {
    emptyState.hidden = true;
  }

  const visibleResults = results.slice(0, MAX_SEARCH_RESULTS);
  visibleResults.forEach((item) => {
    resultsContainer.appendChild(createSearchResultCard(item));
  });

  if (totalCount > MAX_SEARCH_RESULTS) {
    const limitNote = document.createElement("p");
    limitNote.className = "search-limit-note";
    limitNote.textContent = `Showing ${MAX_SEARCH_RESULTS} of ${totalCount} results.`;
    resultsContainer.appendChild(limitNote);
  }
}

function updateSearchStatus(count, query, totalCount) {
  const status = document.getElementById("search-status");

  if (!status) {
    return;
  }

  const trimmedQuery = query.trim();

  if (!trimmedQuery && activeSearchType === "all" && activeSearchTopic === "all") {
    status.textContent = "Enter a keyword to search topic pages, resources and health tips.";
    return;
  }

  if (count === 0) {
    status.textContent = trimmedQuery
      ? `No matching results found for “${trimmedQuery}”.`
      : "No matching results found for the selected filters.";
    return;
  }

  if (totalCount > MAX_SEARCH_RESULTS) {
    status.textContent = trimmedQuery
      ? `Showing ${MAX_SEARCH_RESULTS} of ${totalCount} results for “${trimmedQuery}”.`
      : `Showing ${MAX_SEARCH_RESULTS} of ${totalCount} results for the selected filters.`;
    return;
  }

  status.textContent = trimmedQuery
    ? `${count} result${count === 1 ? "" : "s"} found for “${trimmedQuery}”.`
    : `${count} result${count === 1 ? "" : "s"} found for the selected filters.`;
}

function updateSearchURL(query, typeFilter, topicFilter) {
  const params = new URLSearchParams();

  if (query.trim()) {
    params.set("q", query.trim());
  }

  if (typeFilter && typeFilter !== "all") {
    params.set("type", typeFilter);
  }

  if (topicFilter && topicFilter !== "all") {
    params.set("topic", topicFilter);
  }

  const queryString = params.toString();
  const nextUrl = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname;

  window.history.replaceState({}, "", nextUrl);
}

function syncSearchFromURL() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q") || "";
  const type = params.get("type") || "all";
  const topic = params.get("topic") || "all";
  const searchInput = document.getElementById("global-search-input");
  const topicSelect = document.getElementById("search-topic-filter");

  activeSearchType = type;
  activeSearchTopic = topic;

  if (searchInput) {
    searchInput.value = query;
  }

  if (topicSelect) {
    topicSelect.value = topic;
  }

  document.querySelectorAll(".search-type-btn").forEach((button) => {
    const isActive = button.dataset.type === type;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  return { query, type, topic };
}

function runGlobalSearch() {
  const searchInput = document.getElementById("global-search-input");
  const query = searchInput ? searchInput.value : "";
  const items = buildSearchIndex();
  const results = searchIndex(
    items,
    query,
    activeSearchType,
    activeSearchTopic
  );

  updateSearchURL(query, activeSearchType, activeSearchTopic);
  renderSearchResults(results, results.length);
  updateSearchStatus(
    Math.min(results.length, MAX_SEARCH_RESULTS),
    query,
    results.length
  );
}

function setActiveSearchType(button) {
  document.querySelectorAll(".search-type-btn").forEach((btn) => {
    const isActive = btn === button;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  activeSearchType = button.dataset.type;
  runGlobalSearch();
}

async function initGlobalSearch() {
  const searchPage = document.querySelector("[data-global-search-page]");

  if (!searchPage) {
    return;
  }

  const searchForm = document.getElementById("global-search-form");
  const searchInput = document.getElementById("global-search-input");
  const clearButton = document.getElementById("search-clear-btn");
  const topicSelect = document.getElementById("search-topic-filter");
  const typeButtons = document.querySelectorAll(".search-type-btn");
  const resultsContainer = document.getElementById("search-results");
  const status = document.getElementById("search-status");

  if (resultsContainer) {
    resultsContainer.innerHTML = "";
    const loadingMessage = document.createElement("p");
    loadingMessage.className = "search-loading";
    loadingMessage.textContent = "Loading search index…";
    resultsContainer.appendChild(loadingMessage);
  }

  if (status) {
    status.textContent = "Loading search index…";
  }

  await loadSearchIndex();

  if (resultsContainer) {
    resultsContainer.innerHTML = "";
  }

  syncSearchFromURL();
  runGlobalSearch();

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      runGlobalSearch();
    });
  }

  typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveSearchType(button);
    });
  });

  if (topicSelect) {
    topicSelect.addEventListener("change", () => {
      activeSearchTopic = topicSelect.value;
      runGlobalSearch();
    });
  }

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
      }

      activeSearchType = "all";
      activeSearchTopic = "all";

      if (topicSelect) {
        topicSelect.value = "all";
      }

      typeButtons.forEach((button) => {
        const isAll = button.dataset.type === "all";
        button.classList.toggle("is-active", isAll);
        button.setAttribute("aria-pressed", String(isAll));
      });

      updateSearchURL("", "all", "all");
      renderSearchResults([], 0);
      updateSearchStatus(0, "", 0);

      if (searchInput) {
        searchInput.focus();
      }
    });
  }
}

function initHeaderSearchEntry() {
  const headerSearchForm = document.getElementById("header-search-form");

  if (!headerSearchForm) {
    return;
  }

  headerSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = headerSearchForm.querySelector('input[type="search"]');
    const query = input ? input.value.trim() : "";
    const target = query
      ? `./search.html?q=${encodeURIComponent(query)}`
      : "./search.html";
    window.location.href = target;
  });
}

initThemeToggle();
initInPageLinks();
initMobileNav();
initSupportFinder();
initFeaturedResourcesOnly();
initCareOptions();
initAccordion();
initContactForm();
initGuides();
initGlobalSearch();
initHeaderSearchEntry();
