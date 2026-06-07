document.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('.article-content figure img, .article-content > img'));
  if (!images.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Fullscreen image viewer');

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'image-lightbox__close';
  closeButton.setAttribute('aria-label', 'Close fullscreen image');
  closeButton.textContent = '×';

  const fullImage = document.createElement('img');
  fullImage.className = 'image-lightbox__img';
  fullImage.alt = '';

  lightbox.appendChild(closeButton);
  lightbox.appendChild(fullImage);
  document.body.appendChild(lightbox);

  function openLightbox(img) {
    fullImage.src = img.currentSrc || img.src;
    fullImage.alt = img.alt || '';
    lightbox.classList.add('is-open');
    document.body.classList.add('image-lightbox-open');
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('image-lightbox-open');
    fullImage.removeAttribute('src');
  }

  images.forEach(img => {
    img.addEventListener('click', event => {
      event.preventDefault();
      openLightbox(img);
    });
  });

  closeButton.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', event => {
    if (event.target === lightbox || event.target === fullImage) closeLightbox();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
});
