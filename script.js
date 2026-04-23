const tabs = document.querySelectorAll("[data-day]");
const panels = document.querySelectorAll("[data-panel]");
const toast = document.querySelector("[data-toast]");
const galleryGroups = document.querySelector("#gallery-groups");

const planText = `杭州周末2日路线
Day 1：断桥残雪 → 白堤 → 青藤茶馆（南山路）→ 河坊街 / 清河坊 → 湖滨 in77 + 西湖夜景
Day 2：灵隐景区 / 飞来峰 → 上天竺法喜讲寺 → 龙井村 / 满觉陇 → 小河历史文化街区
住宿建议：龙翔桥 / 凤起路 / 定安路附近
交通建议：西湖日步行和地铁为主；灵隐、法喜寺、龙井、小河直街跨区时建议打车补充。`;

const galleryData = [
  {
    id: "day1-morning",
    title: "Day 1 上午｜湖边初醒",
    meta: "断桥残雪、白堤、孤山、西湖晨景",
    cards: [
      {
        title: "断桥晨风",
        spot: "断桥残雪",
        style: ["动漫电影感", "湖雾晨光"],
        note: "桥、柳、湖面是主特征，保留西湖清晨的轻盈感。",
        img: "assets/gallery/day1-morning-01-broken-bridge-anime.webp",
      },
      {
        title: "白堤并肩",
        spot: "白堤",
        style: ["35mm 胶片", "背影旅行"],
        note: "用堤岸直线和湖面留白把两个人的步行节奏拉出来。",
        img: "assets/gallery/day1-morning-02-bai-causeway-film.webp",
      },
      {
        title: "西湖纸景",
        spot: "西湖",
        style: ["纸艺立体", "旅行模型"],
        note: "把桥、湖、柳树压缩成像手工书一样的景观切片。",
        img: "assets/gallery/day1-morning-03-west-lake-paper-diorama.webp",
      },
      {
        title: "旧梦海报",
        spot: "西湖 / 断桥",
        style: ["复古海报", "石印质感"],
        note: "把西湖经典景观做成更具收藏感的平面图像。",
        img: "assets/gallery/day1-morning-04-west-lake-vintage-poster.webp",
      },
      {
        title: "湖岸速写",
        spot: "孤山 / 湖岸步道",
        style: ["水彩速写", "建筑手帐"],
        note: "适合表现树影、桥栏和空气感，不走满屏饱和路线。",
        img: "assets/gallery/day1-morning-05-west-lake-watercolor-sketch.webp",
      },
      {
        title: "西湖微缩剧场",
        spot: "西湖",
        style: ["3D 黏土", "俯视场景"],
        note: "用体块化的桥和小船表达路线起点的轻松感。",
        img: "assets/gallery/day1-morning-06-west-lake-clay-isometric.webp",
      },
    ],
  },
  {
    id: "day1-afternoon",
    title: "Day 1 下午｜茶香与灯火",
    meta: "青藤茶馆、河坊街、湖滨 in77、西湖夜景",
    cards: [
      {
        title: "靠窗茶席",
        spot: "青藤茶馆",
        style: ["暖调动漫", "茶馆室内"],
        note: "把茶桌、木窗和休息情绪放到同一画面里。",
        img: "assets/gallery/day1-afternoon-01-qingteng-teahouse-anime.webp",
      },
      {
        title: "老街晚光",
        spot: "河坊街",
        style: ["街头胶片", "老街纪实"],
        note: "突出石板路、老铺面和周末逛街感，而不是只拍建筑空镜。",
        img: "assets/gallery/day1-afternoon-02-hefang-street-film.webp",
      },
      {
        title: "湖滨霓影",
        spot: "湖滨 in77 / 西湖夜景",
        style: ["未来夜景", "霓虹都市"],
        note: "把湖滨夜晚做得更时髦，适合对比前面偏自然的段落。",
        img: "assets/gallery/day1-afternoon-03-hubin-neon-night.webp",
      },
      {
        title: "路线拼贴",
        spot: "青藤茶馆 → 河坊街 → 湖滨",
        style: ["高定拼贴", "杂志页面"],
        note: "强调一个下午里从茶香到老街再到夜色的变化。",
        img: "assets/gallery/day1-afternoon-04-route-collage-fashion.webp",
      },
      {
        title: "几何老街",
        spot: "河坊街 / 湖滨",
        style: ["包豪斯图形", "抽象路线"],
        note: "把茶杯、街道、湖水和夜灯抽象成几何秩序。",
        img: "assets/gallery/day1-afternoon-05-bauhaus-itinerary.webp",
      },
      {
        title: "墨金夜游",
        spot: "西湖夜色",
        style: ["水墨金箔", "诗意夜景"],
        note: "夜景不只靠照片，水墨和金色更像周末收尾的情绪页。",
        img: "assets/gallery/day1-afternoon-06-ink-gold-evening.webp",
      },
    ],
  },
  {
    id: "day2-morning",
    title: "Day 2 上午｜山寺小愿",
    meta: "灵隐、飞来峰、法喜寺、寺院细节",
    cards: [
      {
        title: "灵隐入山",
        spot: "灵隐景区",
        style: ["静谧动漫", "山寺晨光"],
        note: "寺院屋檐、山色和人物比例都压低，让环境先说话。",
        img: "assets/gallery/day2-morning-01-lingyin-anime.webp",
      },
      {
        title: "山门纪实",
        spot: "灵隐景区",
        style: ["旅行社论摄影", "自然颗粒"],
        note: "保留真实进寺动线感，更像一本旅行杂志的跨页。",
        img: "assets/gallery/day2-morning-02-lingyin-editorial.webp",
      },
      {
        title: "飞来峰石径",
        spot: "飞来峰",
        style: ["植物色粉画", "山径古意"],
        note: "强调石壁、苔藓、山径和佛教石窟氛围。",
        img: "assets/gallery/day2-morning-03-feilai-peak-gouache.webp",
      },
      {
        title: "黄墙竹影",
        spot: "法喜寺",
        style: ["新中式极简", "平面海报感"],
        note: "法喜寺最鲜明的特征是黄墙、竹影、瓦檐和简洁留白。",
        img: "assets/gallery/day2-morning-04-faxi-yellow-wall-minimal.webp",
      },
      {
        title: "小愿细节",
        spot: "法喜寺 / 灵隐",
        style: ["特写静物", "柔焦社论"],
        note: "把祈福后的手部细节和随身小物单独留下来。",
        img: "assets/gallery/day2-morning-05-temple-details-editorial.webp",
      },
      {
        title: "檐下微雨",
        spot: "寺院屋檐",
        style: ["雨天版画", "木刻水墨"],
        note: "屋檐、雨线和伞面把寺院这半天的空气感拉满。",
        img: "assets/gallery/day2-morning-06-temple-eaves-rainprint.webp",
      },
    ],
  },
  {
    id: "day2-afternoon",
    title: "Day 2 下午｜茶山慢收尾",
    meta: "龙井村、满觉陇、小河直街、运河咖啡",
    cards: [
      {
        title: "茶垄大片",
        spot: "龙井村",
        style: ["旅行大片", "开阔茶园"],
        note: "茶垄的弧线和人物比例最能说明龙井这段路线。",
        img: "assets/gallery/day2-afternoon-01-longjing-fields-editorial.webp",
      },
      {
        title: "满觉陇小院",
        spot: "满觉陇",
        style: ["暖调故事插画", "山中小院"],
        note: "茶椅、院子、树影比单纯的茶叶更能表现松弛感。",
        img: "assets/gallery/day2-afternoon-02-manjuelong-courtyard-gouache.webp",
      },
      {
        title: "山路胶片",
        spot: "龙井村山路",
        style: ["公路海报", "胶片雾光"],
        note: "把龙井村的坡路和拍照动作放在一起，更像旅行途中。",
        img: "assets/gallery/day2-afternoon-03-longjing-road-poster.webp",
      },
      {
        title: "茶点桌面",
        spot: "龙井 / 满觉陇",
        style: ["静物社论", "桌面日光"],
        note: "把茶、点心、地图和聊天状态留成一个静物节点。",
        img: "assets/gallery/day2-afternoon-04-tea-table-editorial.webp",
      },
      {
        title: "小河傍晚",
        spot: "小河直街",
        style: ["蓝调街拍", "运河夜色"],
        note: "突出运河、旧仓立面和傍晚灯光，不只拍咖啡店。",
        img: "assets/gallery/day2-afternoon-05-xiaohe-canal-dusk.webp",
      },
      {
        title: "周末最后一杯",
        spot: "小河直街咖啡馆",
        style: ["暖光动漫", "收尾情绪"],
        note: "最后这张把“走累了但很满足”的周末状态收住。",
        img: "assets/gallery/day2-afternoon-06-xiaohe-cafe-anime.webp",
      },
    ],
  },
];

function activateDay(day) {
  tabs.forEach((tab) => {
    const selected = tab.dataset.day === day;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });

  panels.forEach((panel) => {
    const selected = panel.dataset.panel === day;
    panel.classList.toggle("is-active", selected);
    panel.hidden = !selected;
  });
}

function renderGallery() {
  if (!galleryGroups) return;

  const sizeByIndex = ["featured", "tall", "tall", "standard", "standard", "standard"];

  galleryGroups.innerHTML = galleryData
    .map((group) => {
      const cards = group.cards
        .map(
          (card, index) => `
            <article class="gallery-card ${sizeByIndex[index] || "standard"} reveal">
              <figure class="gallery-media">
                <img src="${card.img}" alt="${card.title}，${card.spot}，${card.style.join("、")}" loading="lazy" decoding="async" />
              </figure>
              <div class="gallery-copy">
                <span class="gallery-spot">${card.spot}</span>
                <h4>${card.title}</h4>
                <div class="gallery-tags">
                  ${card.style.map((tag) => `<span class="gallery-tag">${tag}</span>`).join("")}
                </div>
                <p>${card.note}</p>
              </div>
            </article>
          `
        )
        .join("");

      return `
        <section class="gallery-group">
          <div class="gallery-group-header reveal">
            <div>
              <h3>${group.title}</h3>
              <p class="gallery-group-meta">${group.meta}</p>
            </div>
          </div>
          <div class="gallery-grid">${cards}</div>
        </section>
      `;
    })
    .join("");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateDay(tab.dataset.day));
});

document.querySelector("[data-copy-plan]")?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(planText);
    toast?.classList.add("is-visible");
    window.setTimeout(() => toast?.classList.remove("is-visible"), 1800);
  } catch {
    window.prompt("复制这段行程：", planText);
  }
});

renderGallery();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
