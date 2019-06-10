window.onload = () => {
  const box = document.querySelector<HTMLInputElement>('.box');
  if (box) {
    box.addEventListener('click', event => {
      console.log("box!!")
      box.innerHTML = `Click count: ${event.detail}`;
    });
  }
}