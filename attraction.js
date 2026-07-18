(() => {
  const root = document.querySelector("#attraction-root");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const attraction = TRIP_DATA.attractions[id];

  if (!attraction) {
    root.innerHTML = `
      <section class="not-found">
        <p class="eyebrow">404 / LOST IN ISTANBUL</p>
        <h1>没有找到这个景点</h1>
        <p>链接可能不完整，返回行程首页重新选择吧。</p>
        <a class="primary-link" href="index.html#journey">返回行程 <span>→</span></a>
      </section>
    `;
    return;
  }

  function getPreviousStop(currentId) {
    let previous = null;

    for (const day of TRIP_DATA.days) {
      for (const item of day.items) {
        if (!item.attraction) continue;
        if (item.attraction === currentId) {
          return previous || {
            name: "Lokalist Istanbul（Taksim）",
            query: "Lokalist Istanbul Taksim"
          };
        }

        if (item.attraction !== previous?.id) {
          previous = {
            id: item.attraction,
            name: TRIP_DATA.attractions[item.attraction]?.name || item.title,
            query: `${TRIP_DATA.attractions[item.attraction]?.localName || item.title} Istanbul`
          };
        }
      }
    }

    return {
      name: "Lokalist Istanbul（Taksim）",
      query: "Lokalist Istanbul Taksim"
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
  const routeUrl = new URL("https://www.google.com/maps/dir/");
  routeUrl.searchParams.set("api", "1");
  routeUrl.searchParams.set("origin", previousStop.query);
  routeUrl.searchParams.set("destination", `${attraction.localName} Istanbul`);
  routeUrl.searchParams.set("travelmode", "transit");

  const facts = [
    ["门票", attraction.fee],
    ["开放", attraction.hours],
    ["建议停留", attraction.duration],
    ["最佳时间", attraction.bestTime]
  ];

  const factItems = facts.map(([label, value], index) => `
    <article class="fact-item">
      <span class="fact-index">${String(index + 1).padStart(2, "0")}</span>
      <div>
        <span class="fact-label">${label}</span>
        <strong class="fact-value">${value}</strong>
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
        <p class="eyebrow">${attraction.kicker}</p>
        <p class="detail-district">${attraction.district}</p>
        <h1>${attraction.name}</h1>
        <p class="local-name">${attraction.localName}</p>
        <p class="detail-intro">${attraction.intro}</p>
        <div class="detail-actions">
          <a class="primary-link" href="${attraction.map}" target="_blank" rel="noreferrer">打开地图 <span>↗</span></a>
          <a class="text-link" href="${attraction.official}" target="_blank" rel="noreferrer">访问官网 <span>↗</span></a>
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
          <p class="eyebrow">WHAT TO SEE</p>
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
          <p class="eyebrow">PHOTO NOTES</p>
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
          <p class="eyebrow">GOOD TO KNOW</p>
          <h2>注意事项</h2>
          <ul>${attraction.tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>
        </div>
        <p class="data-note">票价与开放信息更新于 2026-07-18。宗教活动、修复工程与节假日可能导致临时变化。</p>
      </aside>
    </section>

    <section class="next-stop">
      <p class="eyebrow">CONTINUE THE JOURNEY</p>
      <h2>回到时间线，继续下一站</h2>
      <a class="primary-link" href="index.html#journey">返回每日行程 <span>→</span></a>
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
