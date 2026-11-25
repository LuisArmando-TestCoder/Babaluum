export const MIN_TARGET = 44;
export const MIN_FONT = 12;

export const measurePage = ({ minTarget, minFont, stage }) => {
  const viewport = document.documentElement.clientWidth;

  const isShown = (element) => {
    const box = element.getBoundingClientRect();
    if (box.width === 0 || box.height === 0) return false;
    if (element.closest("[aria-hidden='true'], [inert]")) return false;
    const style = getComputedStyle(element);
    return style.visibility !== "hidden" && style.display !== "none";
  };

  const label = (element) => (element.getAttribute("aria-label") || element.textContent || element.tagName).trim().replace(/\s+/g, " ").slice(0, 40);

  const ownText = (element) => [...element.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());

  const flowsInText = (element) => {
    const parent = element.parentElement;
    return parent !== null && ["P", "LI", "BLOCKQUOTE"].includes(parent.tagName) && ownText(parent);
  };

  const overflow = () => {
    const width = document.documentElement.scrollWidth;
    return width > viewport ? [`page is ${width}px wide on a ${viewport}px screen`] : [];
  };

  const targets = () =>
    [...document.querySelectorAll("a[href], button, input:not([type='hidden']), select, textarea, summary, [role='button']")]
      .filter((element) => isShown(element) && element.tabIndex >= 0 && !flowsInText(element))
      .map((element) => ({ element, box: element.getBoundingClientRect() }))
      .filter(({ box }) => box.width < minTarget || box.height < minTarget)
      .map(({ element, box }) => `"${label(element)}" is ${Math.round(box.width)}x${Math.round(box.height)}px`);

  const textElements = () => [...document.body.querySelectorAll("*")].filter((element) => ownText(element) && isShown(element));

  const tinyText = () =>
    textElements()
      .filter((element) => parseFloat(getComputedStyle(element).fontSize) < minFont)
      .map((element) => `"${label(element)}" is ${getComputedStyle(element).fontSize}`);

  const shrink = (box, ratio) => {
    const dx = (box.width * ratio) / 2;
    const dy = (box.height * ratio) / 2;
    return { left: box.left + dx, right: box.right - dx, top: box.top + dy, bottom: box.bottom - dy };
  };

  const intersects = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;

  const glyphBoxes = (element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return [...range.getClientRects()].filter((box) => box.bottom > 0 && box.top < window.innerHeight).map((box) => shrink(box, 0.2));
  };

  const seats = () => [...document.querySelectorAll("[data-cast-seat]")].map((seat) => seat.getBoundingClientRect());

  const isSeated = (body, seatBoxes) => {
    const box = body.getBoundingClientRect();
    const center = { left: box.left + box.width / 2, top: box.top + box.height / 2 };
    return seatBoxes.some((seat) => intersects(seat, { ...center, right: center.left + 1, bottom: center.top + 1 }));
  };

  const isPinned = (element) => {
    for (let node = element; node; node = node.parentElement) {
      if (["fixed", "sticky"].includes(getComputedStyle(node).position)) return true;
    }
    return false;
  };

  const controlBoxes = (element) => [shrink(element.getBoundingClientRect(), 0.2)];

  const obstacles = () => {
    const outsideCast = (element) => !element.closest("[data-cast-layer]") && (window.scrollY === 0 || !isPinned(element));
    const words = textElements().filter(outsideCast).map((element) => ({ element, boxes: glyphBoxes }));
    const controls = [...document.querySelectorAll("a[href], button")].filter((element) => isShown(element) && outsideCast(element)).map((element) => ({ element, boxes: controlBoxes }));
    return [...words, ...controls];
  };

  const union = (boxes) => ({
    left: Math.min(...boxes.map((box) => box.left)),
    right: Math.max(...boxes.map((box) => box.right)),
    top: Math.min(...boxes.map((box) => box.top)),
    bottom: Math.max(...boxes.map((box) => box.bottom)),
  });

  const drawingOf = (body) => {
    const shapes = [...body.querySelectorAll("path, circle, ellipse, rect, polygon")].map((shape) => shape.getBoundingClientRect()).filter((box) => box.width > 0);
    const box = shapes.length ? union(shapes) : body.firstElementChild.getBoundingClientRect();
    return shrink({ ...box, width: box.right - box.left, height: box.bottom - box.top }, 0.1);
  };

  const castOverText = () => {
    const seatBoxes = seats();
    const layer = document.querySelectorAll("[data-cast-layer]")[stage];
    const bodies = [...layer.querySelectorAll("[data-cast-body]")].filter((body) => !isSeated(body, seatBoxes));
    const blockers = obstacles();
    return bodies.flatMap((body) => {
      const drawing = drawingOf(body);
      const hit = blockers.find(({ element, boxes }) => boxes(element).some((box) => intersects(box, drawing)));
      return hit ? [`${body.dataset.castBody} covers "${label(hit.element)}"`] : [];
    });
  };

  if (stage !== undefined) return { castOverText: castOverText() };
  return { overflow: overflow(), targets: targets(), tinyText: tinyText() };
};
