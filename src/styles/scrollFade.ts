// Global scroll-based fade-in (runs once, no re-trigger)

const observer = new IntersectionObserver(
  (entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observerInstance.unobserve(entry.target); // animate only once
      }
    });
  },
  {
    threshold: 0.15, // when 15% of section is visible
  }
);

// Observe all sections automatically
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});