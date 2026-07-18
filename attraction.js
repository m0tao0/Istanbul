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

  function getHighlightDescription(title, index) {
    const descriptions = [
      `这是进入${attraction.name}后最值得先建立整体印象的一处。先稍微拉开距离观察轮廓，再靠近寻找${title}的关键细节。`,
      `${title}最适合慢下来近距离观看。留意材质、装饰与光线的变化，往往比快速拍一张照片更有记忆点。`,
      `把${title}放进参观动线的中段，先寻找现场视线最开阔的位置，再从不同角度比较空间层次。`,
      `${title}适合作为离开前的重点停留。回看一路经过的建筑与展陈，会更容易理解它在${attraction.name}中的位置。`
    ];
    return descriptions[index % descriptions.length];
  }

  const previousStop = getPreviousStop(id);
  const routeUrl = new URL("https://www.google.com/maps/dir/");
  routeUrl.searchParams.set("api", "1");
  routeUrl.searchParams.set("origin", previousStop.query);
  routeUrl.searchParams.set("destination", `${attraction.localName} Istanbul`);
  routeUrl.searchParams.set("travelmode", "transit");

  const factItems = `
    <article><span>门票</span><strong>${attraction.fee}</strong></article>
    <article><span>开放</span><strong>${attraction.hours}</strong></article>
    <article><span>建议停留</span><strong>${attraction.duration}</strong></article>
    <article><span>最佳时间</span><strong>${attraction.bestTime}</strong></article>
  `;

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
        <img src="${attraction.image}" alt="${attraction.name}完整实景" />
        <span class="image-credit">${attraction.photoCredit}</span>
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
            ${attraction.highlights.map((item, index) => `
              <article class="highlight-item">
                <button class="highlight-trigger" type="button" aria-expanded="false" aria-controls="highlight-${index}">
                  <span class="highlight-number">${String(index + 1).padStart(2, "0")}</span>
                  <span class="highlight-title">${item}</span>
                  <span class="highlight-toggle" aria-hidden="true"></span>
                </button>
                <div class="highlight-panel" id="highlight-${index}" hidden>
                  <div class="highlight-image">
                    <img src="${attraction.image}" alt="${attraction.name}的${item}参考画面" style="object-position: ${["50% 42%", "30% 50%", "70% 48%", "50% 70%"][index % 4]}" />
                  </div>
                  <div class="highlight-copy">
                    <p>${getHighlightDescription(item, index)}</p>
                    <span>点击图片区域前先在现场确认开放范围与拍摄规定。</span>
                  </div>
                </div>
              </article>
            `).join("")}
          </div>
        </section>

        <blockquote>${attraction.quote}</blockquote>

        <section class="content-block photo-notes-block">
          <p class="eyebrow">PHOTO NOTES</p>
          <h2>最佳拍照点</h2>
          <div class="photo-spots">
            ${attraction.photoSpots.map((spot, index) => `
              <article>
                <div class="spot-image">
                  <img src="${attraction.image}" alt="${spot.title}构图参考" style="object-position: ${["50% 36%", "28% 54%", "72% 50%"][index % 3]}" />
                  <span>现场识别 · ${String(index + 1).padStart(2, "0")}</span>
                </div>
                <div class="spot-copy">
                  <span class="spot-number">${index + 1}</span>
                  <h3>${spot.title}</h3>
                  <p>${spot.text}</p>
                </div>
              </article>
            `).join("")}
          </div>

          <article class="pose-demo">
            <div class="pose-scene">
              <img src="${attraction.image}" alt="${attraction.photoSpots[0].title}人物站位示意背景" />
              <span class="model-marker" aria-hidden="true">
                <i class="model-head"></i>
                <i class="model-body"></i>
                <i class="model-shadow"></i>
              </span>
              <span class="pose-caption">人物站位示意</span>
            </div>
            <div class="pose-copy">
              <p class="eyebrow">POSE PREVIEW</p>
              <h3>${attraction.photoSpots[0].title}</h3>
              <p>让人物站在画面下方三分之一处，主体建筑保留完整轮廓。摄影者稍微后退，用环境交代地点，人物只负责提供尺度和旅行感。</p>
            </div>
          </article>
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
