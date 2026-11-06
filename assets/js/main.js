// Click any gallery image to enlarge it
const box = document.createElement("dialog");
box.className = "lightbox";
box.innerHTML = '<img alt=""><p></p>';
document.body.appendChild(box);
box.addEventListener("click", () => box.close());
document.querySelectorAll(".gallery img").forEach((img) => {
  img.addEventListener("click", () => {
    box.querySelector("img").src = img.dataset.full || img.src;
    box.querySelector("img").alt = img.alt;
    box.querySelector("p").textContent = img.closest("figure")?.querySelector("figcaption")?.textContent || "";
    box.showModal();
  });
});

// Before/after sliders
document.querySelectorAll(".compare").forEach((c) => {
  const input = c.querySelector("input");
  const set = () => {
    c.querySelector(".top").style.clipPath = `inset(0 ${100 - input.value}% 0 0)`;
    c.querySelector(".handle").style.left = input.value + "%";
  };
  input.addEventListener("input", set);
  set();
});

// 3D model switcher: buttons swap which GLB the viewer shows
document.querySelectorAll("[data-model-switch]").forEach((bar) => {
  const mv = bar.parentElement.querySelector("model-viewer");
  const toggle = bar.parentElement.querySelector("[data-scan-toggle]");
  const box = toggle && toggle.querySelector("input");

  // Scans are translucent materials named scan_*; hiding = alpha 0
  const scanAlpha = new Map();
  const applyScans = () => {
    if (!mv.model) return;
    mv.model.materials.forEach((m) => {
      if (!m.name.startsWith("scan_")) return;
      const c = m.pbrMetallicRoughness.baseColorFactor;
      if (!scanAlpha.has(m.name)) scanAlpha.set(m.name, c[3]);
      m.pbrMetallicRoughness.setBaseColorFactor([c[0], c[1], c[2], box.checked ? scanAlpha.get(m.name) : 0]);
    });
  };
  if (box) {
    box.addEventListener("change", applyScans);
    mv.addEventListener("load", applyScans);
  }

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    bar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b === btn));
    mv.src = btn.dataset.src;
    mv.cameraOrbit = btn.dataset.orbit;
    mv.alt = btn.textContent + " 3D model";
    if (toggle) toggle.hidden = !("scans" in btn.dataset);
  });
});

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
