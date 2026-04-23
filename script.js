const tabs = document.querySelectorAll("[data-day]");
const panels = document.querySelectorAll("[data-panel]");
const toast = document.querySelector("[data-toast]");

const planText = `杭州周末2日路线
Day 1：断桥残雪 → 白堤 → 青藤茶馆（南山路）→ 河坊街 / 清河坊 → 湖滨 in77 + 西湖夜景
Day 2：灵隐景区 / 飞来峰 → 上天竺法喜讲寺 → 龙井村 / 满觉陇 → 小河历史文化街区
住宿建议：龙翔桥 / 凤起路 / 定安路附近
交通建议：西湖日步行和地铁为主；灵隐、法喜寺、龙井、小河直街跨区时建议打车补充。`;

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
