/* ==========================================================================
   Classic Interiors — shared behaviour
   ========================================================================== */

// ---- Real photography sourced under the Unsplash License -----------------
// One verified, freely-licensed photo per category (fetched and confirmed
// "Free to use under the Unsplash License" directly from unsplash.com).
// Each gallery re-crops that single photo a few different ways so the grid
// has visual rhythm. These stand in for the studio's own project photos —
// swap them for real completed-project photography before launch.
function uns(id, w, h) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=72&w=${w}${h ? '&h=' + h : ''}`;
}

const PHOTO_IDS = {
  kitchen: '1641823911769-c55f23c25143',
  wardrobe: '1649361811423-a55616f7ab11',
  tvUnit: '1646615759965-68db6f18c3d9',
  hospital: '1590979249337-df10c2ea5df0',
  residential: '1680965585463-386646047473',
  office: '1747992021633-762a63985d01',
  jewellery: '1724986211704-b997f0cf029f',
  falseCeiling: '1747031805159-45029bbe8f09',
};

function galleryFrom(id) {
  return [
    uns(id, 1200, 900),
    uns(id, 1200, 1500),
    uns(id, 1400, 1000),
    uns(id, 1000, 1000),
  ];
}

const CATEGORIES = [
  {
    slug: 'modular-kitchen',
    name: 'Modular Kitchen',
    cover: 'Photos/k1.jpg',
    photos: [
      'Photos/k9.jpg',
      'Photos/k2.jpg',
      'Photos/k3.jpg',
      'Photos/k4.jpg',
      'Photos/k5.jpg',
      'Photos/k6.jpg',
      'Photos/k7.jpg',
      'Photos/k8.jpg',
      'Photos/k10.jpg'
    ],
  },
  {
    slug: 'wardrobe-cot',
    name: 'Wardrobe & Cot',
    cover: 'Photos/w0.jpg',
    photos: [
      'Photos/w1.jpg',
      'Photos/w2.jpg',
      'Photos/w3.jpg',
      'Photos/w4.jpg',
      'Photos/w5.jpg',
      'Photos/w6.jpg',
      'Photos/w7.jpg',
      'Photos/w8.jpg',
      'Photos/w9.jpg',
  
    ],
  },
  {
    slug: 'tv-pooja-unit',
    name: 'TV Unit & Pooja Unit',
    cover: 'Photos/tv0.jpg',
    photos: [
      'Photos/tv1.jpg',
      'Photos/p1.jpg',
      'Photos/tv2.jpg',
      'Photos/p2.jpg',
      'Photos/tv3.jpg',
      'Photos/p3.jpg',
      'Photos/tv4.jpg',
      'Photos/p4.jpg',
      'Photos/tv5.jpg',
    ],
  },
  {
    slug: 'dental-hospital-interiors',
    name: 'Dental & Hospital Interiors',
    cover: 'Photos/D1.jpeg',
    photos: [
      'Photos/D1.jpeg',
      'Photos/D8.jpeg',
      'Photos/D3.jpg',
      'Photos/D4.jpg',
      'Photos/D5.jpg',
      'Photos/D6.jpg',
      'Photos/D7.jpg',
      'Photos/D2.jpg'
    ],
  },
  {
    slug: 'residential-interiors',
    name: 'Residential Interiors',
    cover: 'Photos/r1.jpg',
    photos: [
      'Photos/r2.jpg',
      'Photos/r3.jpg',
      'Photos/r4.jpg',
      'Photos/r5.jpg',
      'Photos/r6.jpg',
      'Photos/r7.jpg',
      'Photos/r8.jpg',
      'Photos/r9.jpg',
    ],
  },
  {
    slug: 'office-interior-work',
    name: 'Office Interior Work',
    cover: 'Photos/o0.jpg',
    photos: [
      'Photos/o1.jpg',
      'Photos/o2.jpg',
      'Photos/o3.jpg',
      'Photos/o4.jpg',
      'Photos/o5.jpg',
      'Photos/o6.jpg',
      'Photos/o7.jpg',
      'Photos/o8.jpg',
      'Photos/o9.jpg',
    ],
  },
  {
    slug: 'jewellery-shop-interiors',
    name: 'Jewellery Shop Interiors',
    cover: 'Photos/j0.jpeg',
    photos: [
      'Photos/j1.jpg',
      'Photos/j2.jpg',
      'Photos/j3.jpg',
      'Photos/j4.jpg',
      'Photos/j5.jpg',
      'Photos/j6.jpg',
      'Photos/j7.jpg',
      'Photos/j8.jpg',
    ],
  },
  {
    slug: 'false-ceiling',
    name: 'False Ceiling',
    cover: 'Photos/f0.jpg',
    photos: [
      'Photos/f1.jpg',
      'Photos/f2.jpg',
      'Photos/f3.jpg',
      'Photos/f4.jpg',
      'Photos/f5.jpg',
      'Photos/f6.jpg',
      'Photos/f7.jpg',
      'Photos/f8.jpg',
      'Photos/f9.jpg',
  
    ],
  },
];

window.CATEGORIES = CATEGORIES;

// ---- Intro animation (first load per session only) -----------------------
(function initIntro(){
  const intro = document.querySelector('.intro');
  if (!intro) return;

  const alreadySeen = sessionStorage.getItem('ci-intro-seen');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (alreadySeen) {
    intro.remove();
    return;
  }

  const timers = [];
  const hide = () => {
    timers.forEach(clearTimeout);
    intro.classList.add('is-hidden');
    sessionStorage.setItem('ci-intro-seen', '1');
    setTimeout(() => intro.remove(), 850);
  };

  if (reduceMotion) {
    hide();
    return;
  }

  const skipBtn = document.getElementById('skip-hint');
  if (skipBtn) skipBtn.addEventListener('click', hide);

  const flourish = document.getElementById('flourish');
  const wordmark = document.getElementById('wordmark');
  const tagline = document.getElementById('tagline');

  timers.push(setTimeout(() => flourish && flourish.classList.add('grow'), 1500));
  timers.push(setTimeout(() => wordmark && wordmark.classList.add('in'), 1900));
  timers.push(setTimeout(() => tagline && tagline.classList.add('in'), 2250));
  timers.push(setTimeout(() => skipBtn && skipBtn.classList.add('in'), 1200));
  timers.push(setTimeout(hide, 4400));
})();

// ---- Mobile nav toggle -----------------------------------------------------
(function initNav(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ---- Home page: category preview cards -------------------------------------
(function renderCategoryPreview(){
  const el = document.querySelector('[data-category-preview]');
  if (!el) return;
  const subset = CATEGORIES.slice(0, 4);
  el.innerHTML = subset.map(cat => `
    <a class="cat-card photo-treat" href="projects.html#${cat.slug}">
      <img src="${cat.cover}" alt="${cat.name} interior design sample" loading="lazy" width="900" height="1100">
      <span class="cat-card__label">
        <span class="count">${cat.photos.length} photos</span>
        <h3>${cat.name}</h3>
      </span>
    </a>
  `).join('');
})();

// ---- Projects page: category index + gallery views + lightbox -------------
(function initGalleryPage(){
  const indexGrid = document.querySelector('[data-category-index]');
  if (!indexGrid) return;

  indexGrid.innerHTML = CATEGORIES.map(cat => `
    <a class="cat-card photo-treat" href="#${cat.slug}" data-slug="${cat.slug}">
      <img src="${cat.cover}" alt="${cat.name} interior design sample" loading="lazy" width="900" height="1100">
      <span class="cat-card__label">
        <span class="count">${cat.photos.length} photos</span>
        <h3>${cat.name}</h3>
      </span>
    </a>
  `).join('');

  const viewsWrap = document.querySelector('[data-gallery-views]');
  viewsWrap.innerHTML = CATEGORIES.map(cat => `
    <section class="gallery-view" id="view-${cat.slug}" data-slug="${cat.slug}">
      <a class="back-link" href="#" data-back>&larr; All categories</a>
      <div class="gallery-view__head">
        <div>
          <div class="ornament ornament--left"><span></span></div>
          <h2>${cat.name}</h2>
        </div>
        <p>${cat.photos.length} photos in this collection</p>
      </div>
      <div class="photo-grid" data-slug="${cat.slug}">
        ${cat.photos.map((src, i) => `
          <button type="button" class="photo-treat" data-index="${i}" aria-label="Open photo ${i + 1} of ${cat.name}">
            <img src="${src}" alt="${cat.name} project photo ${i + 1}" loading="lazy" width="1200" height="900">
          </button>
        `).join('')}
      </div>
    </section>
  `).join('');

  const categoryIndexSection = document.getElementById('category-index');

  function showCategory(slug) {
    const cat = CATEGORIES.find(c => c.slug === slug);
    if (!cat) {
      categoryIndexSection.classList.remove('is-hidden');
      document.querySelectorAll('.gallery-view').forEach(v => v.classList.remove('is-active'));
      return;
    }
    categoryIndexSection.classList.add('is-hidden');
    document.querySelectorAll('.gallery-view').forEach(v => {
      v.classList.toggle('is-active', v.dataset.slug === slug);
    });
    window.scrollTo({ top: document.querySelector('.page-hero').offsetHeight, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  function route() {
    const slug = window.location.hash.replace('#', '');
    showCategory(slug);
  }

  window.addEventListener('hashchange', route);
  route();

  viewsWrap.addEventListener('click', (e) => {
    const back = e.target.closest('[data-back]');
    if (back) {
      e.preventDefault();
      window.location.hash = '';
    }
  });

  // ---- Lightbox -----------------------------------------------------------
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const counter = lightbox.querySelector('.lightbox__counter');
  let currentPhotos = [];
  let currentIndex = 0;

  function openLightbox(slug, index) {
    const cat = CATEGORIES.find(c => c.slug === slug);
    if (!cat) return;
    currentPhotos = cat.photos;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function updateLightbox() {
    lightboxImg.src = currentPhotos[currentIndex];
    counter.textContent = `${currentIndex + 1} / ${currentPhotos.length}`;
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  viewsWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.photo-grid button');
    if (!btn) return;
    const grid = btn.closest('.photo-grid');
    openLightbox(grid.dataset.slug, Number(btn.dataset.index));
  });

  lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  lightbox.querySelector('.lightbox__prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
    updateLightbox();
  });
  lightbox.querySelector('.lightbox__next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentPhotos.length;
    updateLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox__prev').click();
    if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox__next').click();
  });
})();

// ---- Contact form (front-end only — wire to a backend/form service) -------
(function initContactForm(){
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const projectSelect = form.querySelector('#project-type');
  if (projectSelect) {
    projectSelect.innerHTML = ['Select a category', ...CATEGORIES.map(c => c.name), 'Other']
      .map((label, i) => `<option value="${label}" ${i === 0 ? 'disabled selected' : ''}>${label}</option>`)
      .join('');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = form.querySelector('.form-note');
    note.textContent = 'Thank you — your enquiry has been noted. Our design team will call you back shortly.';
    note.classList.add('is-visible');
    form.reset();
  });
})();
