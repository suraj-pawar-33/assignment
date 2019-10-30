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


    this.h4 = document.createElement("h4");
    this.inCart = false;
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

    div.classList.add("right");
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(div2);
    div.appendChild(this.addCartBtn());
    return div;
  }
  addCartBtn(){
    let btn = document.createElement('button');
    btn.classList.add('cart_btn', 'green');
    btn.innerHTML = "ADD TO CART";
    btn.addEventListener('click', (ev) => {
      if (!this.inCart) {
        let cartDiv = document.getElementById("cart_inner");
        cartDiv.appendChild(this.createUl());
        this.inCart = true;
      }

    });
    return btn;
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
    span.innerHTML = "$" + this.price;
    return span;
  }
  createQuaSpan(){
    let span = document.createElement('span');
    span.classList.add("quantity");
    span.appendChild(this.leftSpan());
    span.appendChild(this.heading4());
    span.appendChild(this.rightSpan());
    return span;
  }
  leftSpan(){
    let span = document.createElement('span');
    span.innerHTML = "&lt;";
    span.addEventListener('click', (ev) => {
      if(this.quantity > 1){
        this.quantity -= 1;
        this.setQuantity(this.quantity);
      }
    });
    return span;
  }
  rightSpan(){
    let span = document.createElement('span');
    span.innerHTML = "&gt;";
    span.addEventListener('click', (ev) => {
      this.quantity += 1;
      this.setQuantity(this.quantity);
    });
    return span;
  }
  heading4(){
    this.h4.innerHTML = this.quantity;
    return this.h4;
  }
  setQuantity(num){
    this.h4.innerHTML = this.quantity;
  }

// For In Cart List Of Pizza
  createUl(){
    let ul = document.createElement('ul');
    ul.classList.add("white_ul");
    ul.appendChild(this.deleteLi());
    ul.appendChild(this.imageLi());
    ul.appendChild(this.nameLi());
    ul.appendChild(this.priceLi());
    ul.appendChild(this.discLi());
    ul.appendChild(this.quantityLi());

    ul.addEventListener('click', (ev) => {
      if(ev.target.myCode == 45){
        ev.currentTarget.remove();
        this.quantity = 1;
      }
    });
    return ul;
  }
  deleteLi(){
    let li = this.getLi();
    let p = this.getPara();
    p.classList.add("small_close");
    p.innerHTML = '&times;';
    p.myCode = 45;
    p.addEventListener('click', (ev) => {
        this.inCart = false;
    });
    li.appendChild(p);
    return li;
  }
  imageLi(){
    let li = this.getLi();
    let div = this.createCircleDiv();
    div.classList.remove("circle");
    li.appendChild(div);
    return li;
  }
  nameLi(){
    let li = this.getLi();
    let p = this.getPara();
    p.innerHTML = this.name;
    li.appendChild(p);
    return li;
  }
  priceLi(){
    let li = this.getLi();
    let p = this.getPara();
    p.innerHTML = this.price;
    li.appendChild(p);
    return li;
  }
  discLi(){
    let li = this.getLi();
    let p = this.getPara();
    p.innerHTML = this.discPrice();
    li.appendChild(p);
    return li;
  }
  quantityLi(){
    let li = this.getLi();
    let span = this.createQuaSpan();
    li.appendChild(span);
    return li;
  }
  getLi(){
    let li = document.createElement('li');
    return li;
  }
  getPara(){
    let p = document.createElement('p');
    return p;
  }

}
