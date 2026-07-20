(() => {
  const root = document.querySelector("#attraction-root");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const attraction = TRIP_DATA.attractions[id];
  const requestedDay = Number(params.get("day"));
  const requestedStop = Number(params.get("stop"));

  if (!attraction) {
    root.innerHTML = `
      <section class="not-found">
        <p class="eyebrow">404 · 在伊斯坦布尔迷路了</p>
        <h1>没有找到这个景点</h1>
        <p>链接可能不完整，返回行程首页重新选择吧。</p>
        <a class="primary-link" href="index.html#journey">返回行程 <span>→</span></a>
      </section>
    `;
    return;
  }

  const sequence = TRIP_DATA.days.flatMap((entryDay) =>
    entryDay.items.map((entryItem, index) => ({ day: entryDay, item: entryItem, index }))
  );
  let currentSequenceIndex = sequence.findIndex((entry) =>
    entry.day.id === requestedDay &&
    entry.index === requestedStop &&
    entry.item.attraction === id
  );
  if (currentSequenceIndex < 0) {
    currentSequenceIndex = sequence.findIndex((entry) => entry.item.attraction === id);
  }
  const currentContext = sequence[currentSequenceIndex];
  const previousEntry = sequence[currentSequenceIndex - 1];
  const nextEntry = sequence[currentSequenceIndex + 1];
  if (currentContext) {
    document.querySelector(".back-link").href = `index.html#day-${currentContext.day.id}`;
  }

  function entryUrl(entry) {
    if (!entry) return "index.html#journey";
    const useStopDetail = !entry.item.attraction || entry.item.type === "food" || entry.item.type === "leisure";
    return useStopDetail
      ? `stop.html?day=${entry.day.id}&stop=${entry.index}`
      : `attraction.html?id=${entry.item.attraction}&day=${entry.day.id}&stop=${entry.index}`;
  }

  function getPreviousStop(currentId) {
    if (previousEntry) {
      const detail = TRIP_DATA.stopDetails?.[`d${previousEntry.day.id}-${previousEntry.index}`];
      const isTransfer = detail?.kind === "transport";
      return {
        id: previousEntry.item.attraction,
        name: isTransfer
          ? (detail.origin || previousEntry.item.title)
          : previousEntry.item.title,
        query: (isTransfer ? detail.origin : detail?.destination) ||
          detail?.mapQuery ||
          TRIP_DATA.attractions[previousEntry.item.attraction]?.localName ||
          `${previousEntry.item.title} Istanbul`,
        mode: isTransfer && detail?.public ? "transit" : "walking"
      };
    }

    let previous = null;

    for (const day of TRIP_DATA.days) {
      for (const item of day.items) {
        if (!item.attraction) continue;
        if (item.attraction === currentId) {
          return previous || {
            name: "Lokalist Istanbul（Taksim）",
            query: "Lokalist Istanbul Taksim",
            mode: "transit"
          };
        }

        if (item.attraction !== previous?.id) {
          previous = {
            id: item.attraction,
            name: TRIP_DATA.attractions[item.attraction]?.name || item.title,
            query: `${TRIP_DATA.attractions[item.attraction]?.localName || item.title} Istanbul`,
            mode: "walking"
          };
        }
      }
    }

    return {
      name: "Lokalist Istanbul（Taksim）",
      query: "Lokalist Istanbul Taksim",
      mode: "transit"
    };
  }

  function normalizeMedia(media) {
    if (media?.image) return media;
    return {
      image: attraction.image,
      credit: attraction.photoCredit
    };
  }

  function renderMediaSource(media, className = "") {
    if (!media?.source) return "";
    return `
      <a class="media-source ${className}" href="${media.source}" target="_blank" rel="noreferrer">
        图片来源 <span aria-hidden="true">↗</span>
      </a>
    `;
  }

  function renderHeroCredit(media, className) {
    const tag = media.source ? "a" : "span";
    const linkAttributes = media.source
      ? ` href="${media.source}" target="_blank" rel="noreferrer"`
      : "";
    return `<${tag} class="image-credit ${className}"${linkAttributes}>${media.credit || attraction.photoCredit}</${tag}>`;
  }

  const previousStop = getPreviousStop(id);
  const attractionDay = currentContext?.day.id ??
    TRIP_DATA.days.find((day) => day.items.some((item) => item.attraction === id))?.id ??
    1;
  const routeUrl = new URL("https://www.google.com/maps/dir/");
  routeUrl.searchParams.set("api", "1");
  routeUrl.searchParams.set("origin", previousStop.query);
  routeUrl.searchParams.set("destination", `${attraction.localName} Istanbul`);
  routeUrl.searchParams.set("travelmode", previousStop.mode || "walking");

  const facts = [
    ["门票", attraction.fee, attraction.feeEquivalent],
    ["开放", attraction.hours],
    ["建议停留", attraction.duration],
    ["最佳时间", attraction.bestTime]
  ];

  const factItems = facts.map(([label, value, equivalent], index) => `
    <article class="fact-item">
      <span class="fact-index">${String(index + 1).padStart(2, "0")}</span>
      <div>
        <span class="fact-label">${label}</span>
        <strong class="fact-value">${value}</strong>
        ${equivalent ? `<span class="fee-equivalent">${equivalent}</span>` : ""}
      </div>
    </article>
  `).join("");

  const desktopHero = normalizeMedia(attraction.heroImages?.desktop);
  const mobileHero = normalizeMedia(attraction.heroImages?.mobile || attraction.heroImages?.desktop);

  const routeCard = `
    <div class="route-card">
      <div>
        <span class="route-label">如何到达 · 上一站出发</span>
        <strong>${previousStop.name} → ${attraction.name}</strong>
        <p>${attraction.transit}</p>
      </div>
      <a href="${routeUrl}" target="_blank" rel="noreferrer">在地图中查看 <span>↗</span></a>
    </div>
  `;

  const appGuide = attraction.apps?.length ? `
    <div class="aside-card attraction-app-guide">
      <p class="eyebrow">现场数字工具</p>
      <h2>推荐 App</h2>
      <div class="attraction-app-list">
        ${attraction.apps.map((app) => `
          <article>
            <span>${app.meta}</span>
            <h3>${app.name}</h3>
            <p>${app.description}</p>
            <div class="app-store-links">
              <a href="${app.ios}" target="_blank" rel="noreferrer">iOS App Store ↗</a>
              <a href="${app.android}" target="_blank" rel="noreferrer">Android Google Play ↗</a>
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  ` : "";

  document.title = `${attraction.name} · İstanbul 景点指南`;
  document.querySelector('meta[name="description"]').content = `${attraction.name}详细指南：费用、开放时间、拍照点与注意事项。`;

  root.innerHTML = `
    <section class="detail-hero">
      <div class="detail-image-wrap">
        <picture>
          <source media="(min-width: 981px)" srcset="${desktopHero.image}" />
          <img src="${mobileHero.image}" alt="${attraction.name}实景" />
        </picture>
        ${renderHeroCredit(desktopHero, "desktop-image-credit")}
        ${renderHeroCredit(mobileHero, "mobile-image-credit")}
      </div>
      <div class="detail-title">
        <p class="eyebrow">伊斯坦布尔景点档案</p>
        <p class="detail-district">${attraction.district}</p>
        <h1>${attraction.name}</h1>
        <p class="local-name">${attraction.localName}</p>
        <p class="detail-intro">${attraction.intro}</p>
        <div class="detail-actions">
          <a class="primary-link" href="${attraction.map}" target="_blank" rel="noreferrer">打开地图 <span>↗</span></a>
          <a class="text-link" href="${attraction.official}" target="_blank" rel="noreferrer">${attraction.officialLabel || "查询开放时间"} <span>↗</span></a>
        </div>
        <div class="day-seal" aria-label="第 ${attractionDay} 日景点">
          <span>DAY</span>
          <strong>${String(attractionDay).padStart(2, "0")}</strong>
        </div>
        <div class="desktop-quick-info">
          <div class="hero-facts" aria-label="实用信息">${factItems}</div>
          ${routeCard}
        </div>
      </div>
    </section>

    <section class="facts-strip mobile-quick-info" aria-label="实用信息">
      ${factItems}
    </section>
    <div class="mobile-route-card">${routeCard}</div>

    <section class="detail-body">
      <div class="detail-primary">
        <section class="content-block">
          <p class="eyebrow">参观重点</p>
          <h2>不要错过</h2>
          <div class="highlight-accordion">
            ${attraction.highlights.map((item, index) => {
              const highlight = typeof item === "string"
                ? {
                    title: item,
                    history: `这是${attraction.name}中值得重点停留的一处。`,
                    lookFor: "放慢脚步观察建筑、材质与光线的变化。",
                    image: attraction.image
                  }
                : item;
              const media = normalizeMedia(highlight);
              return `
              <article class="highlight-item">
                <button class="highlight-trigger" type="button" aria-expanded="false" aria-controls="highlight-${index}">
                  <span class="highlight-number">${String(index + 1).padStart(2, "0")}</span>
                  <span class="highlight-title">${highlight.title}</span>
                  <span class="highlight-toggle" aria-hidden="true"></span>
                </button>
                <div class="highlight-panel" id="highlight-${index}" hidden>
                  <div class="highlight-image">
                    <img src="${media.image}" alt="${highlight.title}实景" loading="lazy" />
                    ${renderMediaSource(media)}
                  </div>
                  <div class="highlight-copy">
                    <div>
                      <p class="copy-label">历史与价值</p>
                      <p class="highlight-history">${highlight.history}</p>
                    </div>
                    <div class="highlight-look">
                      <p class="copy-label">现场看什么</p>
                      <p>${highlight.lookFor}</p>
                    </div>
                  </div>
                </div>
              </article>
            `;
            }).join("")}
          </div>
        </section>

        <blockquote>${attraction.quote}</blockquote>

        <section class="content-block photo-notes-block">
          <p class="eyebrow">构图参考</p>
          <h2>最佳拍照点</h2>
          <div class="photo-spots photo-spots-${attraction.photoSpots.length}">
            ${attraction.photoSpots.map((spot, index) => {
              const media = normalizeMedia(spot);
              return `
              <article>
                <div class="spot-image">
                  <img src="${media.image}" alt="${spot.title}现场构图参考" loading="lazy" />
                  <span>现场识别 · ${String(index + 1).padStart(2, "0")}</span>
                  ${renderMediaSource(media)}
                </div>
                <div class="spot-copy">
                  <span class="spot-number">${index + 1}</span>
                  <h3>${spot.title}</h3>
                  <p>${spot.text}</p>
                </div>
              </article>
            `;
            }).join("")}
          </div>
        </section>
      </div>

      <aside class="detail-aside">
        <div class="aside-card">
          <p class="eyebrow">参观须知</p>
          <h2>注意事项</h2>
          <ul>${attraction.tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>
        </div>
        ${appGuide}
        <p class="data-note">票价与开放信息更新于 2026-07-20。等值换算按欧洲央行 ${TRIP_DATA.exchangeRates?.asOf || "2026-07-02"} 参考汇率估算，不含银行费用；现场价格以官网及售票处为准。</p>
      </aside>
    </section>

    <section class="next-stop">
      <p class="eyebrow">继续行程</p>
      <h2>${nextEntry ? `下一站：${nextEntry.item.title}` : "四日行程已完成"}</h2>
      <div class="next-actions">
        <a class="text-link next-back" href="index.html#day-${attractionDay}">← 返回时间线</a>
        ${nextEntry ? `<a class="primary-link" href="${entryUrl(nextEntry)}">进入下一站 <span>→</span></a>` : ""}
      </div>
    </section>
  `;

  document.querySelectorAll(".highlight-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      const panel = document.querySelector(`#${button.getAttribute("aria-controls")}`);
      button.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;
    });
  });
})();
