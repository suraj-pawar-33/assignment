document.addEventListener('DOMContentLoaded', init);

function init() {

  var view_cart_btn = document.getElementById("view_cart");
  var close_modal_btn = document.getElementById("close_modal");
  var modal = document.getElementById("Cart");

  view_cart_btn.addEventListener('click', showModal);
  close_modal_btn.addEventListener('click', closeModal);
  window.addEventListener('click', closeModal);

  function showModal(ev) {
    modal.style.display = "block";
  }
  function closeModal(ev) {
    if (ev.target == modal || ev.target == close_modal_btn) {
    modal.style.display = "none";
    }
  }

getJsonData();
}
var pizzaArray = [];
var count = 0;
console.log(pizzaArray);

function getJsonData(){

  fetch('https://my-json-server.typicode.com/suraj-pawar-33/json/db')
  .then(response => response.text())
  .then(readThis);
  function readThis(text) {
    let data = JSON.parse(text);
    createArray(data);
  }
}

function createArray(data){
  for(let pizza of data.pizzaList){
    pizzaArray[count] = new Pizza(pizza);
    count++;
  }
  createListDiv();
}
function createListDiv(){
  let div = document.getElementById("list");
  for(let item of pizzaArray){
    div.appendChild(item.createPizzaDiv());
  }
}

class Pizza {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.price = obj.price;
    this.description = obj.description;
    this.imageUrl = obj.imageUrl;
    this.discount = obj.discount;
    this.quantity = 1;
  }
  discPrice() {
    return this.price - ((this.discount / 100 )*this.price);
  }
// For Main List Of Pizza
  createPizzaDiv(){
    let div = document.createElement('div');
    div.classList.add("pizza");
    div.id = count;
    div.appendChild(this.createLeftDiv());
    div.appendChild(this.createRightDiv());
    return div;
  }
  createLeftDiv(){
    let div = document.createElement('div');
    div.classList.add("left");
    div.appendChild(this.createCircleDiv());
    return div;
  }
  createRightDiv(){
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    h2.innerHTML = this.name;

    let p = document.createElement('p');
    p.innerHTML = this.description;

    let div2 = document.createElement('div');
    div2.appendChild(this.createPriceSpan());
    div2.appendChild(this.createQuaSpan());

    let btn = document.createElement('button');
    btn.classList.add('cart_btn', 'green');
    btn.innerHTML = "ADD TO CART";
    btn.addEventListener('click', (ev) => {/*nothing for now*/});

    div.classList.add("right");
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(div2);
    div.appendChild(btn);
    return div;
  }
  createCircleDiv(){
    let div = document.createElement('div');
    div.classList.add("circle");
    div.style.backgroundImage = "url("+this.imageUrl+")";
    return div;
  }
  createPriceSpan(){
    let span = document.createElement('span');
    span.classList.add("price");
    span.innerHTML = this.price;
    return span;
  }
  createQuaSpan(){
    let span = document.createElement('span');
    span.classList.add("quantity");
    span.innerHTML = "<span>&lt;</span><h4>"+this.quantity+"</h4><span>&gt;</span>";
    return span;
  }

}
