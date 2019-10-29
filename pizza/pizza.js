document.addEventListener('DOMContentLoaded', init);

function init() {

  var view_cart_btn = document.getElementById("view_cart");
  var close_modal_btn = document.getElementById("close_modal");
  var modal = document.getElementById("Cart");

  view_cart_btn.addEventListener('click', showModal);
  close_modal_btn.addEventListener('click', claseModal);


  function showModal(ev) {
    modal.style.display = "block";
  }

  function claseModal(ev) {
    modal.style.display = "none";
  }
  window.onclick = function(ev) {
    if (ev.target == modal) {
    modal.style.display = "none";
  }
}


















}
