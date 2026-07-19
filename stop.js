(() => {
  const root = document.querySelector("#stop-root");
  const params = new URLSearchParams(window.location.search);
  const dayId = Number(params.get("day"));
  const stopIndex = Number(params.get("stop"));
  const day = TRIP_DATA.days.find((entry) => entry.id === dayId);
  const item = day?.items[stopIndex];

  if (!day || !item) {
    root.innerHTML = `
      <section class="not-found">
        <p class="eyebrow">404 · 行程节点不存在</p>
        <h1>没有找到这一站</h1>
        <p>链接可能不完整，返回行程首页重新选择。</p>
        <a class="primary-link" href="index.html#journey">返回行程 <span>→</span></a>
      </section>
    `;
    return;
  }

  const key = `d${dayId}-${stopIndex}`;
  const sequence = TRIP_DATA.days.flatMap((entryDay) =>
    entryDay.items.map((entryItem, index) => ({ day: entryDay, item: entryItem, index }))
  );
  const sequenceIndex = sequence.findIndex((entry) => entry.day.id === dayId && entry.index === stopIndex);
  const previous = sequence[sequenceIndex - 1];
  const next = sequence[sequenceIndex + 1];
  const detail = TRIP_DATA.stopDetails[key] || buildFallback(item);
  document.querySelector(".back-link").href = `index.html#day-${day.id}`;

  function entryUrl(entry) {
    if (!entry) return "index.html#journey";
    const useStopDetail = !entry.item.attraction || entry.item.type === "food" || entry.item.type === "leisure";
    return useStopDetail
      ? `stop.html?day=${entry.day.id}&stop=${entry.index}`
      : `attraction.html?id=${entry.item.attraction}&day=${entry.day.id}&stop=${entry.index}`;
  }

  function buildFallback(entry) {
    if (entry.type === "food" || entry.type === "leisure") {
      return {
        kind: "food",
        intro: entry.meta,
        budget: "约 400–900 TL / 人",
        reservation: "按当天客流决定；时间紧时优先选择无需排队的顺路餐厅。",
        recommendations: [
          { name: "当日招牌菜", text: "询问出餐时间，优先选择 20 分钟内可完成的单点。" },
          { name: "共享前菜", text: "控制份量，也便于多人尝试不同口味。" },
          { name: "无酒精饮品", text: "后续仍有步行或交通安排时更稳妥。" }
        ],
        tips: ["入座时明确离席时间。", "结账前核对是否已含服务费。"]
      };
    }

    if (entry.type === "transfer") {
      return {
        kind: "transport",
        intro: entry.meta,
        origin: previous?.item.title || day.area.split("→")[0].trim(),
        destination: entry.title,
        route: [previous?.item.title || "上一站", entry.title],
        public: {
          time: "约 20–45 分钟",
          cost: "约 42–84 TL / 人",
          summary: entry.meta
        },
        ride: {
          time: "约 15–40 分钟",
          cost: "约 210–900 TL / 车",
          summary: "按实时路况和出租车计价器结算。"
        }
      };
    }

    return {
      kind: entry.type === "stay" ? "stay" : "checklist",
      intro: entry.meta,
      checklist: ["确认时间与地点", "把必要票券和地址离线保存", "完成后再进入下一站"]
    };
  }

  function optionCard(label, option, className) {
    if (!option) return "";
    const steps = option.steps?.length
      ? `<ol>${option.steps.map((step) => `<li>${step}</li>`).join("")}</ol>`
      : "";
    return `
      <article class="transport-option ${className}">
        <p class="option-label">${label}</p>
        <div class="option-metrics">
          <span><small>预计时间</small><strong>${option.time}</strong></span>
          <span><small>预计费用</small><strong>${option.cost}</strong></span>
        </div>
        <p>${option.summary}</p>
        ${steps}
      </article>
    `;
  }

  function renderRoute(detailData) {
    const origin = detailData.origin || previous?.item.title || "上一站";
    const destination = detailData.destination || item.title;
    const route = detailData.route || [origin, destination];
    const directionsUrl = new URL("https://www.google.com/maps/dir/");
    directionsUrl.searchParams.set("api", "1");
    directionsUrl.searchParams.set("origin", origin);
    directionsUrl.searchParams.set("destination", destination);
    directionsUrl.searchParams.set("travelmode", "transit");

    return `
      <section class="stop-map-section">
        <div class="stop-map-frame">
          <iframe
            title="${item.title}地图定位"
            src="https://maps.google.com/maps?q=${encodeURIComponent(detailData.mapQuery || `${destination} Istanbul`)}&t=m&z=14&output=embed&iwloc=near"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <a href="${directionsUrl}" target="_blank" rel="noreferrer">打开实时路线 <span>↗</span></a>
        </div>
        <div class="route-snapshot">
          <p class="eyebrow">路线预览 · ROUTE</p>
          <h2>${origin}<br /><span>到</span> ${destination}</h2>
          <ol>
            ${route.map((stop, index) => `
              <li>
                <span>${String(index + 1).padStart(2, "0")}</span>
                <strong>${stop}</strong>
              </li>
            `).join("")}
          </ol>
        </div>
      </section>
      <section class="transport-options">
        ${optionCard("公共交通", detailData.public, "option-transit")}
        ${optionCard("网约车 / 出租车", detailData.ride, "option-ride")}
        ${optionCard("步行备选", detailData.walk, "option-walk")}
      </section>
      <div class="fare-reference">
        <p>${TRIP_DATA.fareReference.transit}</p>
        <p>${TRIP_DATA.fareReference.taxi}</p>
        <div>
          <a href="${TRIP_DATA.fareReference.transitSource}" target="_blank" rel="noreferrer">公共交通官方票价 ↗</a>
          <a href="${TRIP_DATA.fareReference.taxiSource}" target="_blank" rel="noreferrer">出租车官方基准 ↗</a>
        </div>
      </div>
    `;
  }

  function renderFood(detailData) {
    return `
      <section class="food-guide">
        <div class="food-facts">
          <article><span>预算</span><strong>${detailData.budget}</strong></article>
          <article><span>预订建议</span><strong>${detailData.reservation}</strong></article>
        </div>
        <div class="recommendation-grid">
          ${detailData.recommendations.map((recommendation, index) => `
            <article>
              <span class="note-number">${String(index + 1).padStart(2, "0")}</span>
              <h2>${recommendation.name}</h2>
              <p>${recommendation.text}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderChecklist(detailData) {
    return `
      <section class="execution-board">
        <p class="eyebrow">执行清单 · CHECKLIST</p>
        <h2>到这一站，只需要完成这些事</h2>
        <ol>
          ${detailData.checklist.map((task, index) => `
            <li><span>${String(index + 1).padStart(2, "0")}</span><strong>${task}</strong></li>
          `).join("")}
        </ol>
      </section>
    `;
  }

  const mapOnly = detail.mapQuery && detail.kind !== "transport"
    ? `
      <section class="compact-map">
        <iframe
          title="${item.title}地图定位"
          src="https://maps.google.com/maps?q=${encodeURIComponent(detail.mapQuery)}&t=m&z=15&output=embed&iwloc=near"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    `
    : "";

  const content = detail.kind === "transport"
    ? renderRoute(detail)
    : detail.kind === "food"
      ? `${mapOnly}${renderFood(detail)}`
      : `${mapOnly}${renderChecklist(detail)}`;

  const tips = detail.tips?.length
    ? `
      <aside class="stop-tips">
        <p class="eyebrow">现场提醒</p>
        <ul>${detail.tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>
      </aside>
    `
    : "";

  document.title = `${item.title} · İstanbul 行程节点`;
  document.querySelector('meta[name="description"]').content = `${item.title}：${item.meta}`;

  root.innerHTML = `
    <section class="stop-hero">
      <div>
        <p class="eyebrow">DAY ${String(day.id).padStart(2, "0")} · ${item.time}</p>
        <p class="stop-area">${day.area}</p>
        <h1>${item.title}</h1>
        <p class="stop-meta">${item.meta}</p>
      </div>
      <div class="stop-index" aria-hidden="true">
        <span>STOP</span>
        <strong>${String(stopIndex + 1).padStart(2, "0")}</strong>
      </div>
    </section>

    <section class="stop-intro">
      <p>${detail.intro}</p>
    </section>

    ${content}
    ${tips}

    <section class="next-stop stop-next">
      <p class="eyebrow">继续行程</p>
      <h2>${next ? `下一站：${next.item.title}` : "四日行程已完成"}</h2>
      <div class="next-actions">
        <a class="text-link next-back" href="index.html#day-${day.id}">← 返回时间线</a>
        ${next ? `<a class="primary-link" href="${entryUrl(next)}">进入下一站 <span>→</span></a>` : ""}
      </div>
    </section>
  `;
})();
