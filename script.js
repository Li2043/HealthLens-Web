/**
 * HealthLens — Student Wellbeing & Support Hub
 * Version 0.1 — vanilla JavaScript
 */

/* --------------------------------------------------------------------------
   Support resources data
   -------------------------------------------------------------------------- */
const supportResources = [
  {
    id: "academic-stress",
    title: "Academic Stress Support",
    category: "academic",
    categoryLabel: "Academic",
    description: "Feeling overwhelmed by deadlines, exams, or workload? Explore study skills workshops, tutor office hours, and academic advising.",
    urgency: "Medium",
    nextStep: "Contact your personal tutor or visit the university study skills centre to discuss workload planning."
  },
  {
    id: "mental-wellbeing",
    title: "Mental Wellbeing Services",
    category: "wellbeing",
    categoryLabel: "Wellbeing",
    description: "Access counselling appointments, wellbeing drop-ins, and self-help guides for everyday stress and emotional support.",
    urgency: "Medium",
    nextStep: "Book a wellbeing appointment through your university student support portal or attend a drop-in session."
  },
  {
    id: "housing-concerns",
    title: "Housing Concerns",
    category: "housing",
    categoryLabel: "Housing",
    description: "Need help with accommodation issues, tenancy questions, or disputes with landlords? Student housing advisers can guide you.",
    urgency: "Medium",
    nextStep: "Speak to your university accommodation team or students' union housing advice service."
  },
  {
    id: "financial-worries",
    title: "Financial Worries",
    category: "finance",
    categoryLabel: "Finance",
    description: "Struggling with budgeting, bursaries, or unexpected costs? Financial support teams can help you explore options and hardship funds.",
    urgency: "Medium",
    nextStep: "Contact the student finance office to check eligibility for bursaries, emergency grants, or budgeting support."
  },
  {
    id: "international-support",
    title: "International Student Support",
    category: "international",
    categoryLabel: "International",
    description: "Support for visa queries, cultural adjustment, language resources, and settling into UK university life.",
    urgency: "Low",
    nextStep: "Visit the international student office or join a welcome programme for peer and adviser support."
  },
  {
    id: "societies-belonging",
    title: "Societies & Belonging",
    category: "community",
    categoryLabel: "Community",
    description: "Connect with clubs, societies, and peer groups to build friendships and a sense of belonging on campus.",
    urgency: "Low",
    nextStep: "Browse the students' union society listings and attend a taster session or welcome fair."
  },
  {
    id: "volunteering-community",
    title: "Volunteering & Community",
    category: "community",
    categoryLabel: "Community",
    description: "Get involved in local volunteering, community projects, and civic engagement opportunities alongside your studies.",
    urgency: "Low",
    nextStep: "Explore the university volunteering hub or Bristol SU community programmes for current opportunities."
  },
  {
    id: "urgent-help",
    title: "Urgent Help Information",
    category: "urgent",
    categoryLabel: "Urgent",
    description: "If you or someone else is in immediate danger or needs crisis support, use emergency services and crisis helplines — not this website.",
    urgency: "High",
    nextStep: "Call 999 in an emergency. For urgent mental health support, contact NHS 111 or your university out-of-hours helpline."
  }
];

/* --------------------------------------------------------------------------
   DOM references
   -------------------------------------------------------------------------- */
const resourceGrid = document.getElementById("resource-grid");
const noResults = document.getElementById("no-results");
const resultsStatus = document.getElementById("results-status");
const searchInput = document.getElementById("resource-search");
const filterButtons = document.querySelectorAll(".filter-btn");
const accordionTriggers = document.querySelectorAll(".accordion-trigger");
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.getElementById("site-nav");

/* --------------------------------------------------------------------------
   State
   -------------------------------------------------------------------------- */
let activeCategory = "all";
let searchQuery = "";

/* --------------------------------------------------------------------------
   Support Finder — render cards
   -------------------------------------------------------------------------- */
function getUrgencyClass(urgency) {
  const level = urgency.toLowerCase();
  return `urgency-badge--${level}`;
}

function createResourceCard(resource) {
  const article = document.createElement("article");
  article.className = "resource-card";
  article.dataset.category = resource.category;
  article.dataset.id = resource.id;

  article.innerHTML = `
    <span class="resource-card__category">${resource.categoryLabel}</span>
    <h3 class="resource-card__title">${resource.title}</h3>
    <p class="resource-card__description">${resource.description}</p>
    <span class="urgency-badge ${getUrgencyClass(resource.urgency)}" aria-label="Urgency level: ${resource.urgency}">
      ${resource.urgency} urgency
    </span>
    <div class="resource-card__next-step">
      <strong>Suggested next step</strong>
      ${resource.nextStep}
    </div>
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
    resource.nextStep
  ]
    .join(" ")
    .toLowerCase();

  const matchesSearch = searchableText.includes(query);
  return matchesCategory && matchesSearch;
}

function renderResources() {
  const filtered = supportResources.filter(resourceMatchesFilter);

  resourceGrid.innerHTML = "";

  filtered.forEach((resource) => {
    resourceGrid.appendChild(createResourceCard(resource));
  });

  const hasResults = filtered.length > 0;
  noResults.hidden = hasResults;

  const statusMessage = hasResults
    ? `${filtered.length} support resource${filtered.length === 1 ? "" : "s"} found.`
    : "No matching resources found.";

  resultsStatus.textContent = statusMessage;
}

/* --------------------------------------------------------------------------
   Support Finder — search and filter handlers
   -------------------------------------------------------------------------- */
function setActiveFilter(button) {
  filterButtons.forEach((btn) => {
    const isActive = btn === button;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  activeCategory = button.dataset.category;
  renderResources();
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

/* --------------------------------------------------------------------------
   FAQ Accordion
   -------------------------------------------------------------------------- */
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

/* --------------------------------------------------------------------------
   Contact Form Validation
   -------------------------------------------------------------------------- */
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

/* --------------------------------------------------------------------------
   Mobile navigation toggle
   -------------------------------------------------------------------------- */
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

/* --------------------------------------------------------------------------
   Initialise
   -------------------------------------------------------------------------- */
renderResources();
