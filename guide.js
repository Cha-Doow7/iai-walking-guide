/* The current step follows the reader's position, even during fast scrolling. */
const steps = [...document.querySelectorAll('.step')];
const progress = document.getElementById('route-progress');
const label = document.getElementById('progress-label');
const topLink = document.querySelector('.back-top');
let scheduled = false;
function updateProgress() {
  const threshold = document.querySelector('.progress-wrap').getBoundingClientRect().height + 110;
  let current = 0;
  steps.forEach((step, index) => { if (step.getBoundingClientRect().top <= threshold) current = index + 1; });
  progress.value = current;
  progress.textContent = `${current} / 13`;
  label.innerHTML = current ? `STEP ${String(current).padStart(2, '0')} / 13 · <span lang="zh-HK">第 ${current} 步</span>` : 'START / <span lang="zh-HK">起點</span>';
  topLink.hidden = window.scrollY < 450;
  scheduled = false;
}
function scheduleUpdate(){if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress);}}
window.addEventListener('scroll', scheduleUpdate, {passive:true});
window.addEventListener('resize', scheduleUpdate);
window.addEventListener('load', scheduleUpdate);
if ('ResizeObserver' in window) new ResizeObserver(scheduleUpdate).observe(document.querySelector('.route'));
updateProgress();

/* Explicit scrolling also works in embedded website previews. */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'start'});
  });
});
