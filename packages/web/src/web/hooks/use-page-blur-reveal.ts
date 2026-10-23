import { useEffect, type RefObject } from "react";

/** One-shot reveals on content groups, leaving animated canvases untouched. */
export function usePageBlurReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const selector = [
      ".inovi-stage-brand", ".inovi-eyebrow", ".inovi-description",
      ".inovi-contact", ".inovi-contact-note", ".inovi-dental-branding",
      ".inovi-dental-copy > p", ".inovi-services-heading > span",
      ".inovi-services-heading > p", ".inovi-contact-intro > p", ".bio-card-reveal",
      ".inovi-footer-brand", ".inovi-footer-contacts > a", ".inovi-footer-bottom",
      ".inovi-about-header", ".inovi-about-location", ".inovi-about-eyebrow",
      ".inovi-about-intro", ".inovi-about-pillar", ".inovi-about-values", ".inovi-about-bottom",
    ].join(",");
    const items = node.querySelectorAll<HTMLElement>(selector);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-blur-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -5% 0px" });
    items.forEach(item => {
      item.classList.add("page-blur-reveal");
      if (media.matches) item.classList.add("is-blur-revealed");
      else observer.observe(item);
    });
    const reduce = () => {
      if (media.matches) {
        items.forEach(item => item.classList.add("is-blur-revealed"));
        observer.disconnect();
      }
    };
    media.addEventListener("change", reduce);
    return () => { observer.disconnect(); media.removeEventListener("change", reduce); };
  }, [root]);
}