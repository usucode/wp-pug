const box = document.querySelector<HTMLElement>('.box');

box.addEventListener('click', event => {
  box.innerHTML = `Click count: ${event.detail}`;
});