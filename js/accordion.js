// code from:
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_accordion_symbol

var acc = document.getElementsByClassName('accordion');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('open');
    var panel = this.parentNode.querySelector('.hidden-box');

    if (panel.style.maxHeight) {
      // Panel is currently open, so we need to close it
      panel.style.maxHeight = null;
    } else {
      // Open the clicked panel
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
}
