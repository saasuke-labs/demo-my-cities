// The only script on the site. Everything works without it; these are two
// small conveniences.

// 1. Figures. Nagare charts come with a fixed width and height; giving them a
//    viewBox lets the stylesheet scale them to the text column. Each figure is
//    also wrapped in a scrolling frame, so on a phone it can stay large enough
//    to read instead of shrinking to fit.
document.querySelectorAll(".prose > svg").forEach((svg) => {
  if (!svg.hasAttribute("viewBox")) {
    const width = parseFloat(svg.getAttribute("width"));
    const height = parseFloat(svg.getAttribute("height"));
    if (width && height) {
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.removeAttribute("width");
      svg.removeAttribute("height");
    }
  }
  const frame = document.createElement("div");
  frame.className = "figure";
  frame.tabIndex = 0;
  frame.setAttribute("role", "group");
  frame.setAttribute("aria-label", "Figure");
  svg.replaceWith(frame);
  frame.append(svg);
});

// 2. Long pages get a table of contents built from their h2 headings, so it
//    can never drift from the Markdown.
const toc = document.querySelector("[data-toc]");
const source = document.querySelector("[data-toc-source]");
if (toc && source) {
  const list = toc.querySelector("ol");
  const links = new Map();

  source.querySelectorAll("h2[id]").forEach((heading) => {
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    const item = document.createElement("li");
    item.append(link);
    list.append(item);
    links.set(heading, link);
  });

  if (links.size > 0) {
    toc.hidden = false;

    // Mark the section being read.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => link.removeAttribute("aria-current"));
          links.get(entry.target).setAttribute("aria-current", "true");
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );
    links.forEach((_, heading) => observer.observe(heading));
  }
}
