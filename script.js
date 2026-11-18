(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-nav');
  const closeMenu = () => {
    if (!toggle || !menu) return;
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menu.hidden = !open;
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  const desktop = window.matchMedia('(min-width: 761px)');
  desktop.addEventListener('change', event => { if (event.matches) closeMenu(); });
  let toastTimer;
  const announce = message => {
    const toast = document.querySelector('.toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
  };
  document.querySelectorAll('.copy-email').forEach(button => {
    button.addEventListener('click', async () => {
      const email = button.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        announce('Email address copied.');
      } catch {
        const input = document.createElement('textarea');
        input.value = email;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.append(input);
        input.select();
        const copied = document.execCommand('copy');
        input.remove();
        announce(copied ? 'Email address copied.' : 'Please select and copy the email address.');
      }
    });
  });
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  const lightbox = document.querySelector('#screenshot-dialog');
  if (lightbox) {
    const fullImage = lightbox.querySelector('img');
    const caption = lightbox.querySelector('.lightbox-caption');
    document.querySelectorAll('[data-screenshot]').forEach(button => {
      button.addEventListener('click', () => {
        fullImage.src = button.dataset.screenshot;
        fullImage.alt = button.dataset.caption;
        caption.textContent = button.dataset.caption;
        lightbox.showModal();
      });
    });
    lightbox.querySelector('.dialog-close').addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  }
})();
