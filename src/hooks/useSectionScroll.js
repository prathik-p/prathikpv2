import { useEffect } from "react";

export default function useSectionScroll(deckRef) {
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const panels = [...deck.children].filter((element) => element.tagName === "SECTION");
    if (!panels.length) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, moving = false, wheelLatched = false, wheelReading = false, wheelTimer, wheelAmount = 0, touch = null;
    let destination = 0;
    const currentIndex = () => panels.reduce((best, panel, index) => Math.abs(panel.offsetTop - deck.scrollTop) < Math.abs(panels[best].offsetTop - deck.scrollTop) ? index : best, 0);
    const canReadMore = (panel, direction) => direction > 0 ? panel.scrollTop + panel.clientHeight < panel.scrollHeight - 8 : panel.scrollTop > 8;

    function goTo(index, { focus = false, instant = false } = {}) {
      const next = Math.max(0, Math.min(index, panels.length - 1));
      const target = panels[next];
      if (!target) return;
      cancelAnimationFrame(frame);
      if (next !== destination) target.scrollTop = 0;
      destination = next;
      const start = deck.scrollTop, end = target.offsetTop, began = performance.now();
      moving = true;
      const finish = () => {
        deck.scrollTop = target.offsetTop;
        moving = false;
        if (focus) target.focus({ preventScroll: true });
      };
      if (instant || motion.matches || Math.abs(start - end) < 2) { finish(); return; }
      const tick = (now) => {
        const p = Math.min((now - began) / 780, 1);
        const eased = p < .5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
        deck.scrollTop = start + (end - start) * eased;
        if (p < 1) frame = requestAnimationFrame(tick); else finish();
      };
      frame = requestAnimationFrame(tick);
    }

    // Latch a whole trackpad/wheel burst so its momentum cannot skip panels.
    function onWheel(event) {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { wheelLatched = false; wheelReading = false; wheelAmount = 0; }, 200);
      const direction = Math.sign(event.deltaY), panel = panels[currentIndex()];
      // A gesture used to read long content must not also advance a chapter.
      if (!moving && !wheelLatched && (wheelReading || canReadMore(panel, direction))) {
        wheelReading = true;
        wheelAmount = 0;
        return;
      }
      event.preventDefault();
      if (moving || wheelLatched) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? deck.clientHeight : 1);
      if (Math.sign(wheelAmount) !== direction) wheelAmount = 0;
      wheelAmount += delta;
      if (Math.abs(wheelAmount) < 28) return;
      wheelLatched = true;
      goTo(currentIndex() + direction);
    }
    function onKey(event) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || document.querySelector(".portfolio[inert]")) return;
      if (event.target.closest("input, textarea, select, button, a, summary, [contenteditable='true']")) return;
      const direction = ["ArrowDown", "PageDown"].includes(event.key) || (event.key === " " && !event.shiftKey) ? 1 : ["ArrowUp", "PageUp"].includes(event.key) || (event.key === " " && event.shiftKey) ? -1 : 0;
      if (!direction && !["Home", "End"].includes(event.key)) return;
      event.preventDefault();
      if (moving) return;
      const index = currentIndex();
      if (direction && canReadMore(panels[index], direction)) {
        panels[index].scrollBy({ top: direction * (event.key.startsWith("Arrow") ? 60 : deck.clientHeight * .7), behavior: motion.matches ? "instant" : "smooth" });
        return;
      }
      goTo(event.key === "Home" ? 0 : event.key === "End" ? panels.length - 1 : index + direction, { focus: true });
    }
    function onLink(event) {
      const link = event.target.closest('a[href^="#"]');
      if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const index = panels.findIndex((panel) => `#${panel.id}` === link.getAttribute("href"));
      if (index < 0) return;
      event.preventDefault();
      if (location.hash !== link.hash) history.pushState(null, "", link.hash);
      goTo(index, { focus: true });
    }
    function onTouchStart(event) {
      touch = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY, index: currentIndex(), claimed: false } : null;
    }
    function onTouchMove(event) {
      if (!touch || event.touches.length !== 1) return;
      const delta = touch.y - event.touches[0].clientY;
      if (Math.abs(delta) < 12 || Math.abs(delta) < Math.abs(touch.x - event.touches[0].clientX)) return;
      if (moving || touch.claimed || !canReadMore(panels[touch.index], Math.sign(delta))) { event.preventDefault(); touch.claimed = true; }
    }
    function onTouchEnd(event) {
      if (touch?.claimed && !moving && event.changedTouches.length) {
        const delta = touch.y - event.changedTouches[0].clientY;
        if (Math.abs(delta) > 45) goTo(touch.index + Math.sign(delta));
      }
      touch = null;
    }
    const onTouchCancel = () => { touch = null; };
    const onHistory = () => { const index = panels.findIndex((panel) => `#${panel.id}` === location.hash); goTo(index < 0 ? 0 : index, { instant: true }); };
    const onMotion = () => { if (motion.matches && moving) goTo(destination, { instant: true }); };
    // Viewport changes alter every panel offset; keep the selected chapter aligned.
    const resizeObserver = new ResizeObserver(() => goTo(destination, { instant: true }));
    resizeObserver.observe(deck);
    panels.forEach((panel) => { panel.tabIndex = -1; });
    frame = requestAnimationFrame(onHistory);
    deck.addEventListener("wheel", onWheel, { passive: false });
    deck.addEventListener("touchstart", onTouchStart, { passive: true });
    deck.addEventListener("touchmove", onTouchMove, { passive: false });
    deck.addEventListener("touchend", onTouchEnd);
    deck.addEventListener("touchcancel", onTouchCancel);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onLink);
    window.addEventListener("popstate", onHistory);
    motion.addEventListener("change", onMotion);
    return () => {
      cancelAnimationFrame(frame); clearTimeout(wheelTimer);
      resizeObserver.disconnect();
      deck.removeEventListener("wheel", onWheel);
      deck.removeEventListener("touchstart", onTouchStart);
      deck.removeEventListener("touchmove", onTouchMove);
      deck.removeEventListener("touchend", onTouchEnd);
      deck.removeEventListener("touchcancel", onTouchCancel);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onLink);
      window.removeEventListener("popstate", onHistory);
      motion.removeEventListener("change", onMotion);
    };
  }, [deckRef]);
}
