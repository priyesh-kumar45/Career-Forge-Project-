/* =========================================
   CAREERFORGE
   Job & Career Management Platform
   HTML + CSS + JavaScript
========================================= */


/* =========================================
   JOB DATA
========================================= */

const jobs = [

  {
    id: 1,
    company: "TechNova",
    role: "Frontend Developer",
    location: "Noida",
    type: "Full-time",
    salary: "₹6–9 LPA",
    skills: ["JavaScript", "React", "CSS"],
    logo: "images/companies/technova.svg",
    jobImage: "images/jobs/frontend.svg"
  },

  {
    id: 2,
    company: "CloudPeak",
    role: "Java Developer",
    location: "Remote",
    type: "Remote",
    salary: "₹7–11 LPA",
    skills: ["Java", "SQL", "Spring"],
    logo: "images/companies/cloudpeak.svg",
    jobImage: "images/jobs/java.svg"
  },

  {
    id: 3,
    company: "PixelWorks",
    role: "UI Developer Intern",
    location: "Delhi",
    type: "Internship",
    salary: "₹20–30K / mo",
    skills: ["HTML", "CSS", "JavaScript"],
    logo: "images/companies/pixelworks.svg",
    jobImage: "images/jobs/frontend.svg"
  },

  {
    id: 4,
    company: "DataBridge",
    role: "Full Stack Developer",
    location: "Bengaluru",
    type: "Full-time",
    salary: "₹8–13 LPA",
    skills: ["JavaScript", "Node", "SQL"],
    logo: "images/companies/databridge.svg",
    jobImage: "images/jobs/fullstack.svg"
  },

  {
    id: 5,
    company: "CodeCraft",
    role: "JavaScript Developer",
    location: "Remote",
    type: "Remote",
    salary: "₹7–12 LPA",
    skills: ["JS", "APIs", "Git"],
    logo: "images/companies/codecraft.svg",
    jobImage: "images/jobs/frontend.svg"
  },

  {
    id: 6,
    company: "NextGen Labs",
    role: "Software Engineer Intern",
    location: "Noida",
    type: "Internship",
    salary: "₹25–35K / mo",
    skills: ["Java", "DSA", "Git"],
    logo: "images/companies/nextgen.svg",
    jobImage: "images/jobs/java.svg"
  }

];


/* =========================================
   DEFAULT APPLICATIONS
========================================= */

const defaultApps = [

  {
    id: 1,
    company: "Infosys",
    role: "Java Developer",
    location: "Noida",
    date: "2026-09-28",
    status: "Interview"
  },

  {
    id: 2,
    company: "TCS",
    role: "Software Engineer",
    location: "Delhi",
    date: "2026-09-24",
    status: "Screening"
  },

  {
    id: 3,
    company: "Wipro",
    role: "Frontend Developer",
    location: "Remote",
    date: "2026-09-18",
    status: "Applied"
  },

  {
    id: 4,
    company: "Accenture",
    role: "Web Developer",
    location: "Noida",
    date: "2026-09-12",
    status: "Offer"
  }

];


/* =========================================
   DEFAULT INTERVIEWS
========================================= */

const defaultInterviews = [

  {
    id: 1,
    company: "Infosys",
    role: "Java Developer",
    date: "2026-10-10",
    time: "10:00",
    type: "Video call"
  },

  {
    id: 2,
    company: "Accenture",
    role: "Web Developer",
    date: "2026-10-14",
    time: "14:30",
    type: "Video call"
  }

];


/* =========================================
   DEFAULT PROFILE
========================================= */

const defaultProfile = {

  name: "Alex Morgan",

  role: "Frontend Developer",

  location: "Noida, India",

  about:
    "Frontend developer focused on building accessible, responsive and user-friendly web applications."

};


/* =========================================
   LOAD LOCAL STORAGE
========================================= */

let apps =
  JSON.parse(localStorage.getItem("cf_apps")) ||
  JSON.parse(JSON.stringify(defaultApps));


let interviews =
  JSON.parse(localStorage.getItem("cf_interviews")) ||
  JSON.parse(JSON.stringify(defaultInterviews));


let saved =
  JSON.parse(localStorage.getItem("cf_saved")) ||
  [2];


let profile =
  JSON.parse(localStorage.getItem("cf_profile")) ||
  { ...defaultProfile };


/* =========================================
   SHORT SELECTORS
========================================= */

const $ = (selector) =>
  document.querySelector(selector);

const $$ = (selector) =>
  document.querySelectorAll(selector);


/* =========================================
   SAVE DATA
========================================= */

function saveData() {

  localStorage.setItem(
    "cf_apps",
    JSON.stringify(apps)
  );

  localStorage.setItem(
    "cf_interviews",
    JSON.stringify(interviews)
  );

  localStorage.setItem(
    "cf_saved",
    JSON.stringify(saved)
  );

}


/* =========================================
   TOAST
========================================= */

let toastTimer;

function toast(message) {

  const toastBox = $("#toast");

  if (!toastBox) return;

  toastBox.textContent = message;

  toastBox.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toastBox.classList.remove("show");

  }, 2200);

}


/* =========================================
   ESCAPE HTML
========================================= */

function esc(value) {

  return String(value).replace(
    /[&<>"']/g,
    (char) => {

      const map = {

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"

      };

      return map[char];

    }
  );

}


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(dateString) {

  if (!dateString) {
    return "-";
  }

  const date =
    new Date(dateString + "T00:00:00");

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );

}


/* =========================================
   RENDER JOBS
========================================= */

function renderJobs() {

  const searchInput = $("#jobSearch");
  const locationFilter = $("#locationFilter");
  const typeFilter = $("#typeFilter");
  const jobGrid = $("#jobGrid");

  if (
    !searchInput ||
    !locationFilter ||
    !typeFilter ||
    !jobGrid
  ) {
    return;
  }


  const query =
    searchInput.value
      .trim()
      .toLowerCase();


  const location =
    locationFilter.value;


  const type =
    typeFilter.value;


  const filteredJobs = jobs.filter((job) => {

    const searchableText =
      `${job.role}
       ${job.company}
       ${job.location}
       ${job.type}
       ${job.skills.join(" ")}`
        .toLowerCase();


    const matchesSearch =
      !query ||
      searchableText.includes(query);


    const matchesLocation =
      !location ||
      job.location === location;


    const matchesType =
      !type ||
      job.type === type;


    return (
      matchesSearch &&
      matchesLocation &&
      matchesType
    );

  });


  if (!filteredJobs.length) {

    jobGrid.innerHTML = `
      <div
        class="panel"
        style="grid-column:1/-1;text-align:center"
      >
        <h3>No jobs found</h3>
        <p style="color:var(--muted);margin-top:8px">
          Try another search or filter.
        </p>
      </div>
    `;

    return;
  }


  jobGrid.innerHTML =
    filteredJobs
      .map((job) => createJobCard(job))
      .join("");

}


/* =========================================
   CREATE JOB CARD
========================================= */

function createJobCard(job) {

  const isSaved =
    saved.includes(job.id);


  return `

    <article class="job-card">

      <div class="job-top">

        <img
          class="company-logo"
          src="${job.logo}"
          alt="${esc(job.company)} logo"
          loading="lazy"
        >

        <button
          class="heart ${isSaved ? "saved" : ""}"
          onclick="toggleSave(${job.id})"
          type="button"
          aria-label="Save ${esc(job.role)}"
        >
          ${isSaved ? "♥" : "♡"}
        </button>

      </div>


      <h3>
        ${esc(job.role)}
      </h3>


      <p class="company">
        ${esc(job.company)}
        ·
        ${esc(job.location)}
      </p>


      <div class="tags">

        ${job.skills
          .map(
            (skill) =>
              `<span class="tag">
                ${esc(skill)}
              </span>`
          )
          .join("")}

        <span class="tag">
          ${esc(job.type)}
        </span>

      </div>


      <div class="job-bottom">

        <b>
          ${esc(job.salary)}
        </b>

        <button
          class="primary"
          onclick="useJob(${job.id})"
          type="button"
        >
          Apply / Track
        </button>

      </div>

    </article>

  `;

}


/* =========================================
   SAVE / UNSAVE JOB
========================================= */

function toggleSave(id) {

  if (saved.includes(id)) {

    saved =
      saved.filter(
        (jobId) => jobId !== id
      );

    toast("Job removed from saved jobs");

  } else {

    saved.push(id);

    toast("Job saved ♥");

  }


  saveData();

  renderJobs();

  renderStats();

}


/* =========================================
   APPLY FROM JOB CARD
========================================= */

function useJob(id) {

  const job =
    jobs.find(
      (item) => item.id === id
    );


  if (!job) return;


  openModal("appModal");


  const form =
    $("#appForm");


  if (!form) return;


  form.elements.company.value =
    job.company;


  form.elements.role.value =
    job.role;


  form.elements.location.value =
    job.location;


  form.elements.date.value =
    new Date()
      .toISOString()
      .slice(0, 10);


  form.elements.status.value =
    "Applied";

}


/* =========================================
   RENDER STATS
========================================= */

function renderStats() {

  const counts = {

    Applied: 0,
    Screening: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0

  };


  apps.forEach((application) => {

    if (
      counts[
        application.status
      ] !== undefined
    ) {

      counts[
        application.status
      ]++;

    }

  });


  $("#statApplications").textContent =
    apps.length;


  $("#statInterviews").textContent =
    interviews.length;


  $("#statOffers").textContent =
    counts.Offer;


  $("#statSaved").textContent =
    saved.length;


  $("#pApplied").textContent =
    counts.Applied;


  $("#pScreening").textContent =
    counts.Screening;


  $("#pInterview").textContent =
    counts.Interview;


  $("#pOffer").textContent =
    counts.Offer;


  const successCount =
    counts.Interview +
    counts.Offer;


  const successPercentage =
    apps.length
      ? Math.round(
          (successCount / apps.length) *
          100
        )
      : 0;


  $("#pipelineBar").style.width =
    `${successPercentage}%`;


  $("#successRate").textContent =
    `${successPercentage}% response`;


  $("#previewApps").textContent =
    apps.length;


  $("#previewInterviews").textContent =
    interviews.length;


  $("#previewOffers").textContent =
    counts.Offer;


  const sortedInterviews =
    [...interviews].sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    );


  const nextInterview =
    sortedInterviews[0];


  $("#previewInterview").textContent =
    nextInterview
      ? `${nextInterview.company} · ${formatDate(
          nextInterview.date
        )} at ${nextInterview.time}`
      : "No interview scheduled";

}


/* =========================================
   RENDER APPLICATIONS
========================================= */

function renderApps() {

  const table =
    $("#applicationTable");


  if (!table) return;


  if (!apps.length) {

    table.innerHTML = `

      <tr>

        <td
          colspan="6"
          style="text-align:center"
        >
          No applications yet.
        </td>

      </tr>

    `;

    return;
  }


  table.innerHTML =
    apps
      .map(
        (application) => `

          <tr>

            <td>
              <b>
                ${esc(application.company)}
              </b>
            </td>

            <td>
              ${esc(application.role)}
            </td>

            <td>
              ${esc(application.location)}
            </td>

            <td>
              ${formatDate(application.date)}
            </td>

            <td>

              <span
                class="status s-${esc(
                  application.status
                )}"
              >
                ${esc(application.status)}
              </span>

            </td>

            <td>

              <button
                class="delete"
                onclick="deleteApp(${application.id})"
                type="button"
              >
                Delete
              </button>

            </td>

          </tr>

        `
      )
      .join("");

}


/* =========================================
   RENDER INTERVIEWS
========================================= */

function renderInterviews() {

  const grid =
    $("#interviewGrid");


  if (!grid) return;


  if (!interviews.length) {

    grid.innerHTML = `

      <div
        class="panel"
        style="grid-column:1/-1;text-align:center"
      >

        <h3>
          No interviews scheduled
        </h3>

        <p style="color:var(--muted);margin-top:8px">
          Schedule your next interview here.
        </p>

      </div>

    `;

    return;
  }


  const sortedInterviews =
    [...interviews].sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    );


  grid.innerHTML =
    sortedInterviews
      .map((interview) => {

        const date =
          new Date(
            interview.date +
            "T00:00:00"
          );


        const day =
          date.getDate();


        return `

          <article class="interview-card">

            <div class="date-box">

              <div class="date-number">
                ${day}
              </div>

              <div>

                <h3>
                  ${esc(interview.company)}
                </h3>

                <p>
                  ${esc(interview.role)}
                </p>

              </div>

            </div>


            <p>
              📅
              ${formatDate(interview.date)}
              ·
              ${esc(interview.time)}
            </p>


            <p>
              🎥
              ${esc(interview.type)}
            </p>


            <button
              class="delete"
              style="margin-top:16px"
              onclick="deleteInterview(${interview.id})"
              type="button"
            >
              Cancel interview
            </button>

          </article>

        `;

      })
      .join("");

}


/* =========================================
   DELETE APPLICATION
========================================= */

function deleteApp(id) {

  const confirmed =
    confirm(
      "Delete this application?"
    );


  if (!confirmed) return;


  apps =
    apps.filter(
      (application) =>
        application.id !== id
    );


  saveData();

  renderAll();

  toast("Application deleted");

}


/* =========================================
   DELETE INTERVIEW
========================================= */

function deleteInterview(id) {

  const confirmed =
    confirm(
      "Cancel this interview?"
    );


  if (!confirmed) return;


  interviews =
    interviews.filter(
      (interview) =>
        interview.id !== id
    );


  saveData();

  renderAll();

  toast("Interview cancelled");

}


/* =========================================
   OPEN MODAL
========================================= */

function openModal(id) {

  const modal =
    document.getElementById(id);


  if (!modal) return;


  modal.classList.add("open");

  document.body.style.overflow =
    "hidden";

}


/* =========================================
   CLOSE MODALS
========================================= */

function closeModals() {

  $$(".modal").forEach(
    (modal) =>
      modal.classList.remove("open")
  );


  document.body.style.overflow =
    "";

}


/* =========================================
   RENDER PROFILE
========================================= */

function renderProfile() {

  if (!profile) {
    profile = { ...defaultProfile };
  }


  $("#profileName").textContent =
    profile.name;


  $("#profileRole").textContent =
    profile.role;


  $("#profileLocation").textContent =
    `📍 ${profile.location}`;


  $("#nameInput").value =
    profile.name;


  $("#roleInput").value =
    profile.role;


  $("#locationInput").value =
    profile.location;


  $("#aboutInput").value =
    profile.about;

}


/* =========================================
   RENDER EVERYTHING
========================================= */

function renderAll() {

  renderJobs();

  renderApps();

  renderInterviews();

  renderStats();

  renderProfile();

}


/* =========================================
   SEARCH
========================================= */

$("#jobSearch").addEventListener(
  "input",
  renderJobs
);


$("#locationFilter").addEventListener(
  "change",
  renderJobs
);


$("#typeFilter").addEventListener(
  "change",
  renderJobs
);


/* =========================================
   ADD APPLICATION BUTTONS
========================================= */

$("#addAppBtn").addEventListener(
  "click",
  () => {

    const form =
      $("#appForm");

    form.reset();

    form.elements.date.value =
      new Date()
        .toISOString()
        .slice(0, 10);

    openModal("appModal");

  }
);


$("#heroAddBtn").addEventListener(
  "click",
  () => {

    const form =
      $("#appForm");

    form.reset();

    form.elements.date.value =
      new Date()
        .toISOString()
        .slice(0, 10);

    openModal("appModal");

  }
);


/* =========================================
   ADD INTERVIEW
========================================= */

$("#addInterviewBtn").addEventListener(
  "click",
  () => {

    $("#interviewForm").reset();

    openModal("interviewModal");

  }
);


/* =========================================
   CLOSE MODALS
========================================= */

$$("[data-close]").forEach(
  (button) => {

    button.addEventListener(
      "click",
      closeModals
    );

  }
);


$$(".modal").forEach(
  (modal) => {

    modal.addEventListener(
      "click",
      (event) => {

        if (
          event.target === modal
        ) {

          closeModals();

        }

      }
    );

  }
);


/* =========================================
   ESC KEY CLOSE
========================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeModals();

    }

  }
);


/* =========================================
   APPLICATION FORM
========================================= */

$("#appForm").addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const form =
      event.target;


    const formData =
      new FormData(form);


    const newApplication = {

      id: Date.now(),

      company:
        formData.get("company").trim(),

      role:
        formData.get("role").trim(),

      location:
        formData.get("location").trim(),

      date:
        formData.get("date"),

      status:
        formData.get("status")

    };


    apps.unshift(
      newApplication
    );


    saveData();

    form.reset();

    closeModals();

    renderAll();

    toast(
      "Application added ✓"
    );


    location.hash =
      "applications";

  }
);


/* =========================================
   INTERVIEW FORM
========================================= */

$("#interviewForm").addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const form =
      event.target;


    const formData =
      new FormData(form);


    const newInterview = {

      id: Date.now(),

      company:
        formData.get("company").trim(),

      role:
        formData.get("role").trim(),

      date:
        formData.get("date"),

      time:
        formData.get("time"),

      type:
        formData.get("type")

    };


    interviews.push(
      newInterview
    );


    saveData();

    form.reset();

    closeModals();

    renderAll();

    toast(
      "Interview scheduled ✓"
    );


    location.hash =
      "interviews";

  }
);


/* =========================================
   SAVE PROFILE
========================================= */

$("#saveProfileBtn").addEventListener(
  "click",
  () => {

    profile = {

      name:
        $("#nameInput").value.trim() ||
        "Your Name",

      role:
        $("#roleInput").value.trim() ||
        "Developer",

      location:
        $("#locationInput").value.trim() ||
        "India",

      about:
        $("#aboutInput").value.trim() ||
        "Career professional"

    };


    localStorage.setItem(
      "cf_profile",
      JSON.stringify(profile)
    );


    renderProfile();

    toast(
      "Profile saved ✓"
    );

  }
);


/* =========================================
   RESET DEMO DATA
========================================= */

$("#clearBtn").addEventListener(
  "click",
  () => {

    const confirmed =
      confirm(
        "Reset CareerForge demo data?"
      );


    if (!confirmed) return;


    localStorage.removeItem(
      "cf_apps"
    );

    localStorage.removeItem(
      "cf_interviews"
    );

    localStorage.removeItem(
      "cf_saved"
    );


    apps =
      JSON.parse(
        JSON.stringify(defaultApps)
      );


    interviews =
      JSON.parse(
        JSON.stringify(defaultInterviews)
      );


    saved = [2];


    renderAll();

    toast(
      "Demo data restored"
    );

  }
);


/* =========================================
   DARK MODE
========================================= */

function updateThemeButton() {

  const isDark =
    document.body.classList.contains(
      "dark"
    );


  $("#themeBtn").textContent =
    isDark
      ? "☀️"
      : "🌙";

}


$("#themeBtn").addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "dark"
    );


    const theme =
      document.body.classList.contains(
        "dark"
      )
        ? "dark"
        : "light";


    localStorage.setItem(
      "cf_theme",
      theme
    );


    updateThemeButton();

  }
);


/* =========================================
   LOAD SAVED THEME
========================================= */

if (
  localStorage.getItem(
    "cf_theme"
  ) === "dark"
) {

  document.body.classList.add(
    "dark"
  );

}


updateThemeButton();


/* =========================================
   SHOW SAVED JOBS
========================================= */

$("#showSavedBtn").addEventListener(
  "click",
  () => {

    const jobGrid =
      $("#jobGrid");


    $("#jobSearch").value = "";

    $("#locationFilter").value = "";

    $("#typeFilter").value = "";


    const savedJobs =
      jobs.filter(
        (job) =>
          saved.includes(job.id)
      );


    if (!savedJobs.length) {

      jobGrid.innerHTML = `

        <div
          class="panel"
          style="grid-column:1/-1;text-align:center"
        >

          <h3>
            No saved jobs yet
          </h3>

          <p
            style="
              color:var(--muted);
              margin-top:8px
            "
          >
            Click the heart icon on a job
            to save it.
          </p>

        </div>

      `;

    } else {

      jobGrid.innerHTML =
        savedJobs
          .map(
            (job) =>
              createJobCard(job)
          )
          .join("");

    }


    location.hash =
      "jobs";

  }
);


/* =========================================
   PROFILE NAVIGATION
========================================= */

$("#openProfileBtn").addEventListener(
  "click",
  () => {

    location.hash =
      "profile";

  }
);


/* =========================================
   MOBILE MENU
========================================= */

$("#menuBtn").addEventListener(
  "click",
  () => {

    const nav =
      $("#nav");


    const isOpen =
      nav.classList.contains(
        "mobile-open"
      );


    if (isOpen) {

      nav.classList.remove(
        "mobile-open"
      );

      nav.style.display =
        "none";

      return;

    }


    nav.classList.add(
      "mobile-open"
    );


    nav.style.display =
      "flex";

    nav.style.position =
      "absolute";

    nav.style.top =
      "74px";

    nav.style.left =
      "0";

    nav.style.right =
      "0";

    nav.style.padding =
      "20px";

    nav.style.background =
      "var(--surface)";

    nav.style.flexDirection =
      "column";

    nav.style.borderBottom =
      "1px solid var(--line)";

  }
);


/* =========================================
   CLOSE MOBILE MENU WHEN LINK CLICKED
========================================= */

$$("#nav a").forEach(
  (link) => {

    link.addEventListener(
      "click",
      () => {

        const nav =
          $("#nav");


        if (
          window.innerWidth <= 1000
        ) {

          nav.classList.remove(
            "mobile-open"
          );

          nav.style.display =
            "none";

        }

      }
    );

  }
);


/* =========================================
   INITIALIZE APPLICATION
========================================= */

renderAll();

console.log(
  "CareerForge loaded successfully."
);