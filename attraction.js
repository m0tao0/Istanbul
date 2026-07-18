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

  document.title = `${attraction.name} · İstanbul 景点指南`;
  document.querySelector('meta[name="description"]').content = `${attraction.name}详细指南：费用、开放时间、拍照点与注意事项。`;

  root.innerHTML = `
    <section class="detail-hero">
      <div class="detail-image-wrap">
        <img src="${attraction.image}" alt="${attraction.name}实景" />
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
      </div>
    </section>

    <section class="facts-strip" aria-label="实用信息">
      <article><span>门票</span><strong>${attraction.fee}</strong></article>
      <article><span>开放</span><strong>${attraction.hours}</strong></article>
      <article><span>建议停留</span><strong>${attraction.duration}</strong></article>
      <article><span>最佳时间</span><strong>${attraction.bestTime}</strong></article>
    </section>

    <section class="detail-body">
      <div class="detail-primary">
        <section class="content-block">
          <p class="eyebrow">WHAT TO SEE</p>
          <h2>不要错过</h2>
          <div class="highlight-list">
            ${attraction.highlights.map((item, index) => `
              <div><span>${String(index + 1).padStart(2, "0")}</span><p>${item}</p></div>
            `).join("")}
          </div>
        </section>

        <blockquote>${attraction.quote}</blockquote>

        <section class="content-block">
          <p class="eyebrow">PHOTO NOTES</p>
          <h2>最佳拍照点</h2>
          <div class="photo-spots">
            ${attraction.photoSpots.map((spot, index) => `
              <article>
                <span class="spot-number">${index + 1}</span>
                <h3>${spot.title}</h3>
                <p>${spot.text}</p>
              </article>
            `).join("")}
          </div>
        </section>
      </div>

      <aside class="detail-aside">
        <div class="aside-card">
          <p class="eyebrow">GOOD TO KNOW</p>
          <h2>注意事项</h2>
          <ul>${attraction.tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>
        </div>
        <div class="aside-card transit-card">
          <p class="eyebrow">GETTING THERE</p>
          <h2>如何到达</h2>
          <p>${attraction.transit}</p>
          <a href="${attraction.map}" target="_blank" rel="noreferrer">在地图中查看 <span>↗</span></a>
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
})();
