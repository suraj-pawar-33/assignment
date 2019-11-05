document.addEventListener('DOMContentLoaded', init);

function init(){


}




















var wrapper = document.getElementById('main');
var counter = 1;

class Row {
  constructor(obj) {
    this.obj = obj;
  }
  tHead(){
    let tr = document.createElement('tr');
    for (var item in this.obj) {
      let th = document.createElement('th');
      th.innerHTML = item;
      tr.appendChild(th);
    }
                                      console.log("head row created");
    return tr;
  }
  tBody(){
    let tr = document.createElement('tr');
    for (var item in this.obj) {
      let td = document.createElement('td');
      if (checkTypeOf(this.obj[item]) == "obj" || checkTypeOf(this.obj[item]) == "arr") {
        td.innerHTML = item;
        td.classList.add('link');
        td.addEventListener('click', (ev) => {
          console.log('clicked' , ev.target);
          readData(this.obj[item]);
        });
      }else {
        td.innerHTML = this.obj[item];
      }
      tr.appendChild(td);
    }
                                          console.log("body row created");
    return tr;
  }
}


class Table {
  constructor(tArr) {
    this.tArr = tArr;
    this.table = document.createElement('table');
    this.content = [];
  }
  getTable(){
    return this.table;
  }
  addRows(){
    let i = 1;
    this.content[0] = new Row(this.tArr[0]);
    this.table.appendChild(this.content[0].tHead());
    this.tArr.forEach((item) => {
      this.content[i] = new Row(item);
      this.table.appendChild(this.content[i].tBody());
      i++;
                                                        console.log("rows added");
    });
  }

  addRow(){
    this.content[0] = new Row(this.tArr);
    this.table.appendChild(this.content[0].tHead());
    this.content[1] = new Row(this.tArr);
    this.table.appendChild(this.content[1].tBody());
                                                    console.log("row added");
  }
}




  fetch("https://my-json-server.typicode.com/suraj-pawar-33/tableJson/db")
  .then(response => response.text())
  .then(readThis);
  function readThis(text) {
    let data = JSON.parse(text);
    readData(data);
  }

function readData(item) {
  if(checkTypeOf(item) == "obj"){
    let table = new Table(item);
                                          console.log("table created");
    table.addRow();
    setDiv(table.getTable());
  }else if(checkTypeOf(item) == "arr"){
    let table = new Table(item);
                                          console.log("tables created");
    table.addRows();
    setDiv(table.getTable());
  }
}

function setDiv(elem){
  let div = getDiv();
  div.appendChild(elem);
  wrapper.appendChild(div);
}

function getDiv(){
  let div = document.createElement("div");
  div.classList.add('table_box');
  let span = document.createElement("span");
  span.id = "close_table";
  span.classList.add("close");
  span.innerHTML = "&times;"
  span.addEventListener("click", () => {
    //nothing
  });

  div.appendChild(span);
  div.style.paddingTop = (50 * counter) + "px";
  div.style.zIndex = counter + "";
  counter++;

  div.addEventListener('click', (ev) => {
    if(ev.target == span){
      ev.currentTarget.remove();
      counter--;
    }
  });
  return div;
}


function checkTypeOf(value) {
  if (value.length != undefined && typeof value != "string") {
    return "arr";
  }else if(value.length == undefined && typeof value != "number"){
    return "obj";
  }else if (typeof value == "string") {
    return "str";
  }else {
    return "num";
  }
}
//end
