import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Preserve semantic text and line breaks; animate words only once in view. */
export function SectionTextReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const showIfReduced = () => { if (media.matches) setVisible(true); };
    showIfReduced();
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    observer.observe(node);
    media.addEventListener("change", showIfReduced);
    return () => { observer.disconnect(); media.removeEventListener("change", showIfReduced); };
  }, []);

  let order = 0;
  const split = (items: ReactNode): ReactNode => Children.map(items, item => {
    if (typeof item === "string" || typeof item === "number") {
      return String(item).split(/(\s+)/).map((word, index) => /^\s+$/.test(word) ? word : (
        <span className="section-reveal-word" key={index} style={{ "--reveal-word-delay": `${Math.min(order++, 14) * 65}ms` } as CSSProperties}>{word}</span>
      ));
    }
    if (isValidElement<{ children?: ReactNode }>(item) && item.props.children) {
      return cloneElement(item, {}, split(item.props.children));
    }
    return item;
  });

  return <span ref={root} className={`section-text-reveal${visible ? " is-revealed" : ""}`}>
    <span className="sr-only">{children}</span>
    <span className="section-reveal-visual" aria-hidden="true">{split(children)}</span>
  </span>;
}