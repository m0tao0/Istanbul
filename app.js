(() => {
  const dayList = document.querySelector("#day-list");
  const storageKey = "istanbul-trip-checks-2026-oct-final";
  const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");

  const icons = {
    attraction: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16M6 20v-7h12v7M8 13V9h8v4M10 9V6h4v3M12 3v3"/></svg>',
    food: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v7M4.5 3v4.5A2.5 2.5 0 0 0 7 10v11M9.5 3v4.5A2.5 2.5 0 0 1 7 10M16 3v18M16 3c2.5 1.5 3.5 4 3.5 6.5H16"/></svg>',
    leisure: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8ZM16 10h1.5a2.5 2.5 0 0 1 0 5H16M4 21h14"/></svg>',
    plane: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 13 18-8-6 15-3-6-9-1Z M12 14l3-3"/></svg>',
    car: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 10 2-5h10l2 5M4 10h16v7H4zM7 17v2M17 17v2M7 13h.01M17 13h.01"/></svg>',
    rail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v12H6zM8 7h8M8 13h.01M16 13h.01M8 20l2-4M16 20l-2-4M7 20h10"/></svg>',
    boat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11h14l-2 7H7l-2-7ZM12 4v7M8 8h8M4 21c2 1 4 1 6 0 2 1 4 1 6 0 2 1 3 1 5 0"/></svg>',
    walk: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="13" cy="4" r="2"/><path d="m10 21 2-6-3-3 2-5 4 3h3M12 15l4 6M9 12l-4 3"/></svg>',
    stay: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V8M4 15h16v4M7 12h5a3 3 0 0 1 3 3H4M7 9h3v3H7z"/></svg>',
    note: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v16H6zM9 4V2M15 4V2M9 9h6M9 13h6M9 17h4"/></svg>'
  };

  function getItemKind(item) {
    if (item.type && icons[item.type]) return item.type;
    if (item.attraction) return "attraction";

    const text = `${item.title} ${item.meta}`;
    if (item.type === "transfer") {
      if (/起飞|航班|抵达伊斯坦布尔 IST/.test(text)) return "plane";
      if (/专车|接送|出租车/.test(text)) return "car";
      if (/T1|F1|F2|M2|电车|缆车|地铁/.test(text)) return "rail";
      if (/游船|轮渡|码头/.test(text)) return "boat";
      if (/步行/.test(text)) return "walk";
      return "car";
    }

    return "note";
  }

  function stopUrl(dayId, itemIndex, item) {
    const useStopDetail = !item.attraction || item.type === "food" || item.type === "leisure";
    return useStopDetail
      ? `stop.html?day=${dayId}&stop=${itemIndex}`
      : `attraction.html?id=${item.attraction}&day=${dayId}&stop=${itemIndex}`;
  }

  function itemMarkup(item, dayId, index) {
    const key = `${dayId}-${item.time}-${item.title}`;
    const checked = Boolean(saved[key]);
    const kind = getItemKind(item);
    const title = `<a class="attraction-link" href="${stopUrl(dayId, index, item)}">${item.title}<span aria-hidden="true">↗</span></a>`;
    return `
      <li class="timeline-item ${item.optional ? "optional" : ""} ${checked ? "completed" : ""}">
        <label class="check-wrap" aria-label="标记 ${item.title} 为已完成">
          <input type="checkbox" data-check="${key}" ${checked ? "checked" : ""} />
          <span class="timeline-marker marker-${kind}">${icons[kind]}</span>
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
    const isExpanded = false;
    const splitAt = Math.ceil(day.items.length / 2);
    const columns = [day.items.slice(0, splitAt), day.items.slice(splitAt)];
    return `
      <article class="day-card day-${day.color}" id="day-${day.id}" data-day-card="${day.id}">
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
          <div class="timeline">
            ${columns.map((items, columnIndex) => `
              <ol class="timeline-column">
                ${items.map((item, itemIndex) => itemMarkup(item, day.id, columnIndex * splitAt + itemIndex)).join("")}
              </ol>
            `).join("")}
          </div>
        </div>
      </article>
    `;
  }

  function renderDays() {
    dayList.innerHTML = TRIP_DATA.days.map(dayMarkup).join("");
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

  renderDays();
})();
