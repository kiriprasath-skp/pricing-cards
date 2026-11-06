(() => {
  const toggle = document.getElementById('billingToggle');
  const labels = document.querySelectorAll('.toggle-label');
  const amounts = document.querySelectorAll('.amount');
  const periods = document.querySelectorAll('.period');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let annual = false;

  function renderPrices() {
    amounts.forEach(el => {
      const value = annual ? el.dataset.annual : el.dataset.monthly;
      const swap = () => { el.textContent = value; el.classList.remove('flip'); };
      if (reduceMotion) { swap(); return; }
      el.classList.add('flip');
      setTimeout(swap, 150);
    });
    periods.forEach(el => { el.textContent = annual ? '/mo, billed yearly' : '/mo'; });
  }

  toggle.addEventListener('click', () => {
    annual = !annual;
    toggle.setAttribute('aria-checked', String(annual));
    labels[0].dataset.active = String(!annual);
    labels[1].dataset.active = String(annual);
    renderPrices();
  });

  /* ---- subtle tilt on hover (desktop only) ---- */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        const lift = card.classList.contains('popular') ? 'translateY(-10px) scale(1.03)' : '';
        card.style.transform = `${lift} perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  /* ---- buy button feedback ---- */
  document.querySelectorAll('.buy').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('done')) return;
      const original = btn.textContent;
      btn.textContent = 'Added ✓';
      btn.classList.add('done');
      setTimeout(() => { btn.textContent = original; btn.classList.remove('done'); }, 1800);
    });
  });
})();
