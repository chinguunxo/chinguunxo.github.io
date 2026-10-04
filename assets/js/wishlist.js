// Renders the wishlist from wishes.ts and adds the interactive bits:
// category filters, scroll reveals, pointer parallax and a "make a wish" button.
import { CATEGORY_LABELS, WISHES } from "./wishes.js";
const IMG_BASE = "/assets/images/wishlist/";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className)
        node.className = className;
    if (text !== undefined)
        node.textContent = text;
    return node;
}
function imagePath(src) {
    return /^(https?:)?\//.test(src) ? src : IMG_BASE + src;
}
// ── Rendering ────────────────────────────────────────────
function renderDecoration(d) {
    const img = el("img", "wish-deco");
    img.src = imagePath(d.src);
    img.alt = d.alt ?? "";
    img.loading = "lazy";
    img.style.setProperty("--x", `${d.x}%`);
    img.style.setProperty("--y", `${d.y}%`);
    img.style.setProperty("--w", `${d.width}%`);
    img.style.setProperty("--rot", `${d.rotate ?? 0}deg`);
    img.style.setProperty("--drift-x", `${d.driftX ?? 0}px`);
    img.style.setProperty("--drift-y", `${d.driftY ?? -14}px`);
    return img;
}
function renderPicture(wish) {
    const picture = el("div", "wish-picture");
    picture.append(el("div", "wish-glow"));
    if (wish.image) {
        const img = el("img", "wish-product");
        img.src = imagePath(wish.image);
        img.alt = wish.title;
        img.loading = "lazy";
        picture.append(img);
    }
    else {
        const ph = el("div", "wish-product wish-placeholder");
        ph.setAttribute("role", "img");
        ph.setAttribute("aria-label", `${wish.title} (picture coming soon)`);
        ph.append(el("span", "wish-placeholder-emoji", wish.placeholder));
        ph.append(el("span", "wish-placeholder-label", "picture coming soon"));
        picture.append(ph);
    }
    wish.decorations?.forEach((d) => picture.append(renderDecoration(d)));
    return picture;
}
function renderNote(wish, index) {
    const note = el("div", "wish-note");
    note.append(el("span", "wish-tape"));
    note.append(el("span", "wish-number", String(index + 1).padStart(2, "0")));
    note.append(el("h2", "wish-title", wish.title));
    note.append(el("p", "wish-why", wish.why));
    const meta = el("div", "wish-meta");
    meta.append(el("span", "wish-chip", CATEGORY_LABELS[wish.category]));
    if (wish.link) {
        const a = el("a", "wish-link", "where to find it →");
        a.href = wish.link;
        a.target = "_blank";
        a.rel = "noopener";
        meta.append(a);
    }
    note.append(meta);
    if (wish.granted)
        note.append(el("span", "wish-stamp", "granted ♥"));
    return note;
}
function renderWish(wish, index) {
    const backdrop = wish.backdrop ?? (index % 2 === 0 ? "paper" : "gingham");
    const section = el("section", `wish wish--${backdrop}`);
    section.id = wish.id;
    section.dataset.category = wish.category;
    section.dataset.backdrop = backdrop;
    if (index % 2 === 1)
        section.classList.add("wish--flip");
    if (wish.granted)
        section.classList.add("wish--granted");
    const inner = el("div", "wish-inner");
    inner.append(renderPicture(wish), renderNote(wish, index));
    section.append(inner);
    return section;
}
// ── Filters ──────────────────────────────────────────────
function renderFilters(container, sections) {
    const used = Array.from(new Set(WISHES.map((w) => w.category)));
    if (used.length < 2)
        return;
    const options = ["all", ...used];
    const buttons = options.map((cat) => {
        const btn = el("button", "wish-filter", cat === "all" ? "✨ Everything" : CATEGORY_LABELS[cat]);
        btn.type = "button";
        btn.dataset.category = cat;
        btn.setAttribute("aria-pressed", String(cat === "all"));
        btn.addEventListener("click", () => {
            buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
            sections.forEach((s) => {
                s.hidden = cat !== "all" && s.dataset.category !== cat;
            });
            // Re-number and re-alternate the visible slides so the rhythm stays intact.
            sections
                .filter((s) => !s.hidden)
                .forEach((s, i) => {
                s.classList.toggle("wish--flip", i % 2 === 1);
                s.classList.remove("is-visible");
                void s.offsetWidth; // restart the entrance animation
                s.classList.add("is-visible");
            });
        });
        return btn;
    });
    container.append(...buttons);
}
// ── Backdrops ────────────────────────────────────────────
// Both backgrounds are 1920×1080 with a decorative band along the top
// (a gingham strip on the paper, a lace trim on the gingham). With
// `background-size: cover` the band's rendered height depends on the slide's
// shape, so measure it and expose it as --band for the CSS to pad against.
const BACKDROP_SIZE = { width: 1920, height: 1080 };
const BAND_HEIGHT = { paper: 86, gingham: 245 };
function syncBands(sections) {
    const update = (section) => {
        const backdrop = section.dataset.backdrop;
        const { width, height } = section.getBoundingClientRect();
        const scale = Math.max(width / BACKDROP_SIZE.width, height / BACKDROP_SIZE.height);
        section.style.setProperty("--band", `${Math.round(BAND_HEIGHT[backdrop] * scale)}px`);
    };
    sections.forEach(update);
    if (!("ResizeObserver" in window))
        return;
    const ro = new ResizeObserver((entries) => {
        entries.forEach((entry) => update(entry.target));
    });
    sections.forEach((s) => ro.observe(s));
}
// ── Motion ───────────────────────────────────────────────
function revealOnScroll(targets) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        targets.forEach((t) => t.classList.add("is-visible"));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    targets.forEach((t) => io.observe(t));
}
/** Writes the pointer position (-1…1) into CSS vars so styles can tilt and shift. */
function trackPointer(target) {
    if (prefersReducedMotion || !canHover)
        return;
    let frame = 0;
    target.addEventListener("pointermove", (e) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            const r = target.getBoundingClientRect();
            const mx = ((e.clientX - r.left) / r.width) * 2 - 1;
            const my = ((e.clientY - r.top) / r.height) * 2 - 1;
            target.style.setProperty("--mx", mx.toFixed(3));
            target.style.setProperty("--my", my.toFixed(3));
        });
    });
    target.addEventListener("pointerleave", () => {
        cancelAnimationFrame(frame);
        target.style.setProperty("--mx", "0");
        target.style.setProperty("--my", "0");
    });
}
function burstStars(origin, count = 14) {
    if (prefersReducedMotion)
        return;
    const r = origin.getBoundingClientRect();
    for (let i = 0; i < count; i++) {
        const star = el("span", "wish-spark", i % 3 === 0 ? "✦" : "★");
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const dist = 70 + Math.random() * 90;
        star.style.left = `${r.left + r.width / 2}px`;
        star.style.top = `${r.top + r.height / 2}px`;
        star.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
        star.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
        star.style.setProperty("--spin", `${Math.random() * 360 - 180}deg`);
        document.body.append(star);
        star.addEventListener("animationend", () => star.remove());
    }
}
function setupMakeAWish(button, sections) {
    let last = null;
    button.addEventListener("click", () => {
        const pool = sections.filter((s) => !s.hidden && s !== last);
        const pick = pool[Math.floor(Math.random() * pool.length)] ?? last;
        if (!pick)
            return;
        last = pick;
        burstStars(button);
        pick.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
        pick.classList.remove("is-chosen");
        void pick.offsetWidth;
        pick.classList.add("is-chosen");
    });
}
// ── Boot ─────────────────────────────────────────────────
function init() {
    const list = document.getElementById("wish-list");
    if (!list)
        return;
    const sections = WISHES.map(renderWish);
    list.append(...sections);
    const filters = document.getElementById("wish-filters");
    if (filters)
        renderFilters(filters, sections);
    const wishButton = document.getElementById("make-a-wish");
    if (wishButton instanceof HTMLButtonElement)
        setupMakeAWish(wishButton, sections);
    const count = document.getElementById("wish-count");
    if (count) {
        const granted = WISHES.filter((w) => w.granted).length;
        count.textContent = `${WISHES.length} wishes · ${granted} granted`;
    }
    syncBands(sections);
    const hero = document.querySelector(".wish-hero");
    if (hero)
        trackPointer(hero);
    sections.forEach((s) => trackPointer(s));
    revealOnScroll(sections);
}
init();
