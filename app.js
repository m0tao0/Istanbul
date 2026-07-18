(() => {
  const dayList = document.querySelector("#day-list");
  const tabs = document.querySelector("#day-tabs");
  const storageKey = "istanbul-trip-checks-2026-oct-final";
  const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
  let activeDay = "all";

  const icons = {
    transfer: "✈",
    stay: "⌂",
    food: "◌",
    note: "✓",
    walk: "↟"
  };

  function renderTabs() {
    const options = [{ id: "all", label: "全部" }, ...TRIP_DATA.days.map((day) => ({ id: String(day.id), label: day.label }))];
    tabs.innerHTML = options.map((option) => `
      <button class="day-tab ${activeDay === option.id ? "active" : ""}" data-day="${option.id}" role="tab" aria-selected="${activeDay === option.id}">
        ${option.label}
      </button>
    `).join("");
  }

  function itemMarkup(item, dayId, index) {
    const key = `${dayId}-${item.time}-${item.title}`;
    const checked = Boolean(saved[key]);
    const title = item.attraction
      ? `<a class="attraction-link" href="attraction.html?id=${item.attraction}">${item.title}<span aria-hidden="true">↗</span></a>`
      : `<span class="plain-title">${item.title}</span>`;
    return `
      <li class="timeline-item ${checked ? "completed" : ""}">
        <label class="check-wrap" aria-label="标记 ${item.title} 为已完成">
          <input type="checkbox" data-check="${key}" ${checked ? "checked" : ""} />
          <span>${icons[item.type] || "•"}</span>
        </label>
        <time>${item.time}</time>
        <div>
          ${title}
          <p>${item.meta}</p>
        </div>
      </li>
    `;
  }

  function dayMarkup(day) {
    const isExpanded = day.id === 1 || activeDay !== "all";
    return `
      <article class="day-card day-${day.color}" data-day-card="${day.id}">
        <button class="day-summary" aria-expanded="${isExpanded}" aria-controls="day-content-${day.id}">
          <div class="day-index">
            <span>${String(day.id).padStart(2, "0")}</span>
            <small>${day.date}</small>
          </div>
          <div class="day-main">
            <p>${day.area}</p>
            <h3>${day.title}</h3>
            <span class="day-description">${day.summary}</span>
          </div>
          <div class="day-image">
            <img src="${day.image}" alt="" />
          </div>
          <span class="expand-icon" aria-hidden="true"></span>
        </button>
        <div class="day-content" id="day-content-${day.id}" ${isExpanded ? "" : "hidden"}>
          <ol class="timeline">
            ${day.items.map((item, index) => itemMarkup(item, day.id, index)).join("")}
          </ol>
        </div>
      </article>
    `;
  }

  function renderDays() {
    const days = activeDay === "all" ? TRIP_DATA.days : TRIP_DATA.days.filter((day) => String(day.id) === activeDay);
    dayList.innerHTML = days.map(dayMarkup).join("");
    bindCards();
  }

  function bindCards() {
    document.querySelectorAll(".day-summary").forEach((button) => {
      button.addEventListener("click", () => {
        const content = button.nextElementSibling;
        const open = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!open));
        content.hidden = open;
      });
    });

    document.querySelectorAll("[data-check]").forEach((input) => {
      input.addEventListener("change", () => {
        saved[input.dataset.check] = input.checked;
        localStorage.setItem(storageKey, JSON.stringify(saved));
        input.closest(".timeline-item").classList.toggle("completed", input.checked);
      });
    });
  }

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-day]");
    if (!button) return;
    activeDay = button.dataset.day;
    renderTabs();
    renderDays();
  });

  renderTabs();
  renderDays();
})();
