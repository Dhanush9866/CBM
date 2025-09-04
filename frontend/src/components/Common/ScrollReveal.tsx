import { useEffect } from "react";

const TEXT_SELECTORS = [
  "main h1",
  "main h2",
  "main h3",
  "main h4",
  "main h5",
  "main h6",
  "main p",
  "main li",
  "main dt",
  "main dd",
  "main blockquote",
  "main .card",
  "main .card-hover",
  "main .card-service",
  "main .card-industry",
  "main .card-lavender",
  "main .card-lavender-soft",
];

export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const queryAll = () =>
      Array.from(
        document.querySelectorAll(TEXT_SELECTORS.join(", "))
      ) as HTMLElement[];

    const elements = queryAll();

    elements.forEach((el) => {
      if (!el.classList.contains("reveal-up")) {
        el.classList.add("reveal-up");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add("revealed");
            observer.unobserve(target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    const mutationObserver = new MutationObserver(() => {
      const latest = queryAll();
      latest.forEach((el) => {
        if (!el.classList.contains("reveal-up") && !el.classList.contains("revealed")) {
          el.classList.add("reveal-up");
        }
        if (!el.classList.contains("revealed")) {
          observer.observe(el);
        }
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}

export default ScrollReveal;


