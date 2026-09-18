/* Progressive enhancements only: content and navigation work without this file. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    }), {threshold: .12});
    document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
  }
  const steps = [...document.querySelectorAll('.handoff-steps li')];
  if (steps.length) {
    const controls = document.querySelector('.step-controls');
    const list = document.querySelector('.handoff-steps');
    let current = 0;
    const show = () => {
      steps.forEach((step,index) => { step.hidden = index !== current; });
      controls.querySelector('[data-step-count]').textContent = `${current + 1} / ${steps.length}`;
      controls.querySelector('[data-step-prev]').disabled = current === 0;
      controls.querySelector('[data-step-next]').disabled = current === steps.length - 1;
    };
    controls.querySelector('[data-step-prev]').addEventListener('click', () => {if(current > 0) current--;show();});
    controls.querySelector('[data-step-next]').addEventListener('click', () => {if(current < steps.length - 1) current++;show();});
    list.classList.add('enhanced');controls.hidden = false;show();
  }
  const bytes = document.querySelector('.byte-controls');
  if (bytes) {
    bytes.hidden = false;
    bytes.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      const start = Number(button.dataset.byteStart), end = start + Number(button.dataset.byteSize);
      bytes.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      document.querySelectorAll('[data-byte]').forEach(b => b.classList.toggle('selected', Number(b.dataset.byte) >= start && Number(b.dataset.byte) < end));
    }));
  }
})();
