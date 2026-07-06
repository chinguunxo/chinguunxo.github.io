// Nav scroll effect
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Dark / light mode toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// Mermaid diagram rendering (turns ```mermaid fenced code blocks into diagrams)
if (window.mermaid) {
  const diagrams = Array.from(document.querySelectorAll('pre > code.language-mermaid')).map(code => {
    const div = document.createElement('div');
    div.className = 'mermaid';
    div.dataset.mermaidSrc = code.textContent;
    code.parentElement.replaceWith(div);
    return div;
  });

  const renderMermaid = () => {
    mermaid.initialize({
      startOnLoad: false,
      theme: html.getAttribute('data-theme') === 'dark' ? 'dark' : 'default',
      securityLevel: 'strict',
    });
    diagrams.forEach(div => {
      div.removeAttribute('data-processed');
      div.innerHTML = div.dataset.mermaidSrc;
    });
    mermaid.run({ nodes: diagrams });
  };

  renderMermaid();
  themeToggle?.addEventListener('click', renderMermaid);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
