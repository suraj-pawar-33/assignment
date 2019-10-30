document.addEventListener('DOMContentLoaded', init);

function init() {

  var view_cart_btn = document.getElementById("view_cart");
  var close_modal_btn = document.getElementById("close_modal");
  var modal = document.getElementById("Cart");
  let icon = document.getElementById("ul_2");

  view_cart_btn.addEventListener('click', showModal);
  close_modal_btn.addEventListener('click', closeModal);
  window.addEventListener('click', closeModal);
  icon.addEventListener('click', (ev) => {modal.style.display = "block";});




  function showModal(ev) {
    modal.style.display = "block";
  }
  function closeModal(ev) {
    if (ev.target == modal || ev.target == close_modal_btn) {
    modal.style.display = "none";
    }
  }

getJsonData();






var pizzaArray = [];
var count = 0;
var cartArray = [];
var cartCount = 0;

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
    this.inCart = false;

    var h4_main = document.createElement("h4");
    var h4_cart = document.createElement("h4");
    var smalldiv;
    var cartUl;

    this.getMainH4 = function(){
      h4_main.innerHTML = this.quantity;
      return h4_main;
    };
    this.getCartH4 = function(){
      h4_cart.innerHTML = this.quantity;
      return h4_cart;
    };
    this.setMainH4 = function(){
      h4_main.innerHTML = this.quantity;
    };
    this.setCartH4 = function(){
      h4_cart.innerHTML = this.quantity;
    };

    this.getSmDiv = function(){
      return smalldiv;
    };
    this.getCartUl = function(){
      return cartUl;
    };
    this.setSmDiv = function(div){
      smalldiv = div;
    };
    this.setCartUl = function(ul){
      return cartUl = ul;
    };

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
        toCartArray(this.id, this.price, this.discPrice(), this.quantity);
        this.inCart = true;
        let cartDiv = document.getElementById("cart_inner");
        this.setCartUl(this.createUl());
        cartDiv.appendChild(this.getCartUl());

        this.setSmDiv(this.smallDiv());
        let smallcart = document.getElementById("smallcart");
        smallcart.appendChild(this.getSmDiv());
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
    span.innerHTML = "&#8377;" + this.price;
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
        this.setQuantity();
      }
      if(this.inCart){
        toCartArray(this.id, this.price, this.discPrice(), this.quantity);
      }
    });
    return span;
  }
  rightSpan(){
    let span = document.createElement('span');
    span.innerHTML = "&gt;";
    span.addEventListener('click', (ev) => {
      if(this.quantity < 20){
        this.quantity += 1;
        this.setQuantity();
      }
      if(this.inCart){
        toCartArray(this.id, this.price, this.discPrice(), this.quantity);
      }

    });
    return span;
  }
  heading4(){
    if(this.inCart){
      return this.getCartH4();
    }else {
      return this.getMainH4();
    }

  }
  setQuantity(num){
    this.setCartH4();
    this.setMainH4();
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
        this.getSmDiv().remove();
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
        deleteFromCart(this.id);
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
    p.innerHTML = "&#8377;"+this.price;
    li.appendChild(p);
    return li;
  }
  discLi(){
    let li = this.getLi();
    let p = this.getPara();
    p.innerHTML = this.discount+"%";
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

  //for small list of pizza.

  smallDiv(){
    let div = this.getDiv();
    div.classList.add("smallcart");

    let div2 = this.getDiv();
    let p = this.getPara();
    p.innerHTML = this.name;

    div2.appendChild(this.getSpan());
    div2.appendChild(p);

    let circle = this.createCircleDiv();
    circle.classList.remove("circle");
    let div3 = this.getDiv();
    div3.appendChild(circle);

    div.appendChild(div3);
    div.appendChild(div2);

    div.addEventListener('click', (ev) => {
      if(ev.target.myCode == 45){
        ev.currentTarget.remove();
        this.getCartUl().remove();
        this.quantity = 1;
      }
    });

    return div;
  }
  getSpan(){
    let span = document.createElement('span');
    span.innerHTML = "&times;"
    span.addEventListener('click', (ev) => {
      this.inCart = false;
      deleteFromCart(this.id);
    });
    span.myCode = 45;
    return span;
  }
  getDiv(){
    let div = document.createElement('div');
    return div;
  }

}

function Element(id, price, discPrice, quantity){
    this.id = id;
    this.price = price;
    this.discPrice = discPrice;
    this.quantity = quantity;
}

function toCartArray(id, price, discPrice, quantity){

  let present = cartArray.some((item) => {
    if(item.id == id){
      item.quantity = quantity;
    }
    return item.id == id;
  });
  if(!present){
    cartArray[cartCount] = new Element(id, price, discPrice, quantity);
    cartCount++;
  }
    console.log(cartArray);
    calcCost();
}
function deleteFromCart(id){
  cartArray = cartArray.filter((items) => {
    return (items.id != id);
  });
  cartCount--;
  console.log(cartArray);
  calcCost();
}

function calcCost(){
  let normCost = 0;
  let discoCost = 0;
  let othCost = 0;
  let len = cartArray.length;
  let dCount = 0;


  for(i = 0; i < len; i++){
      dCount += 1;
    if(dCount < 4){
      discoCost += cartArray[i].discPrice * cartArray[i].quantity;
      normCost += cartArray[i].price * cartArray[i].quantity;
    }else {
      discoCost += cartArray[i].price * cartArray[i].quantity;
      normCost += cartArray[i].price * cartArray[i].quantity;
    }
  }
    showCost(normCost, discoCost, othCost);

}

function showCost(normCost, discoCost, othCost){
  let total_1 = document.getElementById("total_1");
  total_1.innerHTML = "&#8377;" + normCost;

  let total_2 = document.getElementById("total_2");
  total_2.innerHTML = "&#8377;" + normCost;

  let disc_1 = document.getElementById("disc_1");
  disc_1.innerHTML = "&#8377;" +( discoCost + othCost);

  let disc_2 = document.getElementById("disc_2");
  disc_2.innerHTML = "&#8377;" + (discoCost + othCost);

  let a = document.getElementById("icontext");
  a.innerHTML = cartCount + "items-&#8377;"+ (discoCost + othCost);

}


}
