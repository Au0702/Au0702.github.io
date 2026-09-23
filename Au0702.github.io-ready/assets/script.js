const root = document.documentElement;
const themeButton = document.querySelector('.theme-button');
const storedTheme = localStorage.getItem('theme');

if (storedTheme === 'dark' || (!storedTheme && matchMedia('(prefers-color-scheme: dark)').matches)) {
  root.dataset.theme = 'dark';
}

themeButton.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
});

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.abstract-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const abstract = button.nextElementSibling;
    const open = abstract.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('.back-top').addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
