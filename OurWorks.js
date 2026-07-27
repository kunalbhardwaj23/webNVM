
const counters = [
  {id: "c1", value: 500},
  {id: "c2", value: 300},
  {id: "c3", value: 100},
  {id: "c4", value: 50},
];

let started = false;

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !started) {
    started = true;

    counters.forEach(counter => {
      let count = 0;
      const el = document.getElementById(counter.id);

      const duration = 2000; // ⏱ total time (2 seconds)
      const increment = counter.value / (duration / 16); // smoother

      const update = () => {
        if (count < counter.value) {
          count += increment;
          el.innerText = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          el.innerText = counter.value + "+";
        }
      };

      update();
    });
  }
}, { threshold: 0.5 });

observer.observe(document.querySelector(".impact"));